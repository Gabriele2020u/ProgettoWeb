const imagesLoader = new Worker('imgwebworker.js');
const imagesElements = document.querySelectorAll('img[data-src]');

// chiamata a postMessage() sul webworker per caricare le immagini
imagesElements.forEach(element => {
    const URL = element.getAttribute('data-src');
    imagesLoader.postMessage(URL);
});

// ascolta la risposta del WebWorker
imagesLoader.addEventListener('message', (event) => {
    const data = event.data;
    const element = document.querySelector(`img[data-src='${data.URL}']`);
    const url = URL.createObjectURL(data.blob);

    element.setAttribute('src', url);
    element.removeAttribute('data-src');
})