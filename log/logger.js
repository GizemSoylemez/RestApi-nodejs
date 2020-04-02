const fs = require('fs');
var dateFormat = require('dateformat');
const db = require ('../database/db');

exports.log = function(data){
    date = dateFormat(new Date(), "yyyy/mm/dd HH:MM:ss");
    if(process.env.LOG_STATUS=='true')
    {
        console.log('/'+ data+' / '+date);
    }
    if(process.env.SAVE_LOG_STATUS=='true')
    {
        try{
            var param = {
                name:data.split('/')[0],
                type:data.split('/')[1],
                result:data.split('/')[2],
                date:date
            }
            
            db.con.query('INSERT INTO log SET ?',param ,function (err, result){
                if (!err)
                {

                }
                else
                {

                }
            });
            fs.appendFileSync('./log/EventLogFile.log','\n'+data+' / '+date);
        }
        catch
        {
            console.log('hata oluştu');
        }
        
    }
}