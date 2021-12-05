

var mapa;

//Columna descubierta = true cubierta = false;
var estadoColumnas = [];

//BOOLEAN PARA ABRIR PUERTA SALIDA
var salida = true;

//POSICION INICIAL JUGADOR
var x = 8;
var y = 0;
var direccion = "Static";

//VIDAS
var vidas = 4;

//Array de villanos
var villanos = [];

//Nivel de pantalla
var nivel = 1;

//Interruptor inicio movimiento villanos(no se acciona hasta que jugador mueve)
var inicio = false;

//Elementos que adquiere al desbloquear columnas
//var inventario = [];

//Interruptor elementos descubiertos
var villanoDescubierto = false;
var llaveDescubierta = false;
var pergaminoDescubierto = false;
var esmeraldaDescubierta = false;
var poderMatarActivado = false;
var momiasMuertas = 0;

//Puntuacion
var score = 0;
var ptosMatarVillano = 500;
var ptosPisarCamino = 20;
var ptosSubirNivel = 1000; //(se multiplica por el nivel de pantalla en el que este)
var ptosDesbloquearElemento = 250;


window.onload = function () {

    crearCabecera();
    mapa = activarMatrizInicial();
    crearMapa();

}

window.addEventListener("keydown", function (event) {

    recogerPulsacion(event.key);

});


setInterval(activarVillanos, 400);


function activarMatrizInicial(mapa) {

    mapa = [

        [9, 9, 9, 9, 9, 9, 9, 9, 2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    ];

    return mapa;

}


function recogerPulsacion(event) {

    let posJugador = document.getElementById(y + " " + x);

    if (vidas > 0) {

        if (event == "ArrowDown") {

            inicio = true;

            if (y < 13 && mapa[y + 1][x] != 1) {

                posJugador.classList.remove("sonic" + direccion);

                if (salida) {

                    posJugador.classList.add("doorClose");
                    salida = false;

                } else {

                    posJugador.classList.add("caminoPisado");

                }

                if (mapa[y + 1][x] == 0) sumarPuntuacion(ptosPisarCamino);
                y++;
                direccion = "Down";
                posJugador = document.getElementById(y + " " + x);
                posJugador.classList.add("sonicDown");
                mapa[y][x] = 4;

            }


        }

        if (event == "ArrowUp") {

            if (y > 1 && mapa[y - 1][x] != 1) {

                posJugador.classList.remove("sonic" + direccion);
                posJugador.classList.add("caminoPisado");
                if (mapa[y - 1][x] == 0) sumarPuntuacion(ptosPisarCamino);
                y--;
                direccion = "Up";
                posJugador = document.getElementById(y + " " + x);
                posJugador.classList.add("sonicUp");
                mapa[y][x] = 4;

            }

        }

        if (event == "ArrowRight") {

            if (y > 0 && x < 20 && mapa[y][x + 1] != 1) {

                posJugador.classList.remove("sonic" + direccion);
                posJugador.classList.add("caminoPisado");
                if (mapa[y][x + 1] == 0) sumarPuntuacion(ptosPisarCamino);
                x++;
                direccion = "Right";
                posJugador = document.getElementById(y + " " + x);
                posJugador.classList.add("sonicRight");
                mapa[y][x] = 4;

            }
        }

        if (event == "ArrowLeft") {

            if (y > 0 && x > 0 && mapa[y][x - 1] != 1) {

                posJugador.classList.remove("sonic" + direccion);
                posJugador.classList.add("caminoPisado");
                if (mapa[y][x - 1] == 0) sumarPuntuacion(ptosPisarCamino);
                x--;
                direccion = "Left";
                posJugador = document.getElementById(y + " " + x);
                posJugador.classList.add("sonicLeft");
                mapa[y][x] = 4;

            }

        }

        //Llegar a casa despues de liberar llave + urna
        if (event == "ArrowUp" && esmeraldaDescubierta && llaveDescubierta && y == 1 && x == 9) {

            posJugador.classList.remove("sonic" + direccion);
            posJugador.classList.add("caminoPisado");
            if (mapa[y - 1][x] == 0) sumarPuntuacion(ptosPisarCamino);
            y--;
            direccion = "Up";
            posJugador = document.getElementById(y + " " + x);
            posJugador.classList.add("sonicUp");

            if (y == 0 && x == 9) subirDeNivel();

        }


        comprobarColumnas();

        for (let i = 0; i < villanos.length; i++) {

            if (villanos[i].posX == x && villanos[i].posY == y) {

                matarMomia(villanos[i].posX, villanos[i].posY, "sonic" + direccion);
                sumarPuntuacion(ptosMatarVillano);

                if (poderMatarActivado) {

                    poderMatarActivado = false;
                    

                } else {

                    restarVida();

                }

            }

        }

        if (esmeraldaDescubierta && llaveDescubierta) abrirPuerta();
        if (pergaminoDescubierto) {

            poderMatarActivado = true;
            pergaminoDescubierto = false;
            
           
        }
    }

    if (vidas == 0){

        finDeJuego();
    } 
}

// Esta funcion genera las coordenadas que corresponden a las esquinas de las cajas  
function comprobarColumnas() {

    let completa;

    for (let y = 1; y < 13; y += 3) {

        for (let x = 1; x < 20; x += 4) {

            completa = false;

            completa = rodearColumna(y, x);

            estadoColumnas.push(completa);

        }

    }

    revisarEstilos(estadoColumnas);
    estadoColumnas = [];

}

//Con las coordenadas de las esquinas de la caja la rodea para comprobar pisadas (si 14 pisadas devuelve true )
function rodearColumna(PosY, PosX) {

    let completa = false;
    let cont = 0;


    for (let x = 0; x < 4; x++) {

        if (mapa[PosY][PosX] == 4) {

            cont++;

        }

        PosX++;

    }

    PosY++;
    PosX--;

    for (let y = 0; y < 3; y++) {

        if (mapa[PosY][PosX] == 4) {

            cont++;

        }

        PosY++;
    }

    PosX--;
    PosY--;

    for (let x = 0; x < 4; x++) {

        if (mapa[PosY][PosX] == 4) {

            cont++;
        }

        PosX--;

    }

    PosY--;
    PosX++;


    for (let y = 0; y < 3; y++) {

        if (mapa[PosY][PosX] == 4) {

            cont++;

        }

        PosY--;
    }

    if (cont == 14) {

        completa = true;

    }

    return completa;
}


function revisarEstilos(estadoColumnas) {

    let columnasModificadas = [];

    for (let i = 0; i < estadoColumnas.length; i++) {

        if (estadoColumnas[i] == true) {

            columnasModificadas = document.getElementsByClassName("columna" + i);
            modificarEstilo(columnasModificadas);


        }
    }
}

function modificarEstilo(columnasModificadas) {

    for (let i = 0; i < columnasModificadas.length; i++) {

        if (i == 4) {

            columnasModificadas[i].classList.remove("columna");
        }


        if (columnasModificadas[i].classList.contains("columnaLlave")) {

            if (!llaveDescubierta) {

                sumarPuntuacion(ptosDesbloquearElemento);
                llaveDescubierta = true;


            }

        }

        if (columnasModificadas[i].classList.contains("columnaPergamino")) {

            if (!pergaminoDescubierto && momiasMuertas == 0) {

                console.log("columna pergamino encontrada");
                sumarPuntuacion(ptosDesbloquearElemento);
                pergaminoDescubierto = true;
                momiasMuertas ++;
               

            }

        }

        if (columnasModificadas[i].classList.contains("columnaVillano")) {

            if (!villanoDescubierto) {
                
                let villano = crearVillano(generarAleatorioX(), Math.floor(Math.random() * (13 - 8)) + 8);
                villanos.push(villano);
                asignarPosicionVillano(villano);
                villanoDescubierto = true;

            }

        }

        if (columnasModificadas[i].classList.contains("columnaEsmeralda")) {

            if (!esmeraldaDescubierta) {

                sumarPuntuacion(ptosDesbloquearElemento);
                esmeraldaDescubierta = true;
               

            }

        }
    }
}

function crearCabecera() {

    let nodoPadre = document.getElementById("header");
    let divScore = document.createElement("div");
    let divLevel = document.createElement("div");
    let texto = "";

    divScore.setAttribute("id", "score");

    divLevel.setAttribute("id", "level");
    texto = document.createTextNode("LEVEL " + nivel);
    divLevel.appendChild(texto);

    nodoPadre.appendChild(divScore);
    nodoPadre.appendChild(divLevel);

    for (let i = 0; i < 4; i++) {

        let divLifes = document.createElement("div");
        divLifes.setAttribute("class", "vidas");
        divLifes.setAttribute("id", i);
        nodoPadre.appendChild(divLifes);

    }

}

function crearMapa() {

    let numColumna = 0;
    let memoColumna = 0;
    let cont1 = 0;
    let cont2 = 0;
    let contY = 2;
    let nodoPadre = document.getElementById("mapa");
    let newDiv;

    for (let y = 0; y < mapa.length; y++) {

        for (let x = 0; x < mapa[0].length; x++) {

            if (nivel == 1) {

                newDiv = document.createElement("div");
                newDiv.setAttribute("id", y + " " + x);

            } else {

                newDiv = document.getElementById(y + " " + x);
                newDiv.classList.remove("caminoPisado");
                borrarRastroEnTablero(newDiv);
            }

            let elemento = "";

            /* RELLENA CAMINO */
            if (y != 0) newDiv.classList.add("camino");

            /* RELLENA COLUMNAS Y ASIGNA SUS POSIBLES CLASES */
            if (mapa[y][x] == 1 && contY == y) {

                newDiv.classList.add("columna");
                newDiv.classList.add("columna" + numColumna);

                cont1++;

                if (cont1 == 3) {

                    numColumna++;
                    cont1 = 0;

                }

                if (x == 19) {

                    if (cont2 == 0) {

                        contY++;
                        cont2++;
                        numColumna = memoColumna;

                    } else {

                        cont2 = 0;
                        contY += 2;
                        memoColumna = numColumna;

                    }

                }

            }

            if (mapa[y][x] == 2) newDiv.classList.add("sonicStatic");


            nodoPadre.appendChild(newDiv);

        }

    }

    asignarElementosEnTablero();
    crearEjercito(nivel);


}

function asignarElementosEnTablero() {

    //Elementos que deben contener ocultas las columnas
    let elementos = ["Llave", "Pergamino", "Villano", "Esmeralda", "Nada", "Nada", "Nada", "Nada", "Nada"
        , "Nada", "Nada", "Nada", "Nada", "Nada", "Nada", "Nada", "Nada", "Nada", "Nada", "Nada"];

    let elemento = "";

    let serieAleatoria = generarSerieAleatoria();

    for (let i = 0; i < 20; i++) {

        let divsColumnas = document.getElementsByClassName("columna" + serieAleatoria[i]);
        elegirElemento(divsColumnas, elementos[i]);

    }


}

function generarSerieAleatoria() {

    var listaNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

    var i, j, k;

    for (i = listaNum.length; i > 0; i--) {

        j = Math.floor(Math.random() * i);
        k = listaNum[i - 1];

        listaNum[i - 1] = listaNum[j];
        listaNum[j] = k;

    }

    return listaNum;

}

function elegirElemento(divsColumnas, elemento) {

    for (let i = 0; i < divsColumnas.length; i++) {

        divsColumnas[i].classList.add("columna" + elemento);

    }


}

/****  CREACION DE VILLANOS *****/

//Constructor de villanos
function Villano(x = 0, y = 0, direccion = "", alerta = false, memoriaCoordenada = 0) {

    this.posX = x;
    this.posY = y;
    this.direccion = direccion;
    this.alerta = alerta;
    this.memoriaCoordenada = memoriaCoordenada;

};

//Creacion y colocacion en el tablero
function crearEjercito(cantidadDeVillanos) {

    villanos = [];

    for (let i = 0; i < cantidadDeVillanos; i++) {

        let villano = crearVillano(generarAleatorioX(), Math.floor(Math.random() * (13 - 8)) + 8);
        villanos.push(villano);

    }

    for (let i = 0; i < villanos.length; i++) {

        asignarPosicionVillano(villanos[i]);

    }

}

function crearVillano(x, y) {

    let villano = new Villano(x, y, "Right", false, 0);

    return villano;

}

function asignarPosicionVillano(villano) {

    let div = document.getElementById(villano.posY + " " + villano.posX);
    div.classList.add("eggmanStatic");

}


function generarAleatorioX() {


    let posiciones = [0, 4, 12, 16, 20];

    return posiciones[Math.floor(Math.random() * 5)];


}

function activarVillanos() {

    actualizarPuntuacion();

    if (inicio) {

        for (let i = 0; i < villanos.length; i++) {

           
            let div = document.getElementById(villanos[i].posY + " " + villanos[i].posX);
            eligeDireccion(villanos[i]);

            let div2 = document.getElementById(villanos[i].posY + " " + villanos[i].posX);

            modificarDiv(div, div2, villanos[i].direccion, poderMatarActivado);

            if (villanos[i].posX == x && villanos[i].posY == y) {

                matarMomia(villanos[i].posX, villanos[i].posY, "sonic" + direccion);
                sumarPuntuacion(ptosMatarVillano);
                

                if (poderMatarActivado) {

                    poderMatarActivado = false;
                
                } else {

                    restarVida();

                }

            }

            if (vidas == 0) finDeJuego();

        }
    }
}

function eligeDireccion(villano) {

    //BUSCA SOLO ENTRE COLUMNAS
    if (y == 1 || y == 4 || y == 7 || y == 10 || y == 13) {

        if (y == villano.posY) {

            if (x < villano.posX && villano.direccion != "Right") {

                villano.direccion = "Left";
                villano.alerta = true;
                villano.memoriaCoordenada = x;

            }

            if (x > villano.posX && villano.direccion != "Left") {

                villano.direccion = "Right";
                villano.alerta = true;
                villano.memoriaCoordenada = x;

            }

        }

    }

    if (x == 0 || x == 4 || x == 8 || x == 12 || x == 16 || x == 20) {

        if (x == villano.posX) {

            if (y < villano.posY && villano.direccion != "Down") {

                villano.direccion = "Up";
                villano.alerta = true;
                villano.memoriaCoordenada = x;

            }

            if (y > villano.posY && villano.direccion != "Up") {

                villano.direccion = "Down";
                villano.alerta = true;
                villano.memoriaCoordenada = x;

            }
        }
    }

    //MOVIMIENTO ALEATORIO VILLANO

    if (!villano.alerta) {

        if (villano.direccion == "Up" || villano.direccion == "Down") {


            if (villano.posY < 13) {

                if (mapa[villano.posY][villano.posX - 1] == 0 || mapa[villano.posY][villano.posX - 1] == 4 ||
                    mapa[villano.posY][villano.posX + 1] == 0 || mapa[villano.posY][villano.posX + 1] == 4) {

                    villano.direccion = direccionRandom(villano.direccion);

                }


            } else {


                villano.direccion = direccionRandom(villano.direccion);
            }

        }

        if (villano.direccion == "Right" || villano.direccion == "Left") {

            if (villano.posY < 13) {

                if (mapa[villano.posY - 1][villano.posX] == 0 || mapa[villano.posY - 1][villano.posX] == 4 ||
                    mapa[villano.posY + 1][villano.posX] == 0 || mapa[villano.posY + 1][villano.posX] == 4) {

                    villano.direccion = direccionRandom(villano.direccion);


                }

            } else {

                if (villano.posX == 0) villano.direccion = "Up";
                if (villano.posX == 20) villano.direccion = "Up";
            }

        }


        moverVillano(villano, 1);

    } else {

        if (villano.direccion == "Right" || villano.direccion == "Left") {

            if (villano.posX != villano.memoriaCoordenada && villano.posX != 20 && villano.posX != 0) {

                if (villano.posX == 19 || villano.posX == 1 || Math.abs(villano.posX - x == 1) || Math.abs(villano.posX - x == 2)) {

                    moverVillano(villano, 1);

                } else {

                    moverVillano(villano, 1);

                }

            } else {

                moverVillano(villano, 1);
                villano.alerta = false;
            }


        }

        if (villano.direccion == "Up" || villano.direccion == "Down") {

            if (villano.posY != villano.memoriaCoordenada && villano.posY != 13 && villano.posY != 1) {

                if (villano.posY == 12 || villano.posY == 2 || Math.abs(villano.posY - y == 1) || Math.abs(villano.posY - y == 2)) {

                    moverVillano(villano, 1);

                } else {

                    moverVillano(villano, 1);
                }

            } else {

                moverVillano(villano, 1);
                villano.alerta = false;
            }

        }

    }


}

function restarVida() {

    let div = document.getElementById(y + " " + x);

    borrarRastroEnTablero(div);

    div = document.getElementById(0 + " " + 8);
    x = 8;
    y = 0;
    direccion = "Static";
    div.classList.add("sonicStatic");

    div = document.getElementById(vidas - 1);
    div.classList.remove("vidas");

    for (let i = 0; i < villanos.length; i++) {

        let div = document.getElementById(villanos[i].posY + " " + villanos[i].posX);

        borrarRastroEnTablero(div);

    }

    crearEjercito(villanos.length);
    inicio = false;
    salida = true;

    vidas--;
}

function finDeJuego() {

    let nodoPadre = document.querySelector("body");
    let divGameOver =  document.createElement("div");
    let parrafo = document.createElement("p");
    let texto = document.createTextNode("Press F5 to play again");

    parrafo.appendChild(texto);
    parrafo.classList.add("parpadea");
    divGameOver.appendChild(parrafo);
    divGameOver.classList.add("gameOver");  
    nodoPadre.appendChild(divGameOver);
}

function modificarDiv(div, div2, direccion,alerta) {

    let estadoAlerta = "";

    if(alerta) estadoAlerta = "Alerta";
    borrarRastroEnTablero(div);
    div2.classList.add("eggman" + direccion + estadoAlerta);

}

function moverVillano(villano, avance) {


    if (villano.direccion == "Down") {

        if (villano.posY < 13 && mapa[villano.posY + 1][villano.posX] != 1) {

            villano.posY += avance;
        }


    }

    if (villano.direccion == "Up") {

        if (villano.posY > 1 && mapa[villano.posY - 1][villano.posX] != 1) {

            villano.posY -= avance;

        }



    }
    if (villano.direccion == "Right") {

        if (villano.posX < 20 && mapa[villano.posY][villano.posX + 1] != 1) {

            villano.posX += avance;
        }



    }

    if (villano.direccion == "Left") {

        if (villano.posX > 0 && mapa[villano.posY][villano.posX - 1] != 1) {

            villano.posX -= avance;

        }

    }

}

function direccionRandom(direccionPrevia) {

    let direcciones = ["Left", "Right", "Up", "Down"];
    let direccion = "";
    let direccionNoValida = true;

    while (direccionNoValida) {

        direccion = direcciones[Math.floor(Math.random() * 4)];

        if (direccion == "Left" && direccionPrevia != "Right") {

            direccionNoValida = false;
        }
        if (direccion == "Right" && direccionPrevia != "Left") {

            direccionNoValida = false;

        }
        if (direccion == "Up" && direccionPrevia != "Down") {

            direccionNoValida = false;

        }
        if (direccion == "Down" && direccionPrevia != "Up") {

            direccionNoValida = false;
        }

    }

    return direccion;

}


function sumarPuntuacion(cantidad) {

    score += cantidad;

}

function actualizarPuntuacion() {

    let divScore = document.getElementById("score").innerText = "SCORE " + score;

}

function abrirPuerta() {

    let div = document.getElementById(0 + " " + 9);
    div.classList.add("door");
    div.classList.add("parpadea");
    div = document.getElementById(0 + " " + 8);
    div.classList.remove("doorClose");

    div = document.getElementById(1 + " " + 9);
    div.classList.add("flecha");
    

}

function subirDeNivel() {

    nivel++;
    let divScore = document.getElementById("level").innerText = "LEVEL " + nivel;

    mapa = activarMatrizInicial();
    crearMapa();

    salida = true;
    esmeraldaDescubierta = false;
    pergaminoDescubierto = false;
    llaveDescubierta = false;
    villanoDescubierto = false;
    inicio = false;
    direccion = "Static";
    momiasMuertas = 0;
    poderMatarActivado = false;

    score += ptosSubirNivel * nivel;
    x = 8;
    y = 0;

}

function matarMomia(x, y, direccionSonic) {

    for (let i = 0; i < villanos.length; i++) {

        if (villanos[i].posX == x && villanos[i].posY == y) {

            let div = document.getElementById(villanos[i].posY + " " + villanos[i].posX);
            borrarRastroEnTablero(div);
            div.classList.add(direccionSonic);
            villanos.splice(i, 1);
            
        }

    }

}

function borrarRastroEnTablero(div) {

    div.classList.remove("eggmanUp");
    div.classList.remove("eggmanDown");
    div.classList.remove("eggmanLeft");
    div.classList.remove("eggmanRight");
    div.classList.remove("eggmanStatic");
    div.classList.remove("eggmanUpAlerta");
    div.classList.remove("eggmanDownAlerta");
    div.classList.remove("eggmanLeftAlerta");
    div.classList.remove("eggmanRightAlerta");
    div.classList.remove("eggmanStatic");
    div.classList.remove("sonicLeft");
    div.classList.remove("sonicRight");
    div.classList.remove("sonicUp");
    div.classList.remove("sonicDown");
    div.classList.remove("columnaLlave");
    div.classList.remove("columnaPergamino");
    div.classList.remove("columnaVillano");
    div.classList.remove("columnaEsmeralda");
    div.classList.remove("columnaNada");
    div.classList.remove("door");
    div.classList.remove("parpadea");
    div.classList.remove("flecha");
   
}



