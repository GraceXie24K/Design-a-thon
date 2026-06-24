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
    row.dataset.user = username;

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

async function goToUser() {
    const input = document
        .getElementById("user-search")
        .value
        .trim()
        .replace(/^@/, "");

    const row = document.querySelector(`tr[data-user="${input}"]`);

    if (row) {
        row.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        row.classList.add("highlight");

        setTimeout(() => {
            row.classList.remove("highlight");
        }, 2000);

    } else {
        alert("User not found in leaderboard. Note that the quick find feature is case sensitive. Please check the username and try again.");
    }
}

document.getElementById("user-search").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        goToUser();
    }
});

loadLeaderboard();