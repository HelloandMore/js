import React, { useEffect, useState } from "react";
import { getStatistics } from "../services/api";
const Statistics = () => {
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalDuration: 0,
    weeklyStats: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await getStatistics();
        setStats(response);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);
  if (loading) {
    return <div>Loading statistics...</div>;
  }
  return (
    <div className="statistics">
      <h2>Workout Statistics</h2>
      <div className="stat-card">
        <h3>Total Workouts</h3>
        <p className="stat-value">{stats.totalWorkouts}</p>
      </div>
      <div className="stat-card">
        <h3>Total Duration</h3>
        <p className="stat-value">{stats.totalDuration} minutes</p>
        <p className="stat-subtitle">
          ({Math.floor(stats.totalDuration / 60)} hours{" "}
          {stats.totalDuration % 60} minutes)
        </p>
      </div>
      <h3>Weekly Stats (Last 7 Days)</h3>
      {stats.weeklyStats.length > 0 ? (
        <ul className="weekly-stats">
          {stats.weeklyStats.map((day, index) => (
            <li key={index}>
              <strong>{new Date(day.date).toLocaleDateString()}:</strong>{" "}
              {day.duration} minutes
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts in the last 7 days</p>
      )}
    </div>
  );
};
export default Statistics;
