/* ============================================================
   CONVERSORES ENTRE SISTEMAS
   ============================================================ */

/* ----- Sistema Romano ----- */

// Mapa con los valores de cada símbolo romano
const valoresRomanos = {
  I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
};

// Convierte un número arábigo (entero) a su representación en números romanos  
// Retorna la cadena con sufijo "_R". Ejemplo: 5 -> "V_R"
function numeroARomano(numero) {
  if (numero > 3999 || numero < 1) {
    return "Número no válido";
  }
  let romano = '';
  while (numero >= 1000) { 
    romano += 'M'; 
    numero -= 1000; 
  }
  if (numero >= 900) { 
    romano += 'CM'; 
    numero -= 900; 
  }
  if (numero >= 500) { 
    romano += 'D'; 
    numero -= 500; 
  }
  if (numero >= 400) { 
    romano += 'CD'; 
    numero -= 400; 
  }
  while (numero >= 100) { 
    romano += 'C'; 
    numero -= 100; 
  }
  if (numero >= 90) { 
    romano += 'XC'; 
    numero -= 90; 
  }
  if (numero >= 50) { 
    romano += 'L'; 
    numero -= 50; 
  }
  if (numero >= 40) { 
    romano += 'XL'; 
    numero -= 40; 
  }
  while (numero >= 10) { 
    romano += 'X'; 
    numero -= 10; 
  }
  if (numero === 9) { 
    romano += 'IX'; 
    numero -= 9; 
  }
  if (numero >= 5) { 
    romano += 'V'; 
    numero -= 5; 
  }
  if (numero === 4) { 
    romano += 'IV'; 
    numero -= 4; 
  }
  while (numero >= 1) { 
    romano += 'I'; 
    numero -= 1; 
  }
  return romano + "_R";
}

// Convierte un número romano (en formato "num_R") a su equivalente entero
function convertirRomanoAEntero(romanoConSufijo) {
  if (romanoConSufijo.slice(-2) !== "_R") {
    throw new Error("El número romano debe terminar con '_R'.");
  }
  const romano = romanoConSufijo.slice(0, -2).toUpperCase();
  for (let letra of romano) {
    if (!valoresRomanos.hasOwnProperty(letra)) {
      throw new Error("Símbolo romano inválido en: " + romanoConSufijo);
    }
  }
  let resultado = 0;
  let anterior = valoresRomanos[romano[0]];
  for (let i = 1; i < romano.length; i++) {
    let actual = valoresRomanos[romano[i]];
    if (anterior < actual) {
      resultado -= anterior;
    } else {
      resultado += anterior;
    }
    anterior = actual;
  }
  resultado += anterior;
  if (numeroARomano(resultado).toUpperCase() !== romanoConSufijo.toUpperCase()) {
    throw new Error("Formato de número romano incorrecto: " + romanoConSufijo);
  }
  return resultado;
}

/* ----- Sistema Maya ----- */

// Símbolos del sistema maya
const MAYA_SIMBOLOS = {
  0: 'º',   // Representa 0
  1: '·',   // Cada punto representa 1
  5: '¬'    // La línea representa 5
};

// Convierte un nivel (valor entre 0 y 19) a notación maya
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

// Convierte un número decimal a su representación en el sistema maya (base 20)
function decimalAMaya(decimal) {
  if (decimal < 0) throw new Error("El sistema maya no soporta números negativos.");
  if (decimal === 0) return "Nivel 1:\n" + MAYA_SIMBOLOS[0];

  let niveles = [];
  while (decimal > 0) {
    let residuo = decimal % 20;
    niveles.push(residuo);
    decimal = Math.floor(decimal / 20);
  }
  
  let resultadoFinal = "";
  let nivelActual = 1;
  for (let i = niveles.length - 1; i >= 0; i--) {
    resultadoFinal += `Nivel ${nivelActual}:\n` + convertirNivelMaya(niveles[i]) + "\n\n";
    nivelActual++;
  }
  return resultadoFinal.trim();
}

// Convierte una representación maya (sin sufijo) a número decimal
function mayaADecimal(entrada) {
  // Si la entrada termina en "_M", se remueve (no es parte del contenido)
  if (entrada.slice(-2).toUpperCase() === "_M") {
    entrada = entrada.slice(0, -2);
  }
  // Separa los niveles usando ';' como delimitador
  let niveles = manualSplitLevels(entrada, ";");
  let total = 0;
  let n = niveles.length;
  
  for (let i = 0; i < n; i++) {
    let nivelTexto = niveles[i].trim();
    let valorNivel = 0;
    if (nivelTexto === MAYA_SIMBOLOS[0]) {
      valorNivel = 0;
    } else {
      let countPuntos = contarCaracteres(nivelTexto, MAYA_SIMBOLOS[1]);
      let countLineas = contarCaracteres(nivelTexto, MAYA_SIMBOLOS[5]);
      if (countLineas * 5 + countPuntos >= 20 || countPuntos > 4) {
        throw new Error("Número inválido en el sistema maya en el nivel: " + nivelTexto);
      }
      valorNivel = countLineas * 5 + countPuntos;
    }
    let peso = 1;
    for (let p = 0; p < (n - i - 1); p++) {
      peso *= 20;
    }
    total += valorNivel * peso;
  }
  return total;
}

/* ----- Sistema Babilónico ----- */

// Símbolos del sistema babilónico
const UNIDAD = "y";  // Representa 1–9
const DECENA = "<";  // Representa múltiplos de 10 (10, 20, ..., 50)
const CERO = "°";    // Representa el 0

// Cuenta cuántas veces aparece 'caracter' en 'cadena'
function contarCaracteres(cadena, caracter) {
  let contador = 0;
  for (let i = 0; i < cadena.length; i++) {
    if (cadena[i] === caracter) contador++;
  }
  return contador;
}

// Convierte un residuo (0 a 59) a notación babilónica
function residuoABabilonico(valor) {
  if (valor === 0) return CERO;
  let decenas = Math.floor(valor / 10);
  let unidades = valor % 10;
  let resultado = "";
  for (let i = 0; i < decenas; i++) resultado += DECENA;
  for (let i = 0; i < unidades; i++) resultado += UNIDAD;
  return resultado;
}

// Convierte un número decimal a su representación en el sistema babilónico (base 60)
function decimalABabilonico(decimal) {
  if (decimal < 0) throw new Error("El sistema babilónico no soporta números negativos.");
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

// Convierte una representación babilónica (sin sufijo) a número decimal
function babilonicoADecimal(babilonico) {
  if (typeof babilonico !== "string") {
    throw new Error("Entrada inválida. Se espera un string con símbolos.");
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

// Convierte una cadena de símbolos babilónicos (para un nivel) a su valor
function simbolosABabilonico(simbolos) {
  if (simbolos === CERO) return 0;
  let decenas = contarCaracteres(simbolos, DECENA);
  let unidades = contarCaracteres(simbolos, UNIDAD);
  
  if (decenas * 10 + unidades >= 60 || unidades > 9) {
    throw new Error("Número inválido en el sistema babilónico.");
  }
  
  return decenas * 10 + unidades;
}

/* ----- Funciones Manuales para Procesar Cadenas ----- */

// manualSplitLevels: divide una cadena en grupos usando un delimitador (se usa para mayas)
function manualSplitLevels(text, delimiter) {
  let result = [];
  let current = "";
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

/* ============================================================
   TOKENIZACIÓN Y PARSING DE LA EXPRESIÓN ARITMÉTICA
   ============================================================ */

// Se definen los tipos de tokens:
// - NUM_DECIMAL: dígitos terminados en "_D"
// - NUM_ROMANO: símbolos romanos terminados en "_R"
// - NUM_MAYA: símbolos mayas (permitidos: '·', '¬', 'º', y delimitador ';') terminados en "_M"
// - NUM_BABILONICO: símbolos babilónicos (permitidos: 'y', '<', '°', y delimitador '|') terminados en "_B"
// - OP: operadores (+, -, *, /)
// - PAREN: paréntesis "(" o ")"
function tokenizar(expresion) {
  let tokens = [];
  let i = 0;
  
  function avanzar() {
    return expresion[i++];
  }
  
  while (i < expresion.length) {
    let char = expresion[i];
    
    // Omitir espacios, tabulaciones y saltos de línea
    if (char === ' ' || char === '\t' || char === '\n') {
      i++;
      continue;
    }
    
    // Si es dígito, leer número decimal (debe terminar en "_D")
    if (char >= '0' && char <= '9') {
      let numStr = '';
      while (i < expresion.length && expresion[i] >= '0' && expresion[i] <= '9') {
        numStr += avanzar();
      }
      if (i + 1 < expresion.length && expresion[i] === '_' && (expresion[i+1] === 'D' || expresion[i+1] === 'd')) {
        i += 2; // Consumir "_D"
        tokens.push({ type: 'NUM_DECIMAL', value: numStr });
      } else {
        throw new Error("Error en la lectura de número decimal, se esperaba el sufijo '_D' después de: " + numStr);
      }
      continue;
    }
    
    // Si es una letra (posible número romano)
    if ("IVXLCDM".indexOf(char.toUpperCase()) !== -1) {
      let romanoStr = '';
      while (i < expresion.length && "IVXLCDM".indexOf(expresion[i].toUpperCase()) !== -1) {
        romanoStr += avanzar();
      }
      if (i + 1 < expresion.length && expresion[i] === '_' && (expresion[i+1] === 'R' || expresion[i+1] === 'r')) {
        i += 2; // Consumir "_R"
        tokens.push({ type: 'NUM_ROMANO', value: romanoStr });
      } else {
        throw new Error("Error en la lectura de número romano, se esperaba el sufijo '_R' después de: " + romanoStr);
      }
      continue;
    }
    
    // Si es un símbolo maya (permitidos: '·', '¬', 'º', o delimitador ';')
    if ("·¬º".indexOf(char) !== -1) {
      let mayaStr = '';
      while (i < expresion.length && ("·¬º;".indexOf(expresion[i]) !== -1)) {
        mayaStr += avanzar();
      }
      if (i + 1 < expresion.length && expresion[i] === '_' && (expresion[i+1] === 'M' || expresion[i+1] === 'm')) {
        i += 2; // Consumir "_M"
        tokens.push({ type: 'NUM_MAYA', value: mayaStr });
      } else {
        throw new Error("Error en la lectura de número maya, se esperaba el sufijo '_M' después de: " + mayaStr);
      }
      continue;
    }
    
    // Si es un símbolo babilónico (permitidos: 'y', '<', '°', o delimitador '|')
    if ("y<°".indexOf(char) !== -1) {
      let babilonicoStr = '';
      while (i < expresion.length && ("y<°|".indexOf(expresion[i]) !== -1)) {
        babilonicoStr += avanzar();
      }
      if (i + 1 < expresion.length && expresion[i] === '_' && (expresion[i+1].toUpperCase() === 'B')) {
        i += 2; // Consumir "_B"
        tokens.push({ type: 'NUM_BABILONICO', value: babilonicoStr });
      } else {
        throw new Error("Error en la lectura de número babilónico, se esperaba el sufijo '_B' después de: " + babilonicoStr);
      }
      continue;
    }
    
    // Si es un operador: +, -, *, /
    if ("+-*/".indexOf(char) !== -1) {
      tokens.push({ type: 'OP', value: avanzar() });
      continue;
    }
    
    // Si es un paréntesis: ( o )
    if (char === '(' || char === ')') {
      tokens.push({ type: 'PAREN', value: avanzar() });
      continue;
    }
    
    throw new Error("Carácter no reconocido: " + char);
  }
  return tokens;
}

// Variables globales para el parser
let tokens = [];
let posicionToken = 0;

function tokenActual() {
  return tokens[posicionToken];
}

function consumirToken() {
  posicionToken++;
}

// Parser recursivo basado en la gramática:
//   Expresión = Término { ('+' | '-') Término }
//   Término    = Factor { ('*' | '/') Factor }
//   Factor     = ['-'] ( número | '(' Expresión ')' )
// Se admite el operador unario '-' para números negativos, pero no se permite aplicarlo directamente a un número romano, maya o babilónico.
function parseExpresion() {
  let valor = parseTermino();
  while (posicionToken < tokens.length && tokens[posicionToken].type === 'OP' &&
         (tokens[posicionToken].value === '+' || tokens[posicionToken].value === '-')) {
    let op = tokens[posicionToken].value;
    consumirToken();
    let siguienteValor = parseTermino();
    if (op === '+') {
      valor += siguienteValor;
    } else {
      valor -= siguienteValor;
    }
  }
  return valor;
}

function parseTermino() {
  let valor = parseFactor();
  while (posicionToken < tokens.length && tokens[posicionToken].type === 'OP' &&
         (tokens[posicionToken].value === '*' || tokens[posicionToken].value === '/')) {
    let op = tokens[posicionToken].value;
    consumirToken();
    let siguienteValor = parseFactor();
    if (op === '*') {
      valor *= siguienteValor;
    } else {
      if (siguienteValor === 0) {
        throw new Error("División por cero.");
      }
      valor /= siguienteValor;
    }
  }
  return valor;
}

function parseFactor() {
  let token = tokenActual();
  if (!token) {
    throw new Error("Expresión incompleta.");
  }
  // Manejo del operador unario '-' para números negativos.
  // No se permite aplicarlo directamente a números romanos, mayas o babilónicos.
  if (token.type === 'OP' && token.value === '-') {
    consumirToken();
    if (tokenActual() && (tokenActual().type === 'NUM_ROMANO' || tokenActual().type === 'NUM_MAYA' || tokenActual().type === 'NUM_BABILONICO')) {
      throw new Error("No se permite ingresar un único número romano, maya o babilónico negativo.");
    }
    return -parseFactor();
  }
  // Si el token es un paréntesis abierto, evaluar la expresión interna.
  if (token.type === 'PAREN' && token.value === '(') {
    consumirToken();
    let valor = parseExpresion();
    if (posicionToken >= tokens.length || tokens[posicionToken].type !== 'PAREN' || tokens[posicionToken].value !== ')') {
      throw new Error("Se esperaba ')' para cerrar la expresión.");
    }
    consumirToken();
    return valor;
  }
  // Si el token es un número decimal
  if (token.type === 'NUM_DECIMAL') {
    consumirToken();
    return parseFloat(token.value);
  }
  // Si el token es un número romano
  if (token.type === 'NUM_ROMANO') {
    consumirToken();
    return convertirRomanoAEntero(token.value + "_R");
  }
  // Si el token es un número maya
  if (token.type === 'NUM_MAYA') {
    consumirToken();
    return mayaADecimal(token.value + "_M");
  }
  // Si el token es un número babilónico
  if (token.type === 'NUM_BABILONICO') {
    consumirToken();
    return babilonicoADecimal(token.value);
  }
  throw new Error("Token inesperado: " + token.value);
}

// Evalúa la expresión: tokeniza, parsea y retorna el resultado numérico
function evaluarExpresion(expresion) {
  tokens = tokenizar(expresion);
  posicionToken = 0;
  let resultado = parseExpresion();
  if (posicionToken !== tokens.length) {
    throw new Error("Error en la expresión: tokens sobrantes.");
  }
  return resultado;
}

/* ============================================================
   INTERACCIÓN CON LA INTERFAZ DEL NAVEGADOR
   ============================================================ */

// Agrega el valor del botón al campo de entrada
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const inputField = document.getElementById('inputExpression');
    inputField.value += button.getAttribute('data-value');
  });
});

