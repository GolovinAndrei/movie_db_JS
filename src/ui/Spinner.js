export default class Spinner {

    #spinnerElement;

    constructor(){
        this.#spinnerElement = document.getElementById('spinner');
        this.#spinnerElement.hidden=true;
    }

    start(){
        this.#spinnerElement.hidden = false;
    }

    stop(){
        this.#spinnerElement.hidden = true;
    }
}