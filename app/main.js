define(function (require) 
{
    // Load any app-specific modules
    // with a relative require call,
    // like:    
    let request = require('./request');   

    let OnHttpRequestObtenerDone = data =>
    {
        //console.log('Data: ', data);
        let json = JSON.parse(data);
        let dibujar = require('./dibujar');

        dibujar.Initialize(json);
    }


    let OnFailure = error =>
    {
        console.log('Error', error);
    }

    request.get('registros')
    .then(OnHttpRequestObtenerDone)
    .catch(OnFailure); 
});