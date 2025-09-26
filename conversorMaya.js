const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Símbolos del sistema maya
const MAYA_SIMBOLOS = {
  0: 'º',   // Caracol representa el 0
  1: '·',   // Punto representan 1
  5: '¬' // Linea (exactamente esta cadena) representa 5
};

// Funcion para convertir un numero decimal al sistema maya
function decimalAMaya(numero) {
  if (numero < 0) {
    return "Numero no valido";
  }
  
  let niveles = [];
  let nivelActual = 1;
  
  while (numero > 0) {
    let residuo = numero % 20;
    niveles.push(residuo);
    numero = Math.floor(numero / 20);
  }
  
  if (niveles.length === 0) {
    return "Nivel 1:\n" + MAYA_SIMBOLOS[0];
  }
  
  let resultadoFinal = "";
  for (let i = niveles.length - 1; i >= 0; i--) {
    resultadoFinal += `Nivel ${nivelActual}:\n` + convertirNivelMaya(niveles[i]) + "\n\n";
    nivelActual++;
  }
  
  return resultadoFinal.trim();
}


function convertirNivelMaya(nivel) {
  let resultado = "";
  let lineas = 0;
  let puntos = nivel;
  while (puntos >= 5) {
    lineas++;
    puntos -= 5;
  }
  for (let i = 0; i < lineas; i++) {
    resultado += MAYA_SIMBOLOS[5] + "\n";
  }
  for (let i = 0; i < puntos; i++) {
    resultado += MAYA_SIMBOLOS[1];
  }
  return resultado || MAYA_SIMBOLOS[0];
}

// ---
// Funciones manuales para procesar la entrada maya 

// manualTrim: quita espacios, saltos de linea y retornos al inicio y final
function manualTrim(text) {
  let start = 0, end = text.length - 1;
  while (start < text.length && (text[start] === ' ' || text[start] === '\n' || text[start] === '\r')) {
    start++;
  }
  while (end >= 0 && (text[end] === ' ' || text[end] === '\n' || text[end] === '\r')) {
    end--;
  }
  let trimmed = "";
  for (let i = start; i <= end; i++) {
    trimmed += text[i];
  }
  return trimmed;
}

// manualSplitLevels: divide la cadena en niveles usando un delimitador simple (en este caso, ";")
function manualSplitLevels(text, delimiter) {
  let result = [];
  let current = "";
  // Calculamos la longitud del delimitador 
  let delimLen = 0;
  while (delimiter[delimLen] !== undefined) { delimLen++; }
  
  let i = 0;
  while (i < text.length) {
    let match = true;
    for (let k = 0; k < delimLen; k++) {
      if (i + k >= text.length || text[i + k] !== delimiter[k]) {
        match = false;
        break;
      }
    }
    if (match) {
      result.push(current);
      current = "";
      i += delimLen;
    } else {
      current += text[i];
      i++;
    }
  }
  if (current !== "") {
    result.push(current);
  }
  return result;
}

// Funcion para convertir una representacion maya (con niveles separados por el delimitador ";")
// a un numero decimal, interpretando cada nivel del sistema maya
function mayaADecimal(entrada) {
  // Usamos ";" como delimitador para separar niveles
  let niveles = manualSplitLevels(entrada, ";");
  let total = 0;
  let n = niveles.length;
  
  for (let i = 0; i < n; i++) {
    let nivelTexto = manualTrim(niveles[i]);
    let valorNivel = 0;
    if (nivelTexto === MAYA_SIMBOLOS[0]) {
      valorNivel = 0;
    } else {
      let countPuntos = 0;
      let countLineas = 0;
      let j = 0;
      // Calcular la longitud del simbolo de linea (MAYA_SIMBOLOS[5])
      let lineLen = 0;
      while (MAYA_SIMBOLOS[5][lineLen] !== undefined) { lineLen++; }
      
      while (j < nivelTexto.length) {
        // Verificar si desde la posicion j se encuentra el símbolo de linea
        let isLine = true;
        for (let k = 0; k < lineLen; k++) {
          if (j + k >= nivelTexto.length || nivelTexto[j + k] !== MAYA_SIMBOLOS[5][k]) {
            isLine = false;
            break;
          }
        }
        if (isLine) {
          countLineas++;
          j += lineLen;
        } else {
          if (nivelTexto[j] === MAYA_SIMBOLOS[1]) {
            countPuntos++;
          }
          j++;
        }
      }
      valorNivel = countLineas * 5 + countPuntos;
    }
    // El peso del nivel es 20**(n - i - 1)
    let peso = 1;
    for (let p = 0; p < (n - i - 1); p++) {
      peso *= 20;
    }
    total += valorNivel * peso;
  }
  return total;
}

// ---
// Menu
function mostrarMenu() {
  rl.question("Introduce un numero decimal (formato: 12_D) o maya (formato: 12_M, niveles separados por ';'):\n", (entrada) => {
    entrada = manualTrim(entrada); // Limpiar espacios y saltos de linea

    let len = entrada.length;
    
    // Si termina en "_D", es un numero decimal
    if (len > 2 && entrada[len - 2] === '_' && entrada[len - 1] === 'D') {
      let decimal = entrada.slice(0, len - 2);
      let numeroDecimal = parseInt(decimal, 10);
      
      // Validar que la parte decimal sea un numero
      if (isNaN(numeroDecimal)) {
        console.log("\nError: El número decimal debe ser válido.");
      } else {
        console.log("\nNúmero maya:\n" + decimalAMaya(numeroDecimal));
      }
    } 
    // Si la entrada contiene niveles Mayas, verificar el sufijo "_M"
    else if (entrada.includes(';')) {
      let niveles = entrada.split(';');
      
      // Validar que cada nivel tenga el sufijo "_M" y los símbolos sean solo de maya
      let esValido = true;
      for (let nivel of niveles) {
        if (nivel.length < 2 || nivel[nivel.length - 2] !== '_' || nivel[nivel.length - 1] !== 'M') {
          esValido = false;
          break;
        }
        // Comprobar que cada caracter del nivel sea uno de los simbolos mayas
        for (let char of nivel.slice(0, nivel.length - 2)) {
          if (char !== '·' && char !== '¬' && char !== 'º') {
            esValido = false;
            break;
          }
        }
      }

      if (esValido) {
        let dec = mayaADecimal(entrada);
        console.log("\nNumero decimal:\n" + dec);
      } else {
        console.log("\nError: Todos los niveles deben tener el sufijo '_M' y solo usar los simbolos ·, ¬, º.");
      }
    } 
    // Si termina en "_M", es un numero maya simple
    else if (len > 2 && entrada[len - 2] === '_' && entrada[len - 1] === 'M') {
      let maya = entrada.slice(0, len - 2);
      
      // Validar que los caracteres sean solo los simbolos mayas (·, ¬, º)
      let esValido = true;
      for (let char of maya) {
        if (char !== '·' && char !== '¬' && char !== 'º') {
          esValido = false;
          break;
        }
      }
      
      if (esValido) {
        console.log("\nNumero decimal:\n" + mayaADecimal(maya));
      } else {
        console.log("\nError: El numero maya solo puede contener los simbolos ·, ¬, º.");
      }
    } 
    // Si no es valido en ninguno de los formatos
    else {
      console.log("\nError: Formato incorrecto. Usa '_D' para decimales y '_M' para mayas.");
    }
    rl.close();
  });
}


mostrarMenu();
