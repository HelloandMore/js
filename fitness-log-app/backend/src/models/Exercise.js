import db from "../config/database.js";
class Exercise {
  static create(workout_id, name, reps, sets, weight) {
    const stmt = db.prepare(
      "INSERT INTO exercises (workout_id, name, reps, sets, weight) VALUES (?, ?, ?, ?, ?)"
    );
    const info = stmt.run(workout_id, name, reps, sets, weight);
    return { id: info.lastInsertRowid, workout_id, name, reps, sets, weight };
  }
  static findByWorkoutId(workout_id) {
    const stmt = db.prepare("SELECT * FROM exercises WHERE workout_id = ?");
    return stmt.all(workout_id);
  }
  static findById(id) {
    const stmt = db.prepare("SELECT * FROM exercises WHERE id = ?");
    return stmt.get(id);
  }
  static update(id, name, reps, sets, weight) {
    const stmt = db.prepare(
      "UPDATE exercises SET name = ?, reps = ?, sets = ?, weight = ? WHERE id = ?"
    );
    stmt.run(name, reps, sets, weight, id);
    return this.findById(id);
  }
  static delete(id) {
    const stmt = db.prepare("DELETE FROM exercises WHERE id = ?");
    return stmt.run(id);
  }
}
export default Exercise;
