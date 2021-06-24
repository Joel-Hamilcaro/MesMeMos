
drop table if exists access;
drop table if exists memos;
drop table if exists users;

create table users (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
login varchar(40),
password varchar(200)
);

create table memos (
mid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
aid integer,
title varchar(40),
content varchar(60000),
FOREIGN KEY (aid) REFERENCES users(id)
);

create table access (
id integer,
mid integer,
wr boolean,
PRIMARY KEY (id, mid),
FOREIGN KEY (id) REFERENCES users(id),
FOREIGN KEY (mid) REFERENCES memos(mid)
);

INSERT INTO users (login,password) VALUES ("alice","c72350ddcfc2a5e0080cedc54c02970e3db67a9ca39d4d5c86408a977a9ec682");
INSERT INTO users (login,password) VALUES ("bob","81b637d8fcd2c6da6359e6963113a1170de795e4b725b84d1e0b4cfd9ec58ce9");
INSERT INTO users (login,password) VALUES ("carol","18dae1570ee2bbc18f071145f4b7ecce3fee17e6f3f30c3d18b259b4b85e4b29");
INSERT INTO users (login,password) VALUES ("dave","2fb48d3b0af0ce951282ef13ab0d4c4a0d9533fc4b30f06c198528c62e1f796c");
INSERT INTO users (login,password) VALUES ("eve","85262adf74518bbb70c7cb94cd6159d91669e5a81edf1efebd543eadbda9fa2b");
INSERT INTO users (login,password) VALUES ("fabio","9938026523a7036ddf095a696ee8efa164a5435142e349c6b00361187f2ff650");
INSERT INTO users (login,password) VALUES ("gaby","330875610d9c29046436c0faad0a22be0e448768e2033e198e7978047981a41f");
INSERT INTO users (login,password) VALUES ("hector","84214726ee4c8614320fee4847566fde182b416b10085835f660dd3d9abe2ffc");
INSERT INTO users (login,password) VALUES ("ivan","21305f1bcd6152755435b325874ae7333e07065caeafec6dbfbf04a6869abfa9");

INSERT INTO memos (aid,title,content) VALUES (1,"Lorem","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
INSERT INTO memos (aid,title,content) VALUES (2,"Sed ut","Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?");
INSERT INTO memos (aid,title,content) VALUES (3,"Et licet","Et licet quocumque oculos flexeris feminas adfatim multas spectare cirratas, quibus, si nupsissent, per aetatem ter iam nixus poterat suppetere liberorum, ad usque taedium pedibus pavimenta tergentes iactari volucriter gyris, dum exprimunt innumera simulacra, quae finxere fabulae theatrales.");
INSERT INTO memos (aid,title,content) VALUES (4,"Proinde","Proinde die funestis interrogationibus praestituto imaginarius iudex equitum resedit magister adhibitis aliis iam quae essent agenda praedoctis, et adsistebant hinc inde notarii, quid quaesitum esset, quidve responsum, cursim ad Caesarem perferentes, cuius imperio truci, stimulis reginae exsertantis aurem subinde per aulaeum, nec diluere obiecta permissi nec defensi periere conplures.");
INSERT INTO memos (aid,title,content) VALUES (5,"Mensarum","Mensarum enim voragines et varias voluptatum inlecebras, ne longius progrediar, praetermitto illuc transiturus quod quidam per ampla spatia urbis subversasque silices sine periculi metu properantes equos velut publicos signatis quod dicitur calceis agitant, familiarium agmina tamquam praedatorios globos post terga trahentes ne Sannione quidem, ut ait comicus, domi relicto. quos imitatae matronae complures opertis capitibus et basternis per latera civitatis cuncta discurrunt.");
INSERT INTO memos (aid,title,content) VALUES (2,"fnzfhij","fezlifjezfjzoerjeaziofjizjfiozjpiajqsngoirngfsqgjrioegjn eqrjf,sgnorbg zqfgujfnlqjb rjz vquzfnqslgjnv eqjbknjrozqfnjeskb qjrb reqfqsb  !!");


INSERT INTO access (id,mid,wr) VALUES (6,1,true);
INSERT INTO access (id,mid,wr) VALUES (7,1,false);
INSERT INTO access (id,mid,wr) VALUES (8,2,true);
INSERT INTO access (id,mid,wr) VALUES (9,2,false);
INSERT INTO access (id,mid,wr) VALUES (1,2,true);
INSERT INTO access (id,mid,wr) VALUES (2,3,true);
INSERT INTO access (id,mid,wr) VALUES (3,4,false);
INSERT INTO access (id,mid,wr) VALUES (5,4,false);
INSERT INTO access (id,mid,wr) VALUES (6,4,false);
INSERT INTO access (id,mid,wr) VALUES (7,4,true);
INSERT INTO access (id,mid,wr) VALUES (2,5,true);
INSERT INTO access (id,mid,wr) VALUES (2,1,false);
INSERT INTO access (id,mid,wr) VALUES (5,6,false);
INSERT INTO access (id,mid,wr) VALUES (3,6,false);
