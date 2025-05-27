const sqlite = require('better-sqlite3');
const path = require('path');

// Connect to SQLite database
const db = new sqlite(path.join(__dirname, 'invoice.db'));

// Create tables if they don't exist
function initializeDatabase() {
  // Create issuers table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS issuers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      tax_number TEXT NOT NULL UNIQUE
    )
  `).run();

  // Create customers table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      tax_number TEXT NOT NULL UNIQUE
    )
  `).run();

  // Create invoices table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      invoice_number TEXT NOT NULL UNIQUE,
      issue_date TEXT NOT NULL,
      fulfillment_date TEXT NOT NULL,
      due_date TEXT NOT NULL,
      total_amount REAL NOT NULL,
      vat_rate REAL NOT NULL,
      vat_amount REAL NOT NULL,
      issuer_id INTEGER NOT NULL,
      customer_id INTEGER NOT NULL,
      FOREIGN KEY (issuer_id) REFERENCES issuers (id),
      FOREIGN KEY (customer_id) REFERENCES customers (id)
    )
  `).run();

  // Insert sample data
  insertSampleData();
}

// Insert sample data
function insertSampleData() {
  // Check if sample data already exists
  const issuerCount = db.prepare('SELECT COUNT(*) as count FROM issuers').get();
  const customerCount = db.prepare('SELECT COUNT(*) as count FROM customers').get();
  
  if (issuerCount.count === 0) {
    // Insert sample issuer
    db.prepare(`
      INSERT INTO issuers (name, address, tax_number) VALUES
      ('Example Company Ltd.', '1234 Business St, City, Country', '12345678-1-23'),
      ('Finance Solutions Inc.', '567 Main Road, Metropolis', '87654321-2-34'),
      ('Tech Innovations Co.', '890 Innovation Ave, Tech City', '98765432-3-45')
    `).run();
  }

  if (customerCount.count === 0) {
    // Insert sample customers
    db.prepare(`
      INSERT INTO customers (name, address, tax_number) VALUES
      ('Client One Ltd.', '123 Client Road, City', '11111111-1-11'),
      ('Customer Two Inc.', '234 Customer Ave, Town', '22222222-2-22'),
      ('Buyer Three Co.', '345 Buyer Street, Village', '33333333-3-33'),
      ('Corporation Four', '456 Corporate Blvd, City', '44444444-4-44')
    `).run();

    // Get customer IDs
    const customers = db.prepare('SELECT id FROM customers').all();
    const issuers = db.prepare('SELECT id FROM issuers').all();
    
    if (customers.length > 0 && issuers.length > 0) {
      const today = new Date();
      
      // For each customer, create 3 invoices
      customers.forEach(customer => {
        for (let i = 0; i < 3; i++) {
          const invoiceNumber = `INV-${customer.id}-${Date.now()}-${i}`;
          const issueDate = new Date(today);
          issueDate.setDate(today.getDate() - Math.floor(Math.random() * 30));
          
          const fulfillmentDate = new Date(issueDate);
          fulfillmentDate.setDate(issueDate.getDate() - Math.floor(Math.random() * 5));
          
          const dueDate = new Date(issueDate);
          dueDate.setDate(issueDate.getDate() + 15 + Math.floor(Math.random() * 15));
          
          const totalAmount = Math.floor(1000 + Math.random() * 9000);
          const vatRate = [0.05, 0.18, 0.27][Math.floor(Math.random() * 3)];
          const vatAmount = totalAmount * vatRate;
          
          // Choose a random issuer
          const issuer = issuers[Math.floor(Math.random() * issuers.length)];
          
          db.prepare(`
            INSERT INTO invoices 
            (invoice_number, issue_date, fulfillment_date, due_date, 
             total_amount, vat_rate, vat_amount, issuer_id, customer_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).run(
            invoiceNumber,
            issueDate.toISOString().split('T')[0],
            fulfillmentDate.toISOString().split('T')[0],
            dueDate.toISOString().split('T')[0],
            totalAmount,
            vatRate,
            vatAmount,
            issuer.id,
            customer.id
          );
        }
      });
    }
  }
}

// Run initialization
initializeDatabase();

module.exports = db;
