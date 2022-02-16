## Projeto Stranger Things - Backend

Os projetos de backend e Frontend foram adaptados e configurados para a realização do deploy. Os projetos frontend e backend foram colocados no ar com o `Heroku`, utilizando o `Docker` em ambiente de produção. Além disso, algusn comportamentos foram alterados para o correto funcionamento das aplicações.

### Objetivos dos Projetos

- Adaptar e configurar o `Heroku`;
- Publicar aplicações com `Docker` através do `Heroku`;
- Utilizar variáveis de ambiente dentro do `Heroku`.

### Requisitos dos Projetos

- [Backend](#backend-2)
  - [1 - Verifica as variáveis de ambiente](#1---verifica-as-variáveis-de-ambiente)
  - [2 - Verifica se o arquivo Dockerfile está configurado da maneira correta](#2---verifica-se-o-arquivo-dockerfile-está-configurado-da-maneira-correta)
  - [3 - Verifica se o arquivo heroku.yml está configurado na maneira correta](#3---verifica-se-o-arquivo-herokuyml-está-configurado-na-maneira-correta)
  - [4 - Verifica action de Linter para ser executada no GitHub](#4---verifica-action-de-linter-para-ser-executada-no-github)
  - [5 - Verifica o Deploy no Heroku](#5---verifica-o-deploy-no-heroku)
- [Frontend](#frontend-2)
  - [6 - Verifica as variáveis de ambiente do frontend](#6---verifica-as-variáveis-de-ambiente-do-frontend)
  - [7 - Verifica se foi feito o deploy do frontend no Heroku](#7---verifica-se-foi-feito-o-deploy-do-frontend-no-heroku)




---

#### 1 - Verifica as variáveis de ambiente

Altere o backend para utilizar variáveis de ambiente para controlar os seguintes comportamentos:

1.  A porta que a API escutará, essa variável deve ter, nescessariamente, o nome PORT e o seu valor deve ser 3000.

2.  O modo "upsideDown". Essa variável espera um valor boleano e deverá se chamar UPSIDEDOWN_MODE. Lembre-se que as variáveis de ambiente são `strings`.

O que será testado:

- Se existe a variável de ambiente PORT.
- Se a variável de ambiente UPSIDEDOWN_MODE existe e se ela é um boleano.

**Importante**: Para esse projeto, as variáveis de ambiente devem ser definidas em um arquivo .env e o arquivo deve ser enviando no seu PR(Pull Request). ISSO NÃO É UMA PRÁTICA DE MERCADO, o arquivo .env deve ser sempre incluido no .gitignore pois contém informações sensíveis, aqui será enviado apenas por motivo de avaliação.

#### 2 - Verifica se o arquivo Dockerfile está configurado da maneira correta

O teste irá verificar se o arquivo `Dockerfile` existe e está configurado da maneira correta. Ele deve construir a imagem a partir da `node:14-alpine` e usar o comando `npm start` para iniciar a aplicação via `CMD`.

O que será testado:

- Se a Dockerfile está utilizando a imagem `node:14-alpine`, verificando se as camadas desta imagem estão incluídas no build que essa Dockerfile faz.
- Se a Dockerfile usa `npm start` como `CMD`.

#### 3 - Verifica se o arquivo heroku.yml está configurado na maneira correta

Adicione e configure o arquivo `heroku.yml`

1. O arquivo deve iniciar um servidor do tipo `web`
2. O `run` deve executar o servidor utilizando o `node`.

Execute ambos em sua máquina para validar se o comportamento é o esperado.

O que será testado:

- Se o arquivo `heroku.yml` existe.
- Se o serviço a ser executado é um serviço do tipo `web`.
- Se o `node` é responsável por executar o servidor.

#### 4 - Verifica action de Linter para ser executada no GitHub

Você deverá criar uma `Action` para ser executada somente em **pull_requests** solicitados em todas as branchs de seu repositório.

**Atenção**: O arquivo de configuração da action deverá ser criado em: `./actions/` com o nome `project.yml`.

O que será testado:

- Se o arquivo `./actions/project.yml` existe.
- Se a `Action` é acionada somente em `pull_request`.
- Se o job foi nomeado como: `eslint`.
- Se o linter está sendo executado com a versão **20.04** do ubuntu.
- Se o linter está sendo executado com a versão 12 do node.

#### 5 - Verifica o Deploy no Heroku

**IMPORTANTE**: Uma variável de ambiente com o nome `GITHUB_USER` deverá ser criada em seu `.env` com o **seu nome de usuário** do GitHub.

**IMPORTANTE :warning:**: O Heroku limita o tamanho do nome de uma aplicação para ter no máximo **30 caracteres**, se o seu nome de usuário do GitHub possuir mais que 27 caracteres você não conseguirá criar uma aplicação com o nome no padrão solicitado pelo requisito. **Caso esteja nessa condição, avise nosso time de instrunção que iremos ajudar**.

1. Crie dois `apps` do Heroku a partir do mesmo código fonte (código da API). O nome do seu app no Heroku deverá conter seu nome de usuário no GitHub seguido de "-up" e "-dw". Por exemplo, se seu nome de usuário no GitHub for "student" seus apps deverão ter os nomes "student-up" e "student-dw" e as URLs abaixo:

   - https://student-up.Herokuapp.com/ - para o app hawkins

   - https://student-dw.Herokuapp.com/ - para o app upside-down

2. Configure a variável de ambiente criada para controlar o modo `UPSIDEDOWN`. Cada um dos `apps` deverá ter valores distintos, da seguinte maneira:

   - O app `hawkins` deverá ter o valor `false`;

   - O app `upside-down` deverá ter o valor `true`.

3. Utilizando o `git`, faça o deploy de ambos os `apps` no Heroku.

Acesse os URLs geradas e valide se ambas as API's estão no ar e funcionando como esperado.

**Importante**: As URLs deverão ser geradas pelo Heroku e não devem ser modificadas.

O que será testado:

- Se ao fazer uma requisição do tipo GET para o endpoint da API hawkins serão retornadas as informações corretas.
- Se ao fazer uma requisição do tipo GET para o endpoint da API upside-down serão retornadas as informações corretas.

### Frontend

#### 6 - Verifica as variáveis de ambiente do frontend

Altere o frontend para utilizar variáveis de ambiente para controlar as **URLs** e **Timeouts** de comunicação com a API.

Perceba que o código está esperando por duas **APIs**. Uma para o modo `upside-down` e a outra para o modo normal.

O nome das variáveis deve ser o seguinte:

- Para seu back-end hawkins:

  - REACT_APP_HAWKINS_URL para a URL;
  - REACT_APP_HAWKINS_TIMEOUT para o timeout;

- Para seu back-end UPSIDEDOWN:
  - REACT_APP_UPSIDEDOWN_URL para a URL;
  - REACT_APP_UPSIDEDOWN_TIMEOUT para o timeout;

O que será testado:

- Se existem as 4 variáveis de ambiente citadas acima.

**Importante**: Para esse projeto, as variáveis de ambiente devem ser definidas em um arquivo .env e o arquivo deve ser enviando no seu PR(Pull Request). ISSO NÃO É UMA PRÁTICA DE MERCADO, o arquivo .env deve ser sempre incluido no .gitignore pois contém informações sensíveis, aqui será enviado apenas por motivo de avaliação.

#### 7 - Verifica se foi feito o deploy do frontend no Heroku

**IMPORTANTE**: Assim como no `Back-end`, a variável de ambiente `GITHUB_USER` deverá ser criada com o seu usuário do GitHub.

Faça o deploy do front-end:

1.  Crie um app do Heroku com o front-end. Vamos deixar o Heroku utilizar as configurações padrões. No momento de criar o app do Heroku, utilize o `buildpack` descrito abaixo, em **Dicas**.

2.  O nome do seu app no Heroku deve ser seu nome de usuário do GitHub seguido de "-ft". Por exemplo, se o seu usuário do GitHub for "student", o nome do seu app será "student-ft" e a URL **_precisar ser_** https://student-ft.Herokuapp.com/.

3.  Configure as variáveis de ambiente do app para apontar para as API's publicadas.

4.  Faça o deploy com o git.

**Dicas**:

Para publicar seu frontend React, utilize o buildpack [mars/create-react-app](https://elements.Heroku.com/buildpacks/mars/create-react-app-buildpack).

Lembre-se de que é possível testar o comportamento definindo as variáveis de ambiente em sua máquina. Você pode fazê-las apontar tanto para o backend rodando localmente em sua máquina, quanto para as API's já publicadas nos requisitos anteriores.

O que será testado:

- Se ao visitar sua página no Heroku, o botão de mudar de realidade existe.
- Se a pesquisa funciona como deveria, fazendo chamada a API externa.
- Se o botão de mudar de realidade funciona.
- Se os botões de próxima página e página anterior funcionam.



-------------------------------------------------------------------------------------------------------------------------------------


## Deploy - Stranger Things

### Backend

O Backend possui a seguinte estrutura:

```
├── README.md
├── index.js
├── data
│  ├── dataset
│  │  └── stranger-things-characters.json
│  └── repository
│     └── StrangerThings.js
├── services
│  └── StrangerThings.js
├── package-lock.json
└── package.json
```

---

#### API

A API consiste em um serviço simples com um endpoint `/` que retorna uma listagem com os personagens da série **Stranger Things**.

---

#### Resposta

A lista de personagem possui os seguintes campos:

- **name**: Nome do personagem;

- **status**: se o personagem está vivo ou não na série. Os valores possíveis são `alive`, `deceased` ou `unknown`;

- **origin**: o local de origem do personagem.

A resposta é em formato `JSON`, e o retorno é sempre um array de objetos. Abaixo, um exemplo:

```JSON
[
  {
    "name": "Will",
    "status": "Alive",
    "origin": "Byers Family"
  }
]
```

---

#### Filtros

Todos os campos da estrutura de retorno da resposta podem ser utilizados como filtros. Para isso, basta passar na `query string` o filtro desejado. No exemplo abaixo, estamos filtrando pelo _nome_ do personagem:

> localhost:3000?name=el

Os filtros são feitos utilizando uma `regex`, buscando pelo texto passado na `query string` em qualquer parte do campo, sem diferenciar maiúsculas de minúsculas.

Nesse caso o retorno seria:

```JSON
[
  {
    "name":"Russell",
    "status":"Alive",
    "origin":"Hawkings Middle School"
  },
  {
    "name":"Eleven",
    "status":"Alive",
    "origin":"Hopper Family"
  }
]
```

---

#### Modo `upside down` (dw) - Backend

Na API, no arquivo `index.js`, há a seguinte variável de controle:

```javascript
const hereIsTheUpsideDown = true;
```

Caso ela seja `true`, a API ativará o modo "Mundo Invertido", conforme a série, e começará a responder desta forma:

```JSON
[
  {
    "name":"llǝssnᴚ",
    "origin":"looɥɔS ǝlppᴉW sƃuᴉʞʍɐH",
    "status":"ǝʌᴉl∀"
  },
  {
    "name":"uǝʌǝlƎ",
    "origin":"ʎlᴉɯɐℲ ɹǝddoH",
    "status":"ǝʌᴉl∀"
  }
]
```

---

### Frontend

O frontend consiste em um projeto simples utilizando React.

Trata-se de um frontend bem simples que vai se comunicar com a nossa API. Ele possui as seguintes funcionalidades:

- Uma tabela para exibição da resposta da nossa API;

- Um campo de pesquisa para filtro de **nome**;

- Botões de navegação para paginação;

- Um botão para ativar o modo `Mundo Invertido` no frontend.

Todas essas funcionalidades estão implementadas no componente `StrangerThings`.

---

#### Comunicação com o backend

Na estrutura do projeto, temos um diretório `services`. Nesse diretório, há um arquivo `charactersAPI.js`, onde são feitas as chamadas `HTTP` para a nossa API, utilizando o `axios`.

O service é uma classe que espera receber a URL da nossa API e um timeout para a requisição:

```javascript
{
  url: 'localhost:3003',
  timeout: 30000
}
```

Esses parâmetros estão pré-programados de maneira fixa no componente (alteraremos esse comportamento durante o projeto):

```javascript
const strangerThingsConfig = {
  url: "localhost:3002",
  timeout: 30000,
};

const upsideDownConfig = {
  url: "localhost:3003",
  timeout: 30000,
};

const charactersService = new CharactersService(strangerThingsConfig);
const charactersUpsideDownService = new CharactersService(upsideDownConfig);
```

---

#### Modo `upside down` (dw) - Frontend

Assim como no backend, o frontend também possui um modo "Mundo Invertido". Esse modo é ativado e desativado com o botão "Mudar de Realidade".

A ideia é a seguinte: inicialmente, o frontend possui uma imagem de background e utiliza o service instanciado com a configuração contida na variável `strangerThingsConfig`. Ao ativar o Mundo Invertido, a imagem de background é alterada e passamos a utilizar o serviço instanciado com a configuração `upsideDownConfig`.

Desse modo, ao "alternar entre os universos", vamos realizar chamadas a API's diferentes.

No exemplo pré-programado, em um dos "universos", chamamos um serviço na porta `3002` e o outro serviço na porta `3003`. Exploraremos esse comportamento durante o projeto.

---

