//pour sauvegarder les messages en bdd
const connection = require('./../db.js');

// import of uniqid
const uniqid = require('uniqid');

// import md5
const md5 = require('md5');

// Classe User
var User = function(id, firstName, lastName, email, password, createdAt) {
    // Propriété publique
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
};

// Méthodes publiques

User.prototype.getUsers = function() {
    return new Promise(function(resolve, reject){

        let sql = `SELECT users.id, login.firstName, login.lastName, users.email, users.password, users.createdAt
        FROM users
        INNER JOIN usersInfo AS login
        ON users.id = login.idUser`;

        connection.query(sql, function (error, results) {
            if (error) {
                //on rejette la promise
                reject(error);
            }
            //on la resolve
            resolve(results);
        });
    });  
};

User.prototype.readUser = function() {

    let user = this;

    return new Promise(function(resolve, reject){
        
      let sql = `SELECT users.id, info.firstName, info.lastName, users.email, users.password, users.createdAt
      FROM users
      INNER JOIN usersInfo AS info
      ON users.id = info.idUser
      WHERE users.email = ?`;
  
      connection.query(sql,[user.email], function (error, results) {
            if (error) {
                //on rejette la promise
                reject(error);
            }

            user.id = results[0].id;
            user.firstName = results[0].firstName;
            user.lastName = results[0].lastName;
            user.email = results[0].email;
            user.password = results[0].password;
            user.createdAt = results[0].createdAt;
            
            //on la resolve
            resolve(user);
        });
    }); 
};

User.prototype.createUser = function() {

    let user = this;

    return new Promise(function(resolve, reject){

        var idUser = uniqid();
        user.password = md5(user.password);

        console.log(idUser);
        console.log(user.password);
        

        let sql = `INSERT INTO users
        (id, email, password, createdAt)
        VALUES ( ?, ?, ?, NOW())`;

        connection.query(sql,[idUser, user.email, user.password], function (error, results) {
            if (error) {
                console.log(error);
                //on rejette la promise
                reject(error);
            }

            user.id = idUser;
            var ifUserInfo = uniqid();

            console.log(ifUserInfo);

            let sql = `INSERT INTO usersInfo
            (id, idUser, firstName, lastName)
            VALUES ( ?, ?, ?, ?)`;

            connection.query(sql,[ifUserInfo, user.id, user.firstName, user.lastName], function (error, results) {
                if (error) {
                    console.log(error);
                    //on rejette la promise
                    reject(error);
                }

                //on la resolve
                resolve(user);
            });

            //on la resolve
            resolve(user);
        });
    });   
};

User.prototype.updateUser = function() {

    let user = this;

    return new Promise(function(resolve, reject){

        let sql = `UPDATE users
        SET email = ?
        WHERE id = ?`;

        console.log(1);

        connection.query(sql,[user.email, user.id], function (error, results) {
            if (error) {
                //on rejette la promise
                reject(error);
            }

            let sql = `UPDATE usersInfo
            SET firstName = ?, 
            lastName = ?
            WHERE idUser = ?`;
            

            console.log(2);

            connection.query(sql,[user.firstName, user.lastName, user.id], function (error, results) {
                if (error) {
                    console.log(error);
                    //on rejette la promise
                    reject(error);
                }

                //on la resolve
                resolve(user);
            });

            //on la resolve
            resolve(user);
        });
    });   
};

User.prototype.deleteUser = function() {

    let user = this;

    return new Promise(function(resolve, reject){

        let sql = `DELETE FROM usersInfo
        WHERE id = ?`;

        connection.query(sql,[user.id], function (error, results) {
            if (error) {
                //on rejette la promise
                reject(error);
            }
            //on la resolve
            resolve(user);
        });
    });   
};

module.exports = User;