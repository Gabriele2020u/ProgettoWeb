const express = require('express');
const axios = require("axios");
const path = require('path');
//const bodyParser = require('body-parser');
const Port = 3000;
const ApiKey =  "05caabeb67f1805702d928cea439d2d6";
const app = express();



     //app.use(bodyParser.urlencoded({ extended: true }));




//dice a express di settare la path statica a public  per gli import css e javascript
app.use(express.static(path.join(__dirname, 'public')));

// attivazione di router e di EJS per la gestione del rendering
//definisce le viste di ejs come cartella html
app.set('views', path.join(__dirname, 'html'));
//definisco ejs come view enginge
app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);

//routing delle pagine
app.get('/previsioni', (req, res) => {
  res.render('previsioni.html')
})

app.get('/', (req, res) => {
    res.render('index.html')
  })

  // chiamate API

  //data una citta si ottiene la posizione in latitudine e longitudine
  app.get('/api/posizionecitta/:citta', (req, res) => {


    const citta = req.params.citta;
    
    axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${citta}&limit=1&appid=${ApiKey}`)
      .then((posizione) => res.send(posizione.data))  
      .catch((err) => res.json({error: `Città non trovata, Info: ${err}`}));  

  });

  
    //data una citta si ottiene la posizione in latitudine e longitudine
    app.get('/api/posizionecitta/:citta', (req, res) => {


      const citta = req.params.citta;
      
      axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${citta}&limit=1&appid=${ApiKey}`)
        .then((posizione) => res.send(posizione.data))  
        .catch((err) => res.json({error: `Città non trovata, Info: ${err}`}));  
  
    });




//si mette in ascolto sulla porta 3000
app.listen(Port);