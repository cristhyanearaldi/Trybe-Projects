const login = document.getElementById('login');
const senha = document.getElementById('senha');
const logar = document.getElementById('logar');

function checarLogin() {
  if (login.value === 'tryber@teste.com' && senha.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Login ou senha inválidos.');
  }
}

logar.addEventListener('click', checarLogin);

const agreement = document.getElementById('agreement');
const submit = document.getElementById('submit-btn');
function habilitaEnvio() {
  if (agreement.checked === true) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
}
agreement.addEventListener('change', habilitaEnvio);
// Source: https://www.w3schools.com/jsref/event_onchange.asp

const counter = document.getElementById('counter');
const textarea = document.getElementById('textarea');

function characCounter() {
  const characNumber = 500 - textarea.value.length;
  counter.innerText = characNumber;
}

textarea.addEventListener('keyup', characCounter);

// requisito 21
const form = document.getElementById('evaluation-form');
const inputName = document.getElementById('input-name');
const inputLastName = document.getElementById('input-lastname');
const email = document.getElementById('input-email');
const house = document.getElementById('house');

function substituiNome() {
  const p1 = document.createElement('p');
  p1.innerText = `Nome: ${inputName.value} ${inputLastName.value}`;
  form.appendChild(p1);
}

function substituiEmail() {
  const p2 = document.createElement('p');
  p2.innerText = `Email: ${email.value}`;
  form.appendChild(p2);
}

function substituiCasa() {
  const p3 = document.createElement('p');
  p3.innerText = `Casa: ${house.value}`;
  form.appendChild(p3);
}

function substituiFamilia() {
  const familia = document.querySelector('input[name=family]:checked');
  // Source: https://pt.stackoverflow.com/questions/219949/pegar-o-valor-do-input-radio-com-javascript
  console.log(familia.value);
  const p4 = document.createElement('p');
  p4.innerText = `Família: ${familia.value}`;
  form.appendChild(p4);
}

function substituiMaterias() {
  const materia = document.querySelectorAll('input[name=materia]:checked');
  const conjuntoMaterias = [];
  for (let index = 0; index < materia.length; index += 1) {
    conjuntoMaterias.push(materia[index].value);
  }
  const conjunto = conjuntoMaterias.join(', ');
  const p5 = document.createElement('p');
  p5.innerText = `Matérias: ${conjunto}`;
  form.appendChild(p5);
}

function substituiNota() {
  const avaliacao = document.querySelector('input[name=rate]:checked');
  const p6 = document.createElement('p');
  p6.innerText = `Avaliação: ${avaliacao.value}`;
  form.appendChild(p6);
}

function substituiObservacoes() {
  const observacoes = document.querySelector('#textarea').value;
  const p7 = document.createElement('p');
  p7.innerText = `Observações: ${observacoes}`;
  form.appendChild(p7);
}

function substituiForm(event) {
  const divForm = document.getElementById('div-form');
  event.preventDefault();
  substituiNome();
  substituiEmail();
  substituiCasa();
  substituiFamilia();
  substituiMaterias();
  substituiNota();
  substituiObservacoes();
  form.removeChild(divForm);
}

submit.addEventListener('click', substituiForm);
