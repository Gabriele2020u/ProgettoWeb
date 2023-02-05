///////////////////////////////////////////////////////////////////////
var lon;
var lat;
var nomecitta;

async function showInfo (){
  

    let posizione_milano =  await eseguefetch(`/api/posizionecitta/Milano`);
    let posizione_roma =  await eseguefetch(`/api/posizionecitta/Roma`);
    let posizione_napoli =  await eseguefetch(`/api/posizionecitta/Napoli`);
        
        var lat_m = posizione_milano[0].lat;
        var lon_m = posizione_milano[0].lon;
        var lat_r = posizione_roma[0].lat;
        var lon_r = posizione_roma[0].lon;
        var lat_n = posizione_napoli[0].lat;
        var lon_n = posizione_napoli[0].lon;
    
////////////////////////////NON CONTROLLO CHE ABBIA PREVISIONI VALIDA
      let previsione_m =  await eseguefetch(`/api/previsione/${lat_m}/${lon_m}`);
      let previsione_r =  await eseguefetch(`/api/previsione/${lat_r}/${lon_r}`);
      let previsione_n =  await eseguefetch(`/api/previsione/${lat_n}/${lon_n}`);
console.log(previsione_m);
      document.getElementById('temp-milano').innerText = 'Temperatura: ' + previsione_m.main.temp  + ' °C';
      document.getElementById('temp-roma').innerText = 'Temperatura: ' + previsione_r.main.temp  + ' °C';
      document.getElementById('temp-napoli').innerText = 'Temperatura: ' + previsione_n.main.temp  + ' °C';

      document.getElementById('descriz-m').innerText = 'Descrizione: ' + previsione_m.weather[0].description;
      document.getElementById('descriz-r').innerText = 'Descrizione: ' + previsione_r.weather[0].description;
      document.getElementById('descriz-n').innerText = 'Descrizione: ' + previsione_n.weather[0].description;

      icon_m = previsione_m.weather[0].icon;
      document.getElementById('mil_emoji').src= 'http://openweathermap.org/img/wn/'+icon_m+'@2x.png';

      icon_r = previsione_r.weather[0].icon;
      document.getElementById('rom_emoji').src= 'http://openweathermap.org/img/wn/'+icon_r+'@2x.png';

      icon_n = previsione_n.weather[0].icon;
      document.getElementById('nap_emoji').src= 'http://openweathermap.org/img/wn/'+icon_n+'@2x.png';
}

//METODI DI SUPPORTO

//controllo  il controllo del json
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

async function eseguefetch (url) {
    const response = await fetch(url);
    return response.ok ? response.json() : Promise.reject({ error: 500 });
  };

/*
async function getWeatherEmoji (){
icon_m = previsione_m.weather.icon;
console.log(icon_m);
  document.getElementById('mil_emoji').src= 'http://openweathermap.org/img/wn/'+icon_m+'@2x.png';

  
var img = document.createElement("img"); 
 
img.src = "image.png"; 
var src = document.getElementById("x"); 
 
src.appendChild(img); 
}
  */

//////////////////////////////////////////////

  //metodo che viene eseguito al caricamento della pagina
document.addEventListener('DOMContentLoaded', async () => {

    showInfo();
  //  getWeatherEmoji();

    })
