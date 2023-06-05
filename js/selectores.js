// FORMULARIO
export const formulario = document.querySelector('#formulario');
export const modalContent = document.querySelector('.modal-content form');

// INPUTS FORMULARIO
export function obtenerValorMesa() {
    return document.querySelector("#mesa").value;
  }
  
  export function obtenerValorHora() {
    return document.querySelector('#hora').value;
  }

// BOTONES FORMULARIO
export const btnCrearOrden = document.querySelector('#guardar-cliente');