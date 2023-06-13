export default class RegistrationForm {

    #formElement;
    #parentElement;
    #forwardFn;

    constructor(parentId, forwardFn) {
        this.#parentElement = document.getElementById(parentId);
        this.#buildForm(parentId);
        this.#formElement = document.getElementById(`${parentId}-form-registration-id`);
        this.#forwardFn = forwardFn;
    }

    addHandler(submitFn) {
        this.#formElement.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(this.#formElement);
            const prifile = { login: formData.get('login'), password: formData.get('pass'), favorite: [], watching: [] };
            const res = await submitFn(prifile);
            this.#formElement.reset();
        };
    }

    #buildForm(parentId) {
        this.#parentElement.hidden = false;
        this.#parentElement.innerHTML =
            `<div class="modalBackground" id="modalBackground1">
                <div class="modalActive-reg">
                    <form id = "${parentId}-form-registration-id" class = "form-registration">
                    <h3>Registration form</h3>   
                        <div class = "row-input">
                            <p class="input-registration">
                                <label>Enter login</label>
                                <input id = "${parentId}-login-id" name="login" class = "registartion-data" required></input>
                            </p>
                            <p>
                                <label>Enter password</label>
                                <input id = "${parentId}-password-id" name = "pass" class = "registartion-data" required></input>
                            </p>
                            <button type = "submit" class="registartion-button">Registration</button>
                        </div>
                    </form>
                    <div class="modalWindow"></div>
                </div>
            </div>`

        const backGround = document.getElementById("modalBackground1");
        backGround.onclick = (event) => {
            if (event.target.id == "modalBackground1") {
                this.#parentElement.hidden = true;
                //modal.style.display = 'none';
                this.#forwardFn(0);
            }
        }
    }
}