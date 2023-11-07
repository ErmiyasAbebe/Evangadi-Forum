// get the client
const mysql2 = require("mysql2");

// Create the connection pool. Pools reduce the time spent connecting to the MySQL server.
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
});

pool.getConnection(function (err, connection) {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the database as id " + connection.threadId);
});

// Database operations.
//CREATE TABLE statement to create a new table in a database.

let registration = `CREATE TABLE if not exists registration(
  user_id INT AUTO_INCREMENT, 
  user_name VARCHAR(255) NOT NULL, 
  user_email VARCHAR (255) NOT NULL, 
  user_password VARCHAR(255) NOT NULL, 
  PRIMARY KEY(user_id)
  )`;

let profile = `CREATE TABLE if not exists profile(
  user_profile_id INT AUTO_INCREMENT,
  user_id INT NOT NULL,
  first_name VARCHAR (255) NOT NULL, 
  last_name VARCHAR (255) NOT NULL,
  PRIMARY KEY(user_profile_id),
  FOREIGN KEY(user_id)REFERENCES registration(user_id)
)`;

let question = `CREATE TABLE if not exists question(
  question_id INT AUTO_INCREMENT,
  question VARCHAR (255) NOT NULL,
  question_description VARCHAR (255) NOT NULL,
  tags VARCHAR (255),
  user_id INT NOT NULL,        
  PRIMARY KEY (question_id),
  FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;

let answer = `CREATE TABLE if not exists answer (
    answer_id INT AUTO_INCREMENT,
    answer VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    PRIMARY KEY (answer_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id),
    FOREIGN KEY (question_id) REFERENCES question(question_id)
    )`;

// Execute a query using the pool
pool.query(registration, (err, results) => {
  if (err) throw err;
  console.log("registration table created");
});

pool.query(profile, (err, results) => {
  if (err) throw err;
  console.log("profile table created");
});

pool.query(question, (err, results2) => {
  if (err) throw err;
  console.log("question table created");
});

pool.query(answer, (err, results2) => {
  if (err) throw err;
  console.log("answer table created");
});

module.exports = pool;
