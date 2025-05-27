const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get all invoices
router.get('/', (req, res) => {
  const invoices = db.prepare(`
    SELECT invoices.*, issuers.name as issuer_name, customers.name as customer_name
    FROM invoices
    INNER JOIN issuers ON invoices.issuer_id = issuers.id
    INNER JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.issue_date DESC
  `).all();

  res.render('index', { 
    title: 'Invoice Management System',
    invoices: invoices
  });
});

// Show form to create a new invoice
router.get('/create', (req, res) => {
  const issuers = db.prepare('SELECT * FROM issuers').all();
  const customers = db.prepare('SELECT * FROM customers').all();
  
  res.render('create', {
    title: 'Create New Invoice',
    issuers,
    customers
  });
});

// Create a new invoice
router.post('/create', (req, res) => {
  const {
    issuer_id,
    customer_id,
    invoice_number,
    issue_date,
    fulfillment_date,
    due_date,
    total_amount,
    vat_rate
  } = req.body;
  
  // Calculate VAT amount
  const vatAmount = parseFloat(total_amount) * parseFloat(vat_rate);
  
  db.prepare(`
    INSERT INTO invoices 
    (invoice_number, issue_date, fulfillment_date, due_date, total_amount, vat_rate, vat_amount, issuer_id, customer_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    invoice_number,
    issue_date,
    fulfillment_date,
    due_date,
    total_amount,
    vat_rate,
    vatAmount,
    issuer_id,
    customer_id
  );
  
  res.redirect('/');
});

// Show details of a specific invoice
router.get('/view/:id', (req, res) => {
  const invoice = db.prepare(`
    SELECT invoices.*, 
           issuers.name as issuer_name, issuers.address as issuer_address, issuers.tax_number as issuer_tax_number,
           customers.name as customer_name, customers.address as customer_address, customers.tax_number as customer_tax_number
    FROM invoices
    INNER JOIN issuers ON invoices.issuer_id = issuers.id
    INNER JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.id = ?
  `).get(req.params.id);
  
  if (!invoice) {
    return res.status(404).send('Invoice not found');
  }
  
  res.render('view', {
    title: `Invoice #${invoice.invoice_number}`,
    invoice
  });
});

// Show form to edit an invoice
router.get('/edit/:id', (req, res) => {
  const invoice = db.prepare('SELECT * FROM invoices WHERE id = ?').get(req.params.id);
  const issuers = db.prepare('SELECT * FROM issuers').all();
  const customers = db.prepare('SELECT * FROM customers').all();
  
  if (!invoice) {
    return res.status(404).send('Invoice not found');
  }
  
  res.render('edit', {
    title: `Edit Invoice #${invoice.invoice_number}`,
    invoice,
    issuers,
    customers
  });
});

// Update an invoice
router.post('/edit/:id', (req, res) => {
  const {
    issuer_id,
    customer_id,
    invoice_number,
    issue_date,
    fulfillment_date,
    due_date,
    total_amount,
    vat_rate
  } = req.body;
  
  // Calculate VAT amount
  const vatAmount = parseFloat(total_amount) * parseFloat(vat_rate);
  
  db.prepare(`
    UPDATE invoices SET
    invoice_number = ?,
    issue_date = ?,
    fulfillment_date = ?,
    due_date = ?,
    total_amount = ?,
    vat_rate = ?,
    vat_amount = ?,
    issuer_id = ?,
    customer_id = ?
    WHERE id = ?
  `).run(
    invoice_number,
    issue_date,
    fulfillment_date,
    due_date,
    total_amount,
    vat_rate,
    vatAmount,
    issuer_id,
    customer_id,
    req.params.id
  );
  
  res.redirect('/');
});

// Delete an invoice
router.get('/delete/:id', (req, res) => {
  db.prepare('DELETE FROM invoices WHERE id = ?').run(req.params.id);
  res.redirect('/');
});

module.exports = router;
