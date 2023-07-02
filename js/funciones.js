import UI from "./classes/UI.js";
import { obtenerValorMesa, obtenerValorHora, modalContent, formulario, contenido } from "./selectores.js";

const ui = new UI();

export let cliente = {
    mesa: '',
    hora: '',
    pedido: []
}

export function guardarCliente(evento){
    evento.preventDefault();

    const mesa = obtenerValorMesa();
    const hora = obtenerValorHora();

    const camposVacios = [mesa, hora].some(campo => campo === '');

    if(camposVacios){
        ui.mostrarAlerta(modalContent, 'Los campos son obligatorios', 'error');
        return;
    }

    // Asignamos los datos del formulario al objeto cliente
    cliente = {...cliente, mesa, hora}
    console.log(cliente)

    const modalBootstrap = bootstrap.Modal.getInstance(formulario);
    modalBootstrap.hide();

    ui.mostrarSecciones();

    obtenerPlatillos();

}

function obtenerPlatillos(){
    const URL = 'http://localhost:4000/platillos'

    fetch(URL)
        .then(respuesta => respuesta.json())
        .then(resultado => ui.mostrarPlatillos(resultado))

}


export function agregarPlatillo(producto){

    const {pedido} = cliente; 

    if(producto.cantidad > 0){

        // Comprobar si el producto existe en el array
        if(pedido.some(articulo => articulo.id === producto.id)){

            // Si el producto ya existe, solo actualizamos la cantidad en el objeto
            const pedidoActualizado = pedido.map(articulo => {
                if(articulo.id === producto.id){
                    articulo.cantidad = producto.cantidad;
                }
                return articulo;
            })

            cliente.pedido = [...pedidoActualizado];

        }else{

            cliente.pedido = [...pedido, producto];

        }

    }else{
        
        const resultado = pedido.filter(articulo => articulo.id !== producto.id);
        cliente.pedido = [...resultado]

    }

    ui.limpiarHTML(contenido);

    if(cliente.pedido.length){
        ui.actualizarResumen();
    }else{
        ui.mostrarAvisoVacio();
    }

}

export function eliminarPlatillo(id){
    const {pedido} = cliente;

    const nuevoPedido = pedido.filter(producto => producto.id !== id);
    cliente.pedido = [...nuevoPedido];

    ui.limpiarHTML(contenido);

    if(cliente.pedido.length){
        ui.actualizarResumen();
    }else{
        ui.mostrarAvisoVacio();
    }

    const productoEliminado = `#producto-${id}`;
    const inputEliminado = document.querySelector(productoEliminado);
    inputEliminado.value = 0;

}

export function calcularPropina(){

    const {pedido} = cliente;

    let subtotal = 0;

    // Calcular el subtotal a pagar
    pedido.forEach(producto => {
        subtotal += producto.cantidad * producto.precio;
    })

    // Seleccionar el radio button con la propina del cliente
    const propinaSeleccionada = document.querySelector('[name="propina"]:checked').value;

    // Calcular la propina
    const propina = ((subtotal * Number(propinaSeleccionada)) / 100);

    // Calcular el total a pagar
    const totalPagar = subtotal + propina;

    ui.mostrarTotal(propina, subtotal, totalPagar);
    

}

export function calcularSubtotal(cantidad, precio){
    return `${cantidad * precio}`;
}