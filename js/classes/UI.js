import {  } from "../funciones.js";
import { containerPlatillos, secciones } from "../selectores.js";

const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres'
}

export default class UI{

    mostrarPlatillos(platillos){
        platillos.forEach(platillo => {

            const {id, nombre, precio, categoria} = platillo

            const mainPlatillo = document.createElement('DIV');
            mainPlatillo.classList.add('row');

            const nombrePlatillo = document.createElement('DIV');
            nombrePlatillo.classList.add('col-md-2');
            nombrePlatillo.textContent = nombre;

            const precioPlatillo = document.createElement('DIV');
            precioPlatillo.classList.add('col-md-2');
            precioPlatillo.textContent = precio;
            
            containerPlatillos.appendChild(nombrePlatillo);

        });
    }

    mostrarSecciones(){
        secciones.forEach(seccion => seccion.classList.remove('d-none'));
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

}