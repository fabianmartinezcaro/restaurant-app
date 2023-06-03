import { btnCrearOrden } from "../selectores.js";
import { guardarCliente } from "../funciones.js";

export default class App{

    constructor(){
        this.initApp();
    }

    initApp(){

        btnCrearOrden.addEventListener('click', guardarCliente)

    }

}