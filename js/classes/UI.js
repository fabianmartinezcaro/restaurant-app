import { containerPlatillos, secciones } from "../selectores.js";

export default class UI{

    mostrarPlatillos(platillos){
        platillos.forEach(platillo => {

            console.log(platillo)

            const {nombre, precio} = platillo

            containerPlatillos.innerHTML += `
                <div class="container">
                    <div class="row py-2 border-top">
                        <div class="col-md-4">
                            <h6 class="fw-bold">${nombre}</h6>
                        </div>
                        <div class="col-md-4">
                            <p><span class="fw-bold">Precio:</span> $${precio}</p>
                        </div>
                        <div class="col-md-4">
                            <input type="number" class="form-control" placeholder="Cantidad" />
                        </div>
                    </div>
                </div>
            `;
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