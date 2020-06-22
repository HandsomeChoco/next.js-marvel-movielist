# next.js-marvel-movielist

I'm just creating it, because i love marvel movies. and in order to practice Next.js

# if you want to start this project 

1. Clone this repository or Download zip on your computer
2. If you don't have MongoDB and Node.js, you have to install MongoDB and Node.js on your computer. <br/>
   because this project require Node.js and MongoDB. 
3. unzip, if you downloaded it. 
4. You cannot run this project yet. in order to run this project, we need to install <br/>
   dependancy modules, first we will install dependancies module for backend server.<br/>
   access to "backend" directory. open terminal and type command <b>npm install</b>. <br/>
   make sure your path on terminal is same with project path of "bakcend" directory. 
5. now we successfully installed dependancy modules for backend server. type command <b>npm start</b><br/>
   backend server will be started. 
6. if you started backend server. database "NextApp" will be automatically created on your mongoDB.<br/>
   database "NextApp" has two collections(= same role of table in RDBMS) which is called "users" and "movies".
   <b>users</b> collection is for user accounts. this collection is epmty until when you create account on project. 
7. now, we will put movie datas in <b>movies</b> collection. you can easily import data on MongoDB Compass Community.<br/>
   run MongoDB Compass and access to the "movies" collection. <br/>
   7-1. click, ADD DATA, <br/>
   7-2. select Import File of ADD DATA menu. <br/>
   7-3. select "JSON" under the text "Select Input File Type" <br/>
   7-4. click BROWSE and load movie-data.json from top directory of this project. <br/>
   7-5. click IMPORT. 
   
8. datas ready, access to the "client" directory, open terminal and type command <b>npm install</b> just like you did it. <br/>
   again! make sure your path on terminal is same with project path of "client" directory.

9. now we successfully installed dependancy modules for client server. type command <b>npm run dev</b><br/>
   client server will be started. open your broser, type "localhost:3000" now you can access the project.
   
10. explore my proejct!

