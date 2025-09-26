const readline = require("readline");

const UNIDAD = "y";  // Representa valores de 1-9
const DECENA = "<";  // Representa valores de 10, 20, ..., 50
const CERO = "°";    // Representa el 0 vacío en una posición
                     //Las separaciones cada 60 posiciones se representan con |

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function contarCaracteres(cadena, caracter) {
    let contador = 0;
    for (let i = 0; i < cadena.length; i++) {
        if (cadena[i] === caracter) contador++;
    }
    return contador;
}

function residuoABabilonico(valor) {
    if (valor === 0) return CERO;
    let decenas = Math.floor(valor / 10);
    let unidades = valor % 10;
    let resultado = "";
    for (let i = 0; i < decenas; i++) resultado += DECENA;
    for (let i = 0; i < unidades; i++) resultado += UNIDAD;
    return resultado;
}

function decimalABabilonico(decimal) {
    if (decimal < 0) throw new Error("El sistema babilonico no soporta numeros negativos.");
    if (decimal === 0) return CERO;

    let resultado = "";
    while (decimal > 0) {
        let residuo = decimal % 60;
        let simbolos = residuoABabilonico(residuo);
        resultado = (resultado ? simbolos + "|" + resultado : simbolos);
        decimal = Math.floor(decimal / 60);
    }
    return resultado;
}

function simbolosABabilonico(simbolos) {
    if (simbolos === CERO) return 0;
    let decenas = contarCaracteres(simbolos, DECENA);
    let unidades = contarCaracteres(simbolos, UNIDAD);
    
    if (decenas * 10 + unidades >= 60 || unidades > 9) {
        throw new Error("Numero invalido en el sistema babilonico.");
    }
    
    return decenas * 10 + unidades;
}

function babilonicoADecimal(babilonico) {
    if (typeof babilonico !== "string") {
        throw new Error("Entrada invalida. Se espera un string con simbolos.");
    }
    let grupos = [];
    let grupoActual = "";
    for (let i = 0; i < babilonico.length; i++) {
        if (babilonico[i] === '|') {
            if (grupoActual.length > 0) {
                grupos.push(grupoActual);
                grupoActual = "";
            }
        } else {
            grupoActual += babilonico[i];
        }
    }
    if (grupoActual.length > 0) grupos.push(grupoActual);
    
    let decimal = 0;
    for (let i = 0; i < grupos.length; i++) {
        let valor = simbolosABabilonico(grupos[i]);
        decimal += valor * Math.pow(60, grupos.length - 1 - i);
    }
    return decimal;
}

function esDecimal(entrada) {
    for (let i = 0; i < entrada.length; i++) {
        if (entrada[i] < '0' || entrada[i] > '9') return false;
    }
    return true;
}

function esBabilonico(entrada) {
    for (let i = 0; i < entrada.length; i++) {
        if (entrada[i] !== UNIDAD && entrada[i] !== DECENA && entrada[i] !== CERO && entrada[i] !== '|' && entrada[i] !== ' ') {
            return false;
        }
    }
    return true;
}

function procesarEntrada(entrada) {
    if (esDecimal(entrada)) {
        let numero = 0;
        for (let i = 0; i < entrada.length; i++) {
            numero = numero * 10 + (entrada[i] - '0');
        }
        console.log(`Babilonico: ${decimalABabilonico(numero)}`);
    } else if (esBabilonico(entrada)) {
        try {
            console.log(`Decimal: ${babilonicoADecimal(entrada)}`);
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    } else {
        console.log("Error: Entrada invalida. Ingrese un numero decimal o una representacion babilonica valida.");
    }

}

procesarEntrada(entrada);


