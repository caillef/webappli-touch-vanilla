const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const start = Date.now();

fps = 0
x = 0

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var delta = 0
var show = false
async function startGameLoop() {
    var startFrame, endFrame = 0
    while (true) {
        startFrame = Date.now() - start;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.rect(x, 40, 100, 100);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        for (var i = 0; i < 1000000; i++);
        x += delta
        if (!show && x >= 400) {
            show = true
            console.log(Date.now() - start)
        }
        endFrame = Date.now() - start;
        elapsedMS = endFrame - startFrame
        delta = Math.floor(Math.max(0, (1000.0 / 60) - (elapsedMS)));
        console.log(delta)
        // console.log(delta)
        await sleep(delta)
    }
}

startGameLoop()