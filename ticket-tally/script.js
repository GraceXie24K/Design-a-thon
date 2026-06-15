async function loadLeaderboard() {
      const res = await fetch("data/ticket_balance.json");
      const lastModified = res.headers.get("Last-Modified");
      const data = await res.json();

      let entries = Object.entries(data).map(([user, score]) => ({
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

      if (lastModified) {
          document.getElementById("last-updated").textContent =
              `Last updated: ${new Date(lastModified).toLocaleString()}`;
      }

    }

loadLeaderboard();