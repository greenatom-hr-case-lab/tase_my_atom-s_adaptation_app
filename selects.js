const mysql = require("mysql2/promise");
const User = require('./mydb')
const config = {
    host: "localhost",
    user: "root",
    database: "taste_my_atom",
    password: "f(12)=479001599"
}

async function findBosses(){
    const connection = mysql.createPool(config);
    const [results, fields] = await connection.execute('select * from user where boss = 1')
    var bosses=[]
    for (const boss of results) {
        let user = new User
        user.id=results[0].id
        user.name=results[0].name
        user.last_name=results[0].last_name
        user.patronimic=results[0].patronimic
        bosses.push(user)
    }
    connection.end()
    return bosses
}
module.exports.findBosses = findBosses
async function main(){
    bosses = await findBosses()
    console.log(bosses)
}

//main()