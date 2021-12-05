
//Variables globales
let sudoku = [];
let dificultad = 18;
let finPartida = false;


//Funciones

function generarDificultad() {

    let valido = false;

    while (!valido || dificultad > 0) {

        let x = Math.floor(Math.random() * 9);
        let y = Math.floor(Math.random() * 9);

        if (sudoku[x][y] != '-') {

            sudoku[x][y] = '-';
            valido = true;
            dificultad--;
        }
    }

}

function crearTablero() {

    let nodoPpal = document.querySelector('#zonaDeJuego');
    let tablero = document.createElement('div');
    let casilla;
    let cont = 0;
    let cambio = false;

    tablero.setAttribute('id', 'tablero');
    nodoPpal.appendChild(tablero);

    for (let x = 0; x < 9; x++) {

        if (x % 3 == 0 && x != 0) {

            if (cambio) {

                cambio = false;

            } else {

                cambio = true;
            }
        }
        cont = 0;

        for (let y = 0; y < 9; y++) {

            casilla = document.createElement('div');
            casilla.setAttribute('id', x + " " + y);

            if (sudoku[x][y] != "-") {

                casilla.innerText = sudoku[x][y];

            } else {

                casilla.addEventListener('click', activarCelda);
            }

            casilla.classList.add('casilla');

            if (!cambio) {

                if (cont < 3) {

                    casilla.classList.add('casillaGris');
                }

                if (cont > 5 && cont < 9) {

                    casilla.classList.add('casillaGris');
                }

            } else {

                if (cont > 2 && cont < 6) {

                    casilla.classList.add('casillaGris');
                }
            }
            cont++;
            tablero.appendChild(casilla);
        }
    }

}

function crearCabecera() {

    let nodoHeader = document.querySelector('#header');
    let titulo = document.createElement('span');

    let combo = document.createElement('select');
    let opcion1 = document.createElement('option');
    let opcion2 = document.createElement('option');
    let opcion3 = document.createElement('option');

    //Creacion combo
    opcion1.setAttribute('value', 1);
    opcion1.innerText = 'Beginner';
    opcion2.setAttribute('value', 1.5);
    opcion2.innerText = ('Intermediate');
    opcion3.setAttribute('value', 2);
    opcion3.innerText = ('High level');

    combo.appendChild(opcion1);
    combo.appendChild(opcion2);
    combo.appendChild(opcion3);
    combo.addEventListener('change', cambiarNivel);

    nodoHeader.appendChild(titulo);
    nodoHeader.appendChild(combo);

}


function crearTeclado() {

    let nodoPpal = document.querySelector('#zonaDeJuego');
    let botonera = document.createElement('div');
    let teclado = document.createElement('div');
    let divEnviar = document.createElement('div');
    let tecla = document.createElement('button');

    botonera.setAttribute('id', 'botonera');
    nodoPpal.appendChild(botonera);


    //Configuracion tecla enviar
    tecla.innerText = 'CHECK';
    tecla.addEventListener('click', comprobarSudoku);
    tecla.classList.add('tecla');
    divEnviar.appendChild(tecla);

    teclado.setAttribute('id', 'teclado');

    //Creacion teclado numerico
    for (let i = 1; i <= 9; i++) {

        tecla = document.createElement("button");
        tecla.innerText = i;
        tecla.addEventListener('click', recogerClick);
        tecla.classList.add('tecla');
        teclado.appendChild(tecla);
    }

    botonera.appendChild(teclado);
    botonera.appendChild(divEnviar);
}

function activarCelda() {

    let celda = compruebaSiCeldaActiva();

    //Con esta opcion comprobamos si ya hay una casilla previamente activa. De haberla se desactiva
    if (celda != undefined) celda.classList.remove('casillaActiva');

    if(!finPartida) this.classList.add('casillaActiva');
    

}

function apuntarNum(digito) {

    let celda = compruebaSiCeldaActiva();

    if (celda != undefined) {

        celda.classList.add('casillaRellenada');
        celda.innerText = digito;
        celda.classList.remove('casillaActiva');

    } else {

        alert("Debe seleccionar primero una celda del tablero");
    }

}

function compruebaSiCeldaActiva() {

    let celdaActiva;

    for (let x = 0; x < 9; x++) {

        for (let y = 0; y < 9; y++) {

            let celda = document.getElementById(x + " " + y);

            if (celda.classList.contains('casillaActiva')) {

                celdaActiva = celda;

            }

        }
    }

    return celdaActiva;

}

function recogerPulsacion(ev) {

    if (!finPartida) {

        if (/[1-9]/.test(ev.key)) {

            apuntarNum(ev.key);

        }
    }
}

function recogerClick() {

    if (!finPartida) apuntarNum(this.innerText);
}


