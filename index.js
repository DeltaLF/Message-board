var express = require('express');
var session = require('express-session');
var db = require('./db')
var pwd = require('./pwd')
var app = express();
app.use(session({
    secret:'top secret',
}))
app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs');
app.get('/',function(req,res){
    let username = req.session.username;
    let isAdmin = false;
    if (username){
        isAdmin = true;
    }
    db.getPosts(function(err,posts){
        if (err){
            res.send(err);
        } else {
            res.render('index',{
                username: username,
                isAdmin: isAdmin,
                posts: posts.reverse() 
            });
        }
    })
});
app.get('/posts/delete/:id',function(req,res){  // inde.ejs should also be modified _id
    var id = req.params.id;
    db.deletePost(id,function(err){
        if (err){
            res.send({
                status: 'FAILURE',
                err: err
            });
        } else {
            res.send({
                status: 'SUCCESS'
            })
        }
    })
})
app.get('/posts/edit/:id',function(req,res){  // inde.ejs should also be modified _id
    var id = req.params.id;
    let edited_data = req.query.edited;
    console.log("post eidt id in controller")
    console.log(id)
    console.log(edited_data)
    db.editPost(id,edited_data,function(err){
        if (err){
            res.send({
                status: 'FAILURE',
                err: err
            });
        } else {
            res.send({
                status: 'SUCCESS'
            })
        }
    })
})
app.get('/posts',function(req,res){
    res.render('newpost');
})
app.post('/posts',function(req,res){
    var author = req.body.author;
    var content = req.body.content;
    db.addPost({
        author:author,
        content: content,
        createTime: new Date(),
    }, function(err,data){
        if (err){
            res.send(err)
        } else {
            res.redirect('/');
            console.log('Create new post successed!')
        }
    })
})
app.get('/changepassword',function(req,res){
    res.render('changepassword');
})
app.post('/changepassword',function(req,res){
    console.log("dbg changepassword btn")
    pwd.chgpwd(req,function(chgpwd_ind){
        console.log("this is ind",chgpwd_ind)
        if ( chgpwd_ind < 0){
            console.log('fail to change password')
            res.redirect('/changepassword')
        }else{
            console.log('password is changed')
            res.redirect('/') 
        }
        
    })
    console.log("");
})
app.get('/login',function(req,res){
    res.render('login');
})
app.post('/login',function(req,res){
    //var userdata= { "username":req.body.username,"password":req.body.password}
    pwd.login(req,function(loginflag){
        if (loginflag < 0){
            res.redirect('/login')
        }else{
            res.redirect('/');
        }
    })

})
app.get('/logout',function(req,res){
    //console.log(req.session)
    req.session.destroy();
    res.redirect('/')
})

db.connect(function(err){
    if (err){
        console.log(err);
    }else{
        app.listen(3000,function(){
        console.log('server is running');
    })
    }
});














