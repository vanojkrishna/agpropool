const sqlite3 = require("sqlite3").verbose(),
  TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;
// open the database
let db = new TransactionDatabase(
  new sqlite3.Database(
    "./agpropool.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Connected to the agpropool database.");
      }
    }
  )
);

create_farmers_sql = `CREATE TABLE farmer (
    farmer_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    gender TEXT NOT NULL,
    age INTEGER NOT NULL,
    village TEXT NOT NULL,
    phone_number TEXT NOT NULL UNIQUE,
    created_on Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by TEXT NOT NULL
  )`;

db.run(create_farmers_sql, [], err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Created 'farmer' table successfully");
  }
});

create_agents_sql = `CREATE TABLE farm_agent (
    agent_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    gender TEXT NOT NULL,
    age INTEGER NOT NULL,
    phone_number TEXT NOT NULL UNIQUE
  )`;

insert_agent_sql = `insert into 
    farm_agent 
    values(1,'Agent1','male',21,'9879078908');`;

db.run(create_agents_sql, [], err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Created 'farm_agent' table successfully");
  }
});
db.run(insert_agent_sql, [], err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Inserted agent successfully");
  }
});

create_transaction_sql = `CREATE TABLE transaction_details (
    transaction_id TEXT PRIMARY KEY,
    date TEXT,
    created_on Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by TEXT NOT NULL,
    farmer_id INTEGER NOT NULL,
    FOREIGN KEY (farmer_id)
      REFERENCES farmer (farmer_id)
  )`;
db.run(create_transaction_sql, [], err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Created 'transaction_details' table successfully");
  }
});

create_inventory_sql = `CREATE TABLE inventory (
    transaction_id TEXT NOT NULL,
    crop_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (transaction_id)
      REFERENCES transaction_details (transaction_id),
    FOREIGN KEY (crop_id)
      REFERENCES crop (crop_id),
      PRIMARY KEY (transaction_id,crop_id)
  )`;

db.run(create_inventory_sql, [], err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Created 'inventory' table successfully");
  }
});

create_crop_sql = `CREATE TABLE crop (
    crop_id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  )`;

db.run(create_crop_sql, [], err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Created 'crop' table successfully");
  }
});
insert_crop_sql = `INSERT INTO crop (crop_id,name)
VALUES
	("1","Alu"),
	("2","Bhindi"),
  ("3","Onion")`;
db.run(insert_crop_sql, [], err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Inserted crops successfully");
  }
});
/* db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  }); */
