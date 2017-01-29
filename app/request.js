/*define(function () 
{
    var OnHttpRequestChange = function(event)
    {
        var httpRequest = event.target;
        
        if (httpRequest.readyState === 4 && httpRequest.status === 200)
            onSuccessRequestModel(httpRequest);
    }

    function onSuccessRequestModel(httpRequest)
    {
        var data = JSON.parse(httpRequest.response);
        httpRequest.callbackdata(data);
    }

    function doHttpRequest(metodo, llamado, callback, data)
    {
        var httpRequest = new XMLHttpRequest();
        httpRequest.callbackdata = callback;
        httpRequest.onreadystatechange = OnHttpRequestChange;
        
        httpRequest.open(metodo, './FileLoader/httpRequest.php?' + llamado);        
        httpRequest.send(JSON.stringify(data)); 
    }

    this.colocarJSONData = (llamado, callback, data) =>
    {
        doHttpRequest('POST', llamado, callback, data);
    }

    this.ObtenerJSONData = (fileName, callback) =>
    {                
        var httpRequest = new XMLHttpRequest();
        httpRequest.callbackdata = callback;
        httpRequest.onreadystatechange = OnHttpRequestChange;
        
        httpRequest.open('GET', './db/' + fileName + '.json');        
        httpRequest.send(); 
    }     

    return this;
});*/

(function()
{
    var request = {};

    request.get = function( fileName ) 
    {    
        return new Promise(function( resolve, reject ) 
        {                      
            var req = new XMLHttpRequest();                     
            req.open( 'GET', './db/' + fileName + '.json' );
            req.onload = function( ) 
            {                
                if (req.status === 200)                 
                    resolve(req.response);                
                else                                     
                    reject(Error(req.responseText));                
            };

            req.onerror = function() {                
                reject(Error('Network Error'));
            };

            req.send();
        });
    }

    request.put = function( title, json ) 
    {    
        return new Promise(function( resolve, reject ) 
        {                                              
            var req = new XMLHttpRequest();                                                    
            req.open('POST', './FileLoader/httpRequest.php?NuevoRegistro');            
            req.onload = function( ) 
            {                
                if (req.status === 200)                 
                    resolve(JSON.parse(req.response));                
                else                                     
                    reject(Error(req.responseText));                
            };

            req.onerror = function() {                
                reject(Error('Network Error'));
            };   

            req.send(JSON.stringify(json));         
        });
    }
    
    var root, previous_async;

    root = this;
    if (root != null) {
      previous_async = root.request;
    }
    
    if (typeof module !== 'undefined' && module.exports) 
    { // Node.js
        module.exports = request;
    }    
    else if (typeof define !== 'undefined' && define.amd) 
    { // AMD / RequireJS
        define([], function () {
            return request;
        });
    }    
    else 
    { // included directly via <script> tag
        root.request = request;
    }    
})();