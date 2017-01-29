(function()
{
    var calcular = {};

    let subTotalGeneral = 0;
    let totalGeneral = 0;
    let ivaRetenidoGeneral = 0;
    let isrRetenidoGeneral = 0;
    let ivaGeneral = 0;

    let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    var root, previous_async;

    calcular.elImporteGeneradoDelMes = function( data, anio, mesIndex )
    {
        let importe = sumarImporteGeneradoEnElMes( data[getKeyAnio( anio )][meses[mesIndex - 1]] );
        return importe['cantidad'];
    }

    calcular.elImporteGastadoDelMes = function( data, anio, mesIndex )
    {
        let importe = sumarImporteGastadoEnElMes( data[getKeyAnio( anio )][meses[mesIndex - 1]] );
        return importe['cantidad'];
    }

    calcular.elIvaCobradoDelMes = function( data, anio, mesIndex )
    {
        let importe = sumarImporteGeneradoEnElMes( data[getKeyAnio( anio )][meses[mesIndex - 1]] );
        return importe['iva'];
    }

    calcular.elIvaGastadoDelMes = function( data, anio, mesIndex )
    {
        let importe = sumarImporteGastadoEnElMes( data[getKeyAnio( anio )][meses[mesIndex - 1]] );
        return importe['iva'];
    }

    calcular.elIvaRetenidoDelMes = function( data, anio, mesIndex )
    {
        let importe = sumarImporteGeneradoEnElMes( data[getKeyAnio( anio )][meses[mesIndex - 1]] );
        return importe['ivaretenido'];
    }

    calcular.elIvaGastadoRetenidoDelMes = function( data, anio, mesIndex )
    {
        let importe = sumarImporteGastadoEnElMes( data[getKeyAnio( anio )][meses[mesIndex - 1]] );
        return importe['ivaretenido'];
    }

    calcular.elIsrRetenidoDelMes = function( data, anio, mesIndex )
    {
        let importe = sumarImporteGeneradoEnElMes( data[getKeyAnio( anio )][meses[mesIndex - 1]] );
        return importe['isrretenido'];
    }

    calcular.elIsrGastadoRetenidoDelMes = function( data, anio, mesIndex )
    {
        let importe = sumarImporteGastadoEnElMes( data[getKeyAnio( anio )][meses[mesIndex - 1]] );
        return importe['isrretenido'];
    }

    calcular.elImporteGeneradoHastaElMes = function( data, anio, mesIndex )
    {
        //let importe = sumarImporteGeneradoEnElMes( data[getKeyAnio( anio )][meses[mesIndex - 1]] );
        let importe = sumarImporteDeAcuerdoAlAnioYHastaElMes( data, anio, mesIndex - 1 );
        return importe['cantidad'];
    }

    calcular.elImporteGastadoHastaElMes = function( data, anio, mesIndex )
    {
        //let importe = sumarImporteGeneradoEnElMes( data[getKeyAnio( anio )][meses[mesIndex - 1]] );
        let importe = sumarImporteGastadoDeAcuerdoAlAnioYHastaElMes( data, anio, mesIndex - 1 );
        return importe['cantidad'];
    }

    calcular.elIvaCobradoHastaElMes = function( data, anio, mesIndex )
    {
        //let importe = sumarImporteGeneradoEnElMes( data[getKeyAnio( anio )][meses[mesIndex - 1]] );
        let importe = sumarImporteDeAcuerdoAlAnioYHastaElMes( data, anio, mesIndex - 1 );
        return importe['iva'];
    }

    calcular.elIvaCobradoGastadoHastaElMes = function( data, anio, mesIndex )
    {
        //let importe = sumarImporteGeneradoEnElMes( data[getKeyAnio( anio )][meses[mesIndex - 1]] );
        let importe = sumarImporteGastadoDeAcuerdoAlAnioYHastaElMes( data, anio, mesIndex - 1 );
        return importe['iva'];
    }

    calcular.elIvaRetenidoHastaElMes = function( data, anio, mesIndex )
    {
        //let importe = sumarImporteGeneradoEnElMes( data[getKeyAnio( anio )][meses[mesIndex - 1]] );
        let importe = sumarImporteDeAcuerdoAlAnioYHastaElMes( data, anio, mesIndex - 1 );
        return importe['ivaretenido'];
    }

    calcular.elIvaRetenidoGastadoHastaElMes = function( data, anio, mesIndex )
    {
        //let importe = sumarImporteGeneradoEnElMes( data[getKeyAnio( anio )][meses[mesIndex - 1]] );
        let importe = sumarImporteGastadoDeAcuerdoAlAnioYHastaElMes( data, anio, mesIndex - 1 );
        return importe['ivaretenido'];
    }

    calcular.elIsrRetenidoHastaElMes = function( data, anio, mesIndex )
    {
        //let importe = sumarImporteGeneradoEnElMes( data[getKeyAnio( anio )][meses[mesIndex - 1]] );
        let importe = sumarImporteDeAcuerdoAlAnioYHastaElMes( data, anio, mesIndex - 1 );
        return importe['isrretenido'];
    }

    calcular.elIsrRetenidoGastadoHastaElMes = function( data, anio, mesIndex )
    {
        //let importe = sumarImporteGeneradoEnElMes( data[getKeyAnio( anio )][meses[mesIndex - 1]] );
        let importe = sumarImporteGastadoDeAcuerdoAlAnioYHastaElMes( data, anio, mesIndex - 1 );
        return importe['isrretenido'];
    }

    let sumarImporteDeAcuerdoAlAnioYHastaElMes = function( data, anio, mes )
    {
        let keyAnio = getKeyAnio( anio ); 
        if(data[keyAnio] === undefined) return -1;

        return hacerSumaPorAnioHastaElMes( data[keyAnio], mes );
    }

    let sumarImporteGastadoDeAcuerdoAlAnioYHastaElMes = function( data, anio, mes )
    {
        let keyAnio = getKeyAnio( anio ); 
        if(data[keyAnio] === undefined) return -1;

        return hacerSumaGastadoPorAnioHastaElMes( data[keyAnio], mes );
    }

    function hacerSumaEntreFacturas(sumaObjeto, objeto) 
    {
        sumaObjeto['cantidad'] += objeto['cantidad'];
        sumaObjeto['iva'] += objeto['iva'];
        sumaObjeto['ivaretenido'] += objeto['ivaretenido'];
        sumaObjeto['isrretenido'] += objeto['isrretenido'];

        return sumaObjeto;  
    }

    let sumarImporteGeneradoEnElMes = function( dataMes )
    {        
        let sumaObjeto = { cantidad: 0, iva: 0, ivaretenido: 0, isrretenido: 0 };
        dataMes['facturado']['recibido']['facturas'].forEach(function(objeto) 
        {            
            if(objeto['cantidad'] === '') return;
            sumaObjeto = hacerSumaEntreFacturas(sumaObjeto, objeto);
             
        }, this);

        return sumaObjeto;
    }

    let sumarImporteGastadoEnElMes = function( dataMes )
    {        
        let sumaObjeto = { cantidad: 0, iva: 0, ivaretenido: 0, isrretenido: 0 };
        dataMes['facturado']['gastado']['facturas'].forEach(function(objeto) 
        {            
            if(objeto['cantidad'] === '') return;
            sumaObjeto = hacerSumaEntreFacturas(sumaObjeto, objeto);
             
        }, this);

        return sumaObjeto;
    }

    calcular.elImporteGeneralTotalPorAnio = function( data, anio )
    {
        let importe = sumarImporteDeAcuerdoAlAnio( data, anio ); 
        return importe;
    }

    let sumarImporteDeAcuerdoAlAnio = function(data, anio )
    {        
        let keyAnio = getKeyAnio( anio );
        if(data[keyAnio] === undefined) return -1;

        return hacerSumaPorAnioHastaElMes( data[keyAnio], 11 )['cantidad'];
    }

    calcular.elIvaRetenidoPorAnio = function( data, anio )
    {
        return sumarIvaRetenidoDeAcuerdoAlAnio( data, anio );
    }

    let sumarIvaRetenidoDeAcuerdoAlAnio = function( data, anio )
    {
        let keyAnio = getKeyAnio( anio ); 
        if(data[keyAnio] === undefined) return -1;

        return hacerSumaPorAnioHastaElMes( data[keyAnio], 11 )['ivaretenido'];
    }

    calcular.elIvaCobradoPorAnio = function( data, anio )
    {
        return sumarIvaCobradoDeAcuerdoAlAnio( data, anio );
    }

    let sumarIvaCobradoDeAcuerdoAlAnio = function( data, anio )
    {
        let keyAnio = getKeyAnio( anio ); 
        if(data[keyAnio] === undefined) return -1;

        return hacerSumaPorAnioHastaElMes( data[keyAnio], 11 )['iva'];
    }

    calcular.elIsrRetenidoPorAnio = function( data, anio )
    {
        return sumarIsrRetenidoDeAcuerdoAlAnio( data, anio );
    }

    let sumarIsrRetenidoDeAcuerdoAlAnio = function( data, anio )
    {
        let keyAnio = getKeyAnio( anio ); 
        if(data[keyAnio] === undefined) return -1;

        return hacerSumaPorAnioHastaElMes( data[keyAnio], 11 )['isrretenido'];
    }    

    let hacerSumaPorAnioHastaElMes = function( dataAnio, mes )
    {
        let sumaObjeto = { cantidad: 0, iva: 0, ivaretenido: 0, isrretenido: 0 };

        for(var i = 0; i < meses.length; ++i)
        {
            let sumaObjetoMes = sumarImporteGeneradoEnElMes( dataAnio[meses[i]] ); 
            sumaObjeto = hacerSumaEntreFacturas(sumaObjeto, sumaObjetoMes);          
            if(mes === i) break;
        }

        return sumaObjeto;
    }

    let hacerSumaGastadoPorAnioHastaElMes = function( dataAnio, mes )
    {
        let sumaObjeto = { cantidad: 0, iva: 0, ivaretenido: 0, isrretenido: 0 };

        for(var i = 0; i < meses.length; ++i)
        {
            let sumaObjetoMes = sumarImporteGastadoEnElMes( dataAnio[meses[i]] ); 
            sumaObjeto = hacerSumaEntreFacturas(sumaObjeto, sumaObjetoMes);          
            if(mes === i) break;
        }

        return sumaObjeto;
    }

    let getKeyAnio = function( anio )
    {
        return 'fecha_' + String(anio);
    }

    root = this;
    if (root != null) {
      previous_async = root.calcular;
    }
    
    if (typeof module !== 'undefined' && module.exports) 
    { // Node.js
        module.exports = calcular;
    }    
    else if (typeof define !== 'undefined' && define.amd) 
    { // AMD / RequireJS
        define([], function () {
            return calcular;
        });
    }    
    else 
    { // included directly via <script> tag
        root.calcular = calcular;
    }    
})();