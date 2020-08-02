# next.js-marvel-movielist

I'm just creating it, because i love marvel movies. and in order to practice Next.js

# 이 프로젝트를 실행하고 싶다면..

1. 이 레포지토리를 클론하거나 다운로드 합니다.

2. MongoDB 나 Node.js 가 없다면 먼저 컴퓨터에 이들을 설치해야 합니다. <br/>
   이 프로젝트를 실행하기 위해 MongoDB와 Node.js 가 필요하기 때문입니다.
   
3. 압축된 파일로 프로젝트를 다운로드 받은 경우, 압축을 해제하십시오. 프로젝트를 클론한 경우 3의 과정을 건너뛰십시오.

4. 이 프로젝트를 즉시 실행할 수는 없습니다. 이 프로젝트를 실행하기 위해 <br/>
   종속성을 가지는 모듈들을 설치해야 합니다. 먼저 백엔드 서버를 위한 모듈을 설치할 것입니다.<br/>
   "backend" 디렉토리에 접근한 다음. 터미널을 열고 다음의 명령어를 실행하십시오 <b>npm install</b>. <br/>
   터미널상의 경로가 프로젝트 경로 "backend" 와 일치하는지 확인하십시오.
   
5. 백엔드 서버를 위한 종속성 모듈을 설치했습니다. 다음의 명령어를 입력해 백엔드 서버를 시작하십시오 <b>npm start</b><br/>

6. 백엔드 서버를 시작하면 MongoDB에 "NextAPP" 이라는 데이터베이스가 자동으로 생성될 것입니다.<br/>
   데이터베이스 "NextApp" 은 "users" 와 "movies" 두 개의 콜렉션(= RDBMS의 테이블과 같은 역할)을 가집니다. 
   <b>users</b>는 사용자 계정 정보를 위한 콜렉션 입니다. 이 콜렉션은 당신이 계정을 생성하기 전까지 비어 있을 것입니다.
   "movies" 콜렉션은 자동으로 생성되지 않으니 "movies" 라는 이름을 가지는 콜렉션을 수동으로 생성해야 합니다.
   "NextApp" 데이터베이스에 "movies" 콜렉션을 생성하십시오. "MongoDB Compass Community" 를 통해 간단하게 생성할 수 있습니다.
   
7. 이제 , <b>"movies"</b> 콜렉션에 영화에 대한 데이터를 삽입할 것입니다. "MongoDB Compass Community" 를 이용하면 간단하게 데이터를 삽입할 수 있습니다.<br/>
   "MongoDB Compass Community" 를 실행하고 "movies" 콜렉션에 접근 합니다.<br/>
   7-1. ADD DATA 를 클릭하십시오. <br/>
   7-2. ADD DATA 메뉴의 select Import File 을 선택하십시오. <br/>
   7-3. Select Input File Type 밑에 JSON 을 선택하십시오 <br/>
   7-4. BROWSE 를 클릭하고, 프로젝트 최상단 디렉토리에서 amovie-data.json 파일을 불러오십시오. <br/>
   7-5. IMPORT 를 클릭하십시오.
   
8. 데이터가 준비되었습니다. "client" 디렉토리에 접근해, 터미널을 열고 방금 했던 것처럼 다음 명령어를 입력하십시오.<b>npm install</b><br/>
   다시 한번! 터미널상의 경로가 프로젝트 경로 "client" 와 일치하는지 확인하십시오.

9. 프론트엔드를 위한 종속성 모듈들이 성공적으로 설치되었습니다. 다음의 명령어를 입력해 프로젝트를 개발모드로 실행하십시오. <b>npm run dev</b><br/>
   혹은 <b>npm run build</b> 명령어로 빌드를 실행한 다음, <b>npm start</b> 명령어를 입력하여 프로덕션 모드로 프로젝트를 실행할 수도 있습니다. <br/>
   클라이언트 서버가 시작될 것입니다. 브라우저를 열고 주소창에 "localhost:3000" 을 입력해 프로젝트에 접근하십시오.
   
10. 프로젝트를 탐험하세요!


# next.js-marvel-movielist

I'm just creating it, because i love marvel movies. and in order to practice Next.js

# if you want to start this project 

1. Clone this repository or Download zip on your computer

2. If you don't have MongoDB and Node.js, you have to install MongoDB and Node.js on your computer. <br/>
   because this project require Node.js and MongoDB. 
   
3. unzip, if you downloaded it. if you cloned this project skip this process.

4. You cannot run this project yet. in order to run this project, we need to install <br/>
   dependancy modules, first we will install dependancies module for backend server.<br/>
   access to "backend" directory. open terminal and type command <b>npm install</b>. <br/>
   make sure your path on terminal is same with project path of "bakcend" directory. 
   
5. now we successfully installed dependancy modules for backend server. type command <b>npm start</b><br/>
   backend server will be started. 
   
6. if you started backend server. database "NextApp" will be automatically created on your mongoDB.<br/>
   database "NextApp" has two collections(= same role of table in RDBMS) which is called "users" and "movies".
   <b>users</b> collection is for user accounts. this collection is epmty until when you create account on project. 
   "movies" collection will not create automatically, you have to create collection "movies" manually. 
   create "movies" collection in the "NextApp" database. you can create easily with "MongoDB Compass Community"
   
7. now, we will put movie datas in <b>movies</b> collection. you can easily insert data with MongoDB Compass Community.<br/>
   run MongoDB Compass and access to the "movies" collection. <br/>
   7-1. click, ADD DATA, <br/>
   7-2. select Import File of ADD DATA menu. <br/>
   7-3. select "JSON" under the text "Select Input File Type" <br/>
   7-4. click BROWSE and load movie-data.json from top directory of this project. <br/>
   7-5. click IMPORT. 
   
8. datas ready, access to the "client" directory, open terminal and type command <b>npm install</b> just like you did it. <br/>
   again! make sure your path on terminal is same with project path of "client" directory.

9. now we successfully installed dependancy modules for front end. type command <b>npm run dev</b><br/>
   or you can run build first with command "npm run dev", then after start this project as production mode with command <b>npm start</b>
   client server will be started. open your broser, type "localhost:3000" on address bar, now you can access the project.
   
10. explore proejct!

