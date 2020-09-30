/*
window.addEventListener('load',()=>{
    const canvas = document.querySelector('.scene');
    const context = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    document.addEventListener('keyup',keyPush);

    setInterval(game,1000/15);
});

px=py=10;
gs=tc=20;
ax=ay=15;
xv=yv=0;
trail=[];
tail = 5;

function game() {
    px+=xv;
    py+=yv;
    if(px<0) {
        px= tc-1;
    }
    if(px>tc-1) {
        px= 0;
    }
    if(py<0) {
        py= tc-1;
    }
    if(py>tc-1) {
        py= 0;
    }
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);
 
    ctx.fillStyle="lime";
    for(var i=0;i<trail.length;i++) {
        ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
        if(trail[i].x==px && trail[i].y==py) {
            tail = 5;
        }
    }
    trail.push({x:px,y:py});
    while(trail.length>tail) {
    trail.shift();
    }
 
    if(ax==px && ay==py) {
        tail++;
        ax=Math.floor(Math.random()*tc);
        ay=Math.floor(Math.random()*tc);
    }
    ctx.fillStyle="red";
    ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
}

function keyPush(e){
    
    switch(e.keyCode){
        case 37:
            xspeed = -20; yspeed = 0;
            break;
        case 38:
            xspeed = 0; yspeed = -20;
            break;
        case 39:
            xspeed = 20; yspeed = 0;
            break;
        case 40:
            xspeed = 0; yspeed = 20;
            break;
    }

    console.log(xspeed,yspeed);
}

*/

window.onload=function() {
    canv= document.querySelector('.scene');
    canv.width = 400;
    canv.height = 400;

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const speechRecognition = new SpeechRecognition();
    speechRecognition.interimResults = true;

    ctx=canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    speechRecognition.addEventListener('result',moveSnake);
    speechRecognition.addEventListener('end',(e)=>speechRecognition.start());
    speechRecognition.start();
    setInterval(game,1000/25);

}
px=py=10;
gs=tc=20;
ax=ay=15;
xv=yv=0;
trail=[];
tail = 5;

function game() {
    px+=xv;
    py+=yv;
    if(px<0) {
        px= tc-1;
    }
    if(px>tc-1) {
        px= 0;
    }
    if(py<0) {
        py= tc-1;
    }
    if(py>tc-1) {
        py= 0;
    }
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canv.width,canv.height);
 
    ctx.fillStyle="lime";
    for(var i=0;i<trail.length;i++) {
        ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
        if(trail[i].x==px && trail[i].y==py) {
            tail = 5;
        }
    }
    trail.push({x:px,y:py});
    while(trail.length>tail) {
    trail.shift();
    }
 
    if(ax==px && ay==py) {
        tail++;
        ax=Math.floor(Math.random()*tc);
        ay=Math.floor(Math.random()*tc);
    }
    ctx.fillStyle="red";
    ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
}
function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            xv=-1;yv=0;
            break;
        case 38:
            xv=0;yv=-1;
            break;
        case 39:
            xv=1;yv=0;
            break;
        case 40:
            xv=0;yv=1;
            break;
    }
}
function moveSnake(e){
    transcript = Array.from(e.results)
        .map((res)=>res[0])
        .map(res => res.transcript)
        .join('');
    
    if(transcript.includes('left')){
        xv=-1;yv=0;
    }else if(transcript.includes('up')){
        xv=0;yv=-1;
    }else if(transcript.includes('right')){
        xv=1;yv=0;
    }else if(transcript.includes('down')){
        xv=0;yv=1;
    }
}