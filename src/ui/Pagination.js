export default class Pagination{

    #parentElement;
    #callBackFn;
    #interval;
    #currentElement;
    

    constructor(parentElement, callBackFn){
        this.#parentElement = parentElement
        this.#callBackFn = callBackFn;
        this.#interval = 10;
        
    }

    
     addPagination(totalPages, currentPage=1){
        this.#parentElement.innerHTML = `<div id="${this.#parentElement.id}-pages">${this.#getPages(totalPages, currentPage)}</div>`;
        const allPageNumbers = document.querySelectorAll('.page-number');
        allPageNumbers.forEach(e=>e.addEventListener("click", (event)=>{
           // this.#currentElement.classList.remove('active');
            const pageElement = event.target;
            pageElement.classList.add('active');           
            this.#currentElement = pageElement;
            this.#callBackFn(pageElement.innerText);
         }));

         document.getElementById(`${this.#parentElement.id}-prev-id`).addEventListener('click', () => {
            this.#callBackFn(--currentPage);
         })

         document.getElementById(`${this.#parentElement.id}-next-id`).addEventListener('click', () => {
            this.#callBackFn(++currentPage);
         })

    }

     #getPages(totalPages, currentPage){
        currentPage = Number.parseInt(currentPage);
        const startIndex = currentPage <= 4 ? 1 : currentPage - 4;
        const finishIndex = currentPage <= 4 ? this.#interval : this.#interval + currentPage - 4;
        const firstIndex = startIndex > 1 ? `<a class="page-number">${1}</a>` : '';
        const previus = currentPage > 1 ? `<a id = "${this.#parentElement.id}-prev-id" class="page-number">Previus</a>` : 
                `<a id = "${this.#parentElement.id}-prev-id" class="page-number"></a>`;
        const res = [];
            for (let i =startIndex; i<=finishIndex; i++){
                res.push(`<a id="page-number-${i}" class="page-number">${i}</a>`)
        }

            return `${previus}
                    ${firstIndex}
                    ${res.join('')}
                    <a class="page-number">${totalPages}</a>
                    <a id = "${this.#parentElement.id}-next-id" class="page-number">Next</a>`;
        }

}

