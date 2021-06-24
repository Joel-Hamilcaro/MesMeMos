// MODULES ///////////////////////////////////////////////////

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var sha256 = require('js-sha256');

// SERVEUR ///////////////////////////////////////////////////

var server = express();
server.use(bodyParser.urlencoded({ extended: false })); // pour parser les POST
server.set('view engine', 'ejs'); // HTML dynamique
server.use(express.static('public/images'));
server.use(express.static('public/css'));
server.use(express.static('public/js'));
server.set('trust proxy', 1)
server.use(session({
    secret: 'kswiqppppawlby',
    saveUninitialized: false,
    resave: false
}));

server.listen(8080); // port

// BASE DE DONNEES //////////////////////////////////////////

var con = mysql.createConnection(
  {
    host : 'localhost',         // host du serveur mysql
    user : 'etu21503259',       // utilisateur mysql ayant les privilèges sur la BDD
    password : 'etu21503259',   // mot de passe de l'utilisateur pour se connecter dans mysql
    database : 'etu21503259'    // BDD mysql dont l'utilisateur a les privilèges
  }
);

// SESSIONS ///////////////////////////////////////////////

var findSession = function (req, res) {
    if (!req.session.user) {
        res.render('connexion.ejs',{w_ps:"",w_mdp:""});
    } else {
        res.render('memos.ejs',{login : req.session.user, results : req.session.results, access : req.session.access, collabs : req.session.collabs, edit: req.session.edit, c_msg : "Bienvenue, "+req.session.user+" !"});
    }
};

// ROUTES ////////////////////////////////////////////////

// Page d'acceuil
server.get('/', function (req, res){
  res.redirect('/accueil');
});

// Page d'acceuil
server.get('/accueil', findSession);

// Tentative de connexion
server.post('/connect', function (req, res){
  var login = req.body.login;
  var password = req.body.password;
  var sqlReq1 = 'SELECT COUNT(*) as count FROM users WHERE login="'+login+'"';
  con.query(sqlReq1 , function(err, result, fields){ //2
    if (err) throw err;
    if (result[0].count == 0){
      res.render('connexion.ejs',{w_ps : "Ce pseudonyme est incorrect.", w_mdp : ""});
    }
    else {
      var sqlReq3 = 'SELECT password as mdp FROM users WHERE login="'+login+'"';
      con.query(sqlReq3, function(err,result,fields){
        if (result[0].mdp != sha256(password)){
          res.render('connexion.ejs',{w_ps : "", w_mdp : "Ce mot de passe est incorrect."});
        }
        else {
          req.session.user = login; // comme le PHP $_SESSION['login']
          var sqlReq4 = 'SELECT mid,aid,title as title,content FROM memos WHERE aid=(select id from users where login="'+login+'") ORDER BY mid' ;
          con.query(sqlReq4, function(err,result,fields){
            if (err) throw err;
            req.session.results = result;
            var sqlReq5 = 'SELECT DISTINCT login as author,access.mid,title,wr,content FROM memos,users,access WHERE access.id=(select id from users where login="'+login+'") AND access.mid=memos.mid AND memos.aid=users.id ORDER by mid;';
            con.query(sqlReq5, function(err,result2,fields){
              if (err) throw err;
              //////console.log(sqlReq5);
              req.session.access = result2;
              var sqlReq6 = 'select distinct users.login as collabs,users.id as id,aid,title,wr,memos.mid as mid from users,access,memos where aid=(select id from users where login="'+login+'") and access.id=users.id and memos.mid=access.mid;';
              con.query(sqlReq6, function(err,result3,fields){
                if (err) throw err;
                ////console.log(sqlReq6);
                req.session.collabs = result3;
                req.session.edit = 0;
                res.redirect('/accueil');
              });
            });
          });
        }
      });
    }
  });
});

// Deconnexion
server.get('/deconnexion', function(req,res){
  if (!req.session) res.redirect('/accueil');
  req.session.destroy(function(err) {
    if (err) throw err;
    else res.redirect('/accueil');
  });
});

// Page d'inscription
server.get('/inscription', function (req, res){
  res.render('inscription.ejs',{w_ps : "" , w_mdp : ""});
});

// Tentative d'inscription
server.post('/inscription',function(req,res){ // 0
  var login = req.body.login;
  var mdp = sha256(req.body.password);
  var sqlReq1 = 'SELECT COUNT(*) as count FROM users WHERE login="'+login+'"';
  var sqlReq2 = 'INSERT INTO users (login,password) VALUES ("'+login+'","'+mdp+'");';
  con.query(sqlReq1 , function(err, result, fields){ //2
    if (err) throw err;
    if (result[0].count > 0){
      res.render('inscription.ejs',{w_ps : "Ce pseudo est déjà pris.", w_mdp : ""});
    }
    else { // 3
      var sqlReq2 = 'INSERT INTO users (login,password) VALUES ("'+login+'","'+mdp+'");';
      con.query(sqlReq2, function(err, result, fields){ // 4
        if (err) throw err;
        else {
          //////console.log(sqlReq2);
          req.session.user = login; // comme le PHP $_SESSION['login']
          var sqlReq4 = 'SELECT title,content FROM memos WHERE aid=(select id from users where login="'+login+'")' ;
          con.query(sqlReq4, function(err,result,fields){
            if (err) throw err;
            req.session.results = result;
            var sqlReq5 = 'SELECT DISTINCT login as author,access.mid,title,wr,content FROM memos,users,access WHERE access.id=(select id from users where login="'+login+'") AND access.mid=memos.mid AND memos.aid=users.id;';
            con.query(sqlReq5, function(err,result2,fields){
              if (err) throw err;
              req.session.access = result2;
              var sqlReq6 = 'select distinct users.login as collabs,users.id as id,aid,title,wr,memos.mid as mid from users,access,memos where aid=(select id from users where login="'+login+'") and access.id=users.id and memos.mid=access.mid;';
              con.query(sqlReq6, function(err,result3,fields){
                if (err) throw err;
                ////console.log(sqlReq6);
                req.session.collabs = result3;
                req.session.edit = 0;
                res.redirect('/accueil');
              });
            });
          });
        }
      }); // 4
    } // 3
  }); // 2
}); // 0

// Tentative d'ajout de mémos
server.post('/memos',function(req,res){
  var login = req.body.login;
  var title = req.body.title;
  var content = req.body.content;
  var sqlReq1 = 'SELECT id as aid FROM users WHERE login="'+login+'"';
  con.query(sqlReq1 , function(err, result, fields){ //2
    if (err) throw err;
    var sqlReq2 = 'INSERT INTO memos (aid,title,content) VALUES ("'+result[0].aid+'","'+title+'","'+content+'");';
      con.query(sqlReq2, function(err, result, fields){ // 4
        if (err) throw err;
        else {
          //////console.log(sqlReq2);
          var sqlReq4 = 'SELECT mid,aid,title,content FROM memos WHERE aid=(select id from users where login="'+login+'")' ;
          con.query(sqlReq4, function(err,result,fields){
            if (err) throw err;
            req.session.results = result;
            var sqlReq5 = 'SELECT DISTINCT login as author,access.mid,title,wr,content FROM memos,users,access WHERE access.id=(select id from users where login="'+login+'") AND access.mid=memos.mid AND memos.aid=users.id;';
            con.query(sqlReq5, function(err,result2,fields){
              if (err) throw err;
              req.session.access = result2;
              var sqlReq6 = 'select distinct users.login as collabs,users.id as id,aid,title,wr,memos.mid as mid from users,access,memos where aid=(select id from users where login="'+login+'") and access.id=users.id and memos.mid=access.mid;';
              con.query(sqlReq6, function(err,result3,fields){
                if (err) throw err;
                ////console.log(sqlReq6);
                req.session.collabs = result3;
                req.session.edit = 0;
                res.render('memos.ejs',{login : req.session.user, results : req.session.results, access : req.session.access, collabs : req.session.collabs, edit: req.session.edit, c_msg : "Le mémo a bien été enregistré !"});
              });
            });
          });
        }
      });
    });
});

// Tentative de modification de mémos
server.post('/accueil',function(req,res){
  var login = req.body.login;
  var mid = req.body.mid;
  var title = req.body.title;
  var content = req.body.content;
  var collab = req.body.collab;
  var wr = req.body.wr;
    var sqlReq1 = 'SELECT COUNT(*) as count FROM users WHERE login="'+collab+'"';
    //console.log(sqlReq1);
    con.query(sqlReq1 , function(err, result, fields){ //2
      if (err) throw err;
      if (collab!=undefined && result[0].count <= 0 && collab.length>0){
        res.render('memos.ejs',{login : req.session.user, results : req.session.results, access : req.session.access, collabs : req.session.collabs, edit: req.session.edit, c_msg : "Le contributeur n'a pas été trouvé dans la base de données."});
      }
      else if (collab!=undefined && collab.length>0 && collab!=login){ // 3
        var sqlReq1bis = 'SELECT id from users WHERE login="'+collab+'";'
        //console.log(sqlReq1bis);
        con.query(sqlReq1bis, function(err, result, fields){ // 4.1
        if (err) throw err;
        var sqlReq1bis = 'INSERT INTO access (id,mid,wr) VALUES ('+result[0].id+','+mid+','+wr+')';
        var idcoll = result[0].id;
        //console.log(sqlReq1bis);
        con.query(sqlReq1bis, function(err, result, fields){ // 4.2
        if (err){
          var sqlReqErr = 'UPDATE access SET wr='+wr+' where id='+idcoll+';';
          con.query(sqlReqErr, function(err, result, fields){ // 4
              if (err) throw err;
          });
        }
        var sqlReq2 = 'UPDATE memos SET title = "'+title+'", content = "'+content+'" WHERE mid = '+mid;
        ////console.log(sqlReq2);
        con.query(sqlReq2, function(err, result, fields){ // 4
        if (err) throw err;
        else { // 5.0
          ////console.log(sqlReq2);
          var sqlReq4 = 'SELECT mid,aid,title,content FROM memos WHERE aid=(select id from users where login="'+login+'")' ;
          con.query(sqlReq4, function(err,result,fields){ //5.1
            if (err) throw err;
            req.session.results = result;
            var sqlReq5 = 'SELECT DISTINCT login as author,access.mid,title,wr,content FROM memos,users,access WHERE access.id=(select id from users where login="'+login+'") AND access.mid=memos.mid AND memos.aid=users.id;';
            con.query(sqlReq5, function(err,result2,fields){ //5
              if (err) throw err;
              req.session.access = result2;
              var sqlReq6 = 'select distinct users.login as collabs,users.id as id,aid,title,wr,memos.mid as mid from users,access,memos where aid=(select id from users where login="'+login+'") and access.id=users.id and memos.mid=access.mid;';
              con.query(sqlReq6, function(err,result3,fields){
                if (err) throw err;
                ////console.log(sqlReq6);
                req.session.collabs = result3;
                req.session.edit = 0;
                res.render('memos.ejs',{login : req.session.user, results : req.session.results, access : req.session.access, collabs : req.session.collabs, edit: req.session.edit, c_msg : "Les modifications ont bien été enregistrées."});
              });
            }); //5
          }); //5.1
        } // 5.0
      }); //4
    }); //4.2
    }); // 4.1
  } //3
   else { // 3 bis
     var sqlReq2 = 'UPDATE memos SET title = "'+title+'", content = "'+content+'" WHERE mid = '+mid;
     ////console.log(sqlReq2);
     con.query(sqlReq2, function(err, result, fields){ // 4
     if (err) throw err;
     else { // 5.0
       ////console.log(sqlReq2);
       var sqlReq4 = 'SELECT mid,aid,title,content FROM memos WHERE aid=(select id from users where login="'+login+'")' ;
       con.query(sqlReq4, function(err,result,fields){ //5.1
         if (err) throw err;
         req.session.results = result;
         var sqlReq5 = 'SELECT DISTINCT login as author,access.mid,title,wr,content FROM memos,users,access WHERE access.id=(select id from users where login="'+login+'") AND access.mid=memos.mid AND memos.aid=users.id;';
         con.query(sqlReq5, function(err,result2,fields){ //5
           if (err) throw err;
           req.session.access = result2;
           var sqlReq6 = 'select distinct users.login as collabs,users.id as id,aid,title,wr,memos.mid as mid from users,access,memos where aid=(select id from users where login="'+login+'") and access.id=users.id and memos.mid=access.mid;';
           con.query(sqlReq6, function(err,result3,fields){
             if (err) throw err;
             ////console.log(sqlReq6);
             req.session.collabs = result3;
             req.session.edit = 0;
             res.render('memos.ejs',{login : req.session.user, results : req.session.results, access : req.session.access, collabs : req.session.collabs, edit: req.session.edit, c_msg : "Les modifications ont bien été enregistrées."});
           });
         }); //5
       }); //5.1
     } // 5.0
   }); //4
  } // 3 bis
  }); // 2
});

// Tentative de supression de mémo
server.post('/delete',function(req,res){
  var login = req.body.login2;
  var mid = req.body.mid2;
  var sqlReq2 = 'DELETE FROM access WHERE mid = '+mid;
  con.query(sqlReq2, function(err, result, fields){ // 4
    if (err) throw err;
    else {
      var sqlReq3 = 'DELETE FROM memos WHERE mid = '+mid;
        con.query(sqlReq3, function(err, result, fields){ // 4
          if (err) throw err;
          else {
            var sqlReq4 = 'SELECT mid,aid,title,content FROM memos WHERE aid=(select id from users where login="'+login+'")' ;
            con.query(sqlReq4, function(err,result,fields){
              if (err) throw err;
              ////console.log(sqlReq4);
              req.session.results = result;
              var sqlReq5 = 'SELECT DISTINCT login as author,access.mid,title,wr,content FROM memos,users,access WHERE access.id=(select id from users where login="'+login+'") AND access.mid=memos.mid AND memos.aid=users.id;';
              con.query(sqlReq5, function(err,result2,fields){
                if (err) throw err;
                req.session.access = result2;
                var sqlReq6 = 'select distinct users.login as collabs,users.id as id,aid,title,wr,memos.mid as mid from users,access,memos where aid=(select id from users where login="'+login+'") and access.id=users.id and memos.mid=access.mid;';
                con.query(sqlReq6, function(err,result3,fields){
                  if (err) throw err;
                  ////console.log(sqlReq6);
                  req.session.collabs = result3;
                  req.session.edit = 0;
                  res.redirect('/accueil');
                });
              });
            });
          }
        });
      }
  });
});

server.get('*', function(req, res) {
    res.redirect('/');
});
server.post('*', function(req, res) {
    res.redirect('/');
});

console.log("Serveur en cours d'exécution à l'adresse http://localhost:8080/\n");
