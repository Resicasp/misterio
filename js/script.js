const personajes = document.getElementById("personajes");
const mapa = document.getElementById("mapa");
const paredes = document.querySelectorAll(".pared");

const llave = document.getElementById("llave");
const cofre = document.getElementById("cofre");

const pantallaFinal = document.getElementById("pantallaFinal");
const cerrarFinal = document.getElementById("cerrarFinal");

let x = 50;
let y = 50;

let camaraX = 0;
let camaraY = 0;

let tieneLlave = false;
let cofreAbierto = false;

const velocidad = 5;

const anchoMapa = 1600;
const altoMapa = 1200;

const anchoPantalla = 800;
const altoPantalla = 600;

const margenCamara = 200;

// HITBOX COMPLETA
const anchoPersonaje = 143;
const altoPersonaje = 99;


// =====================================
// COMPROBAR COLISIÓN CON PAREDES
// =====================================

function hayColision(nuevoX, nuevoY) {

    const personaje = {
        left: nuevoX,
        right: nuevoX + anchoPersonaje,
        top: nuevoY,
        bottom: nuevoY + altoPersonaje
    };

    for (const pared of paredes) {

        const paredRect = {
            left: pared.offsetLeft,
            right: pared.offsetLeft + pared.offsetWidth,
            top: pared.offsetTop,
            bottom: pared.offsetTop + pared.offsetHeight
        };

        if (
            personaje.right > paredRect.left &&
            personaje.left < paredRect.right &&
            personaje.bottom > paredRect.top &&
            personaje.top < paredRect.bottom
        ) {
            return true;
        }
    }

    return false;
}


// =====================================
// COMPROBAR SI TOCAMOS LA LLAVE
// =====================================

function comprobarLlave() {

    if (tieneLlave) {
        return;
    }

    const personaje = {
        left: x,
        right: x + anchoPersonaje,
        top: y,
        bottom: y + altoPersonaje
    };

    const llaveRect = {
        left: llave.offsetLeft,
        right: llave.offsetLeft + llave.offsetWidth,
        top: llave.offsetTop,
        bottom: llave.offsetTop + llave.offsetHeight
    };

    const tocaLlave =
        personaje.right > llaveRect.left &&
        personaje.left < llaveRect.right &&
        personaje.bottom > llaveRect.top &&
        personaje.top < llaveRect.bottom;

    if (tocaLlave) {

        tieneLlave = true;

        llave.style.display = "none";

        alert("🗝️ ¡Habéis conseguido la llave!");
    }
}


// =====================================
// COMPROBAR SI TOCAMOS EL COFRE
// =====================================

function comprobarCofre() {

    // Si no tenemos la llave o el cofre ya está abierto,
    // no hacemos nada.
    if (!tieneLlave || cofreAbierto) {
        return;
    }

    const personaje = {
        left: x,
        right: x + anchoPersonaje,
        top: y,
        bottom: y + altoPersonaje
    };

    const cofreRect = {
        left: cofre.offsetLeft,
        right: cofre.offsetLeft + cofre.offsetWidth,
        top: cofre.offsetTop,
        bottom: cofre.offsetTop + cofre.offsetHeight
    };

    const tocaCofre =
        personaje.right > cofreRect.left &&
        personaje.left < cofreRect.right &&
        personaje.bottom > cofreRect.top &&
        personaje.top < cofreRect.bottom;

    if (tocaCofre) {

        cofreAbierto = true;

        // Ocultar el cofre
        cofre.style.display = "none";

        // Mostrar pantalla final
        pantallaFinal.style.display = "flex";
    }
}


// =====================================
// MOVIMIENTO
// =====================================

document.addEventListener("keydown", (event) => {

    let nuevoX = x;
    let nuevoY = y;

    switch (event.key) {

        case "ArrowUp":
            nuevoY -= velocidad;
            personajes.src = "personajes/arriba.png";
            break;

        case "ArrowDown":
            nuevoY += velocidad;
            personajes.src = "personajes/abajo.png";
            break;

        case "ArrowLeft":
            nuevoX -= velocidad;
            personajes.src = "personajes/izquierda.png";
            break;

        case "ArrowRight":
            nuevoX += velocidad;
            personajes.src = "personajes/derecha.png";
            break;

        default:
            return;
    }


    // =================================
    // COMPROBAR COLISIÓN
    // =================================

    if (!hayColision(nuevoX, nuevoY)) {
        x = nuevoX;
        y = nuevoY;
    }


    // =================================
    // NO SALIR DEL MAPA
    // =================================

    x = Math.max(
        0,
        Math.min(x, anchoMapa - anchoPersonaje)
    );

    y = Math.max(
        0,
        Math.min(y, altoMapa - altoPersonaje)
    );


    // Actualizar posición
    personajes.style.left = x + "px";
    personajes.style.top = y + "px";


    // =================================
    // COMPROBAR OBJETOS
    // =================================

    comprobarLlave();
    comprobarCofre();


    // =================================
    // CÁMARA
    // =================================

    const posicionPantallaX = x - camaraX;

    if (posicionPantallaX > anchoPantalla - margenCamara) {
        camaraX = x - (anchoPantalla - margenCamara);
    }

    if (posicionPantallaX < margenCamara) {
        camaraX = x - margenCamara;
    }


    const posicionPantallaY = y - camaraY;

    if (posicionPantallaY > altoPantalla - margenCamara) {
        camaraY = y - (altoPantalla - margenCamara);
    }

    if (posicionPantallaY < margenCamara) {
        camaraY = y - margenCamara;
    }


    // Limitar cámara al mapa
    camaraX = Math.max(
        0,
        Math.min(camaraX, anchoMapa - anchoPantalla)
    );

    camaraY = Math.max(
        0,
        Math.min(camaraY, altoMapa - altoPantalla)
    );


    // Aplicar cámara
    mapa.style.left = -camaraX + "px";
    mapa.style.top = -camaraY + "px";
});


// =====================================
// BOTÓN DE LA PANTALLA FINAL
// =====================================

cerrarFinal.addEventListener("click", () => {

    pantallaFinal.style.display = "none";

});