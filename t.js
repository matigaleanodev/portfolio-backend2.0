const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "bjr2njrwh5tyhfuxj1gk-mysql.services.clever-cloud.com",
  user: "uj0xozph4vc42pzg",
  password: "iPwXelMTzmBSfdQTMbOW",
  database: "bjr2njrwh5tyhfuxj1gk",
});

const start = Date.now();

connection.query("SELECT 1", (err, results) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  const latency = Date.now() - start;
  console.log(`Query executed in ${latency} ms`);

  connection.end();
});
