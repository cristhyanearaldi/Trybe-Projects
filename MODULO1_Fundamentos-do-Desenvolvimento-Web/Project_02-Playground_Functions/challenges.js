const { techList } = require('./challenges2');

// Desafio 1
function compareTrue(param1, param2) {
  if (param1 && param2 === true) {
    return true;
  } else {
    return false;
  }
}

compareTrue(true, true);
compareTrue(true, false);
compareTrue(false, true);
compareTrue(false, false);

// Desafio 2
function calcArea(base, height) {
  return base * height / 2;
}

calcArea(10, 50);
calcArea(5, 2);
calcArea(51, 1);

// Desafio 3

function splitSentence(string) {
  let arrayDeStrings = [];
  arrayDeStrings = string.split(' ');
  return arrayDeStrings;
}

splitSentence('go Trybe');
splitSentence('vamo que vamo');
splitSentence('foguete');

// Desafio 4

function concatName(arrayDeStrings) {
  let novoArray = [];
  novoArray = arrayDeStrings[arrayDeStrings.length - 1] + ', ' + arrayDeStrings[0];
  return novoArray;
}

concatName(['Lucas', 'Cassiano', 'Ferraz', 'Paolillo']);

// Desafio 5
function footballPoints(wins, ties) {
  winPoints = 3;
  tiePoints = 1;
  totalPoints = (wins * winPoints) + (ties * tiePoints);
  return totalPoints;
}
footballPoints(14, 8);
footballPoints(1, 2);
footballPoints(0, 0);

// Desafio 6
function highestCount(arrayDeNumeros) {
  let maiorNumero = arrayDeNumeros[0]; 
  let contador = 0;
  for (let index = 0; index < arrayDeNumeros.length; index += 1) {
    if (arrayDeNumeros[index] > maiorNumero) {
        maiorNumero = arrayDeNumeros[index];
    }
  }
  for (let indice = 0; indice < arrayDeNumeros.length; indice += 1) {
    if (maiorNumero === arrayDeNumeros[indice]) {
      contador += 1;
    }
  }
  return contador;  
}

highestCount([9, 1, 2, 3, 9, 5, 7]);
highestCount([0, 4, 4, 4, 9, 2, 1]);
highestCount([0, 0, 0]);
highestCount([1, 9, 2, 3, 9, 5, 7]);
highestCount([-2, -2, -1]);

// Deafio 7
function catAndMouse(mouse, cat1, cat2) {
  distanceCat1 = Math.abs(cat1 - mouse);
  distanceCat2 = Math.abs(cat2 - mouse);

  if (distanceCat1 < distanceCat2) {
    return 'cat1';
  } else if (distanceCat1 > distanceCat2) {
    return 'cat2';
  } else {
    return 'os gatos trombam e o rato foge';
  }
}

console.log(catAndMouse(0, 3, 2));

// Desafio 8
function fizzBuzz(numeros) {
  let mensagem = [];
  for (let index = 0; index < numeros.length; index += 1) {
    if (numeros[index] % 3 === 0 && numeros[index] % 5 === 0) {
      mensagem.push('fizzBuzz');
    } else if (numeros[index] % 3 === 0) {
      mensagem.push('fizz');
    } else if (numeros[index] % 5 === 0) {
      mensagem.push('buzz');
    } else {
      mensagem.push('bug!');
    }
  }
  return mensagem;
}

console.log(fizzBuzz([2, 15, 7, 9, 45]));
console.log(fizzBuzz([7, 9]));
console.log(fizzBuzz([9, 25]));

// Desafio 9
function encode(stringLetras) {
  let stringDecodificada = '';
  for (let key of stringLetras) {
    switch (key) {
    case 'a':
      stringDecodificada += '1';
      break;
    case 'e':
      stringDecodificada += '2';
      break;  
    case 'i':
      stringDecodificada += '3';
      break;
    case 'o':
      stringDecodificada += '4';
      break;
    case 'u':
      stringDecodificada += '5';
      break;
    default:
      stringDecodificada += key;
    }
  }
  return stringDecodificada;
} 
  console.log(encode('hi there!'));

function decode(stringNumeros) {
  let stringDecodificada = '';
  for (let key of stringNumeros) {
    switch (key) {
    case '1':
      stringDecodificada += 'a';
      break;
    case '2':
      stringDecodificada += 'e';
      break;  
    case '3':
      stringDecodificada += 'i';
      break;
    case '4':
      stringDecodificada += 'o';
      break;
    case '5':
      stringDecodificada += 'u';
      break;
    default:
      stringDecodificada += key;
    }
  }
  return stringDecodificada;
} 
  console.log(decode('h3 th2r2!'));

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
