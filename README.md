# MesMeMos

<img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/><img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/><img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/><img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/><img alt="MySQL" src="https://img.shields.io/badge/mysql-%2300f.svg?&style=for-the-badge&logo=mysql&logoColor=white"/>

*Projet individuel réalisé dans le cadre du cours "Programmation Web"*   
**Auteur : [Joël Hamilcaro](https://github.com/Joel-Hamilcaro/)**   

Le site "MesMeMos" vous permet de créer et de partager des aides-mémoire, appelées "mémos". Vous pourrez à tout moment les modifier, les supprimer ou les partager aux personnes de votre choix. Ceux-ci pourront alors lire ces mémos, et, si vous le désirez, il pourront les modifier.

# I / Configuration de la base de données (2 possibilités)

## I.A) 1ère possibilité (utiliser sa propre bdd mysql) :

-  Selon la configuration de votre base de données, modifier les lignes 25 à 35 dans le fichier main.js   
Création des tables sql :
- Ouvrir un terminal dans le dossier DM (contenant le fichier create_tables.sql)
- Ouvrir mysql avec la base de donnée et l'utilisateur correspondant : mysql -u user -p database
- Dans la console mysql : 'source create_tables.sql'

## I.B) 2ème possibilité (configurer une nouvelle bdd et un nouvel utilisateur) :

Ajout de l'utilisateur :   
  - Ouvrir la console mysql en root 'sudo mysql'  
  - Dans la console mysql : ajouter l'utilisateur : 'etu21503259'  
    CREATE USER 'etu21503259'@'localhost' IDENTIFIED WITH mysql_native_password BY 'etu21503259';   
Ajout de la base de donnée :  
  - CREATE DATABASE etu21503259;  
Ajout des privilèges à l'utilisateur :  
  - GRANT ALL ON etu21503259.* TO 'etu21503259'@'localhost';   
  - FLUSH PRIVILEGES;   
Sortir de la console mysql de root.  
Création des tables sql :  
  - Ouvrir mysql avec la base de donnée et l'utilisateur correspondant : mysql -u etu21503259 -p etu21503259  
  - Dans la console mysql : 'source create_tables.sql'  

# II / Lancement du serveur  

Ouvrir un terminal dans le dossier courant (contenant le fichier main.js)  
  - 'nodejs main.js'  

# III / Utilisation du site

  - Aller à l'adresse 'http://localhost:8080/'.  
  - Il est possible de s'inscrire en cliquant sur "créer un compte".   
  - On peut se connecter à un compte déjà existant :  
      - Pseudo "alice" , MDP : "ecila"
      - Pseudo "bob" , MDP : "bob"
      - Pseudo "carol" , MDP : "lorac"
      - Pseudo "dave" , MDP : "evad"
      - Pseudo "eve" , MDP : "eve"
      - Pseudo "fabio" , MDP : "oibaf"
      - Pseudo "gaby" , MDP : "ybag"
      - Pseudo "hector" , MDP : "rotceh"
      - Pseudo "ivan" , MDP : "navi"
