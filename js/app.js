const ingresos = [
    new Ingreso('Salario',2100.00),
    new Ingreso('Venta de carro',1500.00)
];

const egreso = [
    new Egreso('Pago de renta',900.00),
    new Egreso('Ropa',400.00)
];

let cargarApp = ()=>{
    cargarCabezero();
    cargarIngresos();
    cargarEgresos();
};


let totalIngreso = () => {

    let totalIngreso = 0;

    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgreso = () => {
    let totalEgreso = 0;

    for(let egres of egreso){
        totalEgreso += egres.valor;
    }
    return totalEgreso;
}

let cargarCabezero = () => {

    let presupuesto = totalIngreso() - totalEgreso();
    let porcentajeEgreso = totalEgreso() / totalIngreso();

    document.getElementById('presupuesto').innerHTML =formatoMoneda(presupuesto);
    document.getElementById('Porcentaje').innerHTML = formatoPercentaje(porcentajeEgreso);
    document.getElementById('Ingresos').innerHTML = formatoMoneda(totalIngreso());
    document.getElementById('Egresos').innerHTML = formatoMoneda(totalEgreso());

};

const formatoMoneda = (valor) =>{
    return valor.toLocaleString('en-US',{style:'currency',currency: 'USD',minimumfractionDigits: 2});
}

const formatoPercentaje = (valor) => {
    return valor.toLocaleString('es-US',{style: 'percent' , minimumfractionDigits: 2});
}

const cargarIngresos = ()=>{

    let ingresosHTML = '';

    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }

    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (Ingreso) => {

    let ingresoHTML = `
         <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">
                        ${Ingreso.descripcion}
                    </div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(Ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn"><ion-icon name="close-circle-outline" onclick="eliminarIngreso(${Ingreso.idIngreso})"></ion-icon></button>
                        </div>
                    </div>
            </div>
    `;

    return ingresoHTML;
}

const cargarEgresos = () => {

    let EgresosHTML = '';

    for(let egres of egreso){
        EgresosHTML += cargarEgresosHTML(egres);
    }
    document.getElementById('lista-egresos').innerHTML = EgresosHTML;
}

const cargarEgresosHTML = (egreso) =>{
    let porcentaje = egreso.valor / totalEgreso();
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPercentaje(porcentaje)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline" onclick = "eliminarEgreso(${egreso.idEgreso})"></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;

    return egresoHTML;
}

const eliminarIngreso = (id) =>{
   
   let indiceEliminar = ingresos.findIndex(ingreso=>{ingreso.idIngreso === id});
  
   ingresos.splice(indiceEliminar,1);

   cargarCabezero();
   cargarIngresos();
}

const eliminarEgreso = (id) =>{

    let indiceEliminarEgreso = egreso.findIndex(egreso => {egreso.idEgreso === id});

    egreso.splice(indiceEliminarEgreso,1);
    cargarCabezero();
    cargarEgresos();
}

const agregarDato = () =>{

    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];

    if(descripcion.value != '' && valor.value != ''){
        if(tipo.value === 'ingreso'){

            ingresos.push(new Ingreso(descripcion.value,Number(valor.value)));//se puede usar el valor de + para convertir 
            cargarCabezero();
            cargarIngresos();
        }
        else if(tipo.value === 'egreso'){

            egreso.push(new Egreso(descripcion.value,Number(valor.value)));
            cargarCabezero();
            cargarEgresos();

        }
    }
}