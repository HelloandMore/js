const express = require('express');
const router = express.Router();
const db = require('../database/db');
const moment = require('moment');

// Helper function to format dates
function formatDates(blogs) {
  return blogs.map(blog => {
    return {
      ...blog,
      formattedCreatedAt: moment(blog.created_at).format('YYYY. MM. DD. HH:mm'),
      formattedUpdatedAt: moment(blog.updated_at).format('YYYY. MM. DD. HH:mm')
    };
  });
}

// GET all blog posts (homepage)
router.get('/', (req, res) => {
  try {
    const blogs = db.prepare(`
      SELECT blogs.*, users.name as author_name
      FROM blogs
      JOIN users ON blogs.author_id = users.id
      ORDER BY updated_at DESC
    `).all();
    
    res.render('index', { 
      blogs: formatDates(blogs),
      title: 'Blog főoldal'
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send('Hiba történt a blog bejegyzések lekérése közben');
  }
});

// GET create new blog form
router.get('/blog/new', (req, res) => {
  try {
    const users = db.prepare('SELECT * FROM users').all();
    res.render('create', { 
      users,
      title: 'Új blog bejegyzés'
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Hiba történt a felhasználók lekérése közben');
  }
});

// POST create a new blog
router.post('/blog', (req, res) => {
  try {
    let { author_id, new_author_name, title, category, content } = req.body;
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
      // Start a transaction
    const transaction = db.transaction(() => {
      // If new author name is provided, create a new author
      if (new_author_name && new_author_name.trim() !== '') {
        const insertAuthor = db.prepare('INSERT INTO users (name) VALUES (?)');
        const authorInfo = insertAuthor.run(new_author_name);
        author_id = authorInfo.lastInsertRowid;
      }
      
      // Ensure we have a valid author_id
      if (!author_id) {
        throw new Error('Nincs érvényes szerző kiválasztva vagy megadva');
      }
      
      // Insert the blog post with the selected or newly created author
      const stmt = db.prepare(`
        INSERT INTO blogs (author_id, title, category, content, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run(author_id, title, category, content, now, now);
    });
    
    // Execute the transaction
    transaction();
    
    res.redirect('/');
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).send('Hiba történt a blog bejegyzés létrehozása közben');
  }
});

// GET blog edit form
router.get('/blog/edit/:id', (req, res) => {
  try {
    const id = req.params.id;
    
    const blog = db.prepare(`
      SELECT blogs.*, users.name as author_name
      FROM blogs
      JOIN users ON blogs.author_id = users.id
      WHERE blogs.id = ?
    `).get(id);
    
    const users = db.prepare('SELECT * FROM users').all();
    
    if (!blog) {
      return res.status(404).send('Blog bejegyzés nem található');
    }
    
    res.render('edit', { 
      blog, 
      users,
      title: 'Blog szerkesztése'
    });
  } catch (error) {
    console.error('Error fetching blog for edit:', error);
    res.status(500).send('Hiba történt a blog bejegyzés lekérése közben');
  }
});

// POST update a blog
router.post('/blog/update/:id', (req, res) => {
  try {
    const id = req.params.id;
    let { author_id, new_author_name, title, category, content } = req.body;
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
      // Start a transaction
    const transaction = db.transaction(() => {
      // If new author name is provided, create a new author
      if (new_author_name && new_author_name.trim() !== '') {
        const insertAuthor = db.prepare('INSERT INTO users (name) VALUES (?)');
        const authorInfo = insertAuthor.run(new_author_name);
        author_id = authorInfo.lastInsertRowid;
      }
      
      // Ensure we have a valid author_id
      if (!author_id) {
        throw new Error('Nincs érvényes szerző kiválasztva vagy megadva');
      }
      
      const stmt = db.prepare(`
        UPDATE blogs 
        SET author_id = ?, title = ?, category = ?, content = ?, updated_at = ?
        WHERE id = ?
      `);
      
      stmt.run(author_id, title, category, content, now, id);
    });
    
    // Execute the transaction
    transaction();
    
    res.redirect('/');
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).send('Hiba történt a blog bejegyzés frissítése közben');
  }
});

// GET delete a blog
router.get('/blog/delete/:id', (req, res) => {
  try {
    const id = req.params.id;
    
    const stmt = db.prepare('DELETE FROM blogs WHERE id = ?');
    stmt.run(id);
    
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).send('Hiba történt a blog bejegyzés törlése közben');
  }
});

// GET view a single blog
router.get('/blog/:id', (req, res) => {
  try {
    const id = req.params.id;
    
    const blog = db.prepare(`
      SELECT blogs.*, users.name as author_name
      FROM blogs
      JOIN users ON blogs.author_id = users.id
      WHERE blogs.id = ?
    `).get(id);
    
    if (!blog) {
      return res.status(404).send('Blog bejegyzés nem található');
    }
    
    res.render('view', { 
      blog: formatDates([blog])[0],
      title: blog.title
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).send('Hiba történt a blog bejegyzés lekérése közben');
  }
});

module.exports = router;
