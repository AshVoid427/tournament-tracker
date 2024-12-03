// Store player names in an array
let players = [];

// Add a player to the list
function addPlayer(event) {
  event.preventDefault(); // Prevent form submission
  const playerNameInput = document.getElementById("playerName");
  const playerName = playerNameInput.value.trim();

  if (playerName) {
    players.push(playerName); // Add player to array

    // Update the player list display
    const playerList = document.getElementById("playerList");
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = playerName;
    playerList.appendChild(listItem);

    // Clear the input field
    playerNameInput.value = "";
  }
}

// Generate tournament brackets
function generateBracket() {
  if (players.length < 2) {
    alert("You need at least 2 players to generate a bracket!");
    return;
  }

  // Shuffle players array
  const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

  // Create matchups
  const matchups = [];
  for (let i = 0; i < shuffledPlayers.length; i += 2) {
    const player1 = shuffledPlayers[i];
    const player2 = shuffledPlayers[i + 1] || "BYE"; // Handle odd number of players
    matchups.push({ player1, player2 });
  }

  // Display the brackets
  const bracketOutput = document.getElementById("bracketOutput");
  bracketOutput.innerHTML = `
    <h3>Bracket</h3>
    ${matchups
      .map(
        (match, index) =>
          `<p>Match ${index + 1}: ${match.player1} vs ${match.player2}</p>`
      )
      .join("")}
  `;
}
