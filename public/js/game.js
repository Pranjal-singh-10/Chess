const socket = io();
const chess=new Chess();

const boardElement=document.querySelector('.chessboard');
let draggedPiece=null;
let sourceSquare=null;
let playersRole=null;

const renderBoard=()=>{
    const board=chess.board();
    boardElement.innerHTML="";
    board.forEach((row,rowindex)=>{
        row.forEach((square,squareindex)=>{
            const squareElement=document.createElement("div");
            squareElement.classList.add(
                "square",
                (rowindex+squareindex)%2===0? "light":"dark"
            );
            squareElement.dataset.row=rowindex;
            squareElement.dataset.col=squareindex;
           if(square){
            const pieceElement=document.createElement("div");
            pieceElement.classList.add(
                "piece",
                square.color==="w"? "white" : "black"
            );
            pieceElement.innerHTML = getPieceSVG(square);
           pieceElement.draggable =
           playersRole === square.color &&
            chess.turn() === playersRole;
            pieceElement.addEventListener("dragstart",(e)=>{
                if(pieceElement.draggable){
                    draggedPiece=pieceElement;
                    sourceSquare={row:rowindex, col:squareindex};
                    e.dataTransfer.setData("text/plain","");   /*this ensures that we don't face any problem in drag*/
                }
            
            });
             pieceElement.addEventListener("dragend",(e)=>{
                draggedPiece=null;
                sourceSquare=null;
             });
             squareElement.appendChild(pieceElement);
           }
           squareElement.addEventListener("dragover",function(e){
            e.preventDefault();
           });
           squareElement.addEventListener("drop",function(e){
             e.preventDefault();
             if(draggedPiece){
                const targetSource={
                    row:parseInt(squareElement.dataset.row),
                    col:parseInt(squareElement.dataset.col),
                };
                handleMove(sourceSquare,targetSource);
             }
           });
           boardElement.appendChild(squareElement);
        });
    }); 
if(playersRole==='b'){
    boardElement.classList.add("flipped");
}
else{
    boardElement.classList.remove("flipped");
}
};
const handleMove=(source,target)=>{
   const move={
    from:`${String.fromCharCode(97+source.col)}${8-source.row}`,
    to:`${String.fromCharCode(97+target.col)}${8-target.row}`,
    promotion:'q',
   };

  
    socket.emit("move", move); 


};
const getPieceSVG = (piece) => {
    return `
        <img 
            src="https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${piece.color}${piece.type}.png"
            alt="${piece.color}"
            class="piece-img"
        />
    `;
};
socket.on("playersRole",function(role){
    playersRole=role;
    renderBoard();
});
socket.on("spectatorRole",function(){
    playersRole=null;
    renderBoard();
});
socket.on("boardState",function(fen){
    chess.load(fen);
    renderBoard();
});

renderBoard();