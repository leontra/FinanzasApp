var assert = require('assert');

describe('Hacer el calculo para obtener las cantidades necesarias en un mes determinado, ', function () {
    
    describe('Recibido ', function( ) 
    {
    
        it('Calcular el importe total de un solo mes , ', function( ) 
        {                    
            var registros = require('../app_test/registros.js');                                    
            var calcular = require('../app/calcular.js');

            let importe = calcular.elImporteGeneradoDelMes( registros.data, '2015', 5 );
            assert.equal(importe, 150);
        });
        
        it('Calcular el iva cobrado de un solo mes , ', function( ) 
        {                    
            var registros = require('../app_test/registros.js');                                    
            var calcular = require('../app/calcular.js');

            let importe = calcular.elIvaCobradoDelMes( registros.data, '2015', 5 );
            assert.equal(importe, 35);
        });
        
        it('Calcular el iva retenido de un solo mes , ', function( ) 
        {                    
            var registros = require('../app_test/registros.js');                                    
            var calcular = require('../app/calcular.js');

            let importe = calcular.elIvaRetenidoDelMes( registros.data, '2015', 5 );
            assert.equal(importe, 15);
        });
        
        it('Calcular el isr retenido de un solo mes , ', function( ) 
        {                    
            var registros = require('../app_test/registros.js');                                    
            var calcular = require('../app/calcular.js');

            let importe = calcular.elIsrRetenidoDelMes( registros.data, '2015', 5 );
            assert.equal(importe, 10);
        });

        it('Calcular el importe total hasta un determinado mes , ', function( ) 
        {                    
            var registros = require('../app_test/registros.js');                                    
            var calcular = require('../app/calcular.js');

            let importe = calcular.elImporteGeneradoHastaElMes( registros.data, '2015', 5 );
            assert.equal(importe, 550);
        });

        it('Calcular el iva cobrado hasta un determinado mes , ', function( ) 
        {                    
            var registros = require('../app_test/registros.js');                                    
            var calcular = require('../app/calcular.js');

            let importe = calcular.elIvaCobradoHastaElMes( registros.data, '2015', 5 );
            assert.equal(importe, 115);
        });

        it('Calcular el iva retenido hasta un determinado mes , ', function( ) 
        {                    
            var registros = require('../app_test/registros.js');                                    
            var calcular = require('../app/calcular.js');

            let importe = calcular.elIvaRetenidoHastaElMes( registros.data, '2015', 5 );
            assert.equal(importe, 55);
        });

        it('Calcular el isr retenido hasta un determinado mes , ', function( ) 
        {                    
            var registros = require('../app_test/registros.js');                                    
            var calcular = require('../app/calcular.js');

            let importe = calcular.elIsrRetenidoHastaElMes( registros.data, '2015', 5 );
            assert.equal(importe, 30);
        });

    });

    describe('Gastado ', function( ) 
    {
        it('Calcular el importe total de un solo mes , ', function( ) 
        {                    
            var registros = require('../app_test/registros.js');                                    
            var calcular = require('../app/calcular.js');

            let importe = calcular.elImporteGastadoDelMes( registros.data, '2015', 5 );
            assert.equal(importe, 40);
        });
        
        it('Calcular el iva gastado de un solo mes , ', function( ) 
        {                    
            var registros = require('../app_test/registros.js');                                    
            var calcular = require('../app/calcular.js');

            let importe = calcular.elIvaGastadoDelMes( registros.data, '2015', 5 );
            assert.equal(importe, 10);
        });
        
        it('Calcular el iva retenido de un solo mes , ', function( ) 
        {                    
            var registros = require('../app_test/registros.js');                                    
            var calcular = require('../app/calcular.js');

            let importe = calcular.elIvaGastadoRetenidoDelMes( registros.data, '2015', 5 );
            assert.equal(importe, 6);
        });
        
        it('Calcular el isr retenido de un solo mes , ', function( ) 
        {                    
            var registros = require('../app_test/registros.js');                                    
            var calcular = require('../app/calcular.js');

            let importe = calcular.elIsrGastadoRetenidoDelMes( registros.data, '2015', 5 );
            assert.equal(importe, 4);
        });

        it('Calcular el importe total hasta un determinado mes , ', function( ) 
        {                    
            var registros = require('../app_test/registros.js');                                    
            var calcular = require('../app/calcular.js');

            let importe = calcular.elImporteGastadoHastaElMes( registros.data, '2015', 5 );
            assert.equal(importe, 120);
        });

        it.only('Calcular el iva cobrado hasta un determinado mes , ', function( ) 
        {                    
            var registros = require('../app_test/registros.js');                                    
            var calcular = require('../app/calcular.js');

            let importe = calcular.elIvaCobradoGastadoHastaElMes( registros.data, '2015', 5 );
            assert.equal(importe, 30);
        });

        it.only('Calcular el iva retenido hasta un determinado mes , ', function( ) 
        {                    
            var registros = require('../app_test/registros.js');                                    
            var calcular = require('../app/calcular.js');

            let importe = calcular.elIvaRetenidoGastadoHastaElMes( registros.data, '2015', 5 );
            assert.equal(importe, 18);
        });

        it.only('Calcular el isr retenido hasta un determinado mes , ', function( ) 
        {                    
            var registros = require('../app_test/registros.js');                                    
            var calcular = require('../app/calcular.js');

            let importe = calcular.elIsrRetenidoGastadoHastaElMes( registros.data, '2015', 5 );
            assert.equal(importe, 12);
        });
        
    });

});

describe('Hacer el calculo para obtener las cantidades necesarias para realizar una declaración en un año, ', function () {
    
    it('Calcular el importe total generado (solo lo que se cobró de los servicios) , ', function( ) 
    {                    
        var registros = require('../app_test/registros.js');                                    
        var calcular = require('../app/calcular.js');
        assert.equal(typeof registros.data['fecha_2015'], 'object');

        let importe = calcular.elImporteGeneralTotalPorAnio( registros.data, '2015' );
        assert.equal(importe, 1250);
    });
    
    it('Calcular el iva cobrado , ', function( ) 
    {                    
        var registros = require('../app_test/registros.js');                                    
        var calcular = require('../app/calcular.js');
        assert.equal(typeof registros.data['fecha_2015'], 'object');

        let importe = calcular.elIvaCobradoPorAnio( registros.data, '2015' );
        assert.equal(importe, 255);
    });
    
    it('Calcular el iva retenido , ', function( ) 
    {                    
        var registros = require('../app_test/registros.js');                                    
        var calcular = require('../app/calcular.js');
        assert.equal(typeof registros.data['fecha_2015'], 'object');

        let importe = calcular.elIvaRetenidoPorAnio( registros.data, '2015' );
        assert.equal(importe, 125);
    });
    
    it('Calcular el isr retenido , ', function( ) 
    {                    
        var registros = require('../app_test/registros.js');                                    
        var calcular = require('../app/calcular.js');
        assert.equal(typeof registros.data['fecha_2015'], 'object');

        let importe = calcular.elIsrRetenidoPorAnio( registros.data, '2015' );
        assert.equal(importe, 65);
    });

});

var TEST_SCOPE = TEST_SCOPE || {};

TEST_SCOPE.nuevaPlantilla = function() { }