window.onload = function () {

    var stage = document.getElementById('stage')
    var ctx = stage.getContext("2d")
    document.addEventListener("keydown", keyPush)

    setInterval(game, 80) //a cada 80 milisegundos chamaremos nossa function "game", logo esse é a velocidade do jogo

    const vel = 1 //velocidade da cobra
    var vx = vy = 0
    var px = 10 //posição da cabeça da cobra
    var py = 15
    var tp = 20 //tamanho da peça
    var qp = 25 //quantidade de peças
    var ax = ay = 15 //posição incial da maçã

    var trail = []
    tail = 5 //tamanho incial da cobra

    function game() {
        px += vx
        py += vy
        if (px < 0) { //sistema para que a colisão com a parede nao exista
            px = qp - 1
        }
        if (px > qp - 1) { 
            px = 0
        }
        if (py < 0) {
            py = qp - 1
        }
        if (py > qp - 1) {
            py = 0
        }


        ctx.fillStyle = "#32CD32"
        ctx.fillRect(0, 0, stage.width, stage.height) //fundo do game

        ctx.fillStyle = "red"
        ctx.fillRect(ax * tp, ay * tp, tp, tp) //maçã

        ctx.fillStyle = "#006400"
        for (let i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1) //cobra

            if (trail[i].x == px && trail[i].y == py) { //conferindo se as partes do corpo estão em conflito
                vx = vy = 0 //parando a cobra se ela se bater
                tail = 5 //resetando após parada para o tamanho de corpo igual ao iniciado
            }
        }

        trail.push({ x: px, y: py }) //capturando a posição atual
        while (trail.length > tail) {
            trail.shift() //tirando o primeiro elemento do array se ele for maior que a cauda, dando a movimentação
        }

        if (ax == px && ay == py) {
            tail++ //adicionando +1 ao corpo da cobra
            ax = Math.floor(Math.random() * qp) //reposicionando a maçã
            ay = Math.floor(Math.random() * qp)
        }

    }

    function keyPush(event) {
        switch (event.keyCode) {
            case 37: //Left
                vx = -vel
                vy = 0
                break
            case 38: //Up
                vx = 0
                vy = -vel
                break
            case 39: //Right
                vx = vel
                vy = 0
                break
            case 40: //Down
                vx = 0
                vy = vel
                break
        }
    }
}
