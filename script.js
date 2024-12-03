// Initialize players array (load from localStorage if it exists)
let players = JSON.parse(localStorage.getItem("players")) || [];

// Function to add a player
function addPlayer(event) {
  event.preventDefault(); // Prevent form submission
  const playerNameInput = document.getElementById("playerName");
  const playerName = playerNameInput.value.trim();

  if (playerName) {
    // Add the player to the array
    players.push(playerName);

    // Save updated players array to localStorage
    localStorage.setItem("players", JSON.stringify(players));

    // Update the player list display
    updatePlayerList();

    // Clear the input field
    playerNameInput.value = "";
  }
}

// Function to update the player list display
function updatePlayerList() {
  const playerList = document.getElementById("playerList");
  playerList.innerHTML = ""; // Clear the list

  // Populate the list with players from the array
  players.forEach((player) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = player;
    playerList.appendChild(listItem);
  });
}

// Function to generate the bracket
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
