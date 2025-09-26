# Proyecto 01 Arqui 2025

## Name
Calculadora Multibase Avanzada 

## Files

script.js
style.css
index.html
README.md

calculadoraRomano.js
conversorBabi.js
conversorMaya.js

Archivos principales el primer bloque, script, style, index, README. Al compilar nuestro script.js que es el archivo de encabezado del programa vamos a obtener la ejecución preparada con index.html para la visualizacion del usuario.

Los archivos de calculadoraRomano, conversorBabi y conversorMaya, fue una preimplementacion para luego crear nuestro encabezado.

## Description
Esta aplicación es una calculadora que permite realizar operaciones aritméticas entre diferentes sistemas numéricos históricos, facilitando la comprensión de estos sistemas utilizados por diversas civilizaciones a lo largo de la historia.La calculadora soporta los siguientes sistemas numéricos:

-Romano (_R)
-Babilónico (_B)
-Maya (_M)
-Decimal (_D)

El objetivo es proporcionar una herramienta educativa y funcional, asegurando una conversión precisa entre estos sistemas.

## Badges
Interfaz Gráfica: Permite la interacción mediante botones o teclado.

Operaciones soportadas: Suma, resta, multiplicación y división.

Jerarquía de operaciones: Respeta el orden matemático y el uso de paréntesis.

Historial de operaciones: Se almacena en memoria durante la sesión.

Validaciones avanzadas:

Restricciones en números romanos (límite 3999, combinaciones inválidas como "IXI").

Restricción de valores negativos en sistemas que no los soportan.

Validación de sintaxis y representación correcta en cada sistema numérico.

Conversión directa entre sistemas.

Selección de sistema de salida: El usuario elige el sistema numérico en el que desea ver el resultado.

## Implementation

*numeroARomano(numero)
    
    Entrada de un número decimal
    Retorna la cadena con sufijo "_R". Ejemplo: 5 -> "V_R"

    Funcionamiento de convertir un número (entero) a su representación en números romanos

*romanoADecimal(romanoConSufijo)

    Entrada: Cadena en formato romano con sufijo "_R".

    Salida: Número decimal equivalente.

    Funcionamiento: Convierte un número en notación romana a su equivalente decimal.

*convertirNivelMaya(nivel)
    Entrada: Un número entero representando un nivel en el sistema maya.

    Salida: Representación en símbolos mayas (• para puntos y — para líneas).

    Funcionamiento: Convierte un número decimal en su correspondiente representación maya, utilizando puntos y líneas según las reglas del sistema numérico maya.

*decimalAMaya(decimal)

    Entrada: Número decimal.

    Salida: Representación en simbolos mayas.

    Funcionamiento: Convierte un número decimal a su representación en el sistema numérico maya.

*mayaADecimal(entrada)

    Entrada: Representación en simbolos mayas.

    Salida: Número decimal equivalente.

    Funcionamiento: Convierte un número en notación maya a decimal.

*contarCaracteres(cadena, caracter)

    Entrada: Una cadena de texto y un carácter a contar.

    Salida: Número de veces que aparece el carácter en la cadena.

    Funcionamiento: Recorre la cadena y cuenta las apariciones del carácter.

*residuoABabilonico(valor)

    Entrada: Número entero entre 0 y 59.

    Salida: Representación en símbolos babilónicos.

    Funcionamiento: Convierte un residuo en su notación babilónica utilizando unidades y decenas.

*decimalABabilonico(decimal)

    Entrada: Número decimal.

    Salida: Representación en símbolos babilónicos.

    Funcionamiento: Convierte un número decimal a su equivalente en base 60 utilizando residuos y la función residuoABabilonico().

*babilonicoADecimal(babilonico)

    Entrada: Representación en símbolos babilónicos.

    Salida: Número decimal equivalente.

    Funcionamiento: Convierte una cadena de símbolos babilónicos en su valor numérico decimal, descomponiéndolo en grupos y aplicando base 60.

*simbolosABabilonico(simbolos)

    Entrada: Cadena de símbolos babilónicos para un nivel específico.

    Salida: Valor decimal del nivel.

    Funcionamiento: Cuenta las decenas y unidades en la cadena de símbolos y calcula su valor en base 60.

*manualSplitLevels(text, delimiter)

    Entrada: Cadena de texto y un delimitador específico.

    Salida: Lista de fragmentos de la cadena original.

    Funcionamiento: Recorre la cadena buscando coincidencias con el delimitador y separa los segmentos encontrados en una lista.

*tokenizar(expresion)

    Entrada: Expresión matemática que incluye números y operadores en distintos sistemas numéricos.

    Salida: Lista de tokens representados como objetos con tipo y valor.

    Funcionamiento: Analiza la expresión carácter por carácter, identificando números en sistemas decimal, romano, maya y babilónico, así como operadores matemáticos y paréntesis, clasificándolos en tokens estructurados.

*parseFactor()

    Entrada: Token actual de la expresión.

    Salida: Valor numérico del factor extraído.

    Funcionamiento: Evalúa factores como números, paréntesis y operadores unarios. Maneja errores para expresiones incompletas o tokens no reconocidos. No permite aplicar el operador '-' a números romanos, mayas o babilónicos.

