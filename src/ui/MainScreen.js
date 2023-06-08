

const BASE_URL_FOR_IMG = 'https://image.tmdb.org/t/p/w500';

export default class MainScreen{

    #parentElement;
    #callBackfunc;
    #funcForListner;

    constructor(parentElement, callBackfunc, funcForListner, ){
        this.#callBackfunc = callBackfunc;
        this.#parentElement = parentElement;
        this.#funcForListner=funcForListner;
 
    }

   async buildMainCollection(page=1){
        const dataRow = await this.#callBackfunc(page);
        const movieAnchors = this.#buildMoviesAnchors(dataRow);
        this.#parentElement.innerHTML =`<ul id="${this.#parentElement.id}-list">${movieAnchors.join("")}</ul>`;
        const anchors = document.querySelectorAll(".movie-anchor");
        anchors.forEach(e=>e.addEventListener("click", (event)=>{
                    const id = event.target.parentNode.id;
                        this.#funcForListner(id);
                 }));
        return dataRow.total_pages;      
    }


#buildMoviesAnchors (dataRow) {
    return [...dataRow.results].map((data, index)=>`<li class="movie-item">
        <a class="movie-anchor" id="${data.id}" data-details-image="" data-details-text="">
            <img src="${BASE_URL_FOR_IMG+data.poster_path}" class="movie-image">
            <label class="thumbnails-title">${data.title}</label>
        </a>
    </li>`);
    
}

}