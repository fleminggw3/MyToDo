const {Client} = require('pg');
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "123Marina123!@#",
    database: "MyToDo"
})

client.connect();

//Add a User
// client.query(`INSERT INTO users ("firstName","lastName","userName") VALUES ('Testy','Testman','Testosterone')`, (err, res)=>{
//     if(!err) {
//         console.log(res.rows)
//     } else {
//         console.log(err.message);
//     }
//     client.end;
// });

//Get all users
client.query(`SELECT * FROM users`, (err, res)=>{
    if(!err) {
        console.log(res.rows)
    } else {
        console.log(err.message);
    }
    client.end;
});

//Select user that does exist
client.query(`SELECT * FROM users WHERE "userName" = 'test2000'`, (err, res)=>{
    if(!err) {
        console.log(res.rows)
    } else {
        console.log(err.message);
    }
    client.end;
});

//Select user that does not exist
client.query(`SELECT * FROM users WHERE "userName" = 'test2002'`, (err, res)=>{
    if(!err) {
        console.log(res.rows)
    } else {
        console.log(err.message);
    }
    client.end;
});