// const { addition } = require('./addition.js');

// const bodyParser = require("body-parser");

//step 3
// let { addition } = require('./addition.js');
// addition(3, 4);
// addition(8, 9);

//

const express = require("express");

//Path
const path = require("path");

//cors
const cors = require("cors");

//db
const db = require("./config"); //when you want to import use './'

// body-parser
const bodyParser = require("body-parser"); // body-parser - allow us to convert whatever format that is coming from the user data from one format to another

//Port
const port = parseInt(process.env.port) || 4000;

//Express app
const app = express();

//Router
const route = express.Router();

//middleware
const {errorHandling} = require('./middleware/ErrorHandling');

//message
const {message} = 
require('./middleware/message');

app.use(
  route,
  cors({
    origin:['http://127.0.0.1:8080',
  'http://localhost:8080'],
  Credentials:true
}),
  express.json,
  bodyParser.urlencoded({extended:false}),
  )

//Home or /
route.get("^/$|/jtbookstore", message, (req, res) => {
  res.status(200).sendFile(path.join(__dirname,'./view/index.html'));
})

//retrieve all users
route.get('/users',(req,res)=>{
  const strQry =
  `
  SELECT firstName,lastName,emailAddy,country
  FROM Users;
  `;

  //db 
  db.query(strQry, (err,data)=>{
    if(err) err;
    res.status(200).json({result:data});
  })
});

//register
route.post('/register', bodyParser.json(), (req, res)=> {
let detail = req.body;
console.log(detail);
//sql query
const strQry = 
`INSERT INTO Users
SET?;`;
db.query(strQry,[detail],(err)=>{
  if (err) {
    res.status(400).json({err});
      } else{
        res.status(200).json({msg:'A user record was saved.'})
      }
})
})


// let string = 'i love programming';
// let strings = string.split('').reverse();
// console.log(strings.join(''));

//put
route.put('/user/:id', bodyParser.json(), (req, res) => {
  console.log(req.body);
  const strQry = 
`UPDATE TABLE Users
SET? 
WHERE userID =?;
`;
db.query(strQry,[data,req.params.id], // question mark is a placeholder
  (err)=>{
  if (err) throw err; {
        res.status(200).json({msg:'A row was affected.'})
      }
});
});

//delete
route.delete('/user/:id', (req, res) => {
  console.log(req.params);
`
DELETE FROM Users
WHERE UserID = ?;
`;
//db
db.query(strQry,[req.params.id], 
  (err)=>{
    if (err) throw err; {
          res.status(200).json({msg:'A row was affected.'})
        }
  });
  });

//route login
route.patch('/login',bodyParser.json(),(req,res)=>{
  console.log(req.body);
  ``
})

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});



// route.patch('/login',bodyParser.json(),(req,res)=>{
// const putQuery = `select firstName,lastName,emailAddress,userPass
// from Users
// where emailAddress = '${emailAddress}'
// `;
// db.query(putQuery,(err,data)=>{
// if (err) throw err;
// if((data.lengths) || (data =))
// })

// })