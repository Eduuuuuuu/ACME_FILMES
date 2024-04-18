/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de genero
 * Data: 11/04/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client');


const prisma = new PrismaClient();


//Função para listar todos os generos do BD
const selectAllGeneros = async function() {
    let sql = 'select * from tbl_genero';

    let rsGeneros = await prisma.$queryRawUnsafe(sql)

    if(rsGeneros.length > 0)
        return rsGeneros
    else 
        return false;
}

//Função para buscar um genero no BD filtrando pelo id
const selectByIdGenero = async function(id) {
    try {

        let sql = `select * from tbl_genero where id_genero = ${id}`;

        let rsGenero = await prisma.$queryRawUnsafe(sql)

        return rsGenero;

    } catch (error) {
        return false;
    }
}

//Função para mostrar o ID do genero no BD
const selectByLastIdGenero = async function() {
    try {

        let sql = `select cast(last_insert_id() as decimal) as id_genero from tbl_genero limit 1`;

        let rsGenero = await prisma.$queryRawUnsafe(sql)

        return rsGenero

    } catch (error) {
        return false
    }
}

//Função para inserir um genero no BD
const insertGenero = async function(dadosGenero) {

    try {

        let sql;

        sql = `insert into tbl_genero (
                                          nome
        ) values (
                                          '${dadosGenero.nome}'
        )`;
        
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true;
        else
            return false;
            
    } catch (error) {
        return false;
    }
}

//Função para excluir um genero no BD
const deleteGenero = async function(id) {
    try {

        let sql = `delete from tbl_genero where id_genero = ${id}`;

        let rsGenero = await prisma.$queryRawUnsafe(sql)

        return rsGenero

    } catch (error) {
        return false
    }
}

//Função para atualizar um genero no BD
const updateGenero = async function(id, dadosGenero) {
    try {

        let sql;

        sql = `update tbl_genero set 
                                        nome = '${dadosGenero.nome}'
            where id_genero = ${id}`;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}

module.exports = {
    selectAllGeneros,
    selectByIdGenero,
    selectByLastIdGenero,
    insertGenero,
    deleteGenero,
    updateGenero
}