const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width= window.innerWidth;
canvas.height=window.innerHeight;

var keyboard = {}
const gameobjects = []
const colors = [
    "blue",
    "red",
    // "yellow",
    // "green", 
    // "orange",
    "pink"
]

function gameobject_create(x, y, dx, dy, c) {
    let obj = {
        x: x || 0,
        y: y || 0,
        dx: dx || 0,
        dy: dy || 0,
        c: c || "green"
    }
    gameobjects.push(obj)
    return obj    
}

function rect_create(x, y, w, h, dx, dy, c) {
    let rect = gameobject_create(x, y, dx, dy, c)
    rect.w = w || 100
    rect.h = h || 100
    rect.draw = rect_draw,
    rect.update = rect_update
    return rect
}

function rect_draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = this.c;
    ctx.fill();
    ctx.closePath();    
}

function rect_update() {
    this.x += this.dx
    this.y += this.dy
    if (this.x >= canvas.width - this.w)
        this.dx = -this.dx
    if (this.x < 0)
        this.dx = -this.dx
    if (this.y >= canvas.height - this.h)
        this.dy = -this.dy
    if (this.y < 0)
        this.dy = -this.dy
}


function circle_create(x, y, r, dx, dy, c) {
    let circle = gameobject_create(x, y, dx, dy, c)
    circle.r = r || 100
    circle.draw = circle_draw,
    circle.update = circle_update
    return circle
}

function circle_draw() {
    ctx.beginPath();
    ctx.globalAlpha = 50/100;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.c;
    ctx.fill();
    ctx.closePath();    
}

function circle_update() {
    if (keyboard[37] && this.dx > 0)
        this.dx = -this.dx
    this.x += this.dx
    this.y += this.dy
    if (this.x >= canvas.width - this.r)
        this.dx = -this.dx
    if (this.x - this.r < 0 && this.dx < 0)
        this.dx = -this.dx
    if (this.y >= canvas.height - this.r)
        this.dy = -this.dy
    if (this.y < this.r && this.dy < 0)
        this.dy = -this.dy
}

function init() {
    // rect_create(0, 0, canvas.width, canvas.height, 0, 0, "#BBBBBB")
    // for (let i = 0; i < 0; i++) {
    //     circle_create(0, 0, Math.random() * 200, Math.random() * 10, Math.random() * 10, colors[Math.floor(Math.random() * colors.length)])
    // }
}

function draw() {
    gameobjects.forEach(obj => obj.draw())
}

function update() {
    gameobjects.forEach(obj => obj.update())
}

function startGame() {
    init()
    setInterval(() => {
        update()
        draw()
    }, 10)
}

function doSetup() {
	attachEvent(document, "keydown", function(e) {
		keyboard[e.keyCode] = true;
	});
	attachEvent(document, "keyup", function(e) {
		keyboard[e.keyCode] = false;
	});
}

function attachEvent(node,name,func) {
    if(node.addEventListener) {
        node.addEventListener(name,func,false);
    } else if(node.attachEvent) {
        node.attachEvent(name,func);
    }
};

let gyroscope = new Gyroscope({frequency: 60});

var x = 200
var y = 250
var z = 20
ctx.beginPath();
ctx.arc(x, y, 20, 0, 2 * Math.PI, false);  // a circle at the start
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();

if(window.DeviceMotionEvent){
    window.addEventListener("devicemotion", motion, false);
}else{
    console.log("DeviceMotionEvent is not supported");
}

function motion(event){
    console.log("Accelerometer: "
      + event.accelerationIncludingGravity.x + ", "
      + event.accelerationIncludingGravity.y + ", "
      + event.accelerationIncludingGravity.z
    );

    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x, y, z, 0, 2 * Math.PI, false);  // a circle at the start
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    y += event.accelerationIncludingGravity.y
    if (y - z < 0)
      y = z
    if (y + z > canvas.height)
      y = canvas.height - z
    x -= event.accelerationIncludingGravity.x
    if (x - z < 0)
      x = z
    if (x + z > canvas.width)
      x = canvas.width - z
  }

gyroscope.addEventListener('reading', e => {

  console.log("Angular velocity along the X-axis " + gyroscope.x);
  console.log("Angular velocity along the Y-axis " + gyroscope.y);
  console.log("Angular velocity along the Z-axis " + gyroscope.z);
});
gyroscope.start();

var ongoingTouches = [];

function handleStart(evt) {
    evt.preventDefault();
    console.log("touchstart.");
    canvas.getContext("2d");
    var touches = evt.changedTouches;
  
    for (var i = 0; i < touches.length; i++) {
      console.log("touchstart:" + i + "...");
      ongoingTouches.push(copyTouch(touches[i]));
      var color = colorForTouch(touches[i]);
      ctx.beginPath();
      ctx.arc(touches[i].pageX, touches[i].pageY, 20, 0, 2 * Math.PI, false);  // a circle at the start
      ctx.fillStyle = color;
      ctx.fill();
      console.log("touchstart:" + i + ".");
    }
  }

  function handleMove(evt) {
    evt.preventDefault();
    canvas.getContext("2d");
    var touches = evt.changedTouches;
  
    for (var i = 0; i < touches.length; i++) {
      var color = colorForTouch(touches[i]);
      var idx = ongoingTouchIndexById(touches[i].identifier);
  
      if (idx >= 0) {
        console.log("continuing touch "+idx);
        ctx.beginPath();
        console.log("ctx.moveTo(" + ongoingTouches[idx].pageX + ", " + ongoingTouches[idx].pageY + ");");
        ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
        console.log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");
        ctx.lineTo(touches[i].pageX, touches[i].pageY);
        ctx.lineWidth = 20;
        ctx.strokeStyle = color;
        ctx.stroke();
  
        ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
        console.log(".");
      } else {
        console.log("can't figure out which touch to continue");
      }
    }
  }

  function handleEnd(evt) {
    evt.preventDefault();
    log("touchend");
    canvas.getContext("2d");
    var touches = evt.changedTouches;
  
    for (var i = 0; i < touches.length; i++) {
      var color = colorForTouch(touches[i]);
      var idx = ongoingTouchIndexById(touches[i].identifier);
  
      if (idx >= 0) {
        ctx.lineWidth = 4;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
        ctx.lineTo(touches[i].pageX, touches[i].pageY);
        ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
        ongoingTouches.splice(idx, 1);  // remove it; we're done
      } else {
        console.log("can't figure out which touch to end");
      }
    }
  }

  function log(msg) {
    var p = document.getElementById('log');
    p.innerHTML = msg + "\n" + p.innerHTML;
  }

  function ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < ongoingTouches.length; i++) {
      var id = ongoingTouches[i].identifier;
  
      if (id == idToFind) {
        return i;
      }
    }
    return -1;    // not found
  }

  function copyTouch({ identifier, pageX, pageY }) {
    return { identifier, pageX, pageY };
  }

  function colorForTouch(touch) {
    var r = touch.identifier % 16;
    var g = Math.floor(touch.identifier / 3) % 16;
    var b = Math.floor(touch.identifier / 7) % 16;
    r = r.toString(16); // make it a hex digit
    g = g.toString(16); // make it a hex digit
    b = b.toString(16); // make it a hex digit
    var color = "#" + r + g + b;
    console.log("color for touch with identifier " + touch.identifier + " = " + color);
    return color;
  }

  function handleCancel(evt) {
    evt.preventDefault();
    console.log("touchcancel.");
    var touches = evt.changedTouches;
  
    for (var i = 0; i < touches.length; i++) {
      var idx = ongoingTouchIndexById(touches[i].identifier);
      ongoingTouches.splice(idx, 1);  // remove it; we're done
    }
  }

canvas.addEventListener("touchstart", handleStart, false);
canvas.addEventListener("touchend", handleEnd, false);
canvas.addEventListener("touchcancel", handleCancel, false);
canvas.addEventListener("touchmove", handleMove, false);

doSetup()
startGame()
