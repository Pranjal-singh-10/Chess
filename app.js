const express = require('express');
const { Server } = require("socket.io");
const http = require('http');
const { Chess } = require('chess.js');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const chess = new Chess();

let players = {};

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

io.on("connection", function (uniquesocket) {

    console.log("connected");

    uniquesocket.emit("boardState", chess.fen());

    if (!players.white) {
        players.white = uniquesocket.id;
        uniquesocket.emit("playersRole", "w");
    }
    else if (!players.black) {
        players.black = uniquesocket.id;
        uniquesocket.emit("playersRole", "b");
    }
    else {
        uniquesocket.emit("spectatorRole");
    }

    uniquesocket.on("disconnect", function () {

        if (uniquesocket.id === players.white) {
            delete players.white;
        }
        else if (uniquesocket.id === players.black) {
            delete players.black;
        }

    });

    uniquesocket.on("move", (move) => {

        try {

            if (chess.turn() === "w" &&
                uniquesocket.id !== players.white) return;

            if (chess.turn() === "b" &&
                uniquesocket.id !== players.black) return;

            const result = chess.move(move);

            if (result) {

                io.emit("boardState", chess.fen());

            } else {

                uniquesocket.emit("invalidMove", move);

            }

        } catch (err) {

            console.log(err);

            uniquesocket.emit("invalidMove", move);

        }

    });

});

server.listen(3000, function () {
    console.log("Listening on port 3000");
});