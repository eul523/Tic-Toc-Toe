function sleep(ms){
  return new Promise(resolve => setTimeout(resolve,ms))
}
function finish(arr,oneLeft,fn){
    let fnI = oneLeft.findIndex(d=>d.every(i=>arr.includes(i)) && arr.every(i=>d.includes(i)));
    return fnI>=0 ? fn[fnI] : null
}
function check(arr,oneLeft){
    for(let i of oneLeft){
      if(i.every(i=>arr.includes(i)))return i;
    }
    return false;
}
function fork(arr,held){
  let forkChances = [{main:[5,1],free:[3,7,9],move:3},{main:[5,1],free:[3,2,7],move:3},{main:[5,1],free:[3,2,9],move:3},{main:[5,1],free:[7,3,9],move:7},{main:[5,1],free:[7,4,3],move:7},{main:[5,1],free:[7,4,9],move:7},{main:[5,3],free:[1,7,9],move:1},{main:[5,3],free:[1,2,7],move:1},{main:[5,3],free:[1,2,9],move:1},{main:[5,3],free:[9,1,7],move:9},{main:[5,3],free:[9,6,1],move:9},{main:[5,3],free:[9,6,7],move:9},{main:[5,7],free:[1,3,9],move:1},{main:[5,7],free:[1,4,3],move:1},{main:[5,7],free:[1,4,9],move:1},{main:[5,7],free:[9,1,3],move:9},{main:[5,7],free:[9,8,1],move:9},{main:[5,7],free:[9,8,3],move:9},{main:[5,9],free:[7,1,3],move:7},{main:[5,9],free:[7,8,1],move:7},{main:[5,9],free:[7,8,3],move:7},{main:[5,9],free:[3,1,7],move:3},{main:[5,9],free:[3,6,1],move:3},{main:[5,9],free:[3,6,7],move:3},{main:[1,9],free:[2,3,6],move:3},{main:[1,9],free:[4,7,8],move:7},{main:[3,7],free:[2,1,4],move:1},{main:[3,7],free:[6,9,8],move:9}];
  
  for(let obj of forkChances){
    if(obj.main.every(i=>arr.includes(i)) && !obj.free.some(i=>held.includes(i)))return obj.move;
  }
  return false;
}


async function easyBot(bot, opp) {
  let left = [1,2,3,4,5,6,7,8,9].filter(i=>!bot.includes(i) && !opp.includes(i));
  await sleep(500);
  return left[Math.floor(Math.random() * (left.length))]
}
function easyNow(bot, opp){
  let left = [1,2,3,4,5,6,7,8,9].filter(i=>!bot.includes(i) && !opp.includes(i));
  return left[Math.floor(Math.random() * (left.length))]
}


async function bot(bot, opp, cond){
  await sleep(500);
  const held = [...bot,...opp];
  const oneLeft = [[1,2],[2,3],[1,3],[4,5],[5,6],[4,6],[7,8],[8,9],[7,9],[1,4],[4,7],[1,7],[2,5],[5,8],[2,8],[3,6],[6,9],[3,9],[1,5],[5,9],[1,9],[3,5],[5,7],[3,7]];
  let finishInd = [3,1,2,6,4,5,9,7,8,7,1,4,8,2,5,9,3,6,9,1,5,7,3,5];
  let movenum = bot.length + opp.length;
  let corner = [1,3,7,9][Math.floor(Math.random()*4)];
  
  
  if(movenum===0)return corner;
  if(movenum===1){
    if(opp[0]===5)return corner;
    else{return 5;}
  }
  if(movenum===2){
    if(opp[0]===5){
      switch (bot[0]){
        case 1:
          return 9;
        case 3:
          return 7;
        case 7:
          return 3;
        case 9:
          return 1;
      }
    }else{
      return 5;
    }
  }
  if(movenum===3 && ((opp.includes(1) && opp.includes(9)) || (opp.includes(3) && opp.includes(7))))return 6;
  let checkedb = check(bot,oneLeft);
  let checkedo = check(opp,oneLeft);
  if(checkedb && !held.includes(finish(checkedb,oneLeft,finishInd)))return finish(checkedb,oneLeft,finishInd);
  if(checkedo && !held.includes(finish(checkedo,oneLeft,finishInd)))return finish(checkedo,oneLeft,finishInd);
  
  let ran = Math.floor(Math.random()*2);
  if(cond && ran && fork(bot,held))return fork(bot,held);
  if(cond && ran && fork(opp,held))return fork(opp,held);
  
  if(!cond && fork(bot,held))return fork(bot,held);
  if(!cond && fork(opp,held))return fork(opp,held);
  return easyNow(bot,opp);
}


