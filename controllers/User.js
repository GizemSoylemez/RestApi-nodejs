const userModel = require('../models/User')
const db= require('../database/db');
const logger = require('../log/logger');

exports.List=function(req,res,next){
    userModel.User_Select()
    .then(result=>{res.send(result)})
    .catch(err=>{
        res.send('error'+err)
    })
}

exports.Insert = function(req, res, next){
    userModel.User_Insert(db.Data)//schema olarak kullanıldı Data kısmı
    .then(result=>{res.send(result);})
    .catch(err =>{
        res.send('error:'+err)
    })
}

exports.Update =function(req,res,next){
    db.Data =req.body
    userModel.User_Update(db.Data)
    .then(result => {res.send(result)})
    .catch(err=>{
        res.send('error:'+err)
    })
}

exports.Delete=function(req,res,next){
    db.userData=req.body
    userModel.User_Delete(db.Data)
    .then(result=>{res.send(result)})
    .catch(err=>{
        res.send('error'+err)
    })
}

exports.Login=function(req,res,next){
    db.userData=req.body;
    userModel.Users_Login(db.userData)
    .then(result=>{res.send(result)})
    .catch(err=>{
        res.send('error:'+err)
    })
}

//Logger

exports.LogSettings = function(req, res, next) {
    try{
      if(req.body.logStatus!=null && (req.body.logStatus=="true" || req.body.logStatus=="false"))
      {
        logger.log('Log/Statuschanged/'+req.body.logStatus);
        process.env.LOG_STATUS = req.body.logStatus;
      }
      if(req.body.saveLogStatus!=null && (req.body.saveLogStatus=="true" || req.body.saveLogStatus=="false"))
      {
        logger.log('Log/SaveStatus/'+req.body.saveLogStatus);
        process.env.SAVE_LOG_STATUS = req.body.saveLogStatus;
      }
      else
      {
        logger.log('Empty or wrong data');
        return res.status(401).json({
          message:'Empty or wrong data'
      });
      }
      res.json({'changeStatus':'succes'});
    }
    catch
    {
      res.json({'error': 'Not Changed Log Status'});
    }
    
  }