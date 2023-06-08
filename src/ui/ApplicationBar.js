const ACTIVE = 'active'
export default class ApplicationBar {
    #buttons
    #sectionElements
    #activeIndex
    #callbackFn
    constructor(parentId, sections, callbackFn) {
        //sections - array of objects 
        //each object {title: string, id: string}
        this.#callbackFn = callbackFn;
        this.#fillButtons(parentId, sections.map(s => s.title));
        this.#setSectionElements(sections.map(s => s.id));
        this.#addListeners();


    }
    #fillButtons(parentId, titles) {
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = titles.map(t => `<button class="menu-button">${t}</button>`).join('');
        this.#buttons = parentElement.childNodes;
        this.#buttons.push
    }
    #setSectionElements(sectionIds) {
        this.#sectionElements = sectionIds.map(id => document.getElementById(id));
        this.#sectionElements.push(document.getElementById("movie-details-place"))
    }
    #addListeners() {
        this.#buttons.forEach((b, index) => b.addEventListener('click',
         this.#handler.bind(this, index)))
    }



    async #handler(index) {
        if (this.#activeIndex == undefined || index != this.#activeIndex) {
            if(this.#activeIndex != undefined) {
                 this.#buttons[this.#activeIndex].classList.remove(ACTIVE);
                 this.#sectionElements[this.#activeIndex].hidden = true;
            }
            this.#buttons[index].classList.add(ACTIVE);
            await this.#callbackFn(index);
            this.#sectionElements[index].hidden = false;
            this.#activeIndex = index;
        }
    }

    getActiveIndex(){
        return this.#activeIndex;
    }

}