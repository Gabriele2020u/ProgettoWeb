
///////////////////////////////////////////////////////////////////////
var lon;
var lat;
var nomecitta;

async function showInfo (){


    let posizione =  await eseguefetch(`/api/posizionecitta/Milano`);
    
    if(isEmpty(posizione) || posizione[0].name === undefined){
        
     console.log("citta non trovata"); 
            
    }
    else {
//      var nomecitta = citta;
        var lat = posizione[0].lat;
        var lon = posizione[0].lon;
        console.log(lat,lon);
//      document.getElementById("nometitolo").innerText =  nomecitta.toUpperCase();

////////////////////////////NON CONTROLLO CHE ABBIA PREVISIONI VALIDA
      let previsione =  await eseguefetch(`/api/previsione/${lat}/${lon}`);
        console.log("sono qui");
      document.getElementById('temp-napoli').innerText = previsione.list[0].main.temp  + ' °C';
      document.getElementById('temp-miano').innerText = previsione.list[0].main.temp  + ' °C';
      document.getElementById('temp-roma').innerText = previsione.list[0].main.temp  + ' °C';
      document.getElementById('descrizione').innerText = previsione.list[0].weather[0].description;
    }
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
    
    showInfo();
   // showInfo("Roma");
   // showInfo("Napoli");

    })
