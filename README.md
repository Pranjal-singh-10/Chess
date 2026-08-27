# ♟️ Real-Time Multiplayer Chess

A real-time multiplayer chess game built with **Node.js, Express, Socket.IO, Chess.js, HTML, CSS, and JavaScript**.

The application allows two players to play chess against each other in real time. A third or additional user can join as a spectator and watch the game.

## 🚀 Features

* ♟️ Real-time multiplayer chess
* 👤 Automatic player assignment

  * First connected player → White
  * Second connected player → Black
  * Additional players → Spectators
* 🔄 Real-time board synchronization using Socket.IO
* ✅ Legal chess move validation using Chess.js
* 🖱️ Drag-and-drop piece movement
* 🔁 Board automatically flips for the Black player
* 👀 Spectator mode
* ♛ Automatic queen promotion
* 🌐 Runs locally using Node.js and Express

## 🛠️ Technologies Used

* **Node.js** – Backend JavaScript runtime
* **Express.js** – Web server
* **Socket.IO** – Real-time communication between players
* **Chess.js** – Chess rules and move validation
* **EJS** – Server-side HTML rendering
* **HTML5** – Page structure
* **CSS** – Chessboard styling
* **JavaScript** – Frontend game logic
* **Tailwind CSS** – Utility classes for UI styling

## 📁 Project Structure

```text
Chess/
│
├── public/
│   └── js/
│       └── game.js
│
├── views/
│   └── index.ejs
│
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Pranjal-singh-10/Chess.git
```

### 2. Navigate into the project

```bash
cd Chess
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node app.js
```

The server will start on:

```text
http://localhost:3000
```

Open the URL in your browser.

## 🎮 How to Play

1. Open the application in your browser.
2. The first player who connects is assigned **White**.
3. The second player is assigned **Black**.
4. Open the application in another browser window or device to connect as the second player.
5. Drag and drop chess pieces to make moves.
6. Chess.js validates the moves on the server.
7. The updated board is sent to all connected clients in real time.
8. Additional users can join as spectators.

## 🔌 How Socket.IO Works

The server maintains a single Chess.js game instance.

When a player makes a move:

```text
Player
   ↓
Frontend
   ↓
Socket.IO
   ↓
Node.js Server
   ↓
Chess.js validates move
   ↓
Updated FEN
   ↓
Socket.IO
   ↓
All connected clients
```

The server broadcasts the updated board using:

```javascript
io.emit("boardState", chess.fen());
```

This keeps the chessboard synchronized between players.

## ♟️ Player Roles

| Connection     | Role      |
| -------------- | --------- |
| First player   | White     |
| Second player  | Black     |
| Third+ players | Spectator |

The server also verifies that a player can only make moves when it is their turn.

## 🔐 Move Validation

Moves are validated on the server using Chess.js.

The server checks:

* Whose turn it is
* Whether the connected player owns that color
* Whether the chess move is legal

This prevents a player from simply moving the opponent's pieces from the browser.

## 🖥️ Screenshots

Add screenshots of your application here:

```markdown
![Chess Board](screenshots/chessboard.png)
```

## 🔮 Future Improvements

Possible improvements include:

* ♔ Check and checkmate notifications
* 🏆 Game result screen
* 🔄 Restart/new game functionality
* ⏱️ Chess timer
* 💬 In-game chat
* 📜 Move history
* 🔊 Move and capture sounds
* 📱 Better mobile support
* 🔑 Private game rooms
* 👤 Player usernames
* 📊 Game statistics
* 🎨 Multiple chessboard themes

## 📌 Current Status

The project currently supports real-time multiplayer chess with player roles, legal move validation, board synchronization, and spectator mode.

## 👨‍💻 Author

**Pranjal Singh**

GitHub:
https://github.com/Pranjal-singh-10

---

⭐ If you found this project useful, consider giving the repository a star!
