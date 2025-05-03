
let imgx, imgy ;
const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (isDarkMode) {
  imgx= "../TTTI/xw.png";
  imgy= "../TTTI/ow.png";
}else{
  imgx= "../TTTI/xb.png";
    imgy= "../TTTI/ob.png";
}
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
  const newColorScheme = e.matches ? "dark" : "light";
  if(newColorScheme==="dark"){
    imgx= "../TTTI/xw.png";
    imgy= "../TTTI/ow.png";
  }else {
    imgx= "../TTTI/xb.png";
    imgy= "../TTTI/ob.png";
  }
});

function isWon(arr){
  let val = arr.sort((a,b)=>a-b).join("");
  if([1,2,3].every(i=>val.includes(i))){
    return [1,2,3];
  }
  if([4,5,6].every(i=>val.includes(i))){
    return [4,5,6]
  } 
  if([7,8,9].every(i=>val.includes(i))){
    return [7,8,9]
  } 
  if([1,4,7].every(i=>val.includes(i))){
    return [1,4,7]
  } 
  if([2,5,8].every(i=>val.includes(i))){
    return [2,5,8]
  } 
  if([3,6,9].every(i=>val.includes(i))){
    return [3,6,9]
  } 
  if([1,5,9].every(i=>val.includes(i))){
    return [1,5,9]
  } 
  if([3,5,7].every(i=>val.includes(i))){
    return [3,5,7];
  }
  return false;
}

let expand = document.getElementById("expand-btn");
let choices = document.querySelector(".expanded");


expand.onclick= ()=> choices.classList.toggle("hidden")


let turn = "x";
let heldx = [];
let heldo = [];

let turnx = document.querySelector(".turn-x");
let turnxp = document.getElementById("turn-x-p");
let turno = document.querySelector(".turn-o");
let turnop = document.getElementById("turn-o-p");
let reset = document.getElementById("reset");
let btns = [...document.querySelectorAll("button")].filter(b=> b.id.length ===2 && b.id.includes("g"))


if(turn === "x"){
      turno.classList.remove("turn");
      turnx.classList.add("turn");
   }else{
     turnx.classList.remove("turn");
     turno.classList.add("turn");
  }
  
btns.forEach(i=> i.addEventListener("click", (b)=>{
    let numb = Number(b.currentTarget.id.slice(1,));
    if(heldx.includes(numb) || heldo.includes(numb))return;
    b.currentTarget.innerHTML = `<img src=${turn==="x" ? imgx : imgy } alt=${turn} id=game-img${numb} class="game-img">`
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
  
  if(isWon(heldo) || isWon(heldx)){
    let decos = isWon(heldx) || isWon(heldo);
    document.getElementById("comment").innerHTML= "Game over";
    [...document.querySelectorAll(".game-img")].filter(i=>decos.includes(Number(i.id.slice(-1,)))).forEach(i=> {setTimeout(()=>{i.classList.remove("won");void i.offsetWidth;i.classList.add("won")},400)});
    
    return;
  }
  
  
  if(heldo.length >0 || heldx.length>0){
  document.getElementById("comment").innerHTML=turn==="x" ? "X turn" : "O turn"
  }
  
  
}))

reset.onclick= ()=>{
  reset.classList.add("hidden") 
  heldx = [];
  heldo = [];
  turn = "x";
  btns.forEach(i=>i.innerHTML="");
  turno.classList.remove("turn");
  turnx.classList.add("turn");
  document.getElementById("comment").innerHTML= "Start game or select player";
}