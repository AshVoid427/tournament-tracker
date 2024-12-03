// Initialize players array (load from localStorage if it exists)
let players = JSON.parse(localStorage.getItem("players")) || [];

function addPlayer(event) {
  event.preventDefault(); // Prevent form submission
  const playerNameInput = document.getElementById("playerName");
  const playerName = playerNameInput.value.trim();

  if (playerName) {
    players.push(playerName); // Add player to array
    localStorage.setItem("players", JSON.stringify(players)); // Save to localStorage
    updatePlayerList(); // Update the displayed list
    playerNameInput.value = ""; // Clear input
  }
}

function updatePlayerList() {
  const playerList = document.getElementById("playerList");
  playerList.innerHTML = ""; // Clear the list

  players.forEach((player) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = player;
    playerList.appendChild(listItem);
  });
}

function generateBracket() {
  if (players.length < 2) {
    alert("You need at least 2 players to generate a bracket!");
    return;
  }

  const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

  const matchups = [];
  for (let i = 0; i < shuffledPlayers.length; i += 2) {
    const player1 = shuffledPlayers[i];
    const player2 = shuffledPlayers[i + 1] || "BYE";
    matchups.push({ player1, player2 });
  }

  const bracketOutput = document.getElementById("bracketOutput");
  bracketOutput.innerHTML = `
    <h3>Tournament Bracket</h3>
    ${matchups
      .map(
        (match, index) =>
          `<p>Match ${index + 1}: ${match.player1} vs ${match.player2}</p>`
      )
      .join("")}
  `;
}

// Load player list on page load
window.onload = updatePlayerList;
