async function loadLeaderboard() {
      const res = await fetch("data/ticket_balance.json");
      const data = await res.json();

      let entries = Object.entries(data).map(([user, ticket]) => ({
        user,
        ticket
      }));

      const table = document.getElementById("leaderboard");
      table.innerHTML = "";

      entries.forEach((entry) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td class="user">${entry.user}</td>
          <td class="ticket">${entry.ticket}</td>
        `;

        table.appendChild(row);
      });
    }

    loadLeaderboard();