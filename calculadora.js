/// ESTE CÓDIGO FUE CREADO POR Emmanuel Macías | Instagram: @emmanuemaciasok

/* VARIABLES GENERALES */
let TNAbruta = 0;
let PorcentajeComision = 0;
const miForm = document.getElementById("miForm");
const error = document.getElementById('error');

/* FUNCIÓN */
function calcular(){
    
/* DIFERENCIA ENTRE DÍAS */
    const tipoCheque = document.getElementById('tipoCheque').value;
    const fecha1 = new Date();
    const fecha2 = new Date(document.querySelector('#fechaVen').value);
    const diferencia = Math.abs(fecha2-fecha1);
    dias = Math.round(diferencia/(1000*3600*24)+1); /* Agrego 1 dia a la diferencia y redondeo */

    
/* VALIDA LOS DIAS Y APLICA PORCENTAJE DE TNA */

    if (dias <= 30){
        TNAbruta = 43.2;
    } else if (dias >= 31 && dias <= 60){
        TNAbruta = 42.8;
    } else if (dias >= 61 && dias <= 90){
        TNAbruta = 44.3;
    } else if (dias >= 91 && dias <= 120){
        TNAbruta = 44.76;
    } else if (dias >= 121 && dias <= 150){
        TNAbruta = 48.38;
    } else if (dias >= 151 && dias <= 180){
        TNAbruta = 45.29;
    } else if (dias >= 181 && dias <= 210){
        TNAbruta = 45.26;
    } else if (dias >= 211 && dias <= 240){
        TNAbruta = 42.58;
    } else if (dias >= 241 && dias <= 270){
        TNAbruta = 44.98;
    } else if (dias >= 271 && dias <= 300){
        TNAbruta = 47.08;
    } else if (dias >= 301 && dias <= 330){
        TNAbruta = 42;
    } else if (dias >= 330 && dias <= 365){
        TNAbruta = 47.41;
    }


/* VALIDA LOS DIAS Y TIPO DE CHEQUE - APLICA COMISION SGR */
    if  (tipoCheque == 'tercero' && dias <= 90){
        PorcentajeComision = 0.01;
    } else if (tipoCheque == 'propio' && dias <= 180 || tipoCheque == 'tercero' && dias <= 180){
        PorcentajeComision = 0.02;
    } else{
        PorcentajeComision = 0.04;
    }

/* VALIDA LOS CAMPOS VACIOS */
    
    if(miForm.tipoCheque.value==0){
        error.style.display='flex';
        document.getElementById('error').innerHTML = "Seleccione un tipo de cheque";
        miForm.tipoCheque.focus();
        return false;
    } else{
        error.style.display='none';
    }

    if(miForm.monto.value==0){
        error.style.display='flex';
        document.getElementById('error').innerHTML = "Ingrese el monto del cheque";
        miForm.monto.focus();
        return false;
    } else{
        error.style.display='none';
    }

    if(miForm.fechaVen.value==0){
        error.style.display='flex';
        document.getElementById('error').innerHTML = "Seleccione la fecha de vencimiento";
        miForm.fechaVen.focus();
        return false;
    } else{
        error.style.display='none';
    }
    
/* COMPRUEBA QUE LA FECHA ESTE SELECCIONADA Y EJECUTA CALCULO */

    if (fecha1 < fecha2 && PorcentajeComision != 0.04){
        

/* DECLARACIÓN DE MONTO */
    const UImonto = document.querySelector('#monto');
    const monto = parseFloat(UImonto.value);
    
    const contado = + monto / (1 + (TNAbruta/100) * dias / 365);
    const interesBruto = monto - contado;


/* DERECHOS */
    const mercado = 0.0003 * contado;
    const derCotizacion = 0.0003 * contado + 20;
    const totalDerechos = mercado + derCotizacion;

/* ARANCELES */
    const comBolsa = 0.01 / 365 * dias * monto;
    const ivaArancel = comBolsa * 0.21;
    const totalAranceles = comBolsa + ivaArancel;
    const totalFull = totalDerechos + totalAranceles;
    const costoTotal = totalFull + interesBruto;
    const costoNeto = contado - totalFull;
/*     let tnaNeta =  NO ESTA DECLARADA */

/* SUBTOTALES */
    const comisionSgr = (+ monto * PorcentajeComision) + (monto * PorcentajeComision);
    const cajaValores = monto * 0.002;
    const ivaSArancel = cajaValores * 0.21;

    netoFinal = costoNeto - comisionSgr - cajaValores - ivaSArancel;

    console.log(monto);
    console.log(dias);

  
    /* document.getElementById('neto-cobrar').innerHTML = costoNeto.toFixed(2); */
    document.getElementById('comision').innerHTML = (new Intl.NumberFormat('es-ES' , { style: 'currency', currency: 'ARS' })).format(comisionSgr);
    document.getElementById('caja-valores').innerHTML = (new Intl.NumberFormat('es-ES' , { style: 'currency', currency: 'ARS' })).format(cajaValores);
    document.getElementById('iva-sin-arancel').innerHTML = (new Intl.NumberFormat('es-ES' , { style: 'currency', currency: 'ARS' })).format(ivaSArancel); 
    document.getElementById('resultado').innerHTML = (new Intl.NumberFormat('es-ES' , { style: 'currency', currency: 'ARS' })).format(netoFinal);
    
    /* ir a otra pagina despues de ejecutar la funcion */
    /* location.href="http://127.0.0.1:5500/resultados.html" */


   /* Muestra RESULTADOS */
   
   let elemFirst = document.querySelector(".card__inner");
        
   elemFirst.classList.toggle('is-flipped');


    } else if (fecha1 < fecha2 && PorcentajeComision == 0.04){

        
/* DECLARACIÓN DE MONTO */
    const UImonto = document.querySelector('#monto');
    const monto = parseFloat(UImonto.value);
    
    const contado = + monto / (1 + (TNAbruta/100) * dias / 365);
    const interesBruto = monto - contado;


/* DERECHOS */
    const mercado = 0.0003 * contado;
    const derCotizacion = 0.0003 * contado + 20;
    const totalDerechos = mercado + derCotizacion;

/* ARANCELES */
    const comBolsa = 0.01 / 365 * dias * monto;
    const ivaArancel = comBolsa * 0.21;
    const totalAranceles = comBolsa + ivaArancel;
    const totalFull = totalDerechos + totalAranceles;
    const costoTotal = totalFull + interesBruto;
    const costoNeto = contado - totalFull;
/*     let tnaNeta =  NO ESTA DECLARADA */

/* COMISION SGR TNA */
    const SGR = monto * PorcentajeComision / 365 * dias;
    const FCcv = ((monto * 0.002) * 1.21);
    const comisionSgrTNA = (SGR + FCcv).toFixed(2);


    console.log(TNAbruta);
    console.log(comisionSgrTNA);

/* SUBTOTALES */
    const cajaValores = monto * 0.002;
    const ivaSArancel = cajaValores * 0.21;

    netoFinal = costoNeto - comisionSgrTNA - cajaValores - ivaSArancel;

    console.log(monto);
    console.log(dias);

  
    /* document.getElementById('neto-cobrar').innerHTML = costoNeto.toFixed(2); */
    document.getElementById('comision').innerHTML = (new Intl.NumberFormat('es-ES' , { style: 'currency', currency: 'ARS' })).format(comisionSgrTNA);
    document.getElementById('caja-valores').innerHTML = (new Intl.NumberFormat('es-ES' , { style: 'currency', currency: 'ARS' })).format(cajaValores);
    document.getElementById('iva-sin-arancel').innerHTML = (new Intl.NumberFormat('es-ES' , { style: 'currency', currency: 'ARS' })).format(ivaSArancel); 
    document.getElementById('resultado').innerHTML = (new Intl.NumberFormat('es-ES' , { style: 'currency', currency: 'ARS' })).format(netoFinal);
    
    /* ir a otra pagina despues de ejecutar la funcion */
    /* location.href="http://127.0.0.1:5500/resultados.html" */


   /* Muestra RESULTADOS */
   
   let elemFirst = document.querySelector(".card__inner");
        
   elemFirst.classList.toggle('is-flipped');

    } else{
        error.style.display='flex';
        document.getElementById('error').innerHTML = "La fecha de vencimiento no puede ser igual o anterior a la de HOY";
        miForm.fechaVen.focus();
        return false;
        
        /* alert('ERROR: Verifique la selección de fechas.') */
    }


}

/* RESETEA CALCULADORA Y DA VUELTA CARD */
function changeCss() {
    let elemFirst = document.querySelector(".card__inner");
    document.getElementById("miForm").reset();
    elemFirst.classList.toggle('is-flipped');
  }

