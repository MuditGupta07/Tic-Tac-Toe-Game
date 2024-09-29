let game=["","","","","","","","",""];
let boxes=document.querySelectorAll(".grid-item");
let text=document.getElementById("text");
let res=document.getElementById("restart");
let winning_patterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let p1=true;
text.innerText=`O's Turn`
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(p1){
            box.innerText='O';
            box.style.color='#6f0000';
            p1=false;
            text.innerText="X's Turn"
            game[box.getAttribute("index")]='O';
        }
        else{
            box.innerText='X';
            box.style.color='#2C5364'
            p1=true;
            text.innerText="O's Turn"
            game[box.getAttribute("index")]='X';
        }
        box.style.pointerEvents="none";
        check();
    })
})
function check(){
    let w=false;
    winning_patterns.forEach(element => {
        if(game[element[0]]!=0 && game[element[1]]!=0 && game[element[1]]!=0){
            if(game[element[0]]==game[element[1]] && game[element[1]]==game[element[2]]){
                text.innerText=`${game[element[0]]} Is Winner`;
                w=true;
                disable();
            }
        }
    });
    let winner=0;
    for(let i=0;i<9;i++){
        if (game[i]!=0){
            winner++;
        }
    }
    if(winner==9 && w==false){
        text.innerText=`It's A Draw`;
    }
}
function disable(){
    boxes.forEach((box)=>{
        box.style.pointerEvents='none';
    })
}
function reset(){
    p1=true;
    text.innerText=`O's Turn`
    boxes.forEach((box)=>{
        box.style.pointerEvents='auto';
        box.innerText="";

    })
    game=["","","","","","","","",""];
}
res.addEventListener("click",reset);