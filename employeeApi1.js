let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});
const port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  password: "sampita123*",
  port: 5432,
  host: "db.exsooxwehydzqqxtlknu.supabase.co",
  ssl: { rejectUnauthorized: false },
});
client.connect(function (res, error) {
  console.log(`connected!!!`);
});

app.get("/employees", function (req, res, next) {
  let department = req.query.department;
  let designation = req.query.designation;
  let gender = req.query.gender;
  if (department && designation && gender) {
    const query = `SELECT * FROM emptable WHERE department=$1 AND designation=$2 AND gender=$3`;
    client.query(
      query,
      [department, designation, gender],
      function (err, result) {
        if (err) {
          res.status(400).send(err);
        } else res.send(result.rows);
      }
    );
  } else if (department && designation) {
    const query = `SELECT * FROM emptable WHERE department=$1 AND designation=$2`;
    client.query(query, [department, designation], function (err, result) {
      if (err) {
        res.status(400).send(err);
      } else res.send(result.rows);
    });
  } else if (department && gender) {
    const query = `SELECT * FROM emptable WHERE department=$1 AND gender=$2`;
    client.query(query, [department, gender], function (err, result) {
      if (err) {
        res.status(400).send(err);
      } else res.send(result.rows);
    });
  } else if (designation && gender) {
    const query = `SELECT * FROM emptable WHERE designation=$1 AND gender=$2`;
    client.query(
      query,
      [department, designation, gender],
      function (err, result) {
        if (err) {
          res.status(400).send(err);
        } else res.send(result.rows);
      }
    );
  } else if (department) {
    const query = `SELECT * FROM emptable WHERE department=$1`;
    client.query(query, [department], function (err, result) {
      if (err) {
        res.status(400).send(err);
      } else res.send(result.rows);
    });
  } else if (designation) {
    const query = `SELECT * FROM emptable WHERE designation=$1`;
    client.query(query, [designation], function (err, result) {
      if (err) {
        res.status(400).send(err);
      } else res.send(result.rows);
    });
  } else if (gender) {
    const query = `SELECT * FROM emptable WHERE gender=$1`;
    client.query(query, [gender], function (err, result) {
      if (err) {
        res.status(400).send(err);
      } else res.send(result.rows);
    });
  } else {
    const query = "SELECT * FROM emptable";
    client.query(query, function (err, result) {
      if (err) {
        res.status(400).send(err);
      } else res.send(result.rows);
    });
  }
});

app.get("/employees/:empcode", function (req, res, next) {
  let empcode = req.params.empcode;
  const query = `SELECT * FROM emptable WHERE empcode=$1`;
  client.query(query, [empcode], function (err, result) {
    if (err) res.status(404).send(err);
    else res.send(result.rows);
  });
});

app.post("/employees", function (req, res, next) {
  console.log("Inside post of employees");
  var values = Object.values(req.body);
  console.log(values);
  const query = `INSERT INTO emptable (empcode,name,department,designation,salary,gender) VALUES ($1,$2,$3,$4,$5,$6)`;
  client.query(query, values, function (err, result) {
    if (err) res.status(400).send(err);
    else res.send(`${result.rowCount} insertion successful`);
  });
});

app.put("/employees/:empcode", function (req, res, next) {
  console.log("Inside put of employees");
  let empcode = req.params.empcode;
  let name = req.body.name;
  let department = req.body.department;
  let designation = req.body.designation;
  let salary = req.body.salary;
  let gender = req.body.gender;
  let values = [name, department, designation, salary, gender, empcode];
  const query = `UPDATE emptable SET name=$1,department=$2,designation=$3,salary=$4,gender=$5 WHERE empcode=$6`;
  4;
  client.query(query, values, function (err, result) {
    if (err) res.status(400).send(err);
    else res.send(`${result.rowCount} updation successful`);
  });
});

app.delete("/employees/:empcode", function (req, res, next) {
  let empcode = req.params.empcode;
  const query = `DELETE FROM emptable WHERE empcode=$1`;
  client.query(query, [empcode], function (err, result) {
    if (err) res.status(404).send(err);
    else res.send(`${result.rowCount} delete successful`);
  });
});
