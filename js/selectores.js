// FORMULARIO
export const formulario = document.querySelector('#formulario');
export const modalContent = document.querySelector('.modal-content form');

// SECCIONES OCULTAS
export const secciones = document.querySelectorAll('.d-none');
export const containerPlatillos = document.querySelector('#platillos .contenido');

// INPUTS FORMULARIO
export function obtenerValorMesa() {
    return document.querySelector("#mesa").value;
  }
  
  export function obtenerValorHora() {
    return document.querySelector('#hora').value;
  }

// BOTONES FORMULARIO
export const btnCrearOrden = document.querySelector('#guardar-cliente');

// RESUMEN DEL CONSUMO
export const resumen = document.querySelector('#resumen');
export const contenido = document.querySelector('#resumen .contenido');