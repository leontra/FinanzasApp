define(function () 
{
    this.jsonData = {};

    let subTotalPorMes = 0;
    let totalPorMes = 0;

    let subTotalPorAnio = 0;
    let totalPorAnio = 0;

    this.Initialize = e =>
    {
        let cantidadInputs = document.getElementsByClassName('iCantidad');

        var form = document.getElementById('FinanzasForm');
        form.addEventListener('submit', OnFormSubmit);

        obtenerInformacion();
    }

    let obtenerInformacion = () =>
    {
        let httpRequest = require('./request');
        httpRequest.ObtenerJSONData('registros', OnHttpRequestObtenerDone);
    }

    let OnHttpRequestObtenerDone = data =>
    {
        this.jsonData = data;
        let anios = ['2013', '2014', '2015', '2016'];
        let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

        for(var i = 0; i < anios.length; ++i)
        {
            let anioProperty = 'fecha_' + anios[i];
            if(this.jsonData[anioProperty] === undefined)
                continue;

            let div = document.createElement('div');
            div.appendChild(nuevoObjetoConTexto("Año: " + anios[i]), 'anio-text');
            document.getElementById('resultados').appendChild(div);

            subTotalPorAnio = 0;
            totalPorAnio = 0;            

            for(var j = 0; j < meses.length; ++j)
            {
                let mesProperty = meses[j];
                if(this.jsonData[anioProperty][mesProperty] === undefined)
                    continue;

                agregarDivConElContenidoFacturadoPorMes(meses[j], this.jsonData[anioProperty][mesProperty].facturado);
            }

            div.appendChild(nuevoObjetoConTexto("Subtotal: " + subTotalPorAnio), 'total-text-anio');
            div.appendChild(nuevoObjetoConTexto("Total: " + totalPorAnio), 'total-text-anio');
        }
    }    

    let agregarDivConElContenidoFacturadoPorMes = (mes, facturadoObject) =>
    {                
        subTotalPorMes = 0;
        totalPorMes = 0;

        let div = document.createElement('div');
        div.classList.add('facturas-mes');

        div.appendChild(nuevoObjetoConTexto("Mes: " + mes, 'mes-text'));

        div = obtenerValoresFacturadosDeTipo('recibido', facturadoObject, div);
        div = obtenerValoresFacturadosDeTipo('gastado', facturadoObject, div);

        let container = document.getElementById('resultados');

        totalPorAnio += totalPorMes;
        subTotalPorAnio += subTotalPorMes;

        container.appendChild(div);
        container.appendChild(nuevoObjetoConTexto("Subtotal: " + subTotalPorMes, 'total-mes-text'));
        container.appendChild(nuevoObjetoConTexto("Total: " + totalPorMes, 'total-mes-text'));
    }

    let obtenerValoresFacturadosDeTipo = (tipo, facturadoObject, div) =>
    {
        div.appendChild(nuevoObjetoConTexto(tipo, 'mes-tipo-text'));

        for(var l = 0; l < facturadoObject[tipo]['facturas'].length; ++l)
        {
            let facturaObject = facturadoObject[tipo]['facturas'][l];     

            if(facturaObject.cantidad === "")
                continue;    

            let propiedades = ['cantidad', 'iva', 'ivaretenido', 'isrretenido'];

            for(var k = 0; k < propiedades.length; ++k)
                div.appendChild(nuevoObjetoConTexto(facturaObject[propiedades[k]], 'contenido-text'));

            let subTotal = Number(facturaObject.cantidad) + Number(facturaObject.iva);
            let ivaRetenido = Number(facturaObject.ivaretenido);
            let isrRetenido = Number(facturaObject.isrretenido);
            let totalFactura = subTotal - ivaRetenido - isrRetenido;

            if(tipo === 'recibido')
            {
                subTotalPorMes += subTotal;
                totalPorMes += totalFactura;
            }
            else if(tipo === 'gastado')
            {
                subTotalPorMes -= subTotal;
                totalPorMes -= totalFactura;                
            }

            div.appendChild(nuevoObjetoConTexto("Subtotal: " + subTotal, 'total-text'));
            div.appendChild(nuevoObjetoConTexto("Total: " + totalFactura, 'total-text'));

            div.appendChild(nuevoObjetoConTexto(facturaObject['idfactura'], 'folio-text'));
                            
        }

        return div;
    }

    let nuevoObjetoConTexto = (texto, clase) =>
    {
        let pObjeto = document.createElement('p');
        pObjeto.innerHTML = texto;
        pObjeto.classList.add(clase);
        return pObjeto;   
    }

    let OnFormSubmit = evento =>
    {
        console.log('submit');
        evento.preventDefault();

        agregarInformacionAlRegistro();

        return false;
    }

    let agregarInformacionAlRegistro = () =>
    {         

        let ano = obtenerAno();
        if(!ano) return;
        
        let anoProperty = 'fecha_' + String(ano); 
        if(this.jsonData[anoProperty] === undefined)
            this.jsonData[anoProperty] = {};

        let mes = obtenerMes();
        if(!mes) return;

        let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        let mesProperty = meses[mes - 1];

        this.jsonData[anoProperty][mesProperty] = {};

        let objeto = {};
        objeto.facturado = {};
        objeto.facturado.recibido = obtenerFacturasRecibidas(); 
        objeto.facturado.gastado = obtenerFacturasGastadas(); 

        this.jsonData[anoProperty][mesProperty] = objeto;

        salvarInformacion();
    }

    let salvarInformacion = s =>
    {
        let httpRequest = require('./request');
        httpRequest.colocarJSONData('ActualizarData', OnHttpRequestFinishes, this.jsonData);
    }    

    let OnHttpRequestFinishes = data =>
    {
        console.log(data);
        if(data.status === 1)
        {
            alert('Informacion actualizada');
            location.reload();
        }
    }

    let obtenerAno = () =>
    {
        var anoElement = document.getElementById('iAno');
        var ano = Number(anoElement.options[anoElement.selectedIndex].value);
        if(ano == 0)
            return terminarFuncionConError('Favor de elegir un año');

        return ano;
    }

    let obtenerMes = () =>
    {
        var mesElement = document.getElementById('iMes');
        var mes = Number(mesElement.options[mesElement.selectedIndex].value);
        if(mes == 0)
            return terminarFuncionConError('Favor de elegir un mes');

        return mes;
    }

    let obtenerFacturasRecibidas = () =>
    {
        var modelo = {};
        modelo.facturas = [];        
        
        let group = document.getElementById('groupRecibido');    
        for(var i = 3; i < group.childNodes.length - 2; i += 2)    
            modelo.facturas.push(getFacturaDeSeccion(group.childNodes[i]));      

        return modelo;  
    }

    let obtenerFacturasGastadas = () =>
    {
        var modelo = {};
        modelo.facturas = [];        
        
        let group = document.getElementById('groupGastado');    
        
        for(var i = 3; i < group.childNodes.length - 2; i += 2)    
            modelo.facturas.push(getFacturaDeSeccion(group.childNodes[i]));      

        return modelo;  
    }

    let getFacturaDeSeccion = seccion =>
    {
        var modelo = {};
        modelo.cantidad = getInputChildValue(seccion, 1);
        modelo.iva = getInputChildValue(seccion, 3);
        modelo.ivaretenido = getInputChildValue(seccion, 5);
        modelo.isrretenido = getInputChildValue(seccion, 7);
        modelo.idfactura = getInputChildValue(seccion, 9);

        return modelo;
    }

    let getInputChildValue = (seccion, index) =>
    {
        return seccion.childNodes[index].childNodes[1].value;
    }

    let terminarFuncionConError = mensaje =>
    {
        alert(mensaje);
        return false;
    }

    /*let OnCantidadInputChange = evento => 
    {
        var cantidad = Number(evento.target.value);
        var padre = evento.target.parentNode.parentNode;
        setIvaValue(padre, cantidad);        
    }

    let setIvaValue = (padre, cantidad) =>
    {
        var iva = padre.childNodes[3].childNodes[1];
        var ivaValue = (cantidad * 16) / 100;  
        
        iva.value = ivaValue;
    }

    let setIsrValue = (padre, cantidad) =>
    {
        var isr = padre.childNodes[5].childNodes[1];
        var isrValue = (cantidad * 16) / 100;  
        
        isr.value = isrValue;
    }*/

    return this;
});