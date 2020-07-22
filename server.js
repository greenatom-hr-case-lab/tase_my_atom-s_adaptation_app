const http = require('http')
const fs = require('fs')
const User = require('./mydb')
const express = require('express')
const session = require('express-session')
const connect = require('connect')
const cookieParser = require('cookie-parser')
const app = express()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cookieParser());
app.use(session({ secret: 'your secret here'} ));

var currentUser = new User

app.set('view engine', 'ejs')

app.use('/public', express.static('public'))

app.get('/', async function(req,res){
    res.render('index',{MyName:"user1.name", currentUser: currentUser})
})

app.post('/login', urlencodedParser, async function(req,res){
    if (!req.body) return res.sendStatus(400);
    let user = new User
    if(await user.findByLogin(req.body.username)==0){
        if((user.login==req.body.username)&&(user.password==req.body.password)){
            currentUser=user
            req.session.username=user.login
            res.render('index',{MyName:currentUser.name, currentUser: currentUser})
        }else{
            res.status(401).send('login error')
        }
    
    }else{
        res.status(401).send('login error')
    }

    //res.render('index',{MyName:"user.name"})
})

app.get('/logout', async function(req,res){
    req.session.username=''
    currentUser = new User
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
