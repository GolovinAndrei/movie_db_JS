const BASE_URL_FOR_IMG = 'https://image.tmdb.org/t/p/w500';
export default class DetailsModal {

    #parentId;
    #callBackFn;
    #forwardFn;

    constructor(parentId, callBackFn, forwardFn) {
        this.#parentId = parentId;
        this.#callBackFn = callBackFn;
        this.#forwardFn = forwardFn;
    }

    getMovieDetails(data) {

        const detailSElement = document.getElementById(this.#parentId);
        detailSElement.hidden = false;
        detailSElement.innerHTML =

    `<div class="modalBackground" id="modalBackground">
        <div id="modal-window-id" class="modalActive">
            <h2>${data.original_title}</h2>
            <img src="${BASE_URL_FOR_IMG + data.backdrop_path}" class="movie-deatails-img">
            <div class="movie-deatails-list">
                <p class="movie-deatails-overview">${data.overview}</p>
                <p class="movie-deatails-popularity">Popularity rate: ${data.popularity}</p>
            </div>
            <div id="add-buttons-group-id" class="add-buttons">
                <button id = "add-favorite-button-id" class="details-button">Add to Favorite</button>
                <button id = "add-watching-button-id" class="details-button">Add to watching list</button>
            </div>
        </div>
    </div>`;

        const backGround = document.getElementById("modalBackground");
        backGround.onclick = (event) => {
            //event.preventDefault();
            if (event.target.id == "modalBackground"){
                detailSElement.hidden = true;
                //modal.style.display = 'none';
            }
        }

        const buttons = document.getElementById("add-buttons-group-id").children;
        const buttonsArray = Array.from(buttons);
        buttonsArray[0].addEventListener("click", async (event) => {
            event.preventDefault();
            if (localStorage.length != 0) {
            this.#addingMovieToArray('favorite', data.id);
            } else {
                this.#forwardFn(2);
            }
        });
        buttonsArray[1].addEventListener("click", async (event) => {
            event.preventDefault();
            if (localStorage.length != 0) {
            this.#addingMovieToArray('watching', data.id)
        } else {
            this.#forwardFn(2);
        }
        });
    }

    async #addingMovieToArray(nameArray, id) {
        const user = JSON.parse(localStorage.getItem('user'));
        user[nameArray].push(id);
        localStorage.setItem('user', JSON.stringify(user));
        const response = await this.#callBackFn(user);
        if (response.ok) {
            alert(`Movie has been added to ${nameArray == 'favorite' ? 'Favorite' : 'Watching list'}`)
        }
    }
}