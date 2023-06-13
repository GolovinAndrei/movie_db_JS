
export default class SearchForm {

    #dataObject;
    #formElement;
    #parentElement;


    constructor(parentId, genres) {
        this.#parentElement = document.getElementById(parentId);
        this.#dataObject = {};
        this.#buildForm(parentId);
        this.#setElements(parentId);
        this.#setSelectYears(`${parentId}-year-id`);
        this.#setSelectGenres(`${parentId}-genre-id`, genres);
    }

    addHandler(submitFn) {
        this.#formElement.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(this.#formElement);
            this.#dataObject.name = formData.get('name');
            this.#dataObject.rateFrom = formData.get('rateFrom');
            this.#dataObject.rateTo = formData.get('rateTo');
            this.#dataObject.region = formData.get('region');
            this.#dataObject.year = formData.get('year');
            this.#dataObject.genre = formData.get('genre');
            await submitFn(this.#dataObject);
            this.#formElement.reset();
        };
    }

    #buildForm(parentId) {
        this.#parentElement.innerHTML =
            `<form id = "${parentId}-form-id" class = "form-controller">
            <div class = "row-input">
                <p>
                    <label>Name of the movie</label>
                    <input id = "${parentId}-name-id" name="name" class = "input-name"></input>
                </p>
                <p>
                    <label>Rate</label>
                    <input type="number" min=0 max=10 id = "${parentId}-rate-from-id" name = "rateFrom" class = "input-rate"></input>
                    <input type="number" min=0 max=10 id = "${parentId}-rate-to-id" name = "rateTo" class = "input-rate"></input>
                </p>
                <p>
                    <label>Region</label>
                    <input id = "${parentId}-region-id" name = "region" class = "input-region"></input>
                </p>
                <p class="p-year">
                    <label>Year</label>
                    <select id = "${parentId}-year-id" name="year" class = "select-control"></select>
                </p>
                <p class="p-genre">
                    <label>Genre</label>
                    <select id = "${parentId}-genre-id" name="genre" class = "select-control"></select>
                </p>
                <button type = "submit" class="submit-but">Search</button>
            </div>
        </form>`
    }

    #setElements(parentId) {
        this.#formElement = document.getElementById(`${parentId}-form-id`)
    }

    #setSelectYears(elementId) {
        const departElement = document.getElementById(elementId)
        departElement.innerHTML = `<option value hidden selected>--Select year--</option>`;
        departElement.innerHTML += this.#getYearRow().map(o => `<option value="${o}">${o}</option>`);
    }

    #setSelectGenres(elementId, dataRow) {
        const departElement = document.getElementById(elementId)
        departElement.innerHTML = `<option value hidden selected>--Select genre--</option>`;
        departElement.innerHTML += dataRow.map(o => `<option value="${o.id}">${o.name}</option>`);
    }

    #getYearRow() {
        const res = [];
        res.length = 100;
        return [...res].map((_, index) => 1924 + index);
    }

}
