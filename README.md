# Template de Microserviços em TypeScript

## O que é este template?
Este template serve como ponto de partida para o desenvolvimento de microserviços em TypeScript, seguindo o modelo padrão adotado pela empresa. Ele é ideal para projetos que incluem tanto servidores (Express) quanto funções Lambda acionadas por API Gateway, SQS e EventBridge.

## Tecnologias Utilizadas
Principais tecnologias e ferramentas incluídas no template:

- **TypeScript**
- **Jest**
- **Express**

## Extensibilidade
Este template é projetado para ser facilmente extensível. Você pode adicionar novos endpoints e funcionalidades conforme necessário. Para o Express, configure as rotas nos arquivos `src/interfaces/server/index.ts` e `src/interfaces/routes`.

## Padrões de Código e Linting
Incluímos configurações de ESLint e Prettier para garantir padrões de código consistentes. Linters são executados automaticamente antes de cada commit.

## Estrutura do Projeto
```plaintext
.
└── src
    ├── domain          # Arquivos de domínio
    ├── infrastructure  # Implementações dos serviços de acordo com o fornecedor
    ├── interfaces      # Interfaces/Handlers de acionamento
    └── usecases        # Casos de uso
```

#### Desenho da comunicação entre as camadas.

* A requisição chega via interface
* A interface inicia o caso de uso
* O caso de uso consome os serviços do domínio.
* Os serviços do domínio consomem os serviços dos provedores

## Licença
  
Este projeto está licenciado sob a licença MIT. Isso significa que você é livre para usar, modificar e distribuir este software, desde que atribua o devido crédito aos autores originais.