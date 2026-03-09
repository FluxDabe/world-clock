const cards = document.querySelectorAll(".clock-card");
const modeSelect = document.getElementById("modeSelect");

function updateClocks(){

    cards.forEach(card=>{

        const timezone = card.dataset.timezone;

        const now = new Date().toLocaleString("en-US",{timeZone:timezone});
        const date = new Date(now);

        const digital = card.querySelector(".digital");
        const dateText = card.querySelector(".date");

        digital.innerText = date.toLocaleTimeString();
        dateText.innerText = date.toDateString();

        drawAnalog(card.querySelector("canvas"),date);

    })

}

function drawAnalog(canvas, date){

    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.save();
    ctx.translate(radius, radius);

    // Draw clock circle
    ctx.beginPath();
    ctx.arc(0,0,radius-10,0,Math.PI*2);
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw numbers
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for(let num=1; num<=12; num++){

        let angle = num * Math.PI / 6;

        let x = Math.sin(angle) * (radius-30);
        let y = -Math.cos(angle) * (radius-30);

        ctx.fillText(num, x, y);
    }

    const hour = date.getHours()%12;
    const minute = date.getMinutes();
    const second = date.getSeconds();

    drawHand(ctx,(hour*Math.PI/6)+(minute*Math.PI/(6*60)),radius*0.5,6);
    drawHand(ctx,(minute*Math.PI/30),radius*0.7,4);
    drawHand(ctx,(second*Math.PI/30),radius*0.9,2);

    ctx.restore();
}

function drawHand(ctx,pos,length,width){

    ctx.beginPath();
    ctx.lineWidth=width;
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0,-length);
    ctx.stroke();
    ctx.rotate(-pos);
}

setInterval(updateClocks,1000);
updateClocks();

modeSelect.addEventListener("change",()=>{

    const mode = modeSelect.value;

    document.querySelectorAll(".digital").forEach(d=>{
        d.style.display = mode==="analog"?"none":"block";
    })

    document.querySelectorAll("canvas").forEach(c=>{
        c.style.display = mode==="digital"?"none":"block";
    })

});