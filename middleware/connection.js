const db = require ('../database/db');

module.exports = (req, res, next) =>
{
    db.con.connect(function(err) {
        if(err) 
        {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
            next();
        }
        else
        {
          console.log('connection success');
          next();
        }
      });
}

