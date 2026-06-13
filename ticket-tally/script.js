    async function getPfp(username) {
    const res = await fetch(`https://api.scratch.mit.edu/users/${username}`);
    const data = await res.json();

    return data.profile.images["90x90"];
}

async function loadLeaderboard() {
    const res = await fetch("data/ticket_balance.json");
    const data = await res.json();

    let entries = Object.entries(data).map(([user, ticket]) => ({
        user,
        ticket
    }));

    const table = document.getElementById("leaderboard");
    table.innerHTML = "";

    for (const entry of entries) {
        const username = entry.user.replace(/^@/, "");
        const pfp = await getPfp(username);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="pfp">
                <img src="${pfp}" alt="${username}">
            </td>

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
    }
}

loadLeaderboard();