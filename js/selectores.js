// FORMULARIO
export const formulario = document.querySelector('#formulario');

// INPUTS FORMULARIO
export function obtenerValorMesa() {
    return document.querySelector("#mesa").value;
  }
  
  export function obtenerValorHora() {
    return document.querySelector('#hora').value;
  }

// BOTONES FORMULARIO
export const btnCrearOrden = document.querySelector('#guardar-cliente');