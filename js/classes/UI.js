import { agregarPlatillo, calcularSubtotal, cliente, eliminarPlatillo } from "../funciones.js";
import { containerPlatillos, contenido, secciones } from "../selectores.js";

const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres'
}

export default class UI{

    actualizarResumen(){

        const resumen = document.createElement('DIV');
        resumen.classList.add('col-md-12', 'card', 'py-5', 'px-3', 'shadow');

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

        })


        mesa.appendChild(mesaSpan)
        hora.appendChild(horaSpan)

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