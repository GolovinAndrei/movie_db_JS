const ACTIVE = 'active'
export default class ApplicationBar {
    #buttons
    #sectionElements
    #activeIndex
    #callbackFn
    #parentElement

    constructor(parentId, sections, callbackFn) {
        this.#callbackFn = callbackFn;
        this.#parentElement = document.getElementById(parentId);
        this.#activeIndex = 0;
        this.#fillButtons(sections.map(s => s.title));
        this.#setSectionElements(sections.map(s => s.id));
        this.#addListeners();
        if (localStorage.length != 0) {
            this.#setSignInCondition()
        }

    }

    #fillButtons(titles) {
        this.#parentElement.innerHTML = titles.map((t) => `<button class="menu-button">${t}</button>`).join('');
        this.#buttons = this.#parentElement.childNodes;
        this.#buttons[4].hidden = true;

    }
    #setSectionElements(sectionIds) {
        this.#sectionElements = sectionIds.map(id => document.getElementById(id));
    }
    #addListeners() {
        this.#buttons.forEach((b, index) => b.addEventListener('click',
            this.#handler.bind(this, index)))
    }

    async #handler(index) {
        if (this.#activeIndex == undefined || index != this.#activeIndex || index==0) {
            if (this.#activeIndex != undefined) {
                this.#buttons[this.#activeIndex].classList.remove(ACTIVE);
                this.#sectionElements[this.#activeIndex].hidden = true;
            }
            this.#buttons[index].classList.add(ACTIVE);
            await this.#callbackFn(index);
            this.#sectionElements[index].hidden = false;
            this.#activeIndex = index;
        }
    }

    setWindow(index) {
        this.#handler(index);
    }

    #setSignInCondition() {
        this.#buttons[2].hidden = true;
        this.#buttons[3].hidden = true;
        this.#buttons[4].hidden = false;
        const login = JSON.parse(localStorage.getItem('user')).login;
        this.#parentElement.innerHTML += `<div id="${this.#parentElement.id}-user-label-id" class='user-label'>User: ${login}
    <button id="log-out-button-id" class="log-out-button">Log out</button></div>`
        const logOutButton = document.getElementById('log-out-button-id');
        logOutButton.addEventListener("click", async () => {
            if (confirm('Do you really want to log out?')) {
                localStorage.clear();
                this.#buttons[2].hidden = false;
                this.#buttons[3].hidden = false;
                this.#buttons[4].hidden = true;
                const logSectiom = document.getElementById(`${this.#parentElement.id}-user-label-id`)
                logSectiom.parentElement.removeChild(logSectiom); 
                await this.#handler(0);
            }
        });
        this.#addListeners();
    }

    signInActions() {
        if (localStorage.length != 0) {
            this.#setSignInCondition();
        }
    }



}