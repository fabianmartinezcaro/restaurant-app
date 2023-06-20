import { agregarPlatillo, cliente } from "../funciones.js";
import { containerPlatillos, contenido, resumen, secciones } from "../selectores.js";

const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres'
}

export default class UI{

    actualizarResumen(productos){

        const infoResumen = document.createElement('DIV');
        infoResumen.classList.add('col-md-6');

        const mesa = document.createElement('P');
        mesa.textContent = 'Mesa: ';
        mesa.classList.add('fw-bold');

        const mesaSpan = document.createElement('SPAN');
        mesaSpan.textContent = cliente.mesa;
        mesaSpan.classList.add('fw-normal');
        

        mesa.appendChild(mesaSpan)

        contenido.appendChild(mesa);

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