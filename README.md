## Descrição

Essa API é uma parte que compõe o projeto TV FULL, que consiste no desenvolvimento de uma skill para a assistente virtual da Amazon, Alexa. TV FULL é uma skill que possui o objetivo de fornecer informações relacionadas a programas de televisão, sendo capaz de informar a programação atual de um canal, em qual canal passará um determinado programa, possibilitando também a criação de lembrete para que a Alexa avise minutos antes do programa começar, isso e muito mais apenas pelo controle de voz. 

Esta API executa duas instâncias do Node em paralelo para que em uma instância a API receba as requisições vindas da skill, processe e envie a resposta, na outra instância é processada uma fila de tarefas programadas para raspar as informações relacionadas aos canais de TV de um determinado site e salva-las no Elasticsearch. 

---

## Algumas tecnologias usadas

- [Node js](https://nodejs.org/) - Node.js é um interpretador de JavaScript assíncrono com código aberto orientado a eventos

- [Express](https://expressjs.com/) - O Express.js é uma estrutura de aplicativo da Web para o Node.js, ele foi projetado para criar aplicativos da Web e APIs.

- [Puppeteer](https://github.com/puppeteer/puppeteer) - O Puppeteer foi utilizado no projeto para automatizar a raspagem dos programas de tv, onde um determinado site é acessado sem que a interface do chromium seja iniciada.

- [Bull](https://github.com/OptimalBits/bull) - Bull é uma biblioteca Node que implementa um sistema de filas rápida e robusta baseado no Redis. As tarefas são programadas para serem executadas em determinados horários. 

- [Elasticsearch](https://www.elastic.co/pt/) - O Elasticsearch é uma ferramenta open source NoSQL para buscas e armazenamento de dados, que tem capacidade para tratar de grandes quantidades de dados em tempo real.

- [Redis](https://redis.io/) - O Redis é um armazenamento de estrutura de dados em memória de código aberto, usado como banco de dados, cache e intermediário de mensagens.

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - O ESLint analisa estaticamente seu código para encontrar rapidamente problemas.

- [Travis](https://travis-ci.org/) - O Travis CI é um serviço de integração contínua. ele está sendo responsável por ficar com o trabalho pesado de transpilar o código typescript, já que a máquina do heroku não suportaria esse processo, e também para o deploy no próprio heroku.

- [Docker](https://www.docker.com/) - Tecnologia utilizada para o isolamento de ambiente.

- [Prettier](https://prettier.io/) - Um formatador de código.

- [Heroku](https://www.heroku.com/) - Heroku é uma plataforma em nuvem como um serviço que suporta várias linguagens de programação.


- [VS Code](https://code.visualstudio.com/) com [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) 

