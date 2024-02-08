/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acessp ap Banco de dados MySQL, aqui faremos o CRUD na tabela de filme 
 * Data: 01/02/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

//Importa da biblioteca do prisma client para manipular scripts SQL
const {PrismaClient} = require('@prisma/client');

//Instancia da classe PrismaClient
const prisma = new PrismaClient();

//Função para inserir um filme no BD
const insertFilme = async function() {

}

//Função para atualizar um filme no BD
const updateFilme = async function() {

}

//Função para excluir um filme no BD
const deleteFilme = async function() {

}

//Função para listar todos os filmes do BD
const selectAllFilmes = async function() {

    //Script SQL para o Banco de Dados
    let sql = 'select * from tbl_filme';

    //$queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_filme')

    //Executa o script SQl no Banco de Dados e recebe o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    //Validação para retornar os dados
    if(rsFilmes.length > 0)
        return rsFilmes;
    else 
        return false;
}

//Função para buscar um filme no BD filtrando pelo ID
const selectByIDFilme = async function() {

}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIDFilme
}