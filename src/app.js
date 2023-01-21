const express = require('express')
const app = express()
const path = require('path');
const Port = 3000

//definisce le viste di ejs come cartella html
app.set('views', path.join(__dirname, 'html'));
//definisco ejs come view enginge
app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);

// intercetta e gestisce le chiamate get della pagina
app.get('/citta', (req, res) => {
  res.render('citta.html')
})

app.get('/', (req, res) => {
    res.render('index.html')
  })


//si mette in ascolto sulla porta 3000
app.listen(Port);