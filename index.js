// const { addition } = require('./addition.js');

//step 3
// let { addition } = require('./addition.js');
// addition(3, 4);
// addition(8, 9);

//

const express = require("express");

//Path
const path = require("path");

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

app.use(
  route,
  express.json,
  bodyParser.urlencoded({extended:false}),
  );

//Home or /
route.get("/", (req, res) => {
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
    if(err) console.log(err);;
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

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
