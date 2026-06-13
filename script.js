async function loadLeaderboard() {
    const res = await fetch("data/ticket_balance.json");
    const lastModified = res.headers.get("Last-Modified");
    const data = await res.json();

    let entries = Object.entries(data).map(([user, ticket]) => ({
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

    if (lastModified) {
        const date = new Date(lastModified);

        document.getElementById("last-updated").textContent =
            `Last updated: ${date.toLocaleString()}`;
    }
}

loadLeaderboard();