const Sequelize = require('sequelize')

const sequelize = new Sequelize('db','root', 'pass',{
    port: '?',
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        multipleStatements: true
    }
})

sequelize.authenticate().then(function(){
    let db = 'zscan_database'
    console.log('Conexão realizadad com sucesso em ' + db);
}).catch(function(err){
    console.log('erro ao realziar a conexão com DB: ' + err)
}) 

async function pacientes(){
    const [pacientes] = await sequelize.query(`select concat(ptts_fnme, ' ', ptts_mnme, ' ', ptts_lnme) as paciente from tb_ptts;`,)
    return pacientes
};

async function pacintesSemFormatacao(id){
    const [pacientes] = await sequelize.query(`select ptts_code, ptts_fnme, ptts_mnme,  ptts_lnme from tb_ptts where ptts_code = ${id};`,)
    return pacientes
}

async function updatePaciente(firstName, middleName, lastName, id){
    await sequelize.query( `update tb_ptts set ptts_fnme = '${firstName}', ptts_mnme = '${middleName ? middleName : ''}', ptts_lnme = '${lastName}' where ptts_code = ${id}`)
}


module.exports = {
    pacientes,
    pacintesSemFormatacao,
    updatePaciente
}