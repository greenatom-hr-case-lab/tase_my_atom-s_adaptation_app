const http = require('http')
const fs = require('fs')
const User = require('./mydb')
const selects = require('./selects')
const express = require('express')
const session = require('express-session')
const connect = require('connect')
const cookieParser = require('cookie-parser')
const app = express()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cookieParser());
app.use(session({ secret: 'your secret here'} ));

//var currentUser = new User

app.set('view engine', 'ejs')

app.use('/public', express.static('public'))

app.get('/', async function(req,res){
    let currentUser = new User
    let myCrooks = []
    if (currentUser.id){
        res.redirect('/main')
    }else{
        bosses= await selects.findBosses()
    res.render('index',{MyName:"user1.name", currentUser: currentUser, myCrooks: myCrooks, bosses: bosses})

    }
})

app.get('/main', async function(req,res){
    let currentUser = new User
    await currentUser.findByLogin(req.session.username)
    let arr = await currentUser.findMyCrooks()
    //console.log(req.session.id)
    bosses= await selects.findBosses()
        let users = []
        for (let u of arr) {
            let us=new User
            await us.findById(u)
            users.push(us)
        }
    res.render('index',{MyName:currentUser.name, currentUser: currentUser, myCrooks: users, bosses: bosses})
})

app.post('/login', urlencodedParser, async function(req,res){
    let currentUser = new User
    if (!req.body) return res.sendStatus(400);
    let user = new User
    if(await user.findByLogin(req.body.username)==0){
        if((user.login==req.body.username)&&(user.password==req.body.password)){
            currentUser=user
            req.session.username=user.login
            let arr = await currentUser.findMyCrooks()
            let users = []
            bosses= await selects.findBosses()
            if (arr){
                for (let u of arr) {
                    let us=new User
                    await us.findById(u)
                    users.push(us)
                }
            }
            res.render('index',{MyName:currentUser.name, currentUser: currentUser, myCrooks: users,bosses: bosses})
        }else{
            res.status(401).send('login error')
        }
    
    }else{
        res.status(401).send('login error')
    }

    //res.render('index',{MyName:"user.name"})
})

app.post("/newuser", urlencodedParser, async function(req,res){
    let currentUser = new User
    await currentUser.findByLogin(req.session.username)
    let user = new User
    user.name=req.body.name
    user.last_name=req.body.last_name
    user.patronimic=req.body.patronimic
    user.login=req.body.login
    user.boss_id=req.body.boss_id
    user.hr_id=currentUser.id
    user.password=req.body.password
    user.save()
    let arr = await currentUser.findMyCrooks()
    let users = []
    bosses= await selects.findBosses()
    for (let u of arr) {
        let us=new User
        await us.findById(u)
        users.push(us)
    }
    res.redirect('/main')
})

app.get('/logout', async function(req,res){
    req.session.username=''
    //currentUser = new User
    res.redirect('/')
})


app.listen(3000, function(){
    console.log('server started')
})

// const server = http.createServer(function(req, res){
//     console.log(req.method, req.url)
//     if (req.url === '/') {
// 		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
// 		fs.createReadStream(__dirname + '/index.html').pipe(res);
// 	} else if (req.url === '/style.css') {
// 		res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
// 		fs.createReadStream(__dirname + '/style.css').pipe(res);
// 	} else if (req.url === '/main.js'){
//         res.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
//         fs.createReadStream(__dirname + '/main.js').pipe(res);
//     } else if (req.url === '/node_modules/mysql2/promise.js'){
//         res.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
//         fs.createReadStream(__dirname + '/node_modules/mysql2/promise.js').pipe(res);
//     } else if (req.url === '/mydb.js'){
//         res.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
//         fs.createReadStream(__dirname + '/mydb.js').pipe(res);
//     }
// })


// console.log("port = ", process.env.PORT)
// server.listen(process.env.PORT || 3000)
// console.log('server started')