function comprobarSudoku() {

    (comprobacionHorizontal() && comprobacionVertical() && comprobacionCuadrante()) ? pantallaFin('acertado') : pantallaFin('fallado');

}


function comprobacionVertical() {

    let arrayCheck = [];
    let valido = true;

    for (let y = 0; y < 9 && valido; y++) {
        for (let x = 0; x < 9; x++) {

            arrayCheck.push(document.getElementById(x + ' ' + y).innerText);
        }

        valido = compruebaTraza(arrayCheck.sort());
        arrayCheck = [];
    }

    return valido;
}

function comprobacionHorizontal() {

    let arrayCheck = [];
    let valido = true;

    for (let x = 0; x < 9 && valido; x++) {
        for (let y = 0; y < 9; y++) {

            arrayCheck.push(document.getElementById(x + ' ' + y).innerText);
        }

        valido = compruebaTraza(arrayCheck.sort());
        arrayCheck = [];
    }

    return valido;
}


function comprobacionCuadrante() {

    let arrayCheck = [];
    let valido = true;

    for (let x2 = 0; x2 < 9 && valido; x2 += 3) {

        for (let y2 = 0; y2 < 9 && valido; y2 += 3) {

            for (let x = x2; x < x2 + 3; x++) {

                for (let y = y2; y < y2 + 3; y++) {

                    arrayCheck.push(document.getElementById(x + ' ' + y).innerText);

                }

            }

            valido = compruebaTraza(arrayCheck.sort());
            arrayCheck = [];

        }
    }

    return valido;

}

function compruebaTraza(arrayCheck) {

    let arrayPlantilla = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let valido = true;

    for (let i = 0; i < arrayCheck.length; i++) {

        if (arrayCheck[i] != arrayPlantilla[i]) valido = false;

    }

    return valido;
}


function pantallaFin(resultado) {

    let nodoBody = document.querySelector('body');
    let divRes = document.createElement('div');
    let parrafo = document.createElement('p');
    let texto = document.createTextNode("PULSE F5");

    parrafo.setAttribute('id', 'mensajeRecarga');
    parrafo.classList.add('parpadea');

    if (resultado == 'acierto') {

        parrafo.appendChild(texto);
        divRes.setAttribute('id', 'acierto');
        divRes.appendChild(parrafo);

    }

    if (resultado == 'fallado') {

        parrafo.appendChild(texto);
        divRes.setAttribute('id', 'fallo');
        divRes.appendChild(parrafo);
    }

    divRes.classList.add('finPartida');
    nodoBody.appendChild(divRes);

    finalizarPartida();


}

function finalizarPartida() {

    finPartida = true;

}


function cambiarNivel(ev) {

    dificultad = 18 * ev.target.value;

    let nodoPpal = document.querySelector('#zonaDeJuego');
    nodoPpal.removeChild(document.querySelector('#tablero'));
    nodoPpal.removeChild(document.querySelector('#botonera'));

    iniciarSudoku();
    generarDificultad();
    crearTablero();
    crearTeclado();

}

function iniciarSudoku() {

    let listaSudokus = [];

    sudoku1 = [

        [5, 7, 6, 1, 8, 3, 9, 2, 4],
        [2, 8, 4, 5, 6, 9, 3, 7, 1],
        [3, 9, 1, 7, 4, 2, 8, 6, 5],
        [9, 3, 8, 6, 5, 7, 1, 4, 2],
        [7, 4, 2, 9, 3, 1, 6, 5, 8],
        [1, 6, 5, 4, 2, 8, 7, 3, 9],
        [6, 2, 9, 3, 1, 4, 5, 8, 7],
        [8, 5, 7, 2, 9, 6, 4, 1, 3],
        [4, 1, 3, 8, 7, 5, 2, 9, 6]

    ];

    sudoku2 = [

        [6, 1, 7, 8, 3, 2, 9, 5, 4],
        [8, 9, 3, 4, 5, 6, 1, 7, 2],
        [4, 5, 2, 7, 1, 9, 3, 8, 6],
        [2, 6, 9, 5, 7, 8, 4, 1, 3],
        [3, 7, 8, 2, 4, 1, 6, 9, 5],
        [5, 4, 1, 6, 9, 3, 7, 2, 8],
        [7, 3, 5, 9, 2, 4, 8, 6, 1],
        [9, 8, 4, 1, 6, 5, 2, 3, 7],
        [1, 2, 6, 3, 8, 7, 5, 4, 9]

    ];


    listaSudokus.push(sudoku1);
    listaSudokus.push(sudoku2);

    sudoku = listaSudokus[Math.floor(Math.random() * 2)];
}


function init() {

    iniciarSudoku();
    generarDificultad();
    crearCabecera();
    crearTablero();
    crearTeclado();


}

window.onload = init;
window.addEventListener('keypress', recogerPulsacion);