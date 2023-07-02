import { agregarPlatillo, calcularSubtotal, cliente, eliminarPlatillo, calcularPropina } from "../funciones.js";
import { containerPlatillos, contenido, secciones } from "../selectores.js";

const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres'
}

export default class UI{

    actualizarResumen(){

        const resumen = document.createElement('DIV');
        resumen.classList.add('col-md-6', 'card', 'py-5', 'px-3', 'shadow');

        const heading = document.createElement('H3');
        heading.classList.add('my-2', 'text-center');
        heading.textContent = 'Resumen';

        // MESA
        const mesa = document.createElement('P');
        mesa.textContent = 'Mesa: ';
        mesa.classList.add('fw-bold');

        const mesaSpan = document.createElement('SPAN');
        mesaSpan.textContent = cliente.mesa;
        mesaSpan.classList.add('fw-normal');
    
        // HORA
        const hora = document.createElement('P');
        hora.textContent = 'Hora: ';
        hora.classList.add('fw-bold');

        const horaSpan = document.createElement('SPAN');
        horaSpan.textContent = cliente.hora;
        horaSpan.classList.add('fw-normal');

        // ITERAMOS SOBRE LOS PRODUCTOS
        const grupo = document.createElement('UL');
        grupo.classList.add('list-group');

        const {pedido} = cliente;

        pedido.forEach(producto => {

            const {id, nombre, cantidad, categoria, precio} = producto;

            const lista = document.createElement('LI');
            lista.classList.add('list-group-item');

            const nombreProducto = document.createElement('H6');
            nombreProducto.classList.add('my-4', 'fw-bold');
            nombreProducto.textContent = nombre;

            // CANTIDAD DEL PRODUCTO
            const cantidadProducto = document.createElement('P');
            cantidadProducto.innerHTML = `<span class="fw-bold">Cantidad: </span> ${cantidad}`;

            const categoriaProducto = document.createElement('P');
            categoriaProducto.textContent = categoria;

            const precioProducto = document.createElement('P');
            precioProducto.innerHTML = `<span class="fw-bold">Precio: $</span> ${precio}`;

            const subtotalProducto = document.createElement('P');
            subtotalProducto.innerHTML = `<span class="fw-bold">Subtotal: $</span> ${calcularSubtotal(cantidad, precio)}`;

            const buttonEliminar = document.createElement('BUTTON');
            buttonEliminar.classList.add('btn', 'btn-danger');
            buttonEliminar.textContent = 'Eliminar';
            buttonEliminar.onclick = function () {
                eliminarPlatillo(id);
            }


            // AGREGANDO LOS ELEMENTOS AL LI
            lista.appendChild(nombreProducto);
            lista.appendChild(cantidadProducto);
            lista.appendChild(categoriaProducto);
            lista.appendChild(precioProducto);
            lista.appendChild(subtotalProducto);
            lista.appendChild(buttonEliminar);

            // AGREGAR AL ELEMENTO PRINCIPAL
            grupo.appendChild(lista);

            // CREAR FORMULARIO DE PROPINAS
            this.formularioPropinas();

        })


        mesa.appendChild(mesaSpan)
        hora.appendChild(horaSpan)

        resumen.appendChild(heading);
        resumen.appendChild(mesa);
        resumen.appendChild(hora);
        resumen.appendChild(grupo);

        contenido.appendChild(resumen);
        
    }

    mostrarPlatillos(platillos){
        platillos.forEach(platillo => {

            const {id, nombre, precio, categoria} = platillo

            const mainPlatillo = document.createElement('DIV');
            mainPlatillo.classList.add('border-top', 'py-2')
            mainPlatillo.classList.add('row');

            const nombrePlatillo = document.createElement('DIV');
            nombrePlatillo.classList.add('col-md-3');
            nombrePlatillo.textContent = nombre;

            const precioPlatillo = document.createElement('DIV');
            precioPlatillo.classList.add('col-md-3');
            precioPlatillo.textContent = '$' + precio;

            const categoriaPlatillo = document.createElement('DIV');
            categoriaPlatillo.classList.add('col-md-3');
            categoriaPlatillo.textContent = categorias[categoria];

            const inputCantidad = document.createElement('INPUT');
            inputCantidad.classList.add('form-control');
            inputCantidad.value = 0;
            inputCantidad.min = 0;
            inputCantidad.type = 'number';
            inputCantidad.id = `producto-${id}`;

            inputCantidad.onchange = function () {
                const cantidad = parseInt(inputCantidad.value);
                agregarPlatillo({...platillo, cantidad});
            }

            const agregar = document.createElement('DIV');
            agregar.classList.add('col-md-2')
            agregar.appendChild(inputCantidad);
            
            mainPlatillo.appendChild(nombrePlatillo);
            mainPlatillo.appendChild(precioPlatillo);
            mainPlatillo.appendChild(categoriaPlatillo);
            mainPlatillo.appendChild(agregar);
            containerPlatillos.appendChild(mainPlatillo)

        });
    }

