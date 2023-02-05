var lon;
var lat;
var nomecitta;
var oggi;
var defaultimg = "images/cittadefault.png"
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

///////////////////////////////////////////////////////////////


 // Funzione riempie con la posizione della localizzazione
function geoloc() {
    navigator.geolocation.getCurrentPosition(function (position) {

       lon = position.coords.longitude;
       lat = position.coords.latitude;
      settaDati(lat,lon)
      settaImmagine(citta)
      
  },
  function (error) {
    document.getElementById("nometitolo").innerText =  "posizione negata";
    nomecitta = "inesistente";
  })
}

 //funzione per settare l'immagine di sfondo se possibile 
async function   settaImmagine (citta){

    let link =  await  eseguefetch(`/api/immagine/${citta}`);
    if(!isEmpty(link)  && link.total != 0){

      
        imagelink = link.results[0].urls.full;
    
    }
    else{

       imagelink = defaultimg;
    }

    let stringa = "url(" + imagelink +  ")";
    document.getElementById("container").style.backgroundSize = "cover";
    document.getElementById("container").style.backgroundRepeat = "no-repeat";
    document.getElementById("container").style.backgroundImage = stringa;
   
}


//setta lon e lat data una citta e inserisce il nome della citta
async function cercacitta (citta){


    let posizione =  await eseguefetch(`/api/posizionecitta/${citta}`);
    
    if(isEmpty(posizione) || posizione[0].name === undefined){
        
      document.getElementById('nometitolo').innerText = "citta non trovata"; 
       nomecitta = "inesistente";
            
    }
    else {

         nomecitta = citta;
         lat = posizione[0].lat;
         lon = posizione[0].lon;
      document.getElementById("nometitolo").innerText =  nomecitta.toUpperCase();
      settaDati(lat,lon);
      settaImmagine(nomecitta);
    }
}


    //data lat e lon  valide setta i dati del meteo
    async function settaDati(lat,lon) {
      
      let previsione =  await eseguefetch(`/api/previsione/${lat}/${lon}`);

      document.getElementById('temp-maxmin-val').innerText =  previsione.main.temp_min +'  °C  ~ ' +  previsione.main.temp_max + ' °C' ;
      document.getElementById('temperatura').innerText = previsione.main.temp  + ' °C';
      document.getElementById('temp-percepita').innerText =  "temperatura percepita: " + previsione.main.feels_like + ' °C';
      document.getElementById('umidita').innerText = 'Umidità: ' + previsione.main.humidity + ' %' ;
      document.getElementById('descrizione').innerText = 'Descrizione: ' + previsione.weather[0].description;
      document.getElementById('vento').innerText = 'Vento: ' + previsione.wind.speed + ' Km/H';
      document.getElementById("pulsante").disabled = false;

    }




    
   ////////////////////// settimana display
    async function mostrasettimana(){

      const xhttp =  new XMLHttpRequest();

        xhttp.onload = function() {

          previsionesettimana =  JSON.parse(this.response);
          const data = new Date(previsionesettimana.list[0].dt_txt);
           oggi = data.getDay();
          document.getElementById('giorno2').innerText =  giorni[(oggi+1)%7] + "   :   temperatura: " + previsionesettimana.list[8].main.temp + "c°    " + "    precipitazioni: " +  Math.round(previsionesettimana.list[8].pop * 100) +" %";
          document.getElementById('giorno3').innerText =  giorni[(oggi+2)%7] + "   :   temperatura: " + previsionesettimana.list[16].main.temp + "c°    " + "    precipitazioni: " +  Math.round(previsionesettimana.list[16].pop * 100) +" %";
          document.getElementById('giorno4').innerText =  giorni[(oggi+3)%7] + "   :   temperatura: " + previsionesettimana.list[24].main.temp + "c°    " + "    precipitazioni: " +  Math.round(previsionesettimana.list[24].pop * 100) +" %";
          document.getElementById('pulsante').classList.add('hidden');
          document.getElementById('divSettimana').classList.remove('hidden');  
          
        }
        
      xhttp.open("GET", `/api/previsioneSettimana/${lat}/${lon}`);
      xhttp.send();

      }
    





       


//metodo che viene eseguito al caricamento della pagina
document.addEventListener('DOMContentLoaded', async () => {
    

    const parametri = new URLSearchParams(window.location.search);
    const citta = parametri.get("nomecitta");
    if (citta !== null) {

        cercacitta(citta);

    }  else{

          geoloc();
     }

   

    })  