let imgx, imgo ;
const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (isDarkMode) {
  imgx= "../TTTI/xw.png";
  imgo= "../TTTI/ow.png";
}else{
  imgx= "../TTTI/xb.png";
    imgo= "../TTTI/ob.png";
}
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
  const newColorScheme = e.matches ? "dark" : "light";
  if(newColorScheme==="dark"){
    imgx= "../TTTI/xw.png";
    imgo= "../TTTI/ow.png";
  }else {
    imgx= "../TTTI/xb.png";
    imgo= "../TTTI/ob.png";
  }
});

function isWon(arr){
  let val = arr.sort((a,b)=>a-b).join("");
  let conds = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
  for(let i of conds){
    if(i.every(i=>val.includes(i)))return i;
  }
  return false;
}
function isDraw(){
  if(heldx.length + heldo.length >= 9)return true;
}

let expand = document.getElementById("expand-btn");
let choices = document.querySelector(".expanded");


expand.onclick= (e)=>{
  choices.classList.toggle("hidden");
  e.stopPropagation();
} 

document.addEventListener("click",e=>{
  if(!choices.contains(e.currentTarget)){
    e.stopPropagation();
    choices.classList.add("hidden");
  }
})

let turn = "x";
let heldx = [];
let heldo = [];
let gameMode = "medium";
let userTurn = "x";


let gamegrand = document.querySelector(".game-btns");
let turnx = document.querySelector(".turn-x");
let turnxp = document.getElementById("turn-x-p");
let turno = document.querySelector(".turn-o");
let turnop = document.getElementById("turn-o-p");
let reset = document.getElementById("reset");
let btns = [...document.querySelectorAll("button")].filter(b=> b.id.length ===2 && b.id.includes("g"))
let wonmsg = document.getElementById("wonmsg");
let modeShower = document.getElementById("modeShower");
let turnShowerO = document.getElementById("turn-o");
let turnShowerX = document.getElementById("turn-x");
let turnShowerXP = document.getElementById("turn-x-p");
let turnShowerOP = document.getElementById("turn-o-p");
let choicebtns = [...document.querySelectorAll(".expandedbtn")];


function makeMove(numb){
  let thebtn=btns.filter(i=>i.id=== `g${numb}`)[0];
  if(isWon(heldx) || isWon(heldo) || isDraw())return;
  if(heldx.includes(numb) || heldo.includes(numb))return;
  thebtn.innerHTML = `<img src=${turn==="x" ? imgx : imgo } alt=${turn} id=game-img${numb} class="game-img" oncontextmenu="return false;">`
  if(turn === "x"){
      heldx.push(numb)
    }else{
      heldo.push(numb)
    }
    reset.classList.remove("hidden");
    
   turn = turn==="x" ? "o" : "x"
   if(turn === "x"){
      turno.classList.remove("turn");
      turnx.classList.add("turn");
   }else{
     turnx.classList.remove("turn");
     turno.classList.add("turn");
  }
  
  if(isWon(heldo) || isWon(heldx) || isDraw()){
    let decos = isWon(heldx) || isWon(heldo);
    if(decos){
      
      document.getElementById("comment").innerHTML= "Game over";
    [...document.querySelectorAll(".game-img")].filter(i=>decos.includes(Number(i.id.slice(-1,)))).forEach(i=> {setTimeout(()=>{i.classList.remove("won");void i.offsetWidth;i.classList.add("won")},400)});
    if(isWon(heldo)){
      turnShowerOP.innerHTML= turnShowerOP.innerHTML==="-" ? 1 : Number(turnShowerOP.innerHTML) + 1;
    }else {
      turnShowerXP.innerHTML= turnShowerXP.innerHTML==="-" ? 1 : Number(turnShowerXP.innerHTML) + 1;
    }
    setTimeout(()=>{
       gamegrand.style.opacity="0";
       setTimeout(()=>{
         gamegrand.classList.add("hidden");
         wonmsg.classList.remove("hidden");
         wonmsg.innerHTML=`<img src=${turn === "x" ? imgo : imgx} class="h-[30%] w-auto" oncontextmenu="return false;"><h2 class="text-[2.5rem]">Winner!</h2>`
       },500)
    },1210)
    
    }
    if(isDraw()){
      gamegrand.style.opacity="0";
      setTimeout(()=>{
         gamegrand.classList.add("hidden");
         wonmsg.classList.remove("hidden");
         wonmsg.innerHTML=`<section class="flex justify-center gap-6 h-1/3 w-[100%]"><img src=${imgx} class="h-full w-auto m-0" oncontextmenu="return false;"><img src=${imgo} class="h-full m-0 w-auto" oncontextmenu="return false;"></section><h2 class="text-[2.5rem]">Draw!</h2>`
       },500)
    }
    return;
  }
  if(heldo.length >0 || heldx.length>0){
  document.getElementById("comment").innerHTML=turn==="x" ? "X turn" : "O turn"
  }
}


function restartGame(){
  reset.classList.add("hidden") 
  heldx = [];
  heldo = [];
  turn = "x";
  btns.forEach(i=>i.innerHTML="");
  turno.classList.remove("turn");
  turnx.classList.add("turn");
  document.getElementById("comment").innerHTML= "Start game or select player";
  wonmsg.classList.add("hidden");
  gamegrand.classList.remove("hidden");
  requestAnimationFrame(()=>gamegrand.style.opacity="1");
  
  if(!(gameMode==="with-friend") && userTurn==="o"){
    (async ()=>{
      let move= gameMode==="easy" ? await easyBot([],[]) : gameMode==="medium" ? await bot([],[]) : await bot([],[]);
      makeMove(move);
    })();
  }
}

if(gameMode === "with-friend"){
  modeShower.innerHTML="Play against friend"
}else{
  modeShower.innerHTML= gameMode[0].toUpperCase() + gameMode.slice(1)
}
if(turn === "x"){
      turno.classList.remove("turn");
      turnx.classList.add("turn");
}else{
     turnx.classList.remove("turn");
     turno.classList.add("turn");
}



btns.forEach(i=> i.onclick=b=>{
  if(!choices.classList.contains("hidden"))return;
  if(gameMode ==="with-friend"){
     makeMove(Number(b.currentTarget.id.slice(1,)))
  }else{
    if(heldx.includes(Number(b.currentTarget.id.slice(1,))) || heldo.includes(Number(b.currentTarget.id.slice(1,))))return;
      if(userTurn === turn){
        makeMove(Number(b.currentTarget.id.slice(1,)));
        (async ()=>{
          let opp = userTurn==="x" ? heldx : heldo;
          let botm = userTurn==="o" ? heldx : heldo;
         let move= gameMode==="easy" ? await easyBot(botm,opp) : gameMode==="medium" ? await bot(botm,opp,true) : await bot(botm,opp);
         makeMove(move);
       })();
      }
  }
})




  turnShowerX.onclick=()=>{
    if(!choices.classList.contains("hidden"))return;
    if(!(gameMode === "with-friend")){
      userTurn="x";
      restartGame();
    }
  }
  turnShowerO.onclick=()=>{
    if(!choices.classList.contains("hidden"))return;
    if(gameMode === "with-friend")return;
    if(heldx.length===0 && heldo.length===0){
      userTurn="o";
      (async ()=>{
      let move= gameMode==="easy" ? await easyBot([],[]) : gameMode==="medium" ? await bot([],[]) : await bot([],[]);
      makeMove(move);
    })();
    }
  }



reset.onclick=()=>{
  if(!choices.classList.contains("hidden"))return;
  restartGame()
}
wonmsg.onclick=()=>{
  if(!choices.classList.contains("hidden"))return;
  restartGame()
}

choicebtns.forEach(b=>{
  b.onclick=(ev)=>{
    gameModeNow=ev.currentTarget.id;
    if(gameMode === gameModeNow){
      choices.classList.add("hidden");
      restartGame();
      return;
    }
    gameMode=gameModeNow;
    choices.classList.add("hidden");
    turnShowerXP.innerHTML="-";
    turnShowerOP.innerHTML="-";
    restartGame();
    if(gameMode === "with-friend"){
       modeShower.innerHTML="Play against friend"
    }else{
       modeShower.innerHTML= gameMode[0].toUpperCase() + gameMode.slice(1)
    }
  }
})