    formularioPropinas(){

        const formulario = document.createElement('DIV');
        formulario.classList.add('col-md-6', 'order-2', 'formulario');

        const divFormulario = document.createElement('DIV');
        divFormulario.classList.add('card', 'py-5', 'px-3', 'shadow');

        const heading = document.createElement('H3');
        heading.classList.add('my-2', 'text-center');
        heading.textContent = 'Propina';

        // PROPINA 10%
        const radio10 = document.createElement('INPUT');
        radio10.type = 'radio';
        radio10.name = 'propina';
        radio10.value = '10';
        radio10.classList.add('form-check-input');
        radio10.onclick = calcularPropina;

        const radio10Label = document.createElement('LABEL');
        radio10Label.textContent = '10%';
        radio10Label.classList.add('form-check-label');

        const radio10Div = document.createElement('DIV');
        radio10Div.classList.add('form-check');

        radio10Div.appendChild(radio10);
        radio10Div.appendChild(radio10Label);

        // PROPINA 25%
        const radio25 = document.createElement('INPUT');
        radio25.type = 'radio';
        radio25.name = 'propina';
        radio25.value = '25';
        radio25.classList.add('form-check-input');
        radio25.onclick = calcularPropina;

        const radio25Label = document.createElement('LABEL');
        radio25Label.textContent = '25%';
        radio25Label.classList.add('form-check-label');

        const radio25Div = document.createElement('DIV');
        radio25Div.classList.add('form-check');

        radio25Div.appendChild(radio25);
        radio25Div.appendChild(radio25Label);

        // PROPINA 50%
        const radio50 = document.createElement('INPUT');
        radio50.type = 'radio';
        radio50.name = 'propina';
        radio50.value = '50';
        radio50.classList.add('form-check-input');
        radio50.onclick = calcularPropina;

        const radio50Label = document.createElement('LABEL');
        radio50Label.textContent = '50%';
        radio50Label.classList.add('form-check-label');

        const radio50Div = document.createElement('DIV');
        radio50Div.classList.add('form-check');

        radio50Div.appendChild(radio50);
        radio50Div.appendChild(radio50Label);

        

        this.limpiarHTML(contenido)

        // AGREGAR AL DIV PRINCIPAL
        divFormulario.appendChild(heading);
        divFormulario.appendChild(radio10Div);
        divFormulario.appendChild(radio25Div);
        divFormulario.appendChild(radio50Div);

        formulario.appendChild(divFormulario);
        contenido.appendChild(formulario);

    }

    mostrarTotal(propina, subtotal, totalPagar){


        const divTotalPago = document.createElement('DIV')
        divTotalPago.classList.add('pt-4', 'total-pagar');

        // PROPINA
        const valorPropinaContainer = document.createElement('div');
        valorPropinaContainer.classList.add('row','pt-3', 'border-bottom');

        const valorPropinaLabel = document.createElement('label');
        valorPropinaLabel.classList.add('col', 'fw-bold');
        valorPropinaLabel.textContent = `Propina: `;

        const valorPropina = document.createElement('p');
        valorPropina.classList.add('col');
        valorPropina.textContent = '$ ' + propina;

        valorPropinaContainer.appendChild(valorPropinaLabel);
        valorPropinaContainer.appendChild(valorPropina);

        // SUBTOTAL
        const valorSubtotalContainer = document.createElement('div');
        valorSubtotalContainer.classList.add('row','pt-3', 'border-bottom');

        const valorSubtotalLabel = document.createElement('label');
        valorSubtotalLabel.classList.add('col', 'fw-bold');
        valorSubtotalLabel.textContent = `Subtotal: `;

        const valorSubtotal = document.createElement('p');
        valorSubtotal.classList.add('col');
        valorSubtotal.textContent = '$ ' + subtotal;

        valorSubtotalContainer.appendChild(valorSubtotalLabel);
        valorSubtotalContainer.appendChild(valorSubtotal);

        // TOTAL
        const valorTotalContainer = document.createElement('div');
        valorTotalContainer.classList.add('row', 'pt-3', 'border-bottom');

        const valorTotalLabel = document.createElement('label');
        valorTotalLabel.classList.add('col', 'fw-bold');
        valorTotalLabel.textContent = `Total a pagar: `;

        const valorTotal = document.createElement('p');
        valorTotal.classList.add('col');
        valorTotal.textContent = '$ ' + totalPagar;

        const totalPagarDiv = document.querySelector('.total-pagar');
        if(totalPagarDiv){
            totalPagarDiv.remove();
        }

        valorTotalContainer.appendChild(valorTotalLabel);
        valorTotalContainer.appendChild(valorTotal);

        divTotalPago.appendChild(valorPropinaContainer);
        divTotalPago.appendChild(valorSubtotalContainer);
        divTotalPago.appendChild(valorTotalContainer);

        const formulario = document.querySelector('.formulario > div')

        formulario.appendChild(divTotalPago);


    }

    mostrarSecciones(){
        secciones.forEach(seccion => seccion.classList.remove('d-none'));
    }

    mostrarAvisoVacio(){
        const aviso = document.createElement('P');
        aviso.classList.add('text-center');
        aviso.textContent = 'Agrega los productos al pedido';

        contenido.appendChild(aviso);
    
    }

    mostrarAlerta(contenedor, mensaje, tipo){

        let condicionCumplida = false;

        if(tipo === 'error'){

            const existeAlerta = document.querySelector('.invalid-feedback');
            
            if(!existeAlerta){
                const alerta = document.createElement('p');
                alerta.classList.add('invalid-feedback', 'd-block', 'text-center', 'border', 'border-danger', 'rounded', 'p-2');
                alerta.textContent = mensaje;
                condicionCumplida = true;
                contenedor.appendChild(alerta)

                if(condicionCumplida){
                    setTimeout(() => {
                        alerta.remove();
                    }, 3000);
                }

            }

        }

    }

    limpiarHTML(contenedor){
        while(contenedor.firstChild){
            contenedor.removeChild(contenedor.firstChild);
        }
    }

}