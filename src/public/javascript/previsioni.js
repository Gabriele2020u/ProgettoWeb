var lon;
var lat;
var nomecitta;

//METODI DI SUPPORTO

//controllo  il controllo del json
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

async function eseguefetch (url) {
    const response = await fetch(url);
    return response.ok ? response.json() : Promise.reject({ error: 500 });
  };


 //funzione per settare l'immagine di sfondo se possibile 
async function   settaImmagine (citta){

    let link =  await  eseguefetch(`/api/immagine/${citta}`);
    if(!isEmpty(link)  && link.total != 0){

      
      let imagelink = link.results[0].urls.full;
      console.log(imagelink);
      let stringa = "url(" + imagelink +  ")";
      

      document.getElementById("main").style.backgroundSize = "cover";
      document.getElementById("main").style.backgroundRepeat = "no-repeat";
      document.getElementById("main").style.backgroundImage = stringa;
      //document.getElementsByClassName('background-image').style.height = "50vh";
      //document.getElementById('foto').setAttribute("src",imagelink);
      //document.body.style.backgroundImage = "url(`${imagelink}`)";
        
    }
    else{

        document.getElementById("main").style.backgroundColor = "rgba(39, 226, 245, 0.8)";
    }
    
   
}

//////

async function cercacitta (citta){


    let posizione =  await eseguefetch(`/api/posizionecitta/${citta}`);
    
    if(isEmpty(posizione) || posizione[0].name === undefined){
        
      document.getElementById('nometitolo').innerText = "citta non trovata"; 
            
    }
    else {
        var nomecitta = citta;
        var lat = posizione[0].lat;
        var lon = posizione[0].lon;
      document.getElementById("nometitolo").innerText =  nomecitta.toUpperCase();


      let previsione =  await eseguefetch(`/api/previsione/${lat}/${lon}`);

      //document.getElementById('temperatura').innerText = previsione.list[0].main.temp  + ' °C';

    // inserisce tutti i dati meteo nella vista in previsioni.html
 /*     document.getElementById('temp').innerText = 'Temperatura: ' + weatherResponse.main.temp + ' °C';
      document.getElementById('temp-maxmin').innerText = 
        'Temperatura (massima e minima): ' + weatherResponse.main.temp_max + ' - ' + weatherResponse.main.temp_min + ' °C';
      document.getElementById('temp-perc').innerText = 'Temperatura percepita: ' + weatherResponse.main.feels_like + ' °C';
      document.getElementById('hum').innerText = 'Umidità: ' + weatherResponse.main.humidity;
      document.getElementById('descr').innerText = 'Descrizione: ' + weatherResponse.weather[0].description;
      document.getElementById('wind').innerText = 'Vento: ' + weatherResponse.wind.speed + ' Km/H';
        document.getElementById('lon').innerText = 'lon: ' + lon;   */
        settaImmagine(nomecitta);
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
    

    const parametri = new URLSearchParams(window.location.search);
    const citta = parametri.get("nomecitta");
    if (citta !== null) 
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