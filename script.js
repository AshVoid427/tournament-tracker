function addPlayer(event) {
  event.preventDefault(); // Prevent form submission
  const playerNameInput = document.getElementById("playerName");
  const playerName = playerNameInput.value.trim();

  if (playerName) {
    // Add the player to the array
    players.push(playerName);

    // Save updated players array to localStorage
    localStorage.setItem("players", JSON.stringify(players));

    // Debugging: Log the saved data
    console.log("Players saved to localStorage:", players);
    console.log("localStorage content:", localStorage.getItem("players"));

    // Update the player list display
    updatePlayerList();

    // Clear the input field
    playerNameInput.value = "";
  }
}
