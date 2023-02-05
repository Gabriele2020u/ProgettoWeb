
//funzione di interazione col toggle
function checkTheme () {

    const darkTheme = document.getElementById('darkModeToggle').checked;
    if (darkTheme) {
      attivaDarkMode();
    } else {
      attivaLightMode();
    }
  }
//



function attivaDarkMode () {

   // modifica background e colore del testo
    document.querySelectorAll('.white').forEach((element) => {
    
        element.className = element.className.replace( 'white', 'dark');
      });

   // modifica background e colore del details
    document.querySelectorAll('.white_details').forEach((element) => {
    
        element.className = element.className.replace( 'white_details', 'dark_details');
      });

    //cambia  la navbar e il footer di colore
    document.querySelectorAll('.bg-light').forEach((element) => {
    
        element.className = element.className.replace(/-light/g, '-dark');
      });
      
    //cambia  pulsante
    document.querySelectorAll('.btn-light').forEach((element) => {
    
        element.className = element.className.replace(/-light/g, '-dark');
      });
      
  
    // salvo il nuovo valore
    const   darkTheme = true;
    
  
    localStorage.setItem('darkMode', JSON.stringify(darkTheme));
  }





function attivaLightMode () {



   // modifica background e colore del testo
    document.querySelectorAll('.dark').forEach((element) => {
    
        element.className = element.className.replace( 'dark', 'white');
      });

   // modifica background e colore del details
     document.querySelectorAll('.dark_details').forEach((element) => {
    
      element.className = element.className.replace( 'dark_details', 'white_details');
    });

    //cambia navbar e footer di colore
    document.querySelectorAll('.bg-dark').forEach((element) => {
      element.className = element.className.replace(/-dark/g, '-light');
    });


    //cambia  pulsante
    document.querySelectorAll('.btn-dark').forEach((element) => {
    
        element.className = element.className.replace(/-dark/g, '-light');
      });
      

  
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
  
        if (theme) {
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