import UI from "./classes/UI.js";
import { obtenerValorMesa, obtenerValorHora } from "./selectores.js"

const ui = new UI();

const cliente = {
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
        ui.mostrarAlerta();
    }else{
        ui.mostrarAlerta();
    }

}