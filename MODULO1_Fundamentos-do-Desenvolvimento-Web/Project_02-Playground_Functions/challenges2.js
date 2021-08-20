// Desafio 10
function techList(technologies, name) {
  let newList = [];
  let tech = technologies.sort(); 
  if (technologies.length === 0) {
    return 'Vazio!';
  } else {
    for (let index = 0; index < technologies.length; index += 1) {
    let object = {
        tech: tech[index],
        name: name
      };
      newList.push(object);
    }
  }
  return newList;
}
techList(['React', 'Jest', 'HTML', 'CSS', 'JavaScript'],
'Lucas');

// Desafio 11
function generatePhoneNumber(numerosTel) {
  let ddd = [numerosTel[0], numerosTel[1]];
  let primeiraParte = [numerosTel[2], numerosTel[3], numerosTel[4], numerosTel[5], numerosTel[6]];
  let segundaParte = [numerosTel[7], numerosTel[8], numerosTel[9], numerosTel[10]];
  let numero = [];
  let contador = 0;

  if (numerosTel.length !== 11) {
    return 'Array com tamanho incorreto.';
  }

  for (let i = 0; i < numerosTel.length; i += 1) {
    
    for (let j = 0; j < numerosTel.length; j += 1) {
      if (numerosTel[i] === numerosTel[j]) {
        contador += 1;
      }  
      if (contador >= 3 ){
        return 'não é possível gerar um número de telefone com esses valores';
      } 
    }
    contador = 0;
    if (numerosTel[i] < 0 || numerosTel[i] > 9){
      return 'não é possível gerar um número de telefone com esses valores';
    }
  }
  numero = '(' + ddd.join('') + ') ' + primeiraParte.join('') + '-' + segundaParte.join('');
  return numero;
} 
console.log(generatePhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1])); 

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  if (lineA < (lineB + lineC) && lineA > Math.abs(lineB - lineC || lineC - lineB)) {
    return true;
  } else if (lineB < (lineA + lineC) && lineB > Math.abs(lineA - lineC || lineC - lineA)) {
    return true;
  } else if (lineC < (lineA + lineB) && lineC > Math.abs(lineA - lineB || lineB - lineA)) {
    return true;
  } else {
    return false;
  }
}
console.log (triangleCheck(10, 14, 8));

// Desafio 13
function hydrate(numeroCopos) {

let quantidade = 0;

  for (let contador = 0; contador < numeroCopos.length; contador += 1) {
    for (let contador2 = 0; contador2 < numeroCopos.length; contador2 += 1) {
   
      if (numeroCopos[contador2] == contador) {
        quantidade += contador;
      }
    }
  }

  if (quantidade < 2) {
    return '1 copo de água';
  } else {
    return quantidade + ' copos de água';
  }
}

console.log(hydrate('1 cachaça, 5 numeroCoposs e 1 copo de vinho'));

module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};