export default class UI{

    mostrarAlerta(contenedor, mensaje, tipo){
        const alerta = document.createElement('p');
        alerta.textContent = mensaje;
        let condicionCumplida = false;

        if(tipo === 'error'){
            alerta.classList.add('bg-danger', 'py-2', 'mx-4', 'text-center', 'text-white');
            condicionCumplida = true;

        }else{
            alerta.classList.add('bg-success');
            condicionCumplida = true;
        }

        contenedor.appendChild(alerta)

        if(condicionCumplida){
            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }

    }

}