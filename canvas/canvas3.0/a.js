
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
lineWidth = 5
ouToCanvasSize(canvas)

listenToUser()

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

var eraserEnabled = false
pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

black.onclick = function () {
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')

}
red.onclick = function () {
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')

}
green.onclick = function () {
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
    yellow.classList.remove('active')
}
yellow.onclick = function () {
    context.fillStyle = 'yellow'
    context.strokeStyle = 'yellow'
    yellow.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
    green.classList.remove('active')

}
thin.onclick = function () {
    lineWidth = 3
}
thick.onclick = function () {
    lineWidth = 5
}
strong.onclick = function () {
    lineWidth = 10
}

download.onclick = function () {
    var url = canvas.toDataURL("image/png");
    var a = document.createElement('a')
    a.href  = url
    a.download = '我的作品'
    a.target = '_blank'
    a.click()
}

clear.onclick = function () {
    context.clearRect(0,0,canvas.width,canvas.height)
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
}
function ouToCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}
function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

function drawline(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineWidth = lineWidth
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}
function listenToUser() {
    var using = false
    var lastpoint = { x: undefined, y: undefined }

    //  特性检测
    if (document.body.ontouchstart === undefined) {
        //是不是触屏设备
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x, y, 10, 10)
            } else
                lastpoint = { 'x': x, 'y': y }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            if (!using) { return }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newpoint = { 'x': x, 'y': y }
                drawline(lastpoint.x, lastpoint.y, newpoint.x, newpoint.y)
                lastpoint = newpoint
            }
        }
        canvas.onmouseup = function (aaa) {
            using = false
        }
    } else {
        //是触屏设备
        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x, y, 10, 10)
            } else
                lastpoint = { 'x': x, 'y': y }
        }
        canvas.ontouchmove = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if (!using) { return }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newpoint = { 'x': x, 'y': y }
                drawline(lastpoint.x, lastpoint.y, newpoint.x, newpoint.y)
                lastpoint = newpoint
            }
        }
        canvas.ontouchend = function (aaa) {
            using = false
        }
    }
}
