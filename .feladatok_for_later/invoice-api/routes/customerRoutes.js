const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get all customers
router.get('/', (req, res) => {
  const customers = db.prepare('SELECT * FROM customers').all();
  
  res.render('customers', { 
    title: 'Customers',
    customers: customers
  });
});

// Show form to create a new customer
router.get('/create', (req, res) => {
  res.render('customer-create', {
    title: 'Create New Customer'
  });
});

// Create a new customer
router.post('/create', (req, res) => {
  const { name, address, tax_number } = req.body;
  
  db.prepare(`
    INSERT INTO customers (name, address, tax_number)
    VALUES (?, ?, ?)
  `).run(name, address, tax_number);
  
  res.redirect('/customers');
});

// Show form to edit a customer
router.get('/edit/:id', (req, res) => {
  const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id);
  
  if (!customer) {
    return res.status(404).send('Customer not found');
  }
  
  res.render('customer-edit', {
    title: `Edit Customer: ${customer.name}`,
    customer
  });
});

// Update a customer
router.post('/edit/:id', (req, res) => {
  const { name, address, tax_number } = req.body;
  
  db.prepare(`
    UPDATE customers SET
    name = ?,
    address = ?,
    tax_number = ?
    WHERE id = ?
  `).run(name, address, tax_number, req.params.id);
  
  res.redirect('/customers');
});

// Delete a customer (with check for associated invoices)
router.get('/delete/:id', (req, res) => {
  // Check if customer has invoices
  const invoiceCount = db.prepare('SELECT COUNT(*) as count FROM invoices WHERE customer_id = ?').get(req.params.id);
  
  if (invoiceCount.count > 0) {
    return res.send('Cannot delete customer: There are invoices associated with this customer');
  }
  
  db.prepare('DELETE FROM customers WHERE id = ?').run(req.params.id);
  res.redirect('/customers');
});

// View a customer's invoices
router.get('/view/:id', (req, res) => {
  const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id);
  
  if (!customer) {
    return res.status(404).send('Customer not found');
  }
  
  const invoices = db.prepare(`
    SELECT invoices.*, issuers.name as issuer_name
    FROM invoices
    INNER JOIN issuers ON invoices.issuer_id = issuers.id
    WHERE invoices.customer_id = ?
    ORDER BY invoices.issue_date DESC
  `).all(req.params.id);
  
  res.render('customer-view', {
    title: `Customer: ${customer.name}`,
    customer,
    invoices
  });
});

module.exports = router;
