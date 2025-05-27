const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get all issuers
router.get('/', (req, res) => {
  const issuers = db.prepare('SELECT * FROM issuers').all();
  
  res.render('issuers', { 
    title: 'Issuers',
    issuers: issuers
  });
});

// Show form to create a new issuer
router.get('/create', (req, res) => {
  res.render('issuer-create', {
    title: 'Create New Issuer'
  });
});

// Create a new issuer
router.post('/create', (req, res) => {
  const { name, address, tax_number } = req.body;
  
  db.prepare(`
    INSERT INTO issuers (name, address, tax_number)
    VALUES (?, ?, ?)
  `).run(name, address, tax_number);
  
  res.redirect('/issuers');
});

// Show form to edit an issuer
router.get('/edit/:id', (req, res) => {
  const issuer = db.prepare('SELECT * FROM issuers WHERE id = ?').get(req.params.id);
  
  if (!issuer) {
    return res.status(404).send('Issuer not found');
  }
  
  res.render('issuer-edit', {
    title: `Edit Issuer: ${issuer.name}`,
    issuer
  });
});

// Update an issuer
router.post('/edit/:id', (req, res) => {
  const { name, address, tax_number } = req.body;
  
  db.prepare(`
    UPDATE issuers SET
    name = ?,
    address = ?,
    tax_number = ?
    WHERE id = ?
  `).run(name, address, tax_number, req.params.id);
  
  res.redirect('/issuers');
});

// Delete an issuer (with check for associated invoices)
router.get('/delete/:id', (req, res) => {
  // Check if issuer has invoices
  const invoiceCount = db.prepare('SELECT COUNT(*) as count FROM invoices WHERE issuer_id = ?').get(req.params.id);
  
  if (invoiceCount.count > 0) {
    return res.send('Cannot delete issuer: There are invoices associated with this issuer');
  }
  
  db.prepare('DELETE FROM issuers WHERE id = ?').run(req.params.id);
  res.redirect('/issuers');
});

// View an issuer's invoices
router.get('/view/:id', (req, res) => {
  const issuer = db.prepare('SELECT * FROM issuers WHERE id = ?').get(req.params.id);
  
  if (!issuer) {
    return res.status(404).send('Issuer not found');
  }
  
  const invoices = db.prepare(`
    SELECT invoices.*, customers.name as customer_name
    FROM invoices
    INNER JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.issuer_id = ?
    ORDER BY invoices.issue_date DESC
  `).all(req.params.id);
  
  res.render('issuer-view', {
    title: `Issuer: ${issuer.name}`,
    issuer,
    invoices
  });
});

module.exports = router;