*evaluarExpresion(expresion)

    Entrada: Expresión matemática en formato de cadena con números en distintos sistemas y operadores.

    Salida: Resultado numérico de la evaluación de la expresión.

    Funcionamiento: Tokeniza la expresión, la parsea utilizando un análisis sintáctico recursivo basado en una gramática definida, y devuelve el resultado final. Maneja operadores aritméticos y paréntesis, asegurando una evaluación correcta.

## Installation

Node.js: Para la lógica de la calculadora.

Electron: Para la implementación de la interfaz gráfica.

JavaScript: Lenguaje de programación principal.


Restricciones:

No se permite el uso de expresiones regulares (regex).

No se permite el uso de librerías externas para el procesamiento de texto o conversión numérica.


Requisitos previos

Tener instalado Node.js.

Tener instalado Electron.

## Usage

Introducir operaciones en el formato "numero/simbolo_sistema" (Ejemplo: XIV_R + (V_R * (XV_R - III_R) + VII_R) * V_R).

Seleccionar el sistema en el que se desea ver el resultado.

Consultar el historial de operaciones realizadas.

Una calculadora simple con la única modificación de permiter diferentes sistemas numericos para las operaciones.

Simbolos babilonico

    "y" = representa los números de 1 en 1 hasta el 9 en decimal
    "<" = representa cada 10 numeros, por decenas hasta el 50
    "°" = representa el numero 0 para los casos que se necesita
    "|" = representa cada seccion de 60 posiciones

Simbolo maya 

    "º" =Representa 0
    "·" = Cada punto representa 1
    "¬" = Representa la línea representa 5
    ";" = Se usa para separar los niveles mayas

Simbolo romano

    "I" = Enumeración del 1 al 4
    "V" = Representa cada 5 posiciones
    "X" = Representa cada 10 posiciones

## Authors and acknowledgment

Proyecto implementado por:
-Axel Lopez
-Daryll Martinez
-Dilan Zamora
-Esteban Rodriguez

## Project status

El proyecto esta basado en programar una calculadora que permita hacer operaciones aritméticas entre diferentes sistemas numéricos históricos. Dicha aplicación deberá ser una aplicación de escritorio con interfaz gráfica, y deberá contar con las siguientes funcionalidades:

1- La calculadora irá mostrando en un input la operación que el usuario va digitando (tal como una calculadora común), ya sea por teclado o mediante botones. Ambas alternativas deberán estar disponibles para el usuario.

2- Los sistemas numéricos permitidos por la calculadora serán: Romano (R), Babilónico (B), Maya (M) y Decimal (D). La forma en la que se deberán representar los números y sus respectivos sistemas en la calculadora será de la siguiente forma: "num_sistema". Por ejemplo, si quisiera representar el número 14 en sistema romano se debería escribir de la siguiente forma en la calculadora: "XIV_R".

3- La calculadora deberá permitir realizar operaciones aritméticas básicas: suma, resta, multiplicación y división. Además, deberá respetar la jerarquía de operaciones y respetar la agrupación por paréntesis. Por ejemplo, la siguiente operación debería poder resolverse por la calculadora: "X_R + (V_R * (XV_R - III_R) + VII_R) * V_R".

4- La calculadora podrá permitir operar números de distintos sistemas numéricos históricos, cualquier otro sistema se considerará inválido. El usuario podrá elegir en qué sistema quiere que le aparezca el resultado final.

5- Todos los resultados de las operaciones deberán almacenarse en memoria y podrán ser consultadas por el usuario en cualquier momento (histórico de operaciones realizadas), pero una vez se cierra la aplicación los datos se perderán.

6- Deberá analizar, considerar y validar los errores específicos de cada sistema numérico, por ejemplo:
- Números romanos mayores a 3999
- Combinaciones inválidas en números romanos (como "IXI")
- Valores negativos en sistemas que no los soportan
- Representaciones incorrectas en cualquier sistema

7- En todo el programa se deberá realizar las conversiones entre sistemas sin uso de sistemas intermedios. Deberá ser una conversión directa.

8- Si se usaron diversos sistemas numéricos en la operación, todos los valores deberán representarse en el sistema decimal para luego ser calculadas de forma interna. Es decir, si se tiene la operación "X_R + (XX_B * V_M)" todos los valores deberán representarse en decimal y luego hacer las operaciones correspondientes. Recuerde que el usuario podrá elegir en qué sistema se va a representar el resultado.

El estado del proyecto es 100% funcional, donde se cumplen cada una de las funcionalidades previstas. Brinda una interfaz e interacción amigable con el usuario.


## Conclution

La calculadora garantiza conversiones precisas entre los sistemas Romano, Babilónico, Maya y Decimal, respetando sus reglas particulares sin utilizar sistemas intermedios. Además, implementa validaciones avanzadas para garantizar la integridad de los cálculos y prevenir errores en la representación de los números.
El proyecto está completamente funcional y listo para su uso, proporcionando una herramienta robusta para quienes deseen explorar y operar con sistemas numéricos antiguos de manera precisa y eficiente.
