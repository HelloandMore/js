import db from "../config/database.js";
class Workout {
  static create(user_id, date, duration, notes) {
    const stmt = db.prepare(
      "INSERT INTO workouts (user_id, date, duration, notes) VALUES (?, ?, ?, ?)"
    );
    const info = stmt.run(user_id, date, duration, notes);
    return { id: info.lastInsertRowid, user_id, date, duration, notes };
  }
  static findByUserId(user_id) {
    const stmt = db.prepare(
      "SELECT * FROM workouts WHERE user_id = ? ORDER BY date DESC"
    );
    return stmt.all(user_id);
  }
  static findById(id) {
    const stmt = db.prepare("SELECT * FROM workouts WHERE id = ?");
    return stmt.get(id);
  }
  static update(id, date, duration, notes) {
    const stmt = db.prepare(
      "UPDATE workouts SET date = ?, duration = ?, notes = ? WHERE id = ?"
    );
    stmt.run(date, duration, notes, id);
    return this.findById(id);
  }
  static delete(id) {
    const stmt = db.prepare("DELETE FROM workouts WHERE id = ?");
    return stmt.run(id);
  }
  static getStatistics(user_id) {
    const totalStmt = db.prepare(
      "SELECT COUNT(*) as totalWorkouts, SUM(duration) as totalDuration FROM workouts WHERE user_id = ?"
    );
    const total = totalStmt.get(user_id);
    const weeklyStmt = db.prepare(`
      SELECT date, SUM(duration) as duration 
      FROM workouts 
      WHERE user_id = ? AND date >= date('now', '-7 days')
      GROUP BY date
      ORDER BY date DESC
    `);
    const weeklyStats = weeklyStmt.all(user_id);
    return {
      totalWorkouts: total.totalWorkouts || 0,
      totalDuration: total.totalDuration || 0,
      weeklyStats,
    };
  }
}
export default Workout;
