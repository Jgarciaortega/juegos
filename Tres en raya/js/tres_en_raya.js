window.onload = function () {

    crearTablero();
}

var turnoCPU = false;
var finDeJuego = false;

function crearTablero() {

    const nodoPadre = document.querySelector("#tablero");
    const nodoHeader = document.querySelector("#header");

    let texto = document.createTextNode("3 en Raya");
    nodoHeader.appendChild(texto);

    for (let y = 0; y < 3; y++) {

        for (let x = 0; x < 3; x++) {

            let casilla = document.createElement("div");
            casilla.setAttribute("class", "casilla");
            casilla.setAttribute("id", y + " " + x);
            casilla.addEventListener("mousedown", marcarCasilla);
            nodoPadre.appendChild(casilla);

        }
    }
}

function marcarCasilla(e) {

    const div = e.target;

    if (!finDeJuego) {

        setTimeout(eligeCPU, 1000);

        if (!turnoCPU) {

            div.classList.add("cruz");
            turnoCPU = true;
        }

        comprobarVictoria();

    }
}

function eligeCPU() {

    let tablero = document.querySelectorAll(".casilla");
    let cont = 0;
    let divValido = false;

    if(!finDeJuego){

        while (!divValido) {

            let y = Math.floor(Math.random() * (3));
            let x = Math.floor(Math.random() * (3));
    
            let div = document.getElementById(y + " " + x);
    
            if (!div.classList.contains("circulo") && !div.classList.contains("cruz")) {
    
                div.classList.add("circulo");
                divValido = true;
    
            }

        }
        comprobarVictoria();
    }
   
    turnoCPU = false;
}

function comprobarVictoria() {

    let contCirculo = 0;
    let contCruz = 0;

    //COMPROBACION HORIZONTAL

    for (let y = 0; y < 3; y++) {

        for (let x = 0; x < 3; x++) {

            let casilla = document.getElementById(y + " " + x);
            casilla.classList.contains("circulo") ? contCirculo++ : contCirculo = 0;
            casilla.classList.contains("cruz") ? contCruz++ : contCruz = 0;

        }

        if (contCirculo == 3 || contCruz == 3) {

            finDeJuego = true;
            alert("FIN DEL JUEGO");
            break;

        }

    }


    //COMPROBACION VERTICAL

    for (let x = 0; x < 3; x++) {

        for (let y = 0; y < 3; y++) {

            let casilla = document.getElementById(y + " " + x);
            casilla.classList.contains("circulo") ? contCirculo++ : contCirculo = 0;
            casilla.classList.contains("cruz") ? contCruz++ : contCruz = 0;

        }

        if (contCirculo == 3 || contCruz == 3) {

            finDeJuego = true;
            alert("FIN DEL JUEGO");
            break;

        }
    }


    //COMPROBACION DIAGONAL

    // Derecha
    for (let i = 0; i < 3; i++) {

        let casilla = document.getElementById(i + " " + i);
        casilla.classList.contains("circulo") ? contCirculo++ : contCirculo = 0;
        casilla.classList.contains("cruz") ? contCruz++ : contCruz = 0;

        if (contCirculo == 3 || contCruz == 3) {

            finDeJuego = true;
            alert("FIN DEL JUEGO");
            break;

        }

    }

    // Izquierda
    for (let y = 2, x = 0; y >= 0; y-- , x++) {

        let casilla = document.getElementById(y + " " + x);
        casilla.classList.contains("circulo") ? contCirculo++ : contCirculo = 0;
        casilla.classList.contains("cruz") ? contCruz++ : contCruz = 0;

        if (contCirculo == 3 || contCruz == 3) {

            finDeJuego = true;
            alert("FIN DEL JUEGO");
            

        }

    }


}

