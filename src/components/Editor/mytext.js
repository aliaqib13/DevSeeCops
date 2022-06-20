const mytext = `//Example Javascript Secrets Management code
//Right click on this editor to see more functionalities

const express = require('express')
const mariadb = require('mariadb');

const port = 8018
const app = express()
const pool = mariadb.createPool({
  host: 'db',
  user: '82618201',
  password: 'animism-sort-galvanic-angina-camp',
  database: 'demo'
});

app.set('view engine', 'pug')

app.get('/', async (req, res) => {
  conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM customer;");
  res.render('index', { customers: rows });
});

app.listen(port, () => console.log(\`Listening on port \${port}!\`))


//******** We can use this editor to let participants change code!`;
export default mytext;
