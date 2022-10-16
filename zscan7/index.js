const Firebird = require('node-firebird')

const dbOptions = {
    host: '?',
    port: '?',
    database: 'C://ZSCAN7//ZscanData//Database//Database7.FDB',
    user: '?',
    password: '?',
    role: null,
    pageSize: 4096,
    timeout: 3000,
    lowercase_keys: true,
    retryConnectionInterval: 100
}

class QuerysPacientes {

    static async selectPacientes(){

        return new Promise( (resolve, reject)=>{
            Firebird.attach(dbOptions, function(err, db) {
        
                if (err){
                    reject(err);
                };
                // db = DATABASE
                    db.query('SELECT * FROM PACIENTES;', function(err, result) {
                    
                    db.detach();
                    if (err){
                        reject(err);
                    } else{
                        resolve(result);
                    };
                    
                });
            });
        })
        
    }

    static async selectPacientes_idEvo(){
        return new Promise( (resolve, reject)=>{
            Firebird.attach(dbOptions, function(err, db) {
        
                if (err){
                    reject(err);
                };
                // db = DATABASE
                    db.query('SELECT id_zs_evo, nome FROM PACIENTES;', function(err, result) {
                    
                    db.detach();
                    if (err){
                        reject(err);
                    } else{
                        resolve(result);
                    };
                    
                });
            });
        })
    }
        
}

module.exports =  QuerysPacientes

