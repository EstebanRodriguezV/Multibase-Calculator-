const readline = require('readline');

// Configuración de la entrada por consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/* ============================================================
   Funciones de conversión entre números arábigos y romanos
   ============================================================ */

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
// Se espera que el numeral tenga el sufijo "_R"
function convertirRomanoAEntero(romanoConSufijo) {
  // Validar que tenga el sufijo "_R"
  if (romanoConSufijo.slice(-2) !== "_R") {
    throw new Error("El número romano debe terminar con '_R'.");
  }
  // Extraer la parte del numeral sin el sufijo y convertir a mayúsculas
  const romano = romanoConSufijo.slice(0, -2).toUpperCase();
  // Validar que cada carácter sea un símbolo romano válido
  for (let letra of romano) {
    if (!valoresRomanos.hasOwnProperty(letra)) {
      throw new Error("Símbolo romano inválido en: " + romanoConSufijo);
    }
  }
  // Realizar la conversión sumando o restando según la posición
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
  // Validación extra: reconvertir a romano y comparar con el original (con sufijo)
  if (numeroARomano(resultado) !== romanoConSufijo.toUpperCase()) {
    throw new Error("Formato de número romano incorrecto: " + romanoConSufijo);
  }
  return resultado;
}

/* ============================================================
   Tokenización y Parsing de la expresión aritmética
   ============================================================ */

// Se definen los tipos de tokens:
// - NUM_DECIMAL: secuencia de dígitos que debe terminar en "_D" (ej. "10_D")
// - NUM_ROMANO: secuencia de símbolos romanos que debe terminar en "_R" (ej. "V_R")
// - OP: operador (+, -, *, /)
// - PAREN: paréntesis "(" o ")"
//
// Nota: No se usan expresiones regulares; se analiza carácter a carácter.
function tokenizar(expresion) {
  let tokens = [];
  let i = 0;

  // Función auxiliar para avanzar y retornar el caracter actual
  function avanzar() {
    return expresion[i++];
  }

  while (i < expresion.length) {
    let char = expresion[i];

    // Omitir espacios
    if (char === ' ' || char === '\t' || char === '\n') {
      i++;
      continue;
    }

    // Si es dígito, leemos número decimal (debe ir seguido de "_D")
    if (char >= '0' && char <= '9') {
      let numStr = '';
      while (i < expresion.length && expresion[i] >= '0' && expresion[i] <= '9') {
        numStr += avanzar();
      }
      // Verificar el sufijo "_D"
      if (i + 1 < expresion.length && expresion[i] === '_' && (expresion[i+1] === 'D' || expresion[i+1] === 'd')) {
        // Consumir "_D"
        i += 2;
        tokens.push({ type: 'NUM_DECIMAL', value: numStr });
      } else {
        throw new Error("Error en la lectura de número decimal, se esperaba el sufijo '_D' después de: " + numStr);
      }
      continue;
    }

    // Si es una letra que puede ser parte de un número romano
    // Los símbolos válidos son I, V, X, L, C, D, M
    if ("IVXLCDM".indexOf(char.toUpperCase()) !== -1) {
      let romanoStr = '';
      while (i < expresion.length && "IVXLCDM".indexOf(expresion[i].toUpperCase()) !== -1) {
        romanoStr += avanzar();
      }
      // Se espera que a continuación venga el sufijo "_R"
      if (i + 1 < expresion.length && expresion[i] === '_' && (expresion[i+1] === 'R' || expresion[i+1] === 'r')) {
        // Consumir "_R"
        i += 2;
        tokens.push({ type: 'NUM_ROMANO', value: romanoStr });
      } else {
        throw new Error("Error en la lectura de número romano, se esperaba el sufijo '_R' después de: " + romanoStr);
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

    // Carácter desconocido
    throw new Error("Carácter no reconocido: " + char);
  }
  return tokens;
}

// Variables globales para el parser
let tokens = [];
let posicionToken = 0;

// Función para obtener el token actual sin avanzar
function tokenActual() {
  return tokens[posicionToken];
}

// Función para avanzar al siguiente token
function consumirToken() {
  posicionToken++;
}

// Parser recursivo para evaluar la expresión aritmética.
// Gramática:
//   Expresión = Término { ('+' | '-') Término }
//   Término    = Factor { ('*' | '/') Factor }
//   Factor     = ['-'] ( número | '(' Expresión ')' )
// Se agrega soporte para el operador unario '-' en Factor.
// Se impide que se aplique el operador unario '-' directamente a un número romano.
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
  // Se impide que se aplique directamente a un número romano.
  if (token.type === 'OP' && token.value === '-') {
    consumirToken();
    if (tokenActual() && tokenActual().type === 'NUM_ROMANO') {
      throw new Error("No se permite ingresar un único número romano negativo.");
    }
    return -parseFactor();
  }
  // Si el token es un paréntesis abierto, se evalúa la expresión interna
  if (token.type === 'PAREN' && token.value === '(') {
    consumirToken(); // consumir '('
    let valor = parseExpresion();
    if (posicionToken >= tokens.length || tokens[posicionToken].type !== 'PAREN' || tokens[posicionToken].value !== ')') {
      throw new Error("Se esperaba ')' para cerrar la expresión.");
    }
    consumirToken(); // consumir ')'
    return valor;
  }
  // Si el token es un número decimal (con formato num_D)
  if (token.type === 'NUM_DECIMAL') {
    consumirToken();
    return parseFloat(token.value);
  }
  // Si el token es un número romano, se convierte a arábigo
  if (token.type === 'NUM_ROMANO') {
    consumirToken();
    return convertirRomanoAEntero(token.value + "_R");
  }
  throw new Error("Token inesperado: " + token.value);
}

// Función para evaluar la expresión aritmética
// Recibe la cadena, la tokeniza, parsea y retorna el resultado numérico
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
   Interfaz interactiva de la calculadora
   ============================================================ */

function mostrarMenuCalculadora() {
  console.log("\n--- Calculadora Aritmética ---");
  console.log("Puedes usar números decimales o números romanos.");
  console.log("Formato para decimales: num_D (ejemplo: 10_D, 5_D, etc.)");
  console.log("Formato para romanos: num_R (ejemplo: V_R, IX_R, etc.)");
  console.log("Operadores disponibles: +, -, *, / y paréntesis () para agrupar.");
  
  rl.question("Introduce la expresión aritmética: ", (expresion) => {
    try {
      const resultado = evaluarExpresion(expresion);
      // Preguntar en qué sistema mostrar el resultado
      rl.question("¿En qué sistema deseas ver el resultado? (1: decimal, 2: romano): ", (opcion) => {
        if (opcion.trim() === '1') {
          // Mostrar el resultado en formato decimal con sufijo _D
          console.log("Resultado en decimal: " + resultado + "_D");
        } else if (opcion.trim() === '2') {
          // Se verifica que el resultado sea un entero positivo convertible a romano
          if (Number.isInteger(resultado) && resultado >= 1 && resultado <= 3999) {
            console.log("Resultado en romano: " + numeroARomano(resultado));
          } else {
            console.log("El resultado (" + resultado + ") no se puede convertir a número romano.");
          }
        } else {
          console.log("Opción no válida. Se mostrará el resultado en decimal.");
          console.log("Resultado en decimal: " + resultado + "_D");
        }
        // Preguntar si se desea realizar otra operación
        rl.question("¿Deseas evaluar otra expresión? (s/n): ", (resp) => {
          if (resp.toLowerCase() === 's') {
            mostrarMenuCalculadora();
          } else {
            console.log("Saliendo de la calculadora.");
            rl.close();
          }
        });
      });
    } catch (error) {
      console.log("Error: " + error.message);
      // En caso de error, se pregunta si se desea reintentar
      rl.question("¿Deseas intentar otra expresión? (s/n): ", (resp) => {
        if (resp.toLowerCase() === 's') {
          mostrarMenuCalculadora();
        } else {
          console.log("Saliendo de la calculadora.");
          rl.close();
        }
      });
    }
  });
}

// Iniciar la calculadora
mostrarMenuCalculadora();
