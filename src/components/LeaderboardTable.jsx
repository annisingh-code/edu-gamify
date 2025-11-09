import "../styles/leaderboard.css";

export default function LeaderboardTable({ leaderboard, currentUser }) {
  return (
    <table className="leaderboard-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>User</th>
          <th>Points</th>
          <th>Badge</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((item, index) => (
          <tr
            key={index}
            className={
              currentUser && item.name === currentUser.email.split("@")[0]
                ? "highlight"
                : ""
            }
          >
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.points}</td>
            <td>
              <span className={`badge ${item.badge.toLowerCase()}`}>
                {item.badge}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
