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
    let bosses=[]
    for (let boss of results) {
        let user = new User
        user.id=boss.id
        user.name=boss.name
        user.last_name=boss.last_name
        user.patronimic=boss.patronimic
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