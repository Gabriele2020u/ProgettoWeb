
self.addEventListener('message', async (event) => {


    const URL = event.data;
    const response = await fetch(`${URL}`);
    const blob = await response.blob();

    self.postMessage({
        URL: URL,
        blob: blob,
    });
});