
// ========== GAMES ==========

// ----------- Test Maker Taker -----------

// if (!fb.db || !fb.currentUser) document.getElementById('tMTcard').style.display = "none";
// document.getElementById('tMTTM').style.display = "none";
// document.getElementById('tMTTT').style.display = "none";
// const tMT = document.getElementById('tMT');
// function tMTms() {
//   const tMTMoT = document.getElementById('tMTMoT').value;
//   if (tMTMoT === 'tMTM') {
//     tMTMoT.value = 'tMTs';
//     tMT.style.display = "none";
//     document.getElementById('tMTTM').style.display = "flex";
//   }
//   else if (tMTMoT === 'tMTT') {
//     tMTMoT.value = 'tMTs';
//     tMT.style.display = "none";
//     document.getElementById('tMTTT').style.display = "flex";
//   }
// }
// function tMTB() {
//   tMT.style.display = "block";
//   document.getElementById('tMTTM').style.display = "none";
//   document.getElementById('tMTTT').style.display = "none";
// }

// ------------- Monopoly -------------
// if (!fb.db || !fb.currentUser) def.neutropolisGame.classList.add('hidden');
[def.jngr, def.cngr, def.ngrc].forEach(el => {
  if (el) {
    el.classList.remove('visible');
    el.classList.add('hidden');
  }
});
function changengr() {
  const mngr = document.getElementById('mngr').value;
  if (mngr === 'jngr') {
    def.ngmi.classList.add('hidden');
    def.jngr.classList.remove('hidden');
    mngr.value = 'selectngr';
  }
  else if (mngr === 'cngr') {
    def.ngmi.classList.add('hidden');
    def.cngr.classList.remove('hidden');
    mngr.value = 'selectngr';
  }
}
function backngr() {
  [def.jngr, def.cngr, def.ngrc].forEach(el => {
    if (el) {
      el.classList.remove('visible');
      el.classList.add('hidden');
    }
  });
  def.ngmi.classList.remove('hidden');
}
async function crngr() {
  if (!fb.db || !fb.currentUser) return;
  const code = Math.random().toString(36).substring(2, 7).toUpperCase();
  const roomData = {
    public: document.getElementById('ngrRoomPublic').checked,
    maxPlayers: Number(document.getElementById('ngrMaxPlayers').value),
    allowMortgage: document.getElementById('ngrAllowMortgage').checked,
    allowPrisonRent: document.getElementById('ngrAllowPrisonRent').checked,
    allowAuction: document.getElementById('ngrAllowAuction').checked,
    allowVacationCash: document.getElementById('ngrAllowVacationCash').checked,
    allowDoubleRentSet: document.getElementById('ngrAllowDoubleRentSet').checked,
    allowEvenBuild: document.getElementById('ngrAllowEvenBuild').checked,
    allowRandomOrder: document.getElementById('ngrAllowRandomPlayerOrder').checked,
    createdBy: fb.currentUserName,
    players: {
      [fb.currentUserName]: {
        name: fb.currentUserName || "Player",
        money: 1500,
        position: 0, 
        turn: 0,
        color: "red",
        properties: {}
      }
    },
    gameState: {
      started: false,
      ended: false,
      turn: 0,
      log: [`Room created ${code} by ${fb.currentUserName}`],
      chat: []
    }
  };
  fb.db.ref(`rooms/${code}`).set(roomData);
  window.ngrRoomCode = code;
  def.cngr.classList.add('hidden');
  def.ngrc.classList.remove('hidden');
  def.ngrc.classList.add('visible');
  document.getElementById("ngbj").innerText = code;
  loadRoom(window.ngrRoomCode);
}
async function joinngr() {
  if (!fb.db || !fb.currentUser) return;
  const ngrJoinCode = document.getElementById('ngrJoinCode').value.trim().toUpperCase();
  const roomSnap = await fb.db.ref(`rooms/${ngrJoinCode}`).once('value');
  const room = roomSnap.val();
  const jngrOut = document.getElementById('jngrOut');
  if (!room) {
    jngrOut.textContent = "Room not found!";
    return;
  }
  if (fb.currentUserName === room.players[fb.currentUserName]) 
    jngrOut.textContent = "Rejoining room.";
  else if (Object.keys(room.players).length >= room.maxPlayers) {
    jngrOut.textContent = "Room is full!";
    return;
  }
  if(fb.currentUserName != room.players[fb.currentUserName]) {
    room.players[fb.currentUserName] = {
      name: fb.currentUserName || "Player",
      money: 1500,
      position: 0,
      turn: 2, 
      color: "blue",
      properties: {}
    };
  }
  await fb.db.ref(`rooms/${ngrJoinCode}/players`).set(room.players);
  if (fb.currentUserName != room.players[fb.currentUserName]) addGameLog(ngrJoinCode, `${fb.currentUserName} rejoined the room`);
  else addGameLog(ngrJoinCode, `${fb.currentUserName} joined the room`);
  window.ngrRoomCode = ngrJoinCode;
  def.jngr.classList.add('hidden');
  def.ngrc.classList.remove('hidden');
  def.ngrc.classList.add('visible');
  loadRoom(window.ngrRoomCode);
}
function loadRoom(code) {
  fb.db.ref(`rooms/${code}`).on('value', snap => {
    const room = snap.val();
    if (!room) return;
    ngrcplu(room.players);
    ngrcgu(room.gameState.log);
    ngrcgcu(room.gameState.chat);
    ngrcpmu(room.players);
    // ngrcppu(room.players[fb.currentUserName], room.gameState);
  });
}
function addGameLog(code, msg) {
  fb.db.ref(`rooms/${code}/gameState/log`).transaction(log => {
    if (!log) log = [];
    log.push(msg);
    return log;
  });
}
function addChatMsg(code, sender, msg) {
  const chatMsg = {sender, msg};
  fb.db.ref(`rooms/${code}/gameState/chat`).transaction(chat => {
    if (!chat) chat = [];
    chat.push(chatMsg);
    return chat;
  });
}
function ngrcplu(players) {
  const container = document.getElementById("ngrcplc");
  container.innerHTML = "";
  Object.entries(players).forEach(([id, p]) => {
    const div = document.createElement("div");
    div.className = "ngrcplp";
    div.innerHTML = `
      <span class="ngrcplpn muted">${p.name}</span>
      <span class="ngrcplpm muted">₦${p.money}</span>
    `;
    container.appendChild(div);
  });
}
function ngrcpmu(players) {
  document.querySelectorAll('.ngbcpp').forEach(el => el.remove());
  Object.values(players).forEach((player) => {
    const wrapper = document.createElement("div");
    wrapper.className = "ngbcpp-wrapper";
    const playerCharacter = document.createElement("div");
    playerCharacter.className = `ngbcpp ${player.color}`;
    wrapper.append(playerCharacter);
    const targetDiv = document.getElementById(`ngbpp${player.position}`);
    if (targetDiv) {
      targetDiv.append(wrapper);
      if (player.position < 10) wrapper.style.transform = "rotate(-90deg)";
      else if (player.position < 20) wrapper.style.transform = "rotate(0deg)";
      else if (player.position < 30) wrapper.style.transform = "rotate(90deg)";
      else if (player.position < 40) wrapper.style.transform = "rotate(180deg)";
    }
    else {
      console.warn(`Board position element #${player.position} not found.`);
    }
  });
}
function ngrcgu(gamelog) {
  const ngrcglm = document.getElementById('ngrcglm');
  ngrcglm.innerHTML = "";
  gamelog.forEach(line => {
    const div = document.createElement("div");
    div.className = "ngrcglml muted";
    div.innerText = line;
    ngrcglm.appendChild(div);
  });
}
function ngrcgcu(gameChat) {
  if (!gameChat || !Array.isArray(gameChat)) return;
  const ngrccm = document.getElementById("ngrccm");
  ngrccm.innerHTML = "";
  gameChat.forEach((chat) => {
    const div = document.createElement("div");
    div.className = "ngrccml";
    if (chat.sender === fb.currentUserName) div.className = "ngrccml player";
    else div.className = "ngrccml opponent";
      div.innerHTML = `
      <span class="ngrccml muted">${chat.sender}: ${chat.msg}</span>
    `;
    ngrccm.appendChild(div);
  });
}
const ngrccis = document.getElementById('ngrccis');
const ngrccit = document.getElementById('ngrccit');
const ngrccm = document.getElementById('ngrccm');
ngrccis.addEventListener('click', () => {
  const msg = ngrccit.value.trim();
  addChatMsg(window.ngrRoomCode, fb.currentUserName, msg);
  ngrccit.value = '';
  ngrccm.scrollTop = ngrccm.scrollHeight;
});
ngrccit.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') ngrccis.click();
});
const dices = document.querySelectorAll(".cube");
const baseRotations = {
  1: { x: 0,   y: 0 },
  2: { x: 90,  y: 0 },
  3: { x: 0,   y: -90 },
  4: { x: 0,   y: 90 },
  5: { x: -90, y: 0 },
  6: { x: 180, y: 0 }
};
const diceState = new Map();
dices.forEach(d => diceState.set(d, { x: baseRotations[1].x, y: baseRotations[1].y }));
let currentDiceValue1 = 1;
let currentDiceValue2 = 1;
function norm360(angle) {
  return ((angle % 360) + 360) % 360;
}
function shortestDelta(current, target) {
  const c = norm360(current);
  const t = norm360(target);
  let delta = t - c;
  if (delta <= -180) delta += 360;
  if (delta > 180) delta -= 360;
  return delta;
}
function rollDice(dice) {
  const state = diceState.get(dice);
  const value = Math.floor(Math.random() * 6) + 1;
  const target = baseRotations[value];
  const turnsX = (Math.floor(Math.random() * 5) + 3) * 360;
  const turnsY = (Math.floor(Math.random() * 5) + 3) * 360;
  const deltaX = shortestDelta(state.x, target.x);
  const deltaY = shortestDelta(state.y, target.y);
  const finalX = state.x + turnsX + deltaX;
  const finalY = state.y + turnsY + deltaY;
  dice.style.transition = "transform 2s cubic-bezier(0.25,1,0.5,1)";
  dice.style.transform = `
    rotateX(${finalX}deg)
    rotateY(${finalY}deg)
  `;
  diceState.set(dice, { x: finalX, y: finalY });
  return value;
}
const NGB_BOARD = [
  { type: "go", name: "WhiteHole" },
  { type: "property", name: "Vesta", price: 60, color: "brown", rent: [2,10,30,90,160,250] },
  { type: "chance", name: "Wormhole" },
  { type: "property", name: "Pallas", price: 60, color: "brown", rent: [4,20,60,180,320,450] },        // 3
  { type: "tax", amount: 0.10, name: "Cosmo Tax" },        // 4
  { type: "railroad", name: "NASA", price: 200, rent: [25,50,100,200] },                              // 5
  { type: "property", name: "Ceres", price: 100, color: "lightblue", rent: [6,30,90,270,400,550] },    // 6
  { type: "community", name: "Rift" },                     // 7
  { type: "property", name: "Haumea", price: 100, color: "lightblue", rent: [6,30,90,270,400,550] },   // 8
  { type: "property", name: "Eris", price: 120, color: "lightblue", rent: [8,40,100,300,450,600] },     // 9
  { type: "jail_visit", name: "Event Horizon" },           // 10
  { type: "property", name: "Europa", price: 140, color: "pink", rent: [10,50,150,450,625,750] },      // 11
  { type: "utility", name: "SpaceX Grid", price: 150 },    // 12
  { type: "property", name: "Enceladus", price: 140, color: "pink", rent: [10,50,150,450,625,750] },   // 13
  { type: "property", name: "Titan", price: 160, color: "pink", rent: [12,60,180,500,700,900] },       // 14
  { type: "railroad", name: "JAXA", price: 200, rent: [25,50,100,200] },                              // 15
  { type: "property", name: "Halley", price: 180, color: "orange", rent: [14,70,200,550,750,950] },    // 16
  { type: "chance", name: "Wormhole" },                    // 17
  { type: "property", name: "Swift", price: 180, color: "orange", rent: [14,70,200,550,750,950] },     // 18
  { type: "property", name: "Encke", price: 200, color: "orange", rent: [16,80,220,600,800,1000] },    // 19
  { type: "free", name: "Neutron" },                       // 20
  { type: "property", name: "Mercury", price: 220, color: "red", rent: [18,90,250,700,875,1050] },
  { type: "community", name: "Rift" },                     // 22
  { type: "property", name: "Venus", price: 220, color: "red", rent: [18,90,250,700,875,1050] },
  { type: "property", name: "Earth", price: 240, color: "red", rent: [20,100,300,750,925,1100] },
  { type: "railroad", name: "ESA", price: 200, rent: [25,50,100,200] },
  { type: "property", name: "Mars", price: 260, color: "yellow", rent: [22,110,330,800,975,1150] },
  { type: "property", name: "Jupiter", price: 260, color: "yellow", rent: [22,110,330,800,975,1150] },
  { type: "utility", name: "Hydro Core", price: 150 },     // 28
  { type: "property", name: "Saturn", price: 280, color: "yellow", rent: [24,120,360,850,1025,1200] },
  { type: "go_to_jail", name: "BlackHole" },               // 30
  { type: "property", name: "Uranus", price: 300, color: "green", rent: [26,130,390,900,1100,1275] },
  { type: "property", name: "Neptune", price: 300, color: "green", rent: [26,130,390,900,1100,1275] },
  { type: "chance", name: "Wormhole" },                    // 33
  { type: "property", name: "PlanetX", price: 320, color: "green", rent: [28,150,450,1000,1200,1400] },
  { type: "railroad", name: "ISRO", price: 200, rent: [25,50,100,200] },
  { type: "community", name: "Rift" },                     // 36
  { type: "property", name: "Sun", price: 350, color: "darkblue", rent: [35,175,500,1100,1300,1500] },
  { type: "tax", amount: 75, name: "Prisma Tax" },
  { type: "property", name: "Neutrox", price: 400, color: "darkblue", rent: [50,200,600,1400,1700,2000] }
];

// function ngrcppu(player, gameState) {
//   while(gameState.turn === player.turn) {
//     if(gameState.turn === player.turn) {
//       dices.forEach((dice, i) => {
//         dice.addEventListener("click", () => {
//           dices.forEach((d, idx) => {
//             const result = rollDice(d);
//             if (idx === 0) currentDiceValue1 = result;
//             if (idx === 1) currentDiceValue2 = result;
//           });
//           const lastDice = dices[dices.length - 1];
//           const onEnd = (ev) => {
//             if (ev.propertyName && ev.propertyName.includes("transform")) {
//               console.log(`Dice 1 value: ${currentDiceValue1}\nDice 2 value: ${currentDiceValue2}`);
//               lastDice.removeEventListener("transitionend", onEnd);
//             }
//           };
//           lastDice.addEventListener("transitionend", onEnd);
//           // handleDiceResult(window.ngrRoomCode, fb.currentUserName, currentDiceValue1, currentDiceValue2);
//         });
//       });
//       player.position+= (currentDiceValue1 + currentDiceValue2);
//       if (currentDiceValue1 != currentDiceValue2) gameState.turn+=1;
//     }
//   }
// }
// async function handleDiceResult(roomCode, playerName, d1, d2) {
//   const snap = await fb.db.ref(`rooms/${roomCode}`).once("value");
//   const room = snap.val();
//   if (!room) return;
//   const player = room.players[playerName];
//   const doubles = d1 === d2;
//   player.doubles = (player.doubles || 0);
//   if (doubles) {
//     player.doubles++;
//     if (player.doubles >= 3) {
//       player.position = 11;
//       player.inJail = true;
//       player.doubles = 0;
//       room.gameState.turn++;
//       await savePlayer(roomCode, playerName, player);
//       addGameLog(roomCode, `${playerName} rolled 3 doubles and went to Jail`);
//       return;
//     }
//   } else {
//     player.doubles = 0;
//   }
//   let newPos = player.position + d1 + d2;
//   if (newPos >= 40) {
//     newPos -= 40;
//     player.money += 200;
//     addGameLog(roomCode, `${playerName} passed GO and collected $200`);
//   }
//   player.position = newPos;
//   await savePlayer(roomCode, playerName, player);
//   await handleTileEffect(roomCode, playerName, newPos);
//   if (!doubles) {
//     room.gameState.turn++;
//     await fb.db.ref(`rooms/${roomCode}/gameState/turn`).set(room.gameState.turn);
//   }
// }
// async function savePlayer(roomCode, playerName, player) {
//   await fb.db.ref(`rooms/${roomCode}/players/${playerName}`).set(player);
// }
// function handleTileEffect(roomCode, player, tileIndex) {
//   const tile = NGB_BOARD[tileIndex];
//   if (tile.type === "go") {
//     addGameLog(roomCode, `${player.name} landed on GO`);
//     return;
//   }
//   if (tile.type === "jail_visit") {
//     addGameLog(roomCode, `${player.name} is just visiting Event Horizon`);
//     return;
//   }
//   if (tile.type === "go_to_jail") {
//     player.position = 11;
//     player.inJail = true;
//     addGameLog(roomCode, `${player.name} was sucked into the BlackHole and sent to Jail`);
//     return savePlayer(roomCode, player.name, player);
//   }
//   if (tile.type === "chance") {
//     drawChanceCard(roomCode, player);
//     return;
//   }
//   if (tile.type === "community") {
//     drawCommunityCard(roomCode, player);
//     return;
//   }
//   if (tile.type === "tax") {
//     const amount = tile.amount < 1 ? Math.floor(player.money * tile.amount) : tile.amount;
//     player.money -= amount;
//     addGameLog(roomCode, `${player.name} paid ₦${amount} in taxes`);
//     return savePlayer(roomCode, player.name, player);
//   }
//   if (tile.type === "railroad" || tile.type === "property" || tile.type === "utility") {
//     return checkProperty(roomCode, player, tileIndex);
//   }
// }
// async function applyCard(roomCode, playerName, card) {
//   addGameLog(roomCode, `${playerName} drew: ${card.message}`);
//   const snap = await fb.db.ref(`rooms/${roomCode}`).once("value");
//   const room = snap.val();
//   const player = room.players[playerName];
//   if (card.type === "money") {
//     player.money += card.amount;
//     return savePlayer(roomCode, playerName, player);
//   }
//   if (card.type === "move") {
//     player.position = card.to;
//     await savePlayer(roomCode, playerName, player);
//     return handleTileEffect(roomCode, playerName, card.to);
//   }
//   if (card.type === "jail") {
//     player.position = 11;
//     player.inJail = true;
//     return savePlayer(roomCode, playerName, player);
//   }
//   if (card.type === "jailfree") {
//     player.jailFree = true;
//     return savePlayer(roomCode, playerName, player);
//   }
// }
// async function startPurchaseFlow(roomCode, playerName, pos, tile) {
//   // Here you show your UI buttons
//   // "Buy" → buyProperty(...)
//   // "Auction" → startAuction(...)
// }
// async function buyProperty(roomCode, playerName, pos, tile) {
//   const snap = await fb.db.ref(`rooms/${roomCode}`).once("value");
//   const room = snap.val();
//   const player = room.players[playerName];
//   if (player.money < tile.price) {
//     addGameLog(roomCode, `${playerName} cannot afford ${tile.name}`);
//     return;
//   }
//   player.money -= tile.price;
//   tile.owner = playerName;
//   await fb.db.ref(`rooms/${roomCode}/players/${playerName}`).set(player);
//   await fb.db.ref(`rooms/${roomCode}/board/${pos}`).set(tile);
//   addGameLog(roomCode, `${playerName} bought ${tile.name}`);
// }


