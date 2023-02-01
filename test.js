
const express = require("express");
const app = express();
app.use(express.urlencoded({
    extended: true
}));
const cheerio = require('cheerio');
const fs = require('fs'); 
const sqlite3 = require('sqlite3').verbose();
 
let db = new sqlite3.Database('backend/database.sql', (err) => {
  if (err) {
    return console.error(err.message);
  }
});
 
app.use(express.static('Public'));
 
app.listen(5000, () => {
  console.log("Server is running on port 5000");
})
 
 
app.post('/make_reservation', (request, response) =>{
 
  let reservation = request.body
 
  db.run("INSERT INTO reservations (firstname, lastname, email) VALUES (?,?,?)", 
    [reservation.fname, reservation.lname, reservation.email], function (err, result) {
    if (err) throw err;
 
    fs.readFile('Public/Reservation.html', 'utf8', function(err, data) {
 
        if (err) throw err;
 
        let html_file = cheerio.load(data);
 
        html_file('.container2').replaceWith('<div>Reservation successful</div>')
 
        response.send(html_file.html())
 
    });
 
  
  });
 
 
})
