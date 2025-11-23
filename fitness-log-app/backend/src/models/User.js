import db from "../config/database.js";
class User {
  static create(email, password_hash) {
    const stmt = db.prepare(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)"
    );
    const info = stmt.run(email, password_hash);
    return { id: info.lastInsertRowid, email };
  }
  static findByEmail(email) {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email);
  }
  static findById(id) {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    return stmt.get(id);
  }
}
export default User;
