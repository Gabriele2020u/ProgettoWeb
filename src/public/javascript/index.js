
///////////////////////////////////////////////////////////////////////
var lon;
var lat;
var nomecitta;

async function showInfo (){
    console.log("sono qui");

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

      document.getElementById('temp-milano').innerText = 'Temperatura: ' + previsione_m.list[0].main.temp  + ' °C';
      document.getElementById('temp-roma').innerText = 'Temperatura: ' + previsione_r.list[0].main.temp  + ' °C';
      document.getElementById('temp-napoli').innerText = 'Temperatura: ' + previsione_n.list[0].main.temp  + ' °C';

      document.getElementById('descriz-m').innerText = 'Descrizione: ' + previsione_m.list[0].weather[0].description;
      document.getElementById('descriz-r').innerText = 'Descrizione: ' + previsione_r.list[0].weather[0].description;
      document.getElementById('descriz-n').innerText = 'Descrizione: ' + previsione_n.list[0].weather[0].description;

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


//////////////////////////////////////////////

  //metodo che viene eseguito al caricamento della pagina
document.addEventListener('DOMContentLoaded', async () => {
    console.log("sono qui");
    showInfo();
   // showInfo("Roma");
   // showInfo("Napoli");

    })
