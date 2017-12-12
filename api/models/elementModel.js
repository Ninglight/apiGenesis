//pour sauvegarder les messages en bdd
const connection = require('./../db.js');

// import of uniqid
const uniqid = require('uniqid');

// import md5
const md5 = require('md5');

// Classe Element
var Element = function(id, name, html, createdAt, updatedAt) {
    // Propriété publique
    this.id = id;
    this.name = name;
    this.html = html;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

};

// Méthodes publiques

Element.prototype.getElements = function() {
    return new Promise(function(resolve, reject){

        let sql = `SELECT id, name, html, createdAt, updatedAt
        FROM elements`;

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

Element.prototype.readElement = function() {

    let element = this;

    return new Promise(function(resolve, reject){
        
      let sql = `SELECT id, name, html, createdAt, updatedAt
      FROM elements
      WHERE id = ?`;
  
      connection.query(sql,[element.id], function (error, results) {
            if (error) {
                //on rejette la promise
                reject(error);
            }
    
            element.name = results[0].name;
            element.html = results[0].html;
            element.createdAt = results[0].createdAt;
            element.updatedAt = results[0].updatedAt;
            
            //on la resolve
            resolve(element);
        });
    }); 
};

Element.prototype.createElement = function() {

    let element = this;

    console.log(uniqid());

    return new Promise(function(resolve, reject){

        let sql = `INSERT INTO elements
        (id, name, html, createdAt, updatedAt)
        VALUES ('${uniqid()}', ?, ?, NOW(), NOW())`;

        connection.query(sql,[element.name, element.html], function (error, results) {
            if (error) {
                //on rejette la promise
                reject(error);
            }
            console.log("request injected : " + results);
            element.id = results.insertId;
            //on la resolve
            resolve(element);
        });
    });   
};

Element.prototype.updateElement = function() {

    let element = this;

    return new Promise(function(resolve, reject){

        let sql = `UPDATE elements
        SET name = ?, 
        html = ?,
        updatedAt = NOW()
        WHERE id = ?`;

        connection.query(sql,[element.name, element.html, element.id], function (error, results) {
            if (error) {
                //on rejette la promise
                reject(error);
            }
            //on la resolve
            resolve(element);
        });
    });   
};

Element.prototype.deleteElement = function() {

    let element = this;

    return new Promise(function(resolve, reject){

        let sql = `DELETE FROM elements
        WHERE id = ?`;

        connection.query(sql,[element.id], function (error, results) {
            if (error) {
                //on rejette la promise
                reject(error);
            }
            //on la resolve
            resolve(element);
        });
    });   
};

module.exports = Element;