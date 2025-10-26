Project Name: Mini Transaction Ledger. (1)



/***************************************************************************************************** */

Description: 

        overview: This super simple web app can do several actions like create account, cash in(credit), cash out(debit), Transfer (transfer from one existing account to another existing account).

        Short-description: Devided into Backend APIs and Frontend Static Page.

                       DB: Has 2 tables named- 
                                i.Accounts (account_id, account_number, name, balance, created_at) and 
                                2.Transactions (txn_id, from_account, to_account, type(debit, credit or transfer), amount, created_at)

                       backend: (1) Connected to the DB. 
                                (2) Has CRUD APIs to communicate with DB.

                       frontend: (1) A sidebar to react with 2 different pages - Accounts and Transactions. (using api call communicate with backend)
                                 (2) Accounts page contains a 'create account' button that opens a 'create account' form in a dialog. Additonally, Displayed All the existing accounts in a table.
                                 (3) Transaction page contans 3 seperate forms to cash in, csah out and Transfer, and displayed All the Transactions in a table.



/******************************************************************************************************* */

Tech Stack Used:
            Frontend: Quasar (A UI framework of VUE.js)
            Backend: Express.js & Node.js 
            DB: PostgresSQL
            API Testing: Postman
            Containerization: Docker (Docker Desktop & Docker Hub)


/********************************************************************************************************* */
Setup & run instructions: You need to have 'docker desktop' in your PC.

2 Ways to Run the Project:

        1. Using Pull Image from Docker Hub: 
            (i) Open terminal from any directory.
            (ii) pull 3 images- commands:

                           docker pull yourdockerhubusername/mini_ledger_db:latest
                           docker pull yourdockerhubusername/mini_ledger_backend:latest
                           docker pull yourdockerhubusername/mini_ledger_frontend:latest

            (iii) Create a network to contain all 3 containers run together-
                           
                           docker network create ledger-network

            (iv) Run the containers in some specific ports and in this specific network-

                           docker run -d --name mini_ledger_db --network ledger-network -p 5432:5432 fahimfoysalapurba/mini_ledger_db:latest

                           docker run -d --name mini_ledger_backend --network ledger-network -p 5000:5000 -e PGUSER=postgres -e PGPASSWORD=root -e PGHOST=mini_ledger_db -e PGDATABASE=mini_ledger -e PGPORT=5432 -e PORT=5000 fahimfoysalapurba/mini_ledger_backend:latest

                           docker run -d --name mini_ledger_frontend --network ledger-network -p 9000:80 fahimfoysalapurba/mini_ledger_frontend:latest


                            (N.B: Don't run manually)


        
        2. Run the clone from GitHub:
                            
                            (i) Any directory:
                                     git clone git@github.com:Fahim-Foysal-Apurba/Transection-Ledger.git
                            
                            (ii) enter into the project's root directory:

                                     cd Transection-Ledger

                            (iii) Build & run the containers:

                                     docker-compose up


/************************************************************************************************* */

Explanation of architecture:  (Using a simple diagram)  VMMV--> From View (data with some api req) to Model, and from Model (res sends) to View.
      
      **********                  *****************                                ******************
      *        *                  *               *  Recieve REQUEST from frontend *                *
      ********** <----------------*     models    *<------------------------------ *Send request to *
      *        * backend connecte *               *                                *   Backend.     *
      ********** ---------------->*   Holds CRUD  *                                *                *
      *        *     with DB      *   REST APIs   *------------------------------->* Displayed Views*
      **********                  *****************  processes request and return  *   and info     *                       
      *        *                                      RESPONSE to frontend         *                *
      **********                                                                   ******************                                 
          DB                           Backend                                           Frontend


/************************************************************************************************** */
Brief explanation of inner workings:
(1) Backend + DB: using postgresSQL's 'pg' package api, I interface the backend with DB.
(2) in a apis.js file I declared all the CRUD api methods.
(3) Using express.js I connected the apis with server in some port.

(4) Design simple DB with 2 tables.

(5) Axios used in the frontend to secure and define baseURL.
(6) Use Pinia (State management system for vue) to store global state. where I store all the accounts and transactions.
(7) Api call functions are also there in 2 global storage so that in any file we can access them.

(9) Use 2 pages named Accounts page and Transactions page
(10) 3 components are created to reuse them in a efficient way in the pages.
(11) In the main layout using a drawer sidebar Accounts and Transactions page routes are shown to communicate pages by clicking.













                       
                        