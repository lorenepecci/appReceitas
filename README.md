# Aplicativo de Receitas e Bebidas

## Contexto
### Este projeto é o desenvolvimento de uma aplicação em React que usou Context API como ferramenta de manipulação de estado.

# Tecnologias Usadas

Nesse projeto, utilizou-se:
- a Context API do _React_ para gerenciar estado
- o _React Hook useState_
- o _React Hook useContext_
- o _React Hook useEffect_
- Criar Hooks customizados

## Instalando Dependências

> Backend
```bash
cd api/ 
npm install
``` 
> Frontend
```bash
cd src/
npm install
``` 
## Executando aplicação

* Para rodar o back-end:

  ```
  cd api/ && npm start
  ```
* Para rodar o front-end:

  ```
    cd src/ && npm start
  ```

## Executando Testes

* Para rodar todos os testes:

  ```
    npm test
  ```

## Autores

- Iara Pedrosa
- Kesley Muniz
- Patrick Bastos  
- Lorene Pecci

## APIs utilizadas

### TheMealDB API

O [TheMealDB](https://www.themealdb.com/) é um banco de dados aberto, mantido pela comunidade, com receitas e ingredientes de todo o mundo.

### The CockTailDB API

Bem similar (inclusive mantida pela mesma entidade) a TheMealDB API, só que focado em bebidas.

### localStorage

Foi utilizado o `localStorage` para que as informações não se percam caso a pessoa atualize a página.

### Biblioteca `clipboard-copy`

Foi utilizada a biblioteca `clipboard-copy` para copiar as informações da receita.
