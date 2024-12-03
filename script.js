function showSection(section) {
  const content = document.getElementById("content");

  if (section === "brackets") {
    content.innerHTML = `
      <h2>Tournament Brackets</h2>
      <form id="bracketForm">
        <input type="text" id="player1" placeholder="Player 1" class="form-control my-2">
        <input type="text" id="player2" placeholder="Player 2" class="form-control my-2">
        <button type="button" class="btn btn-primary" onclick="generateBracket()">Generate Bracket</button>
      </form>
      <div id="bracketOutput" class="mt-4"></div>
    `;
  } else if (section === "rankings") {
    content.innerHTML = `
      <h2>Time Trial Rankings</h2>
      <form id="rankingsForm">
        <input type="text" id="playerName" placeholder="Player Name" class="form-control my-2">
        <input type="text" id="playerTime" placeholder="Time (e.g., 1:30)" class="form-control my-2">
        <button type="button" class="btn btn-primary" onclick="addRanking()">Add Ranking</button>
      </form>
      <ul id="rankingsList" class="mt-4 list-group"></ul>
    `;
  } else if (section === "trivia") {
    content.innerHTML = `
      <h2>Trivia</h2>
      <p>More content coming soon!</p>
    `;
  }
}

function generateBracket() {
  const player1 = document.getElementById("player1").value;
  const player2 = document.getElementById("player2").value;

  const bracketOutput = document.getElementById("bracketOutput");
  bracketOutput.innerHTML = `
    <h3>Bracket</h3>
    <p>${player1} vs ${player2}</p>
  `;
}

function addRanking() {
  const playerName = document.getElementById("playerName").value;
  const playerTime = document.getElementById("playerTime").value;

  const rankingsList = document.getElementById("rankingsList");
  const newRanking = document.createElement("li");
  newRanking.className = "list-group-item";
  newRanking.textContent = `${playerName} - ${playerTime}`;
  rankingsList.appendChild(newRanking);

  // Save to localStorage
  const rankings = JSON.parse(localStorage.getItem("rankings")) || [];
  rankings.push({ name: playerName, time: playerTime });
  localStorage.setItem("rankings", JSON.stringify(rankings));
}

// Load rankings from localStorage on page load
window.onload = () => {
  const rankings = JSON.parse(localStorage.getItem("rankings")) || [];
  const rankingsList = document.getElementById("rankingsList");
  rankings.forEach((ranking) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = `${ranking.name} - ${ranking.time}`;
    rankingsList?.appendChild(listItem);
  });
};
