const db = require('../database/db');
const dateFormat=require('dateFormat');
const bcrypt = require("bcrypt")
const jwt= require ('jsonwebtoken');
const logger = require('../log/logger');



//*******connectionu yazmasakta çalışıyor ///////

/*db.con.connect(function(err) {
    if(err) 
    {
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000);
    }
    else
    {
      console.log('connection success');
    }
  });*/   //////connectionu yazmasakta çalışıyor ///////


exports.User_Select=function(res){
    return new Promise(function(resolve, reject){
        db.con.query('SELECT * FROM user WHERE deleteDate IS NULL ORDER BY id DESC',function(err, result){
            //burada kaç tane kullanıcı olduğunu bulmak için countunu yazdırıyoruz 
            db.con.query('SELECT COUNT(*) AS count FROM user WHERE deleteDate IS NULL ', function(err,count){
                console.log(count,'count');
                if(!err)
                {
                    logger.log('User/Listed/Success');
                    resolve(JSON.parse(JSON.stringify({data:result, count:count[0].count})))
                }
                else
                {
                    logger.log('User/Listed/Unsuccess');
                    reject(err)
                }
            })
        })
    })
}


exports.User_Insert =function(req){
    return new Promise (function(resolve,reject){
        req.createDate=dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");//kaydettiğimiz zaman kaydettiğimiz saati tutması için 
        req.password=bcrypt.hashSync(req.password, bcrypt.genSaltSync(10));
        console.log(req.createDate);
        db.con.query('INSERT INTO user SET ?', req, function(err,result){
            if(!err)
            {
                if(result.affectedRows>0)
                {
                    logger.log('User/Insert/Success');
                    resolve(JSON.parse(JSON.stringify({state:'Insert Success'})));
                }
                else
                {
                    logger.log('User/Insert/Unsuccess');
                    resolve(JSON.parse(JSON.stringify({state:'ınsert unsuccess'})));
                }

            }
            else
            {
                reject(err);
            }
        })
    })
}

exports.User_Update =function(req){
    return new Promise(function(resolve,reject){
        req.updateDate =dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        if(req.password!=null)
        {
          req.password=bcrypt.hashSync(req.password, bcrypt.genSaltSync(10));
        }
        var param=
        [
            req,
            req.id
        ]
        db.con.query('UPDATE user SET? WHERE id=?', param, function(err,result){
            if(!err)
            {
                if(result.affectedRows>0)
                {
                    logger .log('User/Update/Success/id='+req.id);
                    resolve(JSON.parse(JSON.stringify({state:'Update Success'})))
                }
                else
                {
                    logger .log('User/Update/Unsuccess/id='+req.id);
                    resolve(JSON.parse(JSON.stringify({state:'Update Unsuccess'})))
                }
            }
            else
            {
                reject(err);
            }
        })
    })
}


exports.User_Delete = function(req){
    return new Promise(function(resolve,reject){
        req.deleteDate= dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
        var param=
        [
            req.deleteDate,
            req.id
        ]
        console.log(req,param);
        db.con.query('UPDATE user SET deleteDate=? WHERE id=?',param, function(err,result){
            if(!err)
            {
                if(result.affectedRows>0)
                {
                    logger.log('User/Delete/Success/id='+req.id);
                    resolve(JSON.parse(JSON.stringify({state:'Delete Success'})))
                }
                else
                {
                    logger.log('User/Delete/Unsuccess/id='+req.id);
                    resolve(JSON.parse(JSON.stringify({state:'Delete Unsuccess'})))
                }
            }
            else
            {
                reject(err)
            }
        })
    })
}

//Login

exports.Users_Login=function(req){
    return new Promise(function(resolve,reject){
        db.con.query('SELECT * FROM user WHERE email=? AND deleteDate IS NULL',req.email,function(result,err){
            if(!err)
            {
                if(bcrypt.compareSync(req.password, result[0].password))
                {
                    if(result[0])
                    {
                        const token =jwt.sign({
                            email:req.email,
                            password:req.password
                        },
                        process.env.SECRET_KEY,
                        {
                            expiresIn:'1h'
                        })
                        resolve(JSON.parse(JSON.stringify({token:token})))
                    }
                    else
                    {
                        logger.log('User/Login/Unsuccess');
                        resolve(JSON.parse(JSON.stringify({state:'Denied'})))
                    }
                }
                else
                {
                    logger.log('User/Login/Unsuccess');
                    resolve(JSON.parse(JSON.stringify({state:'Denied'})))
                }
            }
            else
            {
                reject(err)
            }
        })
    })
}