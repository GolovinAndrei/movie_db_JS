const BASE_URL_FOR_IMG = 'https://image.tmdb.org/t/p/w500';
export default class DetailsModal{

    #parentId;

    constructor(parentId){
        this.#parentId = parentId;
    }

    getMovieDetails (data){
        const detailSElement = document.getElementById(this.#parentId);
        detailSElement.hidden = false;
        detailSElement.innerHTML = 

        `<div class="modalBackground" id="modalBackground">
        <div class="modalActive">
            <img src="${BASE_URL_FOR_IMG+data.backdrop_path}">
            <ul>
                <li>${data.original_title}</li>
                <li>${data.overview}</li>
                <li>${data.popularity}</li>
            </ul>
            <div class="modalClose">
            </div>
            <div class="modalWindow"></div>
        </div>
    </div>`

        const modal = document.getElementById("modalBackground");
        
        modal.onclick = function() {
            detailSElement.hidden = true;
        }
   
        
    }

}