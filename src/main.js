
let expand = document.getElementById("expand-btn");
let choices = document.querySelector(".expanded");
let nav = document.querySelector("#nav-cont")

expand.onclick= ()=> choices.classList.toggle("hidden")

document.addEventListener("click", e=>{
  if(!nav.contains(e.target))choices.classList.add("hidden")
})