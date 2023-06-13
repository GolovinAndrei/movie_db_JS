const BASE_URL_FOR_IMG = 'https://image.tmdb.org/t/p/w500';

export default class MainScreen {

    #parentElement;
    #funcForListner;

    constructor(parentElement, funcForListner) {
        this.#parentElement = parentElement;
        this.#funcForListner = funcForListner;
    }


    #buildMoviesAnchors(dataRow) {
        return [...dataRow.results].map((data) => `<li class="movie-item">
        <a class="movie-anchor" id="${data.id}" data-details-image="" data-details-text="">
            <img src="${BASE_URL_FOR_IMG + data.poster_path}" class="movie-image">
            <label class="thumbnails-title">${data.title}</label>
        </a>
    </li>`);
    }

    buildCollection(dataRow, parentElement = this.#parentElement) {
        const movieAnchors = this.#buildMoviesAnchors(dataRow);
        parentElement.innerHTML = `<ul id="${this.#parentElement.id}-list">${movieAnchors.join("")}</ul>`;
        const anchors = document.querySelectorAll(".movie-anchor");
        anchors.forEach(e => e.addEventListener("click", (event) => {
            const id = event.target.parentNode.id;
            this.#funcForListner(id);
        }));
        return dataRow.total_pages;
    }

}