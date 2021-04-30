const progressBar = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-bar");
const progressCircle = document.querySelector(".progress-circle");

const barWidth = progressContainer.offsetWidth;
const startPos = progressContainer.offsetLeft;

progressCircle.ondragstart = function(){
  return false;
}

console.log(barWidth,startPos);

function movePointer(e){
  const currentPos = e.clientX;
  if(currentPos >= startPos && currentPos <= (barWidth + startPos)){
    const movePos = e.clientX - startPos;
    console.log(movePos);
    progressCircle.style.left = `${movePos}px`;
  }
}

progressCircle.addEventListener("mousedown",(e)=>{
  console.log("mouse pressed");
  progressCircle.style.transform = "translate(-50%,-50%) scale(0.8)";
  document.addEventListener("mousemove",movePointer);
})


progressCircle.addEventListener("mouseup",()=>{
  // e.stopPropagation();
  console.log("mouse released");
  progressCircle.style.transform = "translate(-50%,-50%) scale(1)";
  document.removeEventListener("mousemove",movePointer);
})