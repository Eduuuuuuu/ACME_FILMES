/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos os GET na tabela de sexo
 * Data: 25/04/2024
 * Autor: Eduardo Vilas Boas
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client');


const prisma = new PrismaClient();

const selectAllSexo = async function() {
    try {

        let sql = 'select * from tbl_sexo';

        let rsSexo = await prisma.$queryRawUnsafe(sql)
        
        return rsSexo
    } catch (error) {
        return false
    }
}

const selectByIdSexo = async function(id) {
    try {

        let sql = `select * from tbl_sexo where id_sexo = ${id}`;

        let rsSexo = await prisma.$queryRawUnsafe(sql)

        return rsSexo
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllSexo,
    selectByIdSexo
}