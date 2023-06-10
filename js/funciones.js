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

