async function loadLeaderboard() {
  const res = await fetch("data/ticket_balance.json");
  const data = await res.json();

  const lastUpdated = data.last_updated;
  const ticketBalance = data.ticket_balance;

  let entries = Object.entries(ticketBalance).map(([user, ticket]) => ({
      user,
      ticket
  }));

  const table = document.getElementById("leaderboard");
  table.innerHTML = "";

  entries.forEach((entry) => {
      const row = document.createElement("tr");
      const username = entry.user.replace(/^@/, "");

      row.innerHTML = `
        <td class="user">
          <a href="https://scratch.mit.edu/users/${username}/"
            target="_blank"
            rel="noopener noreferrer">
            ${entry.user}
          </a>
        </td>
        <td class="ticket">${entry.ticket}</td>
      `;

      table.appendChild(row);
  });

  document.getElementById("last-updated").textContent = 
  `Last updated: ${new Date(data.last_updated).toLocaleString()}`;
  
}

loadLeaderboard();