var lon;
var lat;
var nomecitta;


function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

async function eseguefetch (url) {
    const response = await fetch(url);
    return response.ok ? response.json() : Promise.reject({ error: 500 });
  };




async function cercacitta (citta){


    let posizione =  await eseguefetch(`/api/posizionecitta/${citta}`);
    console.log(posizione);
    if(isEmpty(posizione) || posizione[0].name === undefined){
        document.getElementById('nomecitta').innerText = "citta non trovata";     
    }
    else {
        var nomecitta = posizione[0].citta;
        var lat = posizione[0].lat;
        var lon = posizione[0].lon;


    // inserisce tutti i dati meteo nella vista in previsioni.html
      document.getElementById('temp').innerText = 'Temperatura: ' + weatherResponse.main.temp + ' °C';
      document.getElementById('temp-maxmin').innerText = 
        'Temperatura (massima e minima): ' + weatherResponse.main.temp_max + ' - ' + weatherResponse.main.temp_min + ' °C';
      document.getElementById('temp-perc').innerText = 'Temperatura percepita: ' + weatherResponse.main.feels_like + ' °C';
      document.getElementById('hum').innerText = 'Umidità: ' + weatherResponse.main.humidity;
      document.getElementById('descr').innerText = 'Descrizione: ' + weatherResponse.weather[0].description;
      document.getElementById('wind').innerText = 'Vento: ' + weatherResponse.wind.speed + ' Km/H';
        document.getElementById('lon').innerText = 'lon: ' + lon;   
    }
   // let risposta =  await fetch(`/api/posizionecitta/${citta}`);
   // let posizione  = await risposta.json();
/*
    if (risposta.name === undefined) {
        document.getElementById('pos').innerText = 'Posizione: Sconosciuta';
      } else {
        document.getElementById('pos').innerText = 'Posizione: ' + city;
        cityName = city;
        handleButtons(cityName);
      }*/

       
}


//metodo che viene eseguito al caricamento della pagina
document.addEventListener('DOMContentLoaded', async () => {
    
    document.getElementById('lon').innerText = 'lon: ' ; 

    const parametri = new URLSearchParams(window.location.search);
    const citta = parametri.get("nomecitta");
    console.log(citta);
    
    
   // if (city !== null) {
      cercacitta(citta);
   /* } else {
      navigator.permissions.query({name:'geolocation'}).then(function(result) {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            getCityByLocation(latitude, longitude, true);
          });
        } else {
          getCityByLocation(null, null, true);
        }
      })*/

    })  