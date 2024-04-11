
var cvs = document.getElementById("canvas")
var ctx = cvs.getContext("2d")

var bird = new Image()
var bg = new Image()
var fg = new Image()
var pipeUp = new Image()
var pipeBottom = new Image()

bird.src = "assets/img/bird.png"
bg.src = "assets/img/bg.png"
fg.src = "assets/img/grass.png"
pipeUp.src = "assets/img/stolb-v.png"
pipeBottom.src = "assets/img/stolb-n.png"


// звук 

var fly = new Audio()
var scoreAudio = new Audio()

fly.src = "assets/audio/fly.mp3"
scoreAudio.src = "assets/audio/score.mp3"


var gap = 90


// при нажатии птица подлетает

document.addEventListener("keydown", moveUp)

function moveUp() {
    yPos -= 29
    fly.play()
}



//создание блоков 

var pipe = []

pipe [0] = {
    x : cvs.width,
    y : 0
}


var score = 0

// позиция птицы

var xPos = 10
var yPos = 150
var grav = 1.5




function draw() {
    ctx.drawImage(bg, 0, 0)

    for(var i = 0; i < pipe.length; i++) {

        // повторяет припятствия 

        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap) 

        // делает припатствия то ниже то выше

        pipe[i].x--

        if(pipe[i].x == 125) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }

        if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload()
        }

        if(pipe[i].x == 5) {
            score++
            scoreAudio.play()
        }

    }



    ctx.drawImage(fg, 0, cvs.height - fg.height)

    ctx.drawImage(bird, xPos, yPos)

    yPos += grav

    ctx.fillStyle = "#000"
    ctx.font = "24px"
    ctx.fillText = ("Счет: " + score, 10, cvs.height - 20)
    requestAnimationFrame(draw)
}

pipeBottom.onload = draw