// Botón para limpiar la expresión y el resultado
document.getElementById('clearBtn').addEventListener('click', () => {
  document.getElementById('inputExpression').value = "";
  document.getElementById('result').textContent = "";
});

// Escuchar el evento "keydown" en el input para detectar cuando se presiona "Enter" o "Escape"
document.getElementById('inputExpression').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    // Evitar que se inserte un salto de línea en el input
    event.preventDefault();
    // Ejecutar la función de cálculo, simulando un clic en el botón "Calcular"
    document.getElementById('calculateBtn').click();
  } else if (event.key === 'Escape') {
    document.getElementById('clearBtn').click();
  }
});


let historialOperaciones = [];

// Modificación del listener del botón "Calcular"
document.getElementById('calculateBtn').addEventListener('click', function() {
  const expression = document.getElementById('inputExpression').value;
  const resultContainer = document.getElementById('result');
  
  try {
    const resultado = evaluarExpresion(expression);
    
    // Selección del sistema para mostrar el resultado mediante prompt
    const opcion = prompt("¿En qué sistema deseas ver el resultado?\n1: Decimal\n2: Romano\n3: Maya\n4: Babilónico");
    
    let salida = "";
    if (opcion.trim() === '1') {
      salida = "Resultado en decimal: " + resultado + "_D";
    } else if (opcion.trim() === '2') {
      if (Number.isInteger(resultado) && resultado >= 1 && resultado <= 3999) {
        salida = "Resultado en romano: " + numeroARomano(resultado);
      } else {
        salida = "El resultado (" + resultado + ") no se puede convertir a número romano.";
      }
    } else if (opcion.trim() === '3') {
      if (Number.isInteger(resultado) && resultado >= 0) {
        salida = "Resultado en maya:\n" + decimalAMaya(resultado);
      } else {
        salida = "El resultado (" + resultado + ") no se puede convertir a número maya.";
      }
    } else if (opcion.trim() === '4') {
      if (Number.isInteger(resultado) && resultado >= 0) {
        salida = "Resultado en babilónico: " + decimalABabilonico(resultado) + "_B";
      } else {
        salida = "El resultado (" + resultado + ") no se puede convertir a número babilónico.";
      }
    } else {
      salida = "Opción no válida. Se mostrará el resultado en decimal:\n" + resultado + "_D";
    }
    
    // Mostrar el resultado en el contenedor
    resultContainer.textContent = salida;
    
    // Actualizar el historial: agrega un nuevo elemento a la lista
    const historyList = document.getElementById('historyList');
    const newHistoryItem = document.createElement('li');
    newHistoryItem.textContent = expression + " = " + salida;
    historyList.prepend(newHistoryItem); // Se agrega al inicio del historial

    historialOperaciones.push({ expresion: expression, resultado: salida });
  } catch (error) {
    resultContainer.textContent = "Error: " + error.message;
  }

  



});

document.getElementById("backspaceBtn").addEventListener("click", function () {
  let inputField = document.getElementById("inputExpression");
  if (inputField.value.length > 0) {
      inputField.value = inputField.value.slice(0, -1);
  }
});