// -------------- Snake Game -------------
def.snakeCanvas.width = 25 * Math.floor(def.snakeSize / 25);
def.snakeCanvas.height = 25 * Math.floor(def.snakeSize / 25);
def.snakeCanvas.width = 25 * def.snakeBox;
def.snakeCanvas.height = 25 * def.snakeBox;
if (fb.db && fb.currentUser) {
  fb.db.ref(`users/${fb.currentUser.uid}/highscores/snakeHighScore`).once('value')
    .then(snapshot => {
      def.snakeHighScore = snapshot.val();
    });
}
else def.snakeHighScore = parseInt(localStorage.getItem("snakeHighScore")) || 0;
document.getElementById("snakeHighScore").textContent = "High score = " + def.snakeHighScore;
function startSnakeGame() {
  def.snakeMoveDelay = 200;
  def.snake = [{ x: 3 * def.snakeBox, y: 3 * def.snakeBox }];
  def.snakeDirection = "RIGHT";
  def.snakeFood = randomFood();
  def.snakeScore = 0;
  def.snakeFoodsEaten = 0;
  def.snakeSpecialFood = null;
  def.snakePaused = false;
  def.snakeRunning = true;
  def.snakeLastFrameTime = 0;
  def.snakeAccumulatedTime = 0;
  def.snakePauseBtn.textContent = "Pause";
  def.snakeCanvas.focus();
  requestAnimationFrame(snakeGameLoop);
}
function randomFood() {
  return {
    x: Math.floor(Math.random() * 25) * def.snakeBox,
    y: Math.floor(Math.random() * 25) * def.snakeBox
  };
}
function spawnSpecialFood() {
  def.snakeSpecialFood = {
    x: Math.floor(Math.random() * 25) * def.snakeBox,
    y: Math.floor(Math.random() * 25) * def.snakeBox
  };
  clearTimeout(def.snakeSpecialFoodTimer);
  def.snakeSpecialFoodTimer = setTimeout(() => (def.snakeSpecialFood = null), def.snakeSpecialFoodTime);
}
function hitSpecialFood(snakeX, snakeY) {
  if (!def.snakeSpecialFood) return false;
  return (
    snakeX < def.snakeSpecialFood.x + def.snakeBox * 2 &&
    snakeX + def.snakeBox > def.snakeSpecialFood.x &&
    snakeY < def.snakeSpecialFood.y + def.snakeBox * 2 &&
    snakeY + def.snakeBox > def.snakeSpecialFood.y
  );
}
function snakeGameCheckCollision(head, array) {
  return array.some(segment => head.x === segment.x && head.y === segment.y);
}
def.snakeStartBtn.onclick = () => {
  if (def.snakeRunning) startSnakeGame();
  else {
    startSnakeGame();
    def.snakeStartBtn.textContent = "Restart"
  }
}
def.snakePauseBtn.addEventListener("click", () => {
  if (!def.snakeRunning) return;
  def.snakePaused = !def.snakePaused;
  def.snakePauseBtn.textContent = def.snakePaused ? "Resume" : "Pause";
  if (!def.snakePaused) requestAnimationFrame(snakeGameLoop);
});
function drawGame() {
  def.snakeCtx.fillStyle = "#000";
  def.snakeCtx.fillRect(0, 0, 25 * def.snakeBox, 25 * def.snakeBox);
  def.snakeCtx.beginPath();
  def.snakeCtx.arc(def.snakeFood.x + def.snakeBox / 2, def.snakeFood.y + def.snakeBox / 2, def.snakeBox / 2, 0, Math.PI * 2);
  def.snakeCtx.fillStyle = "#ac2727ff";
  def.snakeCtx.fill();
  if (def.snakeSpecialFood) {
    def.snakeCtx.beginPath();
    def.snakeCtx.arc(def.snakeSpecialFood.x + def.snakeBox, def.snakeSpecialFood.y + def.snakeBox, def.snakeBox, 0, Math.PI * 2);
    def.snakeCtx.fillStyle = "gold";
    def.snakeCtx.fill();
  }
  def.snake.forEach((segment, index) => {
    def.snakeCtx.fillStyle = index === 0 ? "rgba(13, 55, 128, 1)" : "rgba(53, 127, 208, 1)";
    def.snakeCtx.fillRect(segment.x, segment.y, def.snakeBox, def.snakeBox);
  });
}
function updateGame() {
  def.snakeLeftBtn.addEventListener("click", () => { if (def.snakeDirection !== "RIGHT") def.snakeDirection = "LEFT"; });
  def.snakeUpBtn.addEventListener("click", () => { if (def.snakeDirection !== "DOWN") def.snakeDirection = "UP"; });
  def.snakeRightBtn.addEventListener("click", () => { if (def.snakeDirection !== "LEFT") def.snakeDirection = "RIGHT"; });
  def.snakeDownBtn.addEventListener("click", () => { if (def.snakeDirection !== "UP") def.snakeDirection = "DOWN"; });
  document.addEventListener("keydown",
    event => {
      if (!def.snakeRunning) return;
      const key = event.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
        event.preventDefault();
      }
      if ((key === "a" || key === "arrowleft") && def.snakeDirection !== "RIGHT") def.snakeDirection = "LEFT";
      else if ((key === "w" || key === "arrowup") && def.snakeDirection !== "DOWN") def.snakeDirection = "UP";
      else if ((key === "d" || key === "arrowright") && def.snakeDirection !== "LEFT") def.snakeDirection = "RIGHT";
      else if ((key === "s" || key === "arrowdown") && def.snakeDirection !== "UP") def.snakeDirection = "DOWN";
    },
    { passive: false }
  );
  let snakeX = def.snake[0].x;
  let snakeY = def.snake[0].y;
  if (def.snakeDirection === "LEFT") snakeX -= def.snakeBox;
  if (def.snakeDirection === "UP") snakeY -= def.snakeBox;
  if (def.snakeDirection === "RIGHT") snakeX += def.snakeBox;
  if (def.snakeDirection === "DOWN") snakeY += def.snakeBox;
  if (snakeX === def.snakeFood.x && snakeY === def.snakeFood.y) {
    def.snakeScore += 5;
    def.snakeFoodsEaten++;
    def.snakeMoveDelay -= 2.5;
    def.snakeFood = randomFood();
    if (def.snakeFoodsEaten % 10 === 0) spawnSpecialFood();
  } else {
    def.snake.pop();
  }
  if (def.snakeSpecialFood && hitSpecialFood(snakeX, snakeY)) {
    def.snakeScore += 50;
    def.snakeSpecialFood = null;
    clearTimeout(def.snakeSpecialFoodTimer);
  }
  const newHead = { x: snakeX, y: snakeY };
  if (
    snakeX < 0 || snakeY < 0 ||
    snakeX >= def.snakeCanvas.width || snakeY >= def.snakeCanvas.height ||
    snakeGameCheckCollision(newHead, def.snake)
  ) {
    gameOver();
    return;
  }
  def.snake.unshift(newHead);
  def.snakeScoreHolder.textContent = "Score: " + def.snakeScore;
}
function gameOver() {
  def.snakeRunning = false;
  clearTimeout(def.snakeSpecialFoodTimer);
  def.snake = [];
  def.snakeFood = null;
  def.snakeCtx.clearRect(0, 0, def.snakeCanvas.width, def.snakeCanvas.height);
  def.snakeCtx.fillStyle = "#000";
  def.snakeCtx.fillRect(0, 0, def.snakeCanvas.width, def.snakeCanvas.height);
  def.snakeCtx.font = "32px Arial";
  def.snakeCtx.fillStyle = "white";
  def.snakeCtx.textAlign = "center";
  const cx = def.snakeCanvas.width / 2;
  const cy = def.snakeCanvas.height / 2;
  if (fb.db && fb.currentUser) {
    fb.db.ref(`highScores/snakeGame/${fb.currentUserName}`).set({
      name: fb.currentUserName,
      score: def.snakeScore
    });
    fb.db.ref(`highScores/snakeGame`).once('value').then(snapshot => {
      const scores = snapshot.val() || {};
      const sorted = Object.values(scores)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      const position = sorted.findIndex(entry => entry.name === fb.currentUserName && entry.score === def.snakeScore) + 1;
      if (position > 0 && position <= 10) {
        if (def.snakeScore > def.snakeHighScore) {
          def.snakeHighScore = def.snakeScore;
          localStorage.setItem("snakeHighScore", def.snakeHighScore);
          fb.db.ref(`users/${fb.currentUser.uid}/highscores`).set({
            snakeHighscore: def.snakeHighScore
          });
          document.getElementById("snakeHighScore").textContent = "High score = " + def.snakeHighScore;
          def.snakeCtx.fillStyle = "white";
          def.snakeCtx.fillText("New High Score: " + def.snakeHighScore + "!", cx, cy - 40);
        }
        else {
          def.snakeCtx.fillStyle = "white";
          def.snakeCtx.fillText(`Game Over! Score: ${def.snakeScore}`, cx, cy - 40);
        }
        def.snakeCtx.fillText(`Congrats! You're #${position} on the leaderboard!`, cx, cy + 10);
      } 
      else {
        if (def.snakeScore > def.snakeHighScore) {
          def.snakeHighScore = def.snakeScore;
          localStorage.setItem("snakeHighScore", def.snakeHighScore);
          fb.db.ref(`users/${fb.currentUser.uid}/highscores`).set({
            snakeHighscore: def.snakeHighScore
          });
          document.getElementById("snakeHighScore").textContent = "High score = " + def.snakeHighScore;
          def.snakeCtx.fillStyle = "white";
          def.snakeCtx.fillText("New High Score: " + def.snakeHighScore + "!", cx, cy - 20);
        }
        else {
          def.snakeCtx.fillStyle = "white";
          def.snakeCtx.fillText("Game Over!", cx, cy - 20);
        }
        def.snakeCtx.fillStyle = "white";
        def.snakeCtx.fillText(`Score: ${def.snakeScore}`, cx, cy + 20);
      }
    });
  }
  else {
    if (def.snakeScore > def.snakeHighScore) {
      def.snakeHighScore = def.snakeScore;
      localStorage.setItem("snakeHighScore", def.snakeHighScore);
      document.getElementById("snakeHighScore").textContent = "High score = " + def.snakeHighScore;
      def.snakeCtx.fillStyle = "white";
      def.snakeCtx.fillText("New High Score: " + def.snakeHighScore + "!", cx, cy - 20);
    }
    else {
      def.snakeCtx.fillStyle = "white";
      def.snakeCtx.fillText("Game Over!", cx, cy - 20);
    }
    def.snakeCtx.fillStyle = "white";
    def.snakeCtx.fillText(`Score: ${def.snakeScore}`, cx, cy + 20);
  }
  def.snakeCtx.font = "20px Arial";
  def.snakeCtx.fillStyle = "white";
  def.snakeCtx.fillText("Press Restart to Play Again", cx, cy + 90);
}
function showSnakeLeaderScores() {
  const leaderboard = document.getElementById('snakeGameLeaderboard');
  const scoresRef = fb.db.ref(`highScores/snakeGame`);
  scoresRef.off('value');
  scoresRef.on('value', snapshot => {
    const scores = snapshot.val() || {};
    const sorted = Object.values(scores)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    leaderboard.innerHTML = '';
    sorted.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.name}: ${entry.score}`;
      leaderboard.appendChild(li);
    });
  });
}
function snakeGameLoop(timestamp) {
  if (!def.snakeRunning) return;
  if (def.snakePaused) {
    def.snakeLastFrameTime = timestamp;
    requestAnimationFrame(snakeGameLoop);
    return;
  }
  if (!def.snakeLastFrameTime) def.snakeLastFrameTime = timestamp;
  const snakeDeltaTime = timestamp - def.snakeLastFrameTime;
  def.snakeLastFrameTime = timestamp;
  def.snakeAccumulatedTime += snakeDeltaTime;
  if (def.snakeAccumulatedTime >= def.snakeMoveDelay) {
    updateGame();
    def.snakeAccumulatedTime = 0;
  }
  if (!def.snakeRunning) return;
  drawGame();
  requestAnimationFrame(snakeGameLoop);
}
def.snakeStartBtn.addEventListener("click", startSnakeGame);

// --------- Jet Shooter Game ----------
if (fb.db && fb.currentUser) {
  fb.db.ref(`users/${fb.currentUser.uid}/highscores/jetShooterHighScore`).once('value')
    .then(snapshot => {
      def.jetShooterHighScore = snapshot.val();
    });
}
else def.jetShooterHighScore = parseInt(localStorage.getItem("jetShooterHighScore")) || 0;
document.getElementById("jetShooterHighScore").textContent = "High score = " + def.jetShooterHighScore;
function jetShooterGameStart() {
  if (def.jetShooterFrameId) cancelAnimationFrame(def.jetShooterFrameId);
  if (def.gameFrameId) cancelAnimationFrame(def.gameFrameId);
  def.jetShooterLastFrameTime = 0;
  def.jetShooterPaused = false;
  def.jetShooterRunning = true;
  def.jetShooter = { x: 50 * def.jetShooterBox, y: 95 * def.jetShooterBox, size: def.jetShooterBox * 4 };
  def.jetShooterBullets = [];
  def.jetShooterEnemies = [];
  def.jetShooterShields = [];
  def.jetShooterBulletBarrel = [];
  def.jetShooterScore = 0;
  def.jetShooterEnemyTimer = 0;
  def.jetShooterShieldTimer = 0;
  def.jetShooterBulletTimer = 0;
  def.jetShooterHasShield = 0;
  def.jetShooterBulletRemaining = 100;
  def.jetShooterPauseBtn.textContent = "Pause";
  def.jetShooterCanvas.focus();
  def.jetShooterLastFrameTime = performance.now();
  def.jetShooterFrameId = requestAnimationFrame(jetShooterGameLoop);
  def.gameFrameId = requestAnimationFrame(gameLoop);
}
function jetShooterGameLoop(timestamp) {
  if (!def.jetShooterRunning) return;
  if (def.jetShooterPaused) {
    def.jetShooterFrameId = requestAnimationFrame(jetShooterGameLoop);
    return;
  }
  const delta = timestamp - def.jetShooterLastFrameTime;
  def.jetShooterLastFrameTime = timestamp;
  updateJetShooter(delta);
  drawJetShooter();
  def.jetShooterFrameId = requestAnimationFrame(jetShooterGameLoop);
}
function updateJetShooter(delta) {
  def.jetShooterBullets.forEach(b => (b.y -= b.speed));
  def.jetShooterBullets = def.jetShooterBullets.filter(b => b.y + b.size > 0);
  def.jetShooterEnemyTimer += delta;
  if (def.jetShooterEnemyTimer > def.jetShooterEnemySpawnRate) {
    spawnEnemy();
    def.jetShooterEnemyTimer = 0;
  }
  def.jetShooterShieldTimer += delta;
  if (def.jetShooterShieldTimer > def.jetShooterShieldSpawnRate) {
    spawnShield();
    def.jetShooterShieldTimer = 0;
  }
  def.jetShooterBulletTimer += delta;
  if (def.jetShooterBulletTimer > def.jetShooterBulletBarrelRate) {
    spawnBulletBarrel();
    def.jetShooterBulletTimer = 0;
  }
  def.jetShooterEnemies.forEach(e => (e.y += e.speed));
  def.jetShooterEnemies = def.jetShooterEnemies.filter(e => e.y < def.jetShooterCanvas.height);
  def.jetShooterShields.forEach(s => {
    s.y += s.speedY;
    s.angle += s.oscillationSpeed;
    s.x = s.baseX + Math.sin(s.angle) * s.amplitude;
  });
  def.jetShooterBulletBarrel.forEach(b => {
    b.y += b.speedY;
    b.angle += b.oscillationSpeed;
    b.x = b.baseX + Math.sin(b.angle) * b.amplitude;
  });
  def.jetShooterShields = def.jetShooterShields.filter(s => s.y < def.jetShooterCanvas.height);
  for (let i = def.jetShooterEnemies.length - 1; i >= 0; i--) {
    for (let j = def.jetShooterBullets.length - 1; j >= 0; j--) {
      if (jetShooterCheckCollision(def.jetShooterEnemies[i], def.jetShooterBullets[j])) {
        def.jetShooterEnemies.splice(i, 1);
        def.jetShooterBullets.splice(j, 1);
        def.jetShooterScore += 10;
        break;
      }
    }
  }
  for (let i = 0; i < def.jetShooterEnemies.length; i++) {
    if (jetShooterCheckCollision(def.jetShooterEnemies[i], def.jetShooter)) {
      if (def.jetShooterHasShield >= 1) {
        def.jetShooterHasShield--;
        def.jetShooterShieldHolder.textContent = "Shields: " + def.jetShooterHasShield;
        def.jetShooterEnemies.splice(i, 1);
        break;
      } else {
        jetShooterGameOver();
        return;
      }
    }
    if (def.jetShooterEnemies[i].y + def.jetShooterEnemies[i].size >= def.jetShooterCanvas.height) {
      def.jetShooterScoreHolder.textContent = "Score: " + def.jetShooterScore;
      def.jetShooterEnemies.splice(i, 1);
    }
  }
  for (let i = 0; i < def.jetShooterShields.length; i++) {
    if (jetShooterCheckCollision(def.jetShooterShields[i], def.jetShooter)) {
      jetShooterExtraLife();
      def.jetShooterShields.splice(i, 1);
      break;
    }
  }
  for (let i = 0; i < def.jetShooterBulletBarrel.length; i++) {
    if (jetShooterCheckCollision(def.jetShooterBulletBarrel[i], def.jetShooter)) {
      jetShooterAddBullets();
      def.jetShooterBulletBarrel.splice(i, 1);
      break;
    }
  }
}
function drawJetShooter() {
  def.jetShooterCtx.clearRect(0, 0, def.jetShooterCanvas.width, def.jetShooterCanvas.height);
  const jx = def.jetShooter.x + def.jetShooter.size / 2;
  const jy = def.jetShooter.y + def.jetShooter.size / 2;
  def.jetShooterCtx.beginPath();
  def.jetShooterCtx.moveTo(jx, def.jetShooter.y - def.jetShooter.size * 0.3);
  def.jetShooterCtx.lineTo(jx - def.jetShooter.size * 0.35, def.jetShooter.y + def.jetShooter.size * 0.9);
  def.jetShooterCtx.lineTo(jx + def.jetShooter.size * 0.35, def.jetShooter.y + def.jetShooter.size * 0.9);
  def.jetShooterCtx.closePath();
  def.jetShooterCtx.fillStyle = def.jetShooterHasShield >= 1 ? "#6aff91" : "cyan";
  def.jetShooterCtx.fill();
  def.jetShooterCtx.strokeStyle = "#00bcd4";
  def.jetShooterCtx.lineWidth = 2;
  def.jetShooterCtx.stroke();
  def.jetShooterCtx.beginPath();
  def.jetShooterCtx.ellipse(
    jx,
    def.jetShooter.y + def.jetShooter.size * 0.25,
    def.jetShooter.size * 0.15,
    def.jetShooter.size * 0.25,
    0,
    0,
    Math.PI * 2
  );
  def.jetShooterCtx.fillStyle = "rgba(0, 150, 255, 0.6)";
  def.jetShooterCtx.fill();
  def.jetShooterCtx.strokeStyle = "white";
  def.jetShooterCtx.lineWidth = 1.5;
  def.jetShooterCtx.stroke();
  def.jetShooterCtx.beginPath();
  def.jetShooterCtx.moveTo(jx - def.jetShooter.size * 0.6, def.jetShooter.y + def.jetShooter.size * 0.4);
  def.jetShooterCtx.lineTo(jx + def.jetShooter.size * 0.6, def.jetShooter.y + def.jetShooter.size * 0.4);
  def.jetShooterCtx.lineTo(jx + def.jetShooter.size * 0.3, def.jetShooter.y + def.jetShooter.size * 0.7);
  def.jetShooterCtx.lineTo(jx - def.jetShooter.size * 0.3, def.jetShooter.y + def.jetShooter.size * 0.7);
  def.jetShooterCtx.closePath();
  def.jetShooterCtx.fillStyle = def.jetShooterHasShield >= 1 ? "#7affb2" : "#00bcd4";
  def.jetShooterCtx.fill();
  def.jetShooterCtx.strokeStyle = "#007bff";
  def.jetShooterCtx.stroke();
  const gradient = def.jetShooterCtx.createRadialGradient(jx, def.jetShooter.y + def.jetShooter.size * 0.95, 2, jx, def.jetShooter.y + def.jetShooter.size * 0.95, 20);
  gradient.addColorStop(0, "rgba(255, 150, 0, 0.9)");
  gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
  def.jetShooterCtx.beginPath();
  def.jetShooterCtx.fillStyle = gradient;
  def.jetShooterCtx.arc(jx, def.jetShooter.y + def.jetShooter.size * 0.95, def.jetShooter.size * 0.25, 0, Math.PI * 2);
  def.jetShooterCtx.fill();

  def.jetShooterCtx.fillStyle = "yellow";
  def.jetShooterBullets.forEach(b => {
    def.jetShooterCtx.fillRect(b.x, b.y, b.size, b.size * 2);
  });
  def.jetShooterEnemies.forEach(e => {
    const cx = e.x + e.size / 2;
    const cy = e.y + e.size / 2;
    def.jetShooterCtx.fillStyle = "silver";
    def.jetShooterCtx.beginPath();
    def.jetShooterCtx.moveTo(cx, e.y + e.size);
    def.jetShooterCtx.lineTo(e.x, e.y);
    def.jetShooterCtx.lineTo(e.x + e.size, e.y);
    def.jetShooterCtx.closePath();
    def.jetShooterCtx.fill();
    def.jetShooterCtx.fillStyle = "cyan";
    def.jetShooterCtx.beginPath();
    def.jetShooterCtx.arc(cx, e.y + e.size * 0.55, e.size * 0.15, 0, Math.PI * 2);
    def.jetShooterCtx.fill();
    def.jetShooterCtx.fillStyle = "orange";
    def.jetShooterCtx.beginPath();
    def.jetShooterCtx.moveTo(cx - e.size * 0.15, e.y);
    def.jetShooterCtx.lineTo(cx + e.size * 0.15, e.y);
    def.jetShooterCtx.lineTo(cx, e.y - e.size * 0.3);
    def.jetShooterCtx.closePath();
    def.jetShooterCtx.fill();
  });
  def.jetShooterShields.forEach(s => {
    def.jetShooterCtx.beginPath();
    def.jetShooterCtx.moveTo(s.x + s.size / 2, s.y);
    def.jetShooterCtx.lineTo(s.x, s.y + s.size * 0.4);
    def.jetShooterCtx.quadraticCurveTo(
      s.x + s.size * 0.1,
      s.y + s.size * 0.9,
      s.x + s.size / 2,
      s.y + s.size
    );
    def.jetShooterCtx.quadraticCurveTo(
      s.x + s.size * 0.9,
      s.y + s.size * 0.9,
      s.x + s.size,
      s.y + s.size * 0.4
    );
    def.jetShooterCtx.closePath();
    def.jetShooterCtx.fillStyle = "lightgreen";
    def.jetShooterCtx.fill();
    def.jetShooterCtx.strokeStyle = "white";
    def.jetShooterCtx.lineWidth = 2;
    def.jetShooterCtx.stroke();
  });
  def.jetShooterBulletBarrel.forEach(b => {
    const cx = b.x + b.size / 2;
    const cy = b.y + b.size / 2;
    const w = b.size * 0.6;
    const h = b.size * 1.4;
    def.jetShooterCtx.beginPath();
    def.jetShooterCtx.moveTo(cx - w / 2, cy - h / 4);
    def.jetShooterCtx.lineTo(cx - w / 2, cy + h / 2);
    def.jetShooterCtx.lineTo(cx + w / 2, cy + h / 2);
    def.jetShooterCtx.lineTo(cx + w / 2, cy - h / 4);
    def.jetShooterCtx.closePath();
    def.jetShooterCtx.fillStyle = "gold";
    def.jetShooterCtx.fill();
    def.jetShooterCtx.strokeStyle = "#b8860b";
    def.jetShooterCtx.lineWidth = 2;
    def.jetShooterCtx.stroke();
    def.jetShooterCtx.beginPath();
    def.jetShooterCtx.moveTo(cx - w / 2, cy - h / 4);
    def.jetShooterCtx.lineTo(cx + w / 2, cy - h / 4);
    def.jetShooterCtx.lineTo(cx, cy - h / 2);
    def.jetShooterCtx.closePath();
    def.jetShooterCtx.fillStyle = "silver";
    def.jetShooterCtx.fill();
    def.jetShooterCtx.strokeStyle = "#999";
    def.jetShooterCtx.stroke();
  });
  def.jetShooterScoreHolder.textContent = "Score: " + def.jetShooterScore;
  def.jetShooterBulletHolder.textContent = "Bullets remaining: " + def.jetShooterBulletRemaining;
  def.jetShooterShieldHolder.textContent = "Shields: " + def.jetShooterHasShield;
  if (def.jetShooterMessage) {
    def.jetShooterCtx.save();
    def.jetShooterCtx.font = "28px Arial";
    def.jetShooterCtx.fillStyle = "white";
    def.jetShooterCtx.textAlign = "center";
    const cx = def.jetShooterCanvas.width / 2;
    const cy = def.jetShooterCanvas.height / 3;
    def.jetShooterCtx.fillText(def.jetShooterMessage, cx, cy);
    def.jetShooterCtx.restore();
  }
}
function jetShooterCheckCollision(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  );
}
function spawnShield() {
  const size = def.jetShooterBox * 3;
  const y = -size;
  const speedY = 3 + Math.random() * 4;
  const baseX = Math.random() * (def.jetShooterCanvas.width - size);
  const amplitude = 100 + (Math.random() * 100);
  const oscillationSpeed = 0.02 + (Math.random() * 0.03);
  const angle = Math.random() * Math.PI / 180;
  const x = baseX + Math.sin(angle) * amplitude;
  def.jetShooterShields.push({
    x,
    y,
    size,
    speedY,
    baseX,
    angle,
    amplitude,
    oscillationSpeed
  });
}
function spawnBulletBarrel() {
  const size = def.jetShooterBox * 3;
  const y = -size;
  const speedY = 3 + Math.random() * 4;
  const baseX = Math.random() * (def.jetShooterCanvas.width - size);
  const amplitude = 30 + (Math.random() * 30);
  const oscillationSpeed = 0.02 + (Math.random() * 0.03);
  const angle = Math.random() * Math.PI / 180;
  const x = baseX + Math.sin(angle) * amplitude;
  def.jetShooterBulletBarrel.push({
    x,
    y,
    size,
    speedY,
    baseX,
    angle,
    amplitude,
    oscillationSpeed
  });
}
function spawnEnemy() {
  const size = def.jetShooterBox * 4;
  const x = Math.random() * (def.jetShooterCanvas.width - size);
  const y = -size;
  const speed = Math.random() * 16 + 4;
  def.jetShooterEnemies.push({ x, y, size, speed });
}
def.jetShooterStartBtn.onclick = () => {
  if (def.jetShooterRunning) jetShooterGameStart();
  else {
    jetShooterGameStart();
    def.jetShooterStartBtn.textContent = "Restart"
  }
}
def.jetShooterPauseBtn.onclick = () => {
  if (!def.jetShooterRunning) return;
  def.jetShooterPaused = !def.jetShooterPaused;
  def.jetShooterPauseBtn.textContent = def.jetShooterPaused ? "Resume" : "Pause";
};
document.addEventListener("keydown", (e) => {
  if (!def.jetShooterRunning) return;
  const key = e.key.toLowerCase();
  def.keys[key] = true;
  if (["arrowleft", "arrowright", "a", "d", " "].includes(key)) e.preventDefault();
  if (!def.jetShooterPaused) {
    if (key === "arrowleft" || key === "a" || key === "arrowright" || key === "d") def.lastKeyPressed = key;
    if (def.lastKeyPressed === "arrowleft" || def.lastKeyPressed === "a") def.movement = -1;
    else if (def.lastKeyPressed === "arrowright" || def.lastKeyPressed === "d") def.movement = 1;
    else def.movement = 0;
  } 
  else def.movement = 0;
  if (key === " " && !def.jetShooterPaused) {
    if (def.jetShooterBulletRemaining === 0) { def.isShooting = false; noBulletJetShooter(); } 
    else def.isShooting = true;
  }
});
document.addEventListener("keyup", (e) => {
  if (!def.jetShooterRunning) return;
  const key = e.key.toLowerCase();
  def.keys[key] = false;
  if (key === def.lastKeyPressed) {
    if (def.keys["arrowright"] || def.keys["d"]) def.lastKeyPressed = def.keys["arrowright"] ? "arrowright" : "d";
    else if (def.keys["arrowleft"] || def.keys["a"]) def.lastKeyPressed = def.keys["arrowleft"] ? "arrowleft" : "a";
    else def.lastKeyPressed = null;
  }
  if (!def.jetShooterPaused) {
    if (def.lastKeyPressed === "arrowleft" || def.lastKeyPressed === "a") def.movement = -1;
    else if (def.lastKeyPressed === "arrowright" || def.lastKeyPressed === "d") def.movement = 1;
    else def.movement = 0;
  } 
  else def.movement = 0;
  if (key === " " && def.isShooting) def.isShooting = false;
});
def.jetShooterLeftBtn.addEventListener('mousedown', () => { if (!def.jetShooterRunning) { return; } def.jetShooterPaused === true ? def.movement = 0 : def.movement = -1; });
def.jetShooterLeftBtn.addEventListener('mouseup', () => { if (def.movement === -1) def.movement = 0; });
def.jetShooterLeftBtn.addEventListener('mouseleave', () => { if (def.movement === -1) def.movement = 0; });
def.jetShooterRightBtn.addEventListener('mousedown', () => { if (!def.jetShooterRunning) { return; } def.jetShooterPaused === true ? def.movement = 0 : def.movement = 1; });
def.jetShooterRightBtn.addEventListener('mouseup', () => { if (def.movement === 1) def.movement = 0; });
def.jetShooterRightBtn.addEventListener('mouseleave', () => { if (def.movement === 1) def.movement = 0; });
def.jetShooterShootBtn.addEventListener('mousedown', () => { if (!def.jetShooterRunning) { return; } if (def.jetShooterPaused) def.isShooting = false; else def.jetShooterBulletRemaining === 0 ? noBulletJetShooter() : def.isShooting = true; });
def.jetShooterShootBtn.addEventListener('mouseup', () => { def.isShooting = false; });
def.jetShooterShootBtn.addEventListener('mouseleave', () => { def.isShooting = false; });
def.jetShooterLeftBtn.addEventListener('touchstart', (e) => { if (!def.jetShooterRunning) { return; } e.preventDefault(); def.jetShooterPaused === true ? def.movement = 0 : def.movement = -1; }, { passive: false });
def.jetShooterLeftBtn.addEventListener('touchend', () => { if (def.movement === -1) def.movement = 0; });
def.jetShooterLeftBtn.addEventListener('touchcancel', () => { if (def.movement === -1) def.movement = 0; });
def.jetShooterRightBtn.addEventListener('touchstart', (e) => { if (!def.jetShooterRunning) { return; } e.preventDefault(); def.jetShooterPaused === true ? def.movement = 0 : def.movement = 1; }, { passive: false });
def.jetShooterRightBtn.addEventListener('touchend', () => { if (def.movement === 1) def.movement = 0; });
def.jetShooterRightBtn.addEventListener('touchcancel', () => { if (def.movement === 1) def.movement = 0; });
def.jetShooterShootBtn.addEventListener('touchstart', (e) => { if (!def.jetShooterRunning) { return; } e.preventDefault(); if (def.jetShooterPaused) def.isShooting = false; else def.jetShooterBulletRemaining === 0 ? noBulletJetShooter() : def.isShooting = true; }, { passive: false });
def.jetShooterShootBtn.addEventListener('touchend', () => { def.isShooting = false; });
def.jetShooterShootBtn.addEventListener('touchcancel', () => { def.isShooting = false; });
function gameLoop() {
  if (def.movement === -1) moveJetShooter(-0.25);
  else if (def.movement === 1) moveJetShooter(0.25);
  const now = performance.now();
  if (def.isShooting && (now - def.lastShotTime > def.FIRE_RATE)) {
    if (def.jetShooterBulletRemaining === 0) noBulletJetShooter();
    else {
    shootJetShooter();
    def.lastShotTime = now;
    }
  }
  def.gameFrameId = requestAnimationFrame(gameLoop);
}
gameLoop();
function moveJetShooter(dir) {
  const step = def.jetShooterBox * 3;
  const newX = def.jetShooter.x + dir * step;
  if (newX >= 0 && newX + def.jetShooter.size <= def.jetShooterCanvas.width) {
    def.jetShooter.x = newX;
  }
}
function shootJetShooter() {
  def.jetShooterBullets.push({
    x: def.jetShooter.x + def.jetShooter.size / 2 - 2,
    y: def.jetShooter.y - 10,
    size: 4,
    speed: 15,
  });
  def.jetShooterBulletRemaining--;
  def.jetShooterBulletHolder.textContent = "Bullets remaining: " + def.jetShooterBulletRemaining;
}
function jetShooterExtraLife() {
  def.jetShooterHasShield++;
  def.jetShooterShieldHolder.textContent = "Shields: " + def.jetShooterHasShield;
}
function jetShooterAddBullets() {
  def.jetShooterBulletRemaining += 100;
  def.jetShooterBulletHolder.textContent = "Bullets remaining: " + def.jetShooterBulletRemaining;
}
function noBulletJetShooter(duration = 1500) {
  if (def.jetShooterMessageTimeout) {
    clearTimeout(def.jetShooterMessageTimeout);
    def.jetShooterMessageTimeout = null;
  }
  def.jetShooterMessage = "No bullets remaining! Capture a bullet barrel.";
  def.jetShooterMessageTimeout = setTimeout(() => {
    def.jetShooterMessage = "";
    def.jetShooterMessageTimeout = null;
  }, duration);
}
function jetShooterGameOver() {
  def.jetShooterRunning = false;
  def.jetShooterEnemies = [];
  def.jetShooterBullets = [];
  def.jetShooterShields = [];
  def.jetShooterBulletBarrel = [];
  requestAnimationFrame(() => {
    def.jetShooterCtx.clearRect(0, 0, def.jetShooterCanvas.width, def.jetShooterCanvas.height);
    def.jetShooterCtx.font = "32px Arial";
    def.jetShooterCtx.fillStyle = "white";
    def.jetShooterCtx.textAlign = "center";
    const cx = def.jetShooterCanvas.width / 2;
    const cy = def.jetShooterCanvas.height / 2;
    if (fb.db && fb.currentUser) {
      fb.db.ref(`highScores/jetShooterGame/${fb.currentUserName}`).set({
        name: fb.currentUserName,
        score: def.jetShooterScore
      });
      fb.db.ref(`highScores/jetShooterGame`).once('value').then(snapshot => {
        const scores = snapshot.val() || {};
        const sorted = Object.values(scores)
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
        const position = sorted.findIndex(entry => entry.name === fb.currentUserName && entry.score === def.jetShooterScore) + 1;
        if (position > 0 && position <= 10) {
          if (def.jetShooterScore > def.jetShooterHighScore) {
            def.jetShooterHighScore = def.jetShooterScore;
            localStorage.setItem("jetShooterHighScore", def.jetShooterHighScore);
            fb.db.ref(`users/${fb.currentUser.uid}/highscores`).set({
              jetShooterHighScore: def.jetShooterHighScore
            });
            document.getElementById("jetShooterHighScore").textContent = "High score = " + def.jetShooterHighScore;
            def.jetShooterCtx.fillText("New High Score: " + def.jetShooterHighScore + "!", cx, cy + 40);
          }
          else def.jetShooterCtx.fillText(`Game Over! Score: ${def.jetShooterScore}`, cx, cy - 40);
          def.jetShooterCtx.fillText(`Congrats! You're #${position} on the leaderboard!`, cx, cy + 10);
        } 
        else {
          def.jetShooterCtx.fillText("GAME OVER!", cx, cy - 40);
          if (def.jetShooterScore > def.jetShooterHighScore) {
            def.jetShooterHighScore = def.jetShooterScore;
            localStorage.setItem("jetShooterHighScore", def.jetShooterHighScore);
            fb.db.ref(`users/${fb.currentUser.uid}/highscores`).set({
              jetShooterHighScore: def.jetShooterHighScore
            });
            document.getElementById("jetShooterHighScore").textContent = "High score = " + def.jetShooterHighScore;
            def.jetShooterCtx.fillText("New High Score: " + def.jetShooterHighScore + "!", cx, cy + 40);
          }
          else def.jetShooterCtx.fillText("Score: " + def.jetShooterScore, cx, cy);
        }
      });
    }
    else {
      def.jetShooterCtx.fillText("GAME OVER!", cx, cy - 40);
      if (def.jetShooterScore > def.jetShooterHighScore) {
        def.jetShooterHighScore = def.jetShooterScore;
        localStorage.setItem("jetShooterHighScore", def.jetShooterHighScore);
        document.getElementById("jetShooterHighScore").textContent = "High score = " + def.jetShooterHighScore;
        def.jetShooterCtx.fillText("New High Score: " + def.jetShooterHighScore + "!", cx, cy + 40);
      }
      else def.jetShooterCtx.fillText("Score: " + def.jetShooterScore, cx, cy);
    }
    def.jetShooterCtx.font = "20px Arial";
    def.jetShooterCtx.fillText("Press Restart to Play Again", cx, cy + 90);
  });
}
function showJetShooterLeaderScores() {
  const leaderboard = document.getElementById('jetShooterGameLeaderboard');
  const scoresRef = fb.db.ref(`highScores/jetShooterGame`);
  scoresRef.off('value');
  scoresRef.on('value', snapshot => {
    const scores = snapshot.val() || {};
    const sorted = Object.values(scores)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    leaderboard.innerHTML = '';
    sorted.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.name}: ${entry.score}`;
      leaderboard.appendChild(li);
    });
  });
}

// --------- Pi Game ---------
function changePiMode() {
  const piStart = document.getElementById("piStart");
  const piReset = document.getElementById("piReset");
  const piComment = document.getElementById("piComment");
  const mode = document.getElementById("piMode").value;
  const piTestHolder = document.getElementById("piTesterHolder");
  const piPracticeHolder = document.getElementById("piPracticeHolder");
  const piRevealHolder = document.getElementById("piRevealHolder");
  [piTestHolder, piPracticeHolder, piRevealHolder].forEach(el => {
    el.classList.add('piHidden');
    el.classList.remove('piVisible');
  });
  if (mode === 'selectPi') {
    [piTestHolder, piPracticeHolder, piRevealHolder].forEach(el => {
      el.classList.add('piHidden');
      el.classList.remove('piVisible');
    });
    piReset.classList.add('pi-reset-hidden');
    piReset.classList.remove('pi-reset-visible');
    piStart.classList.add('pi-start-hidden');
    piStart.classList.remove('pi-start-visible');
    piComment.classList.add('pi-comment-hidden');
    piComment.classList.remove('pi-comment-visible');
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
  }
  else if (mode === 'testPi') {
    piTestHolder.classList.remove('piHidden');
    piTestHolder.classList.add('piVisible');
    piReset.classList.remove('pi-reset-hidden');
    piReset.classList.add('pi-reset-visible');
    piStart.classList.remove('pi-start-hidden');
    piStart.classList.add('pi-start-visible');
    piComment.classList.remove('pi-comment-hidden');
    piComment.classList.add('pi-comment-visible');
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
  } else if (mode === 'pracPi') {
    piPracticeHolder.classList.remove('piHidden');
    piPracticeHolder.classList.add('piVisible');
    piReset.classList.remove('pi-reset-hidden');
    piReset.classList.add('pi-reset-visible');
    piStart.classList.remove('pi-start-hidden');
    piStart.classList.add('pi-start-visible');
    piComment.classList.remove('pi-comment-hidden');
    piComment.classList.add('pi-comment-visible');
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
  } else {
    piRevealHolder.classList.remove('piHidden');
    piRevealHolder.classList.add('piVisible');
    piReset.classList.add('pi-reset-hidden');
    piReset.classList.remove('pi-reset-visible');
    piStart.classList.add('pi-start-hidden');
    piStart.classList.remove('pi-start-visible');
    piComment.classList.add('pi-comment-hidden');
    piComment.classList.remove('pi-comment-visible');
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
  }
}
function piReset() {
  [document.getElementById("piTesterHolder"), document.getElementById("piPracticeHolder"), document.getElementById("piRevealHolder")].forEach(el => {
    el.classList.add('piHidden');
    el.classList.remove('piVisible');
  });
  document.getElementById("piMode").value = 'selectPi';
  document.getElementById("piReset").classList.add('pi-reset-hidden');
  document.getElementById("piStart").classList.add('pi-start-hidden');
  document.getElementById("piStart").textContent = 'Start';
  document.getElementById("piComment").classList.add('pi-comment-hidden');
  document.getElementById("piComment").classList.remove('pi-comment-visible');
  document.getElementById("piComment").textContent = "";
  document.getElementById("piTestInput").value = "";
  document.getElementById("piInputs").innerHTML = "";
  def.piIndex = 0;
  def.mistakesAllowed = 3;
}
function piStart() {
  const piStart = document.getElementById("piStart");
  const mode = document.getElementById("piMode").value;
  if (piStart.textContent === 'Start') {
    document.getElementById("piTestInput").disabled = false;
    if (mode === 'testPi') {
      startPiTest();
    }
    else {
      startPiPractice()
    }
    piStart.textContent = 'Restart';
  }
  else {
    piStart.textContent = 'Start';
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
    document.getElementById("piInputs").innerHTML = "";
    document.getElementById("piTestInput").disabled = false;
  }
}
function startPiTest() {
  const piTestInput = document.getElementById("piTestInput");
  const piComment = document.getElementById("piComment");
  let startTime = 0;
  def.piIndex = 0;
  startTime = Date.now();
  piComment.textContent = 'Start typing...';
  piTestInput.value = '';
  piTestInput.focus();
  piTestInput.oninput = () => {
    const val = piTestInput.value;
    if (val[val.length - 1] === def.piGamePi[def.piIndex]) {
      def.piIndex++;
    } else {
      const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
      piComment.textContent = `Wrong digit at position ${def.piIndex + 1}. Time: ${timeTaken}s`;
      piTestInput.disabled = true;
      return;
    }
    if (def.piIndex >= def.piGamePi.length) {
      const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
      piComment.textContent = `Perfect! You typed all ${def.piGamePi.length} digits correctly in ${totalTime}s!`;
      piTestInput.disabled = true;
    }
  };
}
function startPiPractice() {
  def.mistakesAllowed = parseInt(document.getElementById("mistakeLimit").value || '3');
  def.piIndex = 0;
  document.getElementById("piInputs").innerHTML = "";
  createNextPracticeInput();
}
function createNextPracticeInput() {
  const inputContainer = document.getElementById("piInputs");
  const input = document.createElement("input");
  const piComment = document.getElementById("piComment");
  input.type = "text";
  input.inputMode = "numeric";
  input.className = "pi-digit-input";
  input.placeholder = `#${def.piIndex + 1}`;
  piComment.textContent = 'Start typing...';
  input.addEventListener("input", () => {
    const entered = input.value.trim();
    if (entered === "") {
      input.style.borderColor = "";
      return;
    }
    if (!/^\d$/.test(entered)) {
      piComment.textContent = "Please enter a number.";
      input.value = "";
      input.style.borderColor = "orange";
      return;
    }
    if (entered === def.piGamePi[def.piIndex]) {
      input.style.borderColor = "green";
      input.style.transition = "border-color 0.3s";
      def.piIndex++;
      setTimeout(() => {
        input.style.borderColor = "";
        input.disabled = true;
        if (def.piIndex < def.piGamePi.length) createNextPracticeInput();
        else piComment.textContent = `You completed all ${def.piGamePi.length} digits!`;
      }, 300);
    }
    else {
      input.style.borderColor = "red";
      input.style.transition = "border-color 0.3s";
      def.mistakesAllowed--;
      if (def.mistakesAllowed <= 0) {
        piComment.textContent = `You’ve reached the mistake limit. Final digit count: ${def.piIndex}`;
        disableAllInputs();
      } else {
        piComment.textContent = `Oops, you got that one wrong. Mistakes left: ${def.mistakesAllowed}. Try again!`;
      }
    }
  });
  inputContainer.appendChild(input);
  input.focus();
}
function disableAllInputs() {
  document.querySelectorAll(".pi-digit-input").forEach(inp => inp.disabled = true);
}
// -------- Math Quiz ---------
function getSelectedOperations() {
  const ops = [];
  document.querySelectorAll('.operation:checked').forEach(cb => {
    ops.push(cb.value);
  });
  return ops.length > 0 ? ops : ['+'];
}
function fg2_start() {
  const min = def.toNum(document.getElementById('fg_min').value) ?? 0;
  const max = def.toNum(document.getElementById('fg_max').value) ?? 10;
  const opsPer = def.toNum(document.getElementById('fg_ops').value) ?? 1;
  const n = def.toNum(document.getElementById('fg_n').value) ?? 5;

  if (min >= max) {
    document.getElementById('fg2_area').textContent = 'Minimum number must be less than the maximum number.';
    return;
  }

  const allowed = getSelectedOperations();
  def.fg2_state = { min, max, opsPer, n, idx: 0, score: 0, allowed };
  fg2_next();
}
function fg2_reset() {
  def.fg2_state = null;
  document.getElementById('fg2_area').textContent = 'Reset. Configure and press Start.';
}
function randInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}
function randChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function makeExpr(min, max, ops, allowedOps) {
  const nums = [];
  for (let i = 0; i < ops + 1; i++) nums.push(randInt(min, max));
  let expr = '' + nums[0];
  for (let i = 0; i < ops; i++) {
    let op = randChoice(allowedOps);
    let val = nums[i + 1];
    if ((op === '÷' || op === '/' || op === '%') && val === 0) val = 1;
    switch (op) {
      case '*':
        op = '×';
        break;
      case '/':
        op = '÷';
        break;
      case '**':
        op = '^';
        break;
    }
    expr += ` ${op} ${val}`;
  }
  return expr;
}
function toggleDropdown() {
  const dd = document.getElementById('operationDropdown');
  if (!dd) return;
  dd.classList.toggle('open');
  const content = document.getElementById('opsContent');
  const toggle = document.getElementById('opsToggle');
  if (dd.classList.contains('open')) {
    content.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
  } else {
    content.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  }
}
if (def.opsToggle) {
  def.opsToggle.addEventListener('click', toggleDropdown);
  def.opsToggle.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(); } });
}
document.addEventListener('click', (e) => {
  const dd = document.getElementById('operationDropdown');
  if (!dd) return;
  if (!dd.contains(e.target)) {
    dd.classList.remove('open');
    document.getElementById('opsContent').setAttribute('aria-hidden', 'true');
    document.getElementById('opsToggle').setAttribute('aria-expanded', 'false');
  }
});
function getSelectedOperations() {
  const boxes = Array.from(document.querySelectorAll('.operation'));
  const ops = boxes.filter(cb => cb.checked).map(cb => cb.value);
  return ops.length ? ops : ['+', '-', '*', '/'];
}
function evalExpr(s) {
  if (!/^[0-9+\-x×÷*/%^().\s]+$/.test(s)) throw new Error('Invalid tokens');
  const safe = s
    .replace(/×|x/g, '*')
    .replace(/÷/g, '/')
    .replace(/\^/g, '**');
  return Function(`"use strict"; return (${safe})`)();
}
function fg2_next() {
  if (!def.fg2_state) return;

  if (def.fg2_state.idx >= def.fg2_state.n) {
    document.getElementById('fg2_area').textContent =
      `Finished! Score: ${def.fg2_state.score}/${def.fg2_state.n}`;
    return;
  }

  const expr = makeExpr(def.fg2_state.min, def.fg2_state.max, def.fg2_state.opsPer, def.fg2_state.allowed);
  let correct;
  try {
    correct = evalExpr(expr);
  } catch (e) {
    return fg2_next();
  }
  correct = Math.round(correct * 100) / 100;

  def.fg2_state.current = { expr, correct };

  const area = document.getElementById('fg2_area');
  area.innerHTML = `
    Q${def.fg2_state.idx + 1}/${def.fg2_state.n}: Solve → ${expr}
    <br><br>
    <input id="fg2_answer" type="number" step="0.01" style="padding:6px 8px;border-radius:6px;border:1px solid rgba(255,255,255,0.03);background:#071219;color:#e6eef6;font-family:var(--mono)"/>
    <button class="btn" onclick="fg2_submit()">Submit</button>
  `;

  const ansInput = document.getElementById('fg2_answer');
  if (ansInput) ansInput.focus();
}
function fg2_submit() {
  const ansInput = document.getElementById('fg2_answer');
  const ans = ansInput ? Number(ansInput.value) : NaN;

  const correct = Math.round(def.fg2_state.current.correct * 100) / 100;
  const ok = Math.abs(ans - correct) < 1e-9;

  if (ok) def.fg2_state.score++;
  def.fg2_state.idx++;

  document.getElementById('fg2_area').textContent =
    (ok ? 'Correct! ' : 'Incorrect. ') + `Answer: ${def.fmt(correct)}`;

  setTimeout(fg2_next, 2000);
}
document.addEventListener('DOMContentLoaded', () => {
  if (def.opsToggle && def.opsContent) {
    def.opsToggle.addEventListener('click', () => {
      const expanded = def.opsToggle.getAttribute('aria-expanded') === 'true';
      def.opsToggle.setAttribute('aria-expanded', !expanded);
      def.opsContent.setAttribute('aria-hidden', expanded);
      def.opsContent.classList.toggle('show');
    });
  }
});

// ---------- Number Guessing ----------

function ng_start() {
  def.ng_secret = randInt(1, 100); def.ng_tries = 0; document.getElementById('ng_out').textContent = 'I picked a number 1–100. Start guessing!';
}
function ng_try() {
  const g = def.toNum(document.getElementById('ng_guess').value);
  if (g === null) return;
  def.ng_tries++;
  if (g === def.ng_secret) { document.getElementById('ng_out').textContent = `🎉 You got it in ${def.ng_tries} tries!`; def.ng_secret = null; }
  else if (g < def.ng_secret) document.getElementById('ng_out').textContent = 'Too low.';
  else document.getElementById('ng_out').textContent = 'Too high.';
}

