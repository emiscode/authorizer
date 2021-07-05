# Code Challenge: Autorizador

Este projeto foi desenvolvido em JavaScript/NodeJs.
Para executar é necessário o NodeJS na versão v.14.17.0 ou superior

---

**Após extrair o projeto, abra a pasta raiz**
`cd authorize`
**Em seguida execute o comando**
`npm install`
**Para rodar o programa, execute**
`node .\authorize.js` ou `npm start`
**Em seguinda selecione o arquivo de input, por exemplo**
`.\tests\data\operations-01`
**O resultado esperado é**

> {
> account: { 'active-card': false, 'available-limit': 750 },
> violations: []
> }

**Para rodar os testes automatizados, execute**
`node .\authorize.test.js` ou `npm test`

---

### Arquitetura do Projeto

Todo o projeto foi desenvolvido pensando em uma estrutura que ofereça facilidade para manutenção, uma separação clara de responsabilidades de cada função, usando princípios de Transparência Referencial, possibilitando assim estender as funcionalidades da aplicação de forma a produzir pouco ou nenhum impacto nas features que já funcionam.
Por exemplo, toda a lógica de negócios da aplicação é independente, e suas funções recebem parâmetros que serão utilizados para processar a regra e devolver um resultado.
Para estender a aplicação, basta adicionar novos arquivos de regras e importá-los nos devidos lugares para serem executados, dependendo se for uma regra de account ou de transaction.

**_Por exemplo_**

- Para adicionar uma nova regra para transaction, criamos um novo arquivo .js com a regra
  `/business/novaRegra.js`

- Em seguida, dentro do arquivo rules/transaction/authorizeTransaction.js importa-se o arquivo com a nova regra
  `import { novaRegra } from '../business/novaRegra.js'`

- E no mesmo arquivo calcula-se a violation, baseado no resultado da regra
  `if (!novaRegra(request)) {`
  `account.violations.push('alguma-coisa-deu-errado')`
  `isAuthorized = false`
  `}`

### Estrutura de pastas

- authorize (root folder)
  - models (contém a estrutura de dados para o account)
  - rules (contém todas as regras de negócio aplicáveis para account e transaction)
    - account (contém a regra principal para account **_createAccount_**, que por sua vez é responsável por executar todas as regras existente para account)
    - business (contém toda lógica de negócios da aplicação, baseada nos princípios de Transparência Referencial)
      - hasLimit.js
      - isAccountActivated.js
      - isAccountInitialized.js
      - isDoubledTransaction.js
      - isHighFrequencyTransaction.js
    - transaction (contém a regra principal de transaction **_authorizeTransaction_** que por sua vez é responsável por executar toda as regras existentes para transaction)
  - services (contém os serviços suportados baseado nas operações de criação de conta e autorização de transação)
  - tests (contém os test data com informação de input e output extraídas do próprio desafio)
- authorize.js (arquivo executável principal)
- authorize.test.js (arquivo executável para testes)
- package-json (contém a configuração do projeto)
- README (doc)
