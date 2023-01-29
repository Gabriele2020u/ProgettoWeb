const express = require('express');
const axios = require("axios");
const path = require('path');
//const bodyParser = require('body-parser');
const Port = 3000;
const Keyweather =  "05caabeb67f1805702d928cea439d2d6";
const lingua = "it";
const app = express();
const KeyUnsplash = "L6evowfp3gYUNzs2igzmp5CNLrmRVA_G5xLEDx_Xeds";



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

  //  CHIAMATE API

  //data una citta si ottiene la posizione in latitudine e longitudine
  app.get('/api/posizionecitta/:citta', (req, res) => {


    const citta = req.params.citta;
    
    axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${citta}&lang=${lingua}&limit=1&appid=${Keyweather}`)
      .then((posizione) => res.send(posizione.data))  
      .catch((err) => res.json({error: `Città non trovata, Info: ${err}`}));  

  });

  
    //data lon e lat ritorna il meteo della citta
    app.get('/api/previsione/:lat/:lon', (req, res) => {

      const lon = req.params.lon;
      const lat = req.params.lat;
      
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=${lingua}&appid=${Keyweather}`)
        .then((temperatura) => res.send(temperatura.data))  
        .catch((err) => res.json({error: `previsione non trovata, Info: ${err}`}));  
  
    });



    //data il nome di una citta restituisce un link di una sua immagine
      app.get('/api/immagine/:citta', (req, res) => {

          const citta= req.params.citta;
          
          axios.get(`https://api.unsplash.com/search/photos?query=${citta}&orientation=landscape&client_id=${KeyUnsplash}`)
            .then((risposta) => res.send(risposta.data))  
            .catch((err) => res.json({error: `foto non trovata, Info: ${err}`}));  
      
        });




//si mette in ascolto sulla porta 3000
app.listen(Port);