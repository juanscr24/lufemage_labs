import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "bqmszltiyyyc0xndbmuq-mysql.services.clever-cloud.com",
  user: "u9pz0lwuixdxlzvo",
  password: "zaqEi1QheIIFMUSHjEnB",
  database: "bqmszltiyyyc0xndbmuq",
  port: 3306,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado a Clever Cloud MySQL!");
});

export default connection;
