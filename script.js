let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");



let turnO = true; //playerX, playerO
 
const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableboxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box)=>{
    box.addEventListener("click",() => {
        
        if(turnO){ //playerO
            box.innerText = "O";
            box.classList.add("o-color");
            box.classList.remove("x-color");

            turnO = false;
        }else{ //playerX
            box.innerText = "X";
            box.classList.add("x-color");
            box.classList.remove("o-color");

            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableboxes = ()=>{
    for( let box of boxes){
        box.disabled = true;
    }
};

const enableboxes = () => {
    for( let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide"); 
    disableboxes();

};

const showDraw = () => {
    msg.innerText = `It's draw`;
    msgContainer.classList.remove("hide");
};


const checkWinner = () => {

    for ( let pattern of winpatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "" ){
           if (pos1Val === pos2Val && pos2Val === pos3Val){
               console.log("winner",pos1Val);
               showWinner(pos1Val);
               return;
            }
        }
       
    }
    let isDraw = true;
    boxes.forEach(box => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (isDraw) {
        showDraw();
    }
};

newGamebtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
