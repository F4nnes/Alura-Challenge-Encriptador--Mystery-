//Codigo de encriptador de texto "Mystery"


//Declaración de variables dentro de codigo
const campoDeTexto = document.querySelector(".campo__texto");
const campoDeMensaje = document.querySelector(".campo__mensaje");
const botonCopiar = document.querySelector(".btn_copiar");
const botonPegar = document.querySelector(".btn_pegar");
const botonEncriptar = document.querySelector(".btn_encriptar");
const botonDesencriptar = document.querySelector(".btn_desencriptar");


//Matriz de funcionamiento, para intercambio de vocales por palabras clave.
const matrizCode = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];


//Funcion para encriptar texto
function encriptar(fraseEncriptada) {
    for (let i = 0; i < matrizCode.length; i++) {
        if (fraseEncriptada.includes(matrizCode[i][0])) {
            fraseEncriptada = fraseEncriptada.replace(
                new RegExp(matrizCode[i][0], "g"),
                matrizCode[i][1]
            );
        }
    }
    return fraseEncriptada.replace(/[^a-z ñ]/, '');
};


//Funcion para desencriptar texto
function desencriptar(fraseEncriptada) {
    for (let i = matrizCode.length - 1; i >= 0; i--) {
        if (fraseEncriptada.includes(matrizCode[i][1])) {
            fraseEncriptada = fraseEncriptada.replace(
                new RegExp(matrizCode[i][1], "g"),
                matrizCode[i][0]
            );
        }
    }
    return fraseEncriptada.replace(/[^a-z ñ]/, '');
};


//funcion restrictiva de texto y caracteres especiales
//se considera a "ñ" como letra dentro del idioma español
const restriccion = (event) =>{
    event.target.value = event.target.value.replace (/[^a-z ñ]/, '');
};

campoDeTexto.addEventListener("input",restriccion);


//funcion para boton encriptar
function btnEncriptar(){
    const texto = encriptar(campoDeTexto.value);
    campoDeMensaje.value = texto;
};


//funcion para desencriptar
function btnDesencriptar(){
    const texto = desencriptar(campoDeTexto.value);
    campoDeMensaje.value = texto;
}


//funcion para copiar
function copiarAlPortapapeles(){
    navigator.clipboard.writeText(campoDeMensaje.value)
    .then(() => {
        console.log("Texto copiado al portapapeles");
        campoDeTexto.value = "";
        campoDeMensaje.value = "";
    })
    .catch((err) => {
      console.log("Error al copiar al portapapeles:", err);
    });
};


//funcion de pegar
function pegar() {
    navigator.clipboard.readText()
       .then((texto) => {
            campoDeTexto.value = texto;
            encriptar(texto);
        })
       .catch((err) => {
            console.error("Error al leer desde el portapapeles:", err);
        });
}