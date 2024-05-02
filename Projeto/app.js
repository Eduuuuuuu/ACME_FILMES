/*********************************************************************************************************
 * Objetivo: Nesta primeira etapa você foi convidado a criar uma API com apenas 02 Endpoints do tipo GET. 
 * Nome: Eduardo Vilas Boas
 * Data: 25/01/2024
 * Versão: 1.0.0
 *********************************************************************************************************/ 

/*
    Para realizar o acesso a Banco de Dados precisamos instalar algumas bibliotecas:

        - SEQUELIZE     - É uma biblioteca mais antiga
        - PRISMA ORM    - É uma biblioteca mais atual (será utilizado no projeto)
        - FASTFY ORM    - É uma biblioteca mais atual

        para instalar o PRISMA:
            - npm install prisma --save  (Irá realizar a conexão com BD)
            - npm install @prisma/client --save (Irá executar os scripts SQl no BD)

        Após a instalação das bibliotecas, devemos inicializar o prisma no projeto:
            - npx prisma init (Irá inicializar o PRISMA)

        Para reinstalar o prisma e atualizar as dependências:   
            - npm i (Irá atualizar todas as dependências)
            - no package.json caso não queira atualizar todas as dependências basta tirar o "^" do @prisma/client

        Caso troque de máquina e sincronizar o Banco de Dados novamente: 
            - npx prisma generate (Serve para ressincronizar o Banco de Dados)

 */

//Import das bibliotecas do projeto
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const funcoes = require('./Controller/funcoes.js')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()

})

/*****************************  Import dos arquivos da controller do projeto  ******************************************/
    const controllerFilmes = require('./Controller/controller_filme.js');
    const controllerGeneros = require('./Controller/controller_genero.js');
    const controllerClassificacao = require('./Controller/controller_classificacao.js');
    const controllerAtores = require('./Controller/controller_ator.js');
    const controllerDiretores = require('./Controller/controller_diretor.js');
/***********************************************************************************************************************/

////Criando um objeto para controlar a chegada dos dados da requisição em formato JSON
const bodyParserJSON = bodyParser.json();



/******************************************************************************************************************************************************************************/
/************************************************************EndPoints dos filmes************************************************************
/******************************************************************************************************************************************************************************/



//EndPoint: Versão 1.0 - retorna todos os filmes do arquivo filmes.js pelo ID
          //Periodo de funcionamento: 01/2024 até 02/2024
app.get('/v1/ACMEFilmes/filmes', cors(), async function(request, respose, next) {

    respose.json(funcoes.getListarTodosFilmes())
    respose.status(200)

})

//EndPoint: Versão 1.0 - retorna todos os filmes do arquivo filmes.js pelo ID
          //Periodo de funcionamento: 01/2024 até 02/2024
app.get('/v1/ACMEFilmes/filme/:id', cors(), async function(request, response, next) {
    
    let idFilme = request.params.id

    response.json(funcoes.getDadosFilmes(idFilme))
    
    response.status(200)
})

//EndePoint: Versão 2.0 - retorna todos os filmes do Banco de Dados
           //Periodo de funcionamento: 02/2024
app.get('/v2/ACMEFilmes/filmes', cors(), async function(request, response) {

    //Chama a função da controller para retornar os filmes
    let dadosFilmes = await controllerFilmes.getListarFilmes();

    //Validação para retornar o JSON dos filmes ou retornar 404
    if(dadosFilmes) {
        response.json(dadosFilmes);
        response.status(200);
    }else {
        response.json({message: 'Nenhum requisito foi encontrado'});
        response.status(404);
    }
})

//EndPoint: Retorna o filme filtrando pelo ID
app.get('/v2/ACMEFilmes/filme/:id', cors(), async function(request, response) {

    //Recebe o ID da requisição
    let idFilme = request.params.id;

    //Encaminha o ID para a controller buscar o filme
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme);

    response.status(dadosFilme.status_code);
    response.json(dadosFilme);
})

app.get('/v2/ACMEFilmes/filmes/filtro', cors(), async function(request, response) {

    let filtro = request.query.nome;

    let dadosFilmes = await controllerFilmes.getFilmesNome(filtro);

    response.status(dadosFilmes.status_code);
    response.json(dadosFilmes);
})

app.post('/v2/ACMEFilmes/filme', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content-type com o tipo de dados encaminhado na requisição
    let contentType = request.headers['content-type'];

    //Recebe todos os dados encaminhados na requisição pelo body
    let dadosBody = request.body;

    //Encaminha os dados para o controller enviar para o DAO
    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType);
    
    response.status(resultDadosNovoFilme.status_code);
    response.json(resultDadosNovoFilme);
})

app.delete('/v2/ACMEFilmes/deleteFilme/:id', cors(), bodyParserJSON, async function(request, response){

    let idFilme = request.params.id;

    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme);

    response.status(dadosFilme.status_code);
    response.json(dadosFilme);
})

app.put('/v2/ACMEFilmes/update/:id', cors(), bodyParserJSON, async function(request, response){

    let idFilme = request.params.id

    let contentType = request.headers['content-type'];

    let dadosBody = request.body;

    let updateFilme = await controllerFilmes.setAtualizarFilme(idFilme, dadosBody, contentType);

    response.status(updateFilme.status_code);
    response.json(updateFilme);
})



/******************************************************************************************************************************************************************************/
/************************************************************EndPoints dos generos************************************************************
/******************************************************************************************************************************************************************************/



app.get('/v2/ACMEFilmes/generos', cors(), async function(request, response){

    let dadosGeneros = await controllerGeneros.getListarGeneros();

    if(dadosGeneros) {
        response.json(dadosGeneros);
        response.status(200);
    }else {
        response.json({message: 'Nenhum requisito foi encontrado'});
        response.status(404);
    }
})

app.get('/v2/ACMEFilmes/genero/:id', cors(), async function(request, response){

    let idGenero = request.params.id;

    let dadosGenero = await controllerGeneros.getBuscarGenero(idGenero);

    response.status(dadosGenero.status_code);
    response.json(dadosGenero);
})

app.post('/v2/ACMEFilmes/genero', cors(), bodyParserJSON, async function(request, response){
    
    let contentType = request.headers['content-type'];

    let dadosBody = request.body;

    let resultDadosNovoGenero = await controllerGeneros.setInserirNovoGenero(dadosBody, contentType);
    
    response.status(resultDadosNovoGenero.status_code);
    response.json(resultDadosNovoGenero);
})

app.delete('/v2/ACMEFilmes/deleteGenero/:id', cors(), bodyParserJSON, async function(request, response){

    let idGenero = request.params.id;

    let dadosGenero = await controllerGeneros.setExcluirGenero(idGenero);

    response.status(dadosGenero.status_code);
    response.json(dadosGenero);
})

app.put('/v2/ACMEFilmes/updateGenero/:id', cors(), bodyParserJSON, async function(request, response){

    let idGenero = request.params.id

    let contentType = request.headers['content-type'];

    let dadosBody = request.body;

    let updateGenero = await controllerGeneros.setAtualizarGenero(idGenero, dadosBody, contentType);

    response.status(updateGenero.status_code);
    response.json(updateGenero);
})



/******************************************************************************************************************************************************************************/
/************************************************************EndPoints das classificações************************************************************
/******************************************************************************************************************************************************************************/



app.get('/v2/ACMEFilmes/classificacoes', cors(), async function(request, response){

    let dadosClassificacoes = await controllerClassificacao.getListarClassificacao();

    if (dadosClassificacoes) {
        response.json(dadosClassificacoes);
        response.status(200);
    } else {
        response.json({message: 'Nenhum requisito foi encontrado'});
        response.status(404);
    }
})

app.get('/v2/ACMEFilmes/classificacao/:id', cors(), async function(request, response){

    let idClassificacao = request.params.id;

    let dadosClassificacao = await controllerClassificacao.getBuscarClassificacao(idClassificacao);

    response.status(dadosClassificacao.status_code);
    response.json(dadosClassificacao)
})

app.post('/v2/ACMEFilmes/classificacao', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type'];

    let dadosBody = request.body;

    let resultDadosNovaClassificacao = await controllerClassificacao.setInserirNovaClassificacao(dadosBody, contentType);

    response.status(resultDadosNovaClassificacao.status_code);
    response.json(resultDadosNovaClassificacao);
})

app.delete('/v2/ACMEFilmes/deleteClassificacao/:id', cors(), bodyParserJSON, async function(request, response){

    let idClassificacao = request.params.id;

    let dadosClassificacao = await controllerClassificacao.setExcluirClassificacao(idClassificacao);

    response.status(dadosClassificacao.status_code);
    response.json(dadosClassificacao);
})

app.put('/v2/ACMEFilmes/updateClassificacao/:id', cors(), bodyParserJSON, async function(request, response){

    let idClassificacao = request.params.id

    let contentType = request.headers['content-type'];

    let dadosBody = request.body;

    let updateClassificacao = await controllerClassificacao.setAtualizarClassificacao(idClassificacao, dadosBody, contentType);

    response.status(updateClassificacao.status_code);
    response.json(updateClassificacao);
})



/******************************************************************************************************************************************************************************/
/************************************************************EndPoints dos atores************************************************************
/******************************************************************************************************************************************************************************/



app.get('/v2/ACMEFilmes/atores', cors(), async function(request, response){

    let dadosAtores = await controllerAtores.getListarAtores();

    if (dadosAtores) {
        response.json(dadosAtores);
        response.status(200);
    } else {
        response.json({message: 'Nenhum requisito foi encontrado'});
        response.status(404);
    }
})

app.get('/v2/ACMEFilmes/ator/:id', cors(), async function(request, response){

    let idAtor = request.params.id

    let dadosAtor = await controllerAtores.selectByIdAtor(idAtor);

    response.json(dadosAtor);
    response.status(dadosAtor.status_code);
})

app.get('/v2/ACMEFilmes/ator/filtro', cors(), async function (request, response){

    let filtro = request.query.nome

    let dadosAtor = await controllerAtores.selectByNomeAtor(filtro)

    response.json(dadosAtor)
    response.status(dadosAtor.status_code)
})

app.delete('/v2/ACMEFilmes/deleteAtor/:id', cors (), async function (request, response){

    let idAtor = request.params.id

    let dadosAtor = await controllerAtores.setExcluirAtor(idAtor)

    response.json(dadosAtor)
    response.status(dadosAtor.status_code)
})

app.post('/v2/ACMEFilmes/ator', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDadosNovoAtor = await controllerAtores.setInserirAtor(dadosBody, contentType)

    response.json(resultDadosNovoAtor)
    response.status(resultDadosNovoAtor.status_code)
})

app.put('/v2/AMEFilmes/updateAtor/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let idAtor =  request.params.id

    let resultDadosNovoAtor = await controllerAtores.setAtualizarAtor(idAtor, dadosBody, contentType)

    response.json(resultDadosNovoAtor)
    response.status(resultDadosNovoAtor.status_code)
})



/******************************************************************************************************************************************************************************/
/************************************************************EndPoints dos diretores************************************************************
/******************************************************************************************************************************************************************************/



app.get('/v2/ACMEFilmes/diretores', cors(),async function(request, response){

    let dadosDiretores = await controllerDiretores.getListarDiretores();

    if (dadosDiretores) {
        response.json(dadosDiretores);
        response.status(200);
    } else {
        response.json({message: 'Nenhum registro foi encontrado'});
        response.status(404);
    }
})

app.get('/v2/ACMEFilmes/diretor/:id', cors(), async function(request, response){

    let idDiretor = request.params.id

    let dadosDiretor = await controllerDiretores.selectByIdDiretor(idDiretor);

    response.json(dadosDiretor);
    response.status(dadosDiretor.status_code);
})

app.get('/v2/ACMEFilmes/diretor/filtro', cors(), async function(request, response){

    let filtro = request.query.nome

    let dadosDiretor = await controllerDiretores.selectByNomeDiretor(filtro)

    response.status(dadosDiretor.status_code)
    response.json(dadosDiretor)
})

app.delete('/v2/ACMEFilmes/deleteDiretor/:id', cors (), async function(request, response){

    let idDiretor = request.params.id

    let dadosDiretor = await controllerDiretores.setExcluirDiretor(idDiretor);

    response.status(dadosDiretor.status_code);
    response.json(dadosDiretor)
})

app.post('/v2/ACMEFilmes/diretor', cors(), bodyParserJSON, async function(request, response){
    
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body
    
    let resultDadosNovoDiretor = await controllerDiretores.setInserirDiretor(dadosBody, contentType)
    
    response.status(resultDadosNovoDiretor.status_code)
    response.json(resultDadosNovoDiretor)
})

app.put('/v2/ACMEFilmes/updateDiretor/:id', cors(), bodyParserJSON, async function(request, response){
    
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body
    
    let idDiretor = request.params.id
    
    let resultDadosNovoDiretor = await controllerDiretores.setAtualizarDiretor(idDiretor, dadosBody, contentType)
    
    response.status(resultDadosNovoDiretor.status_code)
    response.json(resultDadosNovoDiretor)
 })

//Executa a API e faz ela ficar aguardando requisições
app.listen('8080', function() {
    console.log('API funcionando!!')
})