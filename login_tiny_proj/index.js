var express = require('express')
var session = require('express-session')
//var bodyParser = require('body-parser')

var app=express();
app.use(session({
    secret:'top secret',
}))
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs');
app.get('/',function(req,res){
    if (typeof unsername == 'undefined'){
        username='';
    }
    res.render('index',{
        username:username
    });
});

app.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    if ( username === 'haha' && password === '123'){
        console.log("login success");
        req.session.username = 'haha';
        res.redirect('/secret')
        return
    }
    console.log('fail to login')
    res.redirect('/')
})
app.get('/secret',function(req,res){
    if ( req.session.username === 'haha' ){
        res.render('secret.ejs')
        return
    }
    console.log('please login')
})

app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/')
})

app.listen(3000,function(){
    console.log('server is runnning')
})