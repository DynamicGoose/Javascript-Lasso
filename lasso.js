var canvas, ctx, flag = false,
initX = 0,
prevX = 0,
currX = 0,
initY = 0,
prevY = 0,
currY = 0,
dot_flag = false;

var posX = [];
var posY = [];
var points = [[100, 100], [100, 200], [100, 300], [100, 400], [100, 500], [100, 600], [100, 700], [100, 800], [100, 900], [200, 100], [200, 200], [200, 300], [200, 400], [200, 500], [200, 600], [200, 700], [200, 800], [200, 900], [300, 100], [300, 200], [300, 300], [300, 400], [300, 500], [300, 600], [300, 700], [300, 800], [300, 900], [400, 100], [400, 200], [400, 300], [400, 400], [400, 500], [400, 600], [400, 700], [400, 800], [400, 900], [500, 100], [500, 200], [500, 300], [500, 400], [500, 500], [500, 600], [500, 700], [500, 800], [500, 900], [600, 100], [600, 200], [600, 300], [600, 400], [600, 500], [600, 600], [600, 700], [600, 800], [600, 900], [700, 100], [700, 200], [700, 300], [700, 400], [700, 500], [700, 600], [700, 700], [700, 800], [700, 900], [800, 100], [800, 200], [800, 300], [800, 400], [800, 500], [800, 600], [800, 700], [800, 800], [800, 900], [900, 100], [900, 200], [900, 300], [900, 400], [900, 500], [900, 600], [900, 700], [900, 800], [900, 900]];

function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
    point = [200, 200]
    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);

    for (let i = 0; i < points.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.fillRect(points[i][0], points[i][1], 15, 15);
        ctx.stroke();
        ctx.closePath();
    }
}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        initX = currX;
        initY = currY;

        posX.length = 0;
        posY.length = 0;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.fillRect(currX, currY, 1, 1);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == 'out' && res == 'down') {
        flag = false;
        ctx.beginPath()
        ctx.moveTo(initX, initY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
        ctx.clearRect(0, 0, w, h);
        xy = [];
        for (let i = 0; i < posX.length; i++) {
            xy[i] = [posX[i], posY[i]];
        }
        for (let i = 0; i < points.length; i++) {
            console.log(inside(points[i], xy));
            if (inside(points[i], xy) == true) {
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.fillRect(points[i][0], points[i][1], 30, 30);
                ctx.stroke();
                ctx.closePath();
            }
            if (inside(points[i], xy) == false) {
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.fillRect(points[i][0], points[i][1], 15, 15);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            posX.push(currX);
            posY.push(currY);
            draw();
        }
    }
}

function inside(point, vs) {
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}