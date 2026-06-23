async function loadLeaderboard() {
  const res = await fetch("data/ticket_balance.json");
  const data = await res.json();


  const lastUpdated = data.last_updated;
  const ticketBalance = data.ticket_balance;
  let entries = Object.entries(ticketBalance).map(([user, score]) => ({
    user,
    score
  }));

  const table = document.getElementById("leaderboard");
  table.innerHTML = "";

  entries.forEach((entry) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${entry.user}</td>
      <td class="score">${entry.score}</td>
    `;

    table.appendChild(row);
  });

  document.getElementById("last-updated").textContent = `Last updated: ${lastUpdated}`;


}

loadLeaderboard();