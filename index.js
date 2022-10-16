const pacientesZevo = require('./zscaneEvo/index.js')
const pacientesZ7 = require('./zscan7/index.js')
const fs = require('fs')


async function alteranomepaciente(pacientesZ7, pacientesZevo) {
    
    const pacientez7 = await pacientesZ7.selectPacientes_idEvo()
    const pacienteZevo = await pacientesZevo.pacientes()
    
    for(i = 0; pacientez7.length > i; i++){
        let id_zs_evo = pacientez7[i].id_zs_evo
        const nome = separaNomes(pacientez7[i].nome)
        await pacientesZevo.updatePaciente(nome.firstName, nome.middleName, nome.lastName, id_zs_evo)

        const formatado = await pacientesZevo.pacintesSemFormatacao(id_zs_evo)
        console.log(formatado, nome)
    }
    
    
    //verifica nome
    let pacienteZ7Formt = pacientez7.map(paciente => paciente.nome)
    let pacienteZevoFormt = pacienteZevo.map(paciente => paciente.paciente)
    const t = []
    pacienteZ7Formt.forEach(key => {
        if(pacienteZevoFormt.includes(key)){
            return
        }
        fs.appendFile('pacientes.json', JSON.stringify({paciente: key}) + ',', function (erro){
            console.log(erro)
        })
        return t.push(key)
    });


}

alteranomepaciente(pacientesZ7, pacientesZevo)




function separaNomes(name){
    let parts = name.split(' ');
        let firstName;
        let middleName;
        let lastName;
    
        if (parts.length > 2) {
            firstName = parts[0];
            middleName = parts[1];
            lastName = getLastName(parts, 2);
        } else if (parts.length > 1) {
            firstName = parts[0];
            lastName = parts[1];
        } else {
            firstName = name;
        }

        return {
            firstName,
            middleName,
            lastName
        }

        function getLastName(name, index) {
            let auxlastName = name.splice(index).join(' ');
            return auxlastName;
        }
}



/* async function verificaPacientes(pacientesZ7, pacientesZevo) {
    const pacientez7 = await pacientesZ7.selectPacientes()
    const pacienteZevo = await pacientesZevo.pacientes()

    let pacienteZ7Formt = pacientez7.map(paciente => paciente.nome)
    let pacienteZevoFormt = pacienteZevo.map(paciente => paciente.paciente)
    const t = []
    pacienteZ7Formt.forEach(key => {
        if(pacienteZevoFormt.includes(key)){
            return
        }
        fs.appendFile('pacientes.json', JSON.stringify({paciente: key}) + ',', function (erro){
            console.log(erro)
        })
        return t.push(key)
    });



} */
//verificaPacientes(pacientesZ7, pacientesZevo)





























/* const t =  pacienteZevo.map(paciente => {
    if(paciente.paciente == key){
        return
    };
    return JSON.stringify({paciente: key})     
});
const f = [...t]

return console.log(f) */