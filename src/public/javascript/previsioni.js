var lon;
var lat;
var nomecitta;
var oggi;
const giorni = ['Domenica', 'Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato'];

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
      

      document.getElementById("container").style.backgroundSize = "cover";
      document.getElementById("container").style.backgroundRepeat = "no-repeat";
      document.getElementById("container").style.backgroundImage = stringa;
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

////////////////////////////NON CONTROLLO CHE ABBIA PREVISIONI VALIDA
      let previsione =  await eseguefetch(`/api/previsione/${lat}/${lon}`);

      document.getElementById('temperatura').innerText = previsione.list[0].main.temp  + ' °C';
      document.getElementById('temp-percepita').innerText =  "temperatura percepita: " + previsione.list[0].main.feels_like + ' °C';
      document.getElementById('umidita').innerText = 'Umidità: ' + previsione.list[0].main.humidity + ' %' ;
      document.getElementById('descrizione').innerText = 'Descrizione: ' + previsione.list[0].weather[0].description;
      document.getElementById('vento').innerText = 'Vento: ' + previsione.list[0].wind.speed + ' Km/H';
      document.getElementById('prob').innerText = 'Precipitazioni: ' + Math.round(previsione.list[0].pop * 100)  + ' %';


      ////////////////////// settimana display

      const data = new Date(previsione.list[0].dt_txt);
      var oggi = data.getDay();
      document.getElementById('giorno2').innerText =  giorni[(oggi+1)%7] + ":   temperatura: " + previsione.list[8].main.temp + "c°    " + " precipitazioni: " +  Math.round(previsione.list[8].pop * 100) +" %";
      document.getElementById('giorno3').innerText =  giorni[(oggi+2)%7] + ":   temperatura: " + previsione.list[16].main.temp + "c°    " + " precipitazioni: " +  Math.round(previsione.list[16].pop * 100) +" %";
      document.getElementById('giorno4').innerText =  giorni[(oggi+3)%7] + ":   temperatura: " + previsione.list[24].main.temp + "c°    " + " precipitazioni: " +  Math.round(previsione.list[24].pop * 100) +" %";



    }


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
    if (citta !== null) {

        cercacitta(citta);
        settaImmagine(citta);
       }
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