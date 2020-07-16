const mysql = require("mysql2/promise");

const config = {
      host: "localhost",
      user: "root",
      database: "taste_my_atom",
      password: "f(12)=479001599"
}
  

class User{
  hr_id
  boss_id
  id;
  name;
  last_name;
  patronimic;
  goals;
  stage;
  crook;
  boss;
  hr;
  login;
  password;
  constructor(){
  }

  async findById(id){
    const connection = mysql.createPool(config);
    const [results, fields] = await connection.execute('select * from user where id = ?',[id])
    this.id=results[0].id
    this.name=results[0].name
    this.last_name=results[0].last_name
    this.patronimic=results[0].patronimic
    if (results[0].goals) {
      this.goals=results[0].goals.split("||").map(item => item.split("&&"))
    }
    this.stage=results[0].stage
    this.crook=results[0].crook
    this.boss=results[0].boss
    this.hr=results[0].hr
    this.login=results[0].login
    this.password=results[0].password
    if ((results[0].boss===0)&&(results[0].hr===0)) {
      const [boss, f] = await connection.execute('select boss_to_crook.id, boss_to_crook.boss from boss_to_crook where crook = ?',[this.id])
      this.boss_id=boss[0].boss
      const [hr,field] = await connection.execute('select hr_to_crook.id, hr_to_crook.hr from hr_to_crook where crook = ?',[this.id])
      this.hr_id=hr[0].hr
    }
    connection.end()
    return 0;
  }

  async findByLogin(login){
    const connection = mysql.createPool(config);
    const [results, fields] = await connection.execute('select * from user where login = ?',[login])
    this.id=results[0].id
    this.name=results[0].name
    this.last_name=results[0].last_name
    this.patronimic=results[0].patronimic
    if (results[0].goals) {
      this.goals=results[0].goals.split("||").map(item => item.split("&&"))
    }
    this.stage=results[0].stage
    this.crook=results[0].crook
    this.boss=results[0].boss
    this.hr=results[0].hr
    this.login=results[0].login
    this.password=results[0].password
    if ((results[0].boss===0)&&(results[0].hr===0)) {
      const [boss, f] = await connection.execute('select boss_to_crook.id, boss_to_crook.boss from boss_to_crook where crook = ?',[this.id])
      this.boss_id=boss[0].boss
      const [hr,field] = await connection.execute('select hr_to_crook.id, hr_to_crook.hr from hr_to_crook where crook = ?',[this.id])
      this.hr_id=hr[0].hr
    }
    connection.end()
    return 0;
  }

  async findMyCrooks(){
    const connection = mysql.createPool(config);

    if (this.boss===1) {
      const [results, fields] = await connection.execute('select crook from boss_to_crook where boss = ?',[this.id])
      connection.end()
      let arr=[]
      for (let i = 0; i < results.length; i++) {
        arr[i]=results[i].crook
      }
      return arr
    }
    if (this.hr===1) {
      const [results, fields] = await connection.execute('select crook from hr_to_crook where hr = ?',[this.id])
      connection.end()
      let arr=[]
      for (let i = 0; i < results.length; i++) {
        arr[i]=results[i].crook
      }
      return arr
    }
  }

  async save(){
    const connection = mysql.createPool(config);
    const sql = "INSERT INTO user(name, last_name, patronimic, login, password, goals) VALUES(?, ?, ?, ?, ?, ?)";
    
    let arr=[]

    for (let i = 0; i < this.goals.length; i++) {
      arr[i]=this.goals[i].join("&&")
    }
    arr=arr.join("||")

   await connection.query(sql, [this.name, this.last_name, this.patronimic, this.login, this.password, arr], function(err, results) {
      if(err) console.log(err);
      else console.log("Данные добавлены");
    });

    const [res, fields] = await connection.execute('select * from user where login = ?',[this.login])
    this.id=res[0].id

    const sql1="INSERT INTO boss_to_crook(boss, crook) VALUES(?, ?)"

    await connection.query(sql1, [this.boss_id, this.id], function(err, results) {
      if(err) console.log(err);
      else console.log("Данные добавлены");
    });
    const sql2="INSERT INTO hr_to_crook(hr, crook) VALUES(?, ?)"

    await connection.query(sql2, [this.hr_id, this.id], function(err, results) {
      if(err) console.log(err);
      else console.log("Данные добавлены");
    });

  connection.end()
  }

  async update(){
    const connection = mysql.createPool(config);


    const sql="UPDATE user set name=?, last_name=?, patronimic=?, login=?, password=?, goals=? where id=?"
    let arr=[]

    for (let i = 0; i < this.goals.length; i++) {
      arr[i]=this.goals[i].join("&&")
    }
    arr=arr.join("||")

    await connection.query(sql, [this.name, this.last_name, this.patronimic, this.login, this.password, arr,this.id], function(err, results) {
      if(err) console.log(err);
      else console.log("Данные добавлены");
    });

    const sql1="UPDATE boss_to_crook set boss=? where crook=?"
    await connection.query(sql1, [this.boss_id, this.id], function(err, results) {
      if(err) console.log(err);
      else console.log("Данные добавлены");
    });

    const sql2="UPDATE hr_to_crook set hr=? where crook=?"
    await connection.query(sql2, [this.hr_id, this.id], function(err, results) {
      if(err) console.log(err);
      else console.log("Данные добавлены");
    });

    connection.end()
  }
  
}

async function main(){
  let user = new User
  await user.findById(1)
  let arr=[]
  arr=await user.findMyCrooks()
  let user1 = new User
  await user1.findById(arr[1])
  user1.goals[0][0]="goal"
  user1.update()
  console.log(user1)
}

main()
