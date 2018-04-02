var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
widthHeight()

window.onresize = function () {
    widthHeight()
}
function widthHeight() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
}

var using = false
var lastpoint = { x: undefined, y: undefined }
canvas.onmousedown = function (aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
    if (eraserEnabled) {
        using = true
        context.clearRect(x, y, 10, 10)
    } else
        using = true
    lastpoint = { 'x': x, 'y': y }
}
canvas.onmousemove = function (aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
    if (eraserEnabled) {
        if (using) {
            context.clearRect(x-5, y-5, 10, 10)   
        }
    } else {
        if (using) {
            using = true
            var newpoint = { 'x': x, 'y': y }
            drawline(lastpoint.x, lastpoint.y, newpoint.x, newpoint.y)
            lastpoint = newpoint
        }
    }
}
canvas.onmouseup = function (aaa) {
    using = false
}
function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

function drawline(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineWidth = 5
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = !eraserEnabled
}