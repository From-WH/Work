var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
ouToCanvasSize(canvas)

listenToUser()



var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    actions.className = 'actions x'
}
brush.onclick = function () {
    eraserEnabled = false
    actions.className = 'actions'
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
    context.lineWidth = 5
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
            console.log(aaa)
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x, y, 10, 10)
            } else
                lastpoint = { 'x': x, 'y': y }
        }
        canvas.ontouchmove = function (aaa) {
            console.log('边播变动')
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
