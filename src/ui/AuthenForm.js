export default class AuthenForm {

    #dataObject;
    #formElement;
    #parentElement;
    #forwardFn;

    constructor(parentId, forwardFn) {
        this.#parentElement = document.getElementById(parentId);
        this.#dataObject = {};
        this.#buildForm(parentId);
        this.#formElement = document.getElementById(`${parentId}-form-registration-id`);
        this.#forwardFn = forwardFn;
    }

    addHandler(submitFn) {
        this.#formElement.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(this.#formElement);
            this.#dataObject.login = formData.get('login');
            this.#dataObject.password = formData.get('pass');
            const res = await submitFn(this.#dataObject);
            this.#formElement.reset();
        };
    }

    #buildForm(parentId) {
        this.#parentElement.hidden = false;
        this.#parentElement.innerHTML =
            `<div class="modalBackground" id="modalBackground">
                <div class="modalActive-reg">
                    <form id = "${parentId}-form-registration-id" class = "form-registration">
                    <h3>LogIn form</h3>    
                    <div class = "row-input">
                            <p>
                                <input id = "${parentId}-login-id" name="login" class = "registartion-data" placeholder="login" required></input>
                            </p>
                            <p>
                                <input id = "${parentId}-password-id" name = "pass" type="password" class = "registartion-data" placeholder="password" required></input>
                            </p>
                            <button type = "submit" class="registartion-button">Sign In</button>
                        </div>
                    </form>
                    <div class="modalWindow"></div>
                </div>
            </div>`

        const backGround = document.getElementById("modalBackground");
        backGround.onclick = (event) => {
            if (event.target.id == "modalBackground") {
                this.#parentElement.hidden = true;
                this.#forwardFn(0);
            }
        }

    }

}