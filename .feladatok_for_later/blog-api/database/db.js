import Database from 'better-sqlite3';
import path from 'path';
import moment from 'moment';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the database
const db = new Database(path.join(__dirname, 'blog.db'));

// Create tables if they don't exist
function initializeDatabase() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id)
    )
  `).run();

  // Check if users already exist and add if not
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  
  if (userCount === 0) {
    const insertUser = db.prepare('INSERT INTO users (name) VALUES (?)');
    // Add sample users
    insertUser.run('János Kovács');
    insertUser.run('Erika Nagy');
    insertUser.run('Péter Szabó');
    
    // Add sample blog posts
    const insertBlog = db.prepare(`
      INSERT INTO blogs (author_id, title, category, content, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    // Current timestamp in ISO format
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    // Some days ago for created_at
    const threeDaysAgo = moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss');
    const fiveDaysAgo = moment().subtract(5, 'days').format('YYYY-MM-DD HH:mm:ss');
    const tenDaysAgo = moment().subtract(10, 'days').format('YYYY-MM-DD HH:mm:ss');
    
    // User 1's blog posts (János Kovács)
    insertBlog.run(
      1, 
      'Programozás alapjai kezdőknek', 
      'Technológia',
      'A programozás egy izgalmas világ, amelyben bárki el tud merülni. Ebben a cikkben az alapokat tekintjük át...',
      fiveDaysAgo,
      now
    );
    insertBlog.run(
      1, 
      'Modern webfejlesztési trendek', 
      'Fejlesztés',
      'A webfejlesztés folyamatosan változik, érdemes lépést tartani az új technológiákkal...',
      tenDaysAgo,
      threeDaysAgo
    );
    
    // User 2's blog posts (Erika Nagy)
    insertBlog.run(
      2, 
      'A mesterséges intelligencia jövője', 
      'Technológia',
      'Az MI fejlődése exponenciális ütemben halad, ennek következményei mindenkit érinteni fognak...',
      tenDaysAgo,
      fiveDaysAgo
    );
    insertBlog.run(
      2, 
      'Hogyan készüljünk fel a munkaerőpiac változásaira?', 
      'Karrier',
      'A jelenlegi munkaerőpiac gyorsan változik, érdemes felkészülni a jövő kihívásaira...',
      fiveDaysAgo,
      threeDaysAgo
    );
    
    // User 3's blog posts (Péter Szabó)
    insertBlog.run(
      3, 
      'Adatbázisok a gyakorlatban', 
      'Fejlesztés',
      'Az adatbázisok kulcsfontosságúak a modern alkalmazások fejlesztésében. Ebben a cikkben...',
      threeDaysAgo,
      now
    );
    insertBlog.run(
      3, 
      'JavaScript újdonságok 2025-ben', 
      'Programozás',
      'A JavaScript nyelv folyamatosan fejlődik, nézzük meg az idei év legnagyobb újdonságait...',
      tenDaysAgo,
      fiveDaysAgo
    );
  }
}

// Initialize the database
initializeDatabase();

// Export the database
export default db;
