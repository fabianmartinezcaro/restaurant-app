import UI from "./classes/UI.js";
import { obtenerValorMesa, obtenerValorHora, modalContent, formulario } from "./selectores.js";

const ui = new UI();

let cliente = {
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
        
        if(pedido.some(articulo => articulo.id === producto.id)){

            const pedidoActualizado = pedido.map(articulo => {

                if(articulo.id === producto.id){
                    articulo.cantidad = 0;
                }

                return articulo;

            })

            cliente.pedido = [...pedidoActualizado];
            

        }

    }

    ui.agregarAlResumen(cliente.pedido);

}