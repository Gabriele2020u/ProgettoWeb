
//funzione di interazione col toggle
function checkTheme () {

    const darkTheme = document.getElementById('darkModeToggle').checked;
    if (darkTheme) {
      attivaDarkMode();
    } else {
      attivaLightMode();
    }
  }




function attivaDarkMode () {


    //cambia  la navbar e il footer di colore
    document.querySelectorAll('.bg-light').forEach((element) => {
    
        element.className = element.className.replace(/-light/g, '-dark');
      });
  
         // modifica il colore del cerchio
         let cerchio = document.getElementById("cerchio");
         if(cerchio != null ){
            cerchio.style.background = "black";
         }

 
    //cambio colore info e giorni (testi e sfondi row del container)
   document.querySelectorAll('.whiteinfo').forEach((element) => {
    
    element.className = element.className.replace( 'whiteinfo', 'darkinfo');
  });
      
     //cambio colore testo footer
     document.getElementById("footer").style.color = "white";
  
    // salvo il nuovo valore
    const   darkTheme = true;
    
  
    localStorage.setItem('darkMode', JSON.stringify(darkTheme));
  }





function attivaLightMode () {


    //cambia navbar e footer di colore
    document.querySelectorAll('.bg-dark').forEach((element) => {
      element.className = element.className.replace(/-dark/g, '-light');
    });
  
   // modifica il colore del cerchio
   let titolo = document.getElementById("titolo");
   if(cerchio != null ){
      cerchio.style.background = "white";
   }


    // modifica il colore del cerchio
    let cerchio = document.getElementById("cerchio");
    if(cerchio != null ){
       cerchio.style.background = "white";
    }

   //cambio colore info e giorni (testi e sfondi row del container)
   document.querySelectorAll('.darkinfo').forEach((element) => {
    
    element.className = element.className.replace( 'darkinfo', 'whiteinfo');
  });


        //cambio colore testo footer
        document.getElementById("footer").style.color = "black";
  
    // salvo il nuovo valore
    const   darkTheme = false;
    
  
    localStorage.setItem('darkMode', JSON.stringify(darkTheme));
  }
  


// legge dal local storage se e settata la variabile darkmode
//darkmode puo essere true o false
//se non e definita  il theme di base e quello chiaro
function caricaInfo () {
    var theme = localStorage.getItem('darkMode');
  
    if (theme != null) {
      theme = JSON.parse(theme);
  
        if (theme.darkTheme) {
          attivaDarkMode();
          document.getElementById('darkModeToggle').checked = true;
        } else {
          attivaLightMode();
          document.getElementById('darkModeToggle').checked = false;
        }

    } else {
      attivoLightMode();
    }
  }


  // all apertura della pagina esegue il metodo
document.addEventListener('DOMContentLoaded', caricaInfo());