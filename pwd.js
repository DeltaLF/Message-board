var fs = require('fs');
var session = require('express-session')
var FILENAME = 'password.json'

var PWD = {
    login: function(req,cb){
        PWD.getUser(function(err,User){
            if (err){
                console.log("error in getUser")
                return cb();
            }
            var index = -1;
            for(var i = 0; i<User.length; i++){
                if (User[i].username == req.body.username && User[i].password == req.body.password ){
                    console.log('login success')
                    index = i;
                    req.session.username = User[i].username;
                    break;
                }
            }if (index < 0){
                console.log("wrong useranme or password")
            }
            cb(index);
        })
    },
    chgpwd:function(req,cb){
        PWD.getUser(function(err,User){
            if (err){
                console.log("err in getUser")
                return cb();
            }
            var index = -1; 
            for(var i = 0; i<User.length; i++){
                if (User[i].username == req.body.username && User[i].password == req.body.oldpassword ){
                    User[i].password = req.body.newpassword
                    index = i
                    PWD.savepwd(User,cb)
                    console.log('change psd success')
                    return
                }
            }
            cb(index)     
        })
    },
    savepwd: function(data,cb){
        fs.writeFile(FILENAME,JSON.stringify(data),cb);
    },
    getUser: function(cb){
        fs.readFile(FILENAME,'utf8',function(err,data){
            if(err){
                console.log('err in get user')
                cb(err);
            } else{
                console.log('get userdata success')
                /*console.log(JSON.parse(data))*/
                cb(err,JSON.parse(data))
            }
        })
    }
}
module.exports = PWD;