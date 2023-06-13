export default class DataGrid {
    #tBodyElement
    #keys
    #deleteFunc

    constructor(parentId, columns, deleteFunc) {
        this.#keys = columns.map(c => c.field);
        this.#buildTableHeader(parentId, columns.map(c => c.headerName));
        this.#deleteFunc = deleteFunc;

    }
    fillData(rowsData, type) {
        this.#tBodyElement.innerHTML = rowsData.map(rd => this.#getRow(rd)).join('');
        const deleteButtons = document.querySelectorAll(".remove-button");
        deleteButtons.forEach(b => b.addEventListener("click", async (event) => {
            const row = event.target.parentElement.parentElement;
            const movieId = row.id;
            if (confirm(`Delete?`)) {
                row.parentElement.removeChild(row);
                this.#removeMovieFromArray(movieId, type);
            }
        }))
    }

    #getRow(obj) {
        return `<tr id=${obj.id}>
                   ${this.#keys.map(key => `<td>${obj[key]}</td>`).join('')}
                   <td><button class="remove-button">remove</button></td>
                 </tr>`
    }

    insertRow(obj) {
        this.#tBodyElement.innerHTML += this.#getRow(obj)
    }

    #buildTableHeader(parentId, columnNames) {
        const tableSectionElement = document.getElementById(parentId);
        tableSectionElement.innerHTML =
            `<table>
            <thead>
               <tr>
                   ${columnNames.map(headerName => `<th>${headerName}</th>`).join('')}
               </tr>
            </thead>
            <tbody id="${parentId}-table" >
            </tbody>
          </table>`
        this.#tBodyElement = document.getElementById(parentId + "-table")
    }
    clearTable() {
        this.#tBodyElement.innerHTML = '';
    }

    #removeMovieFromArray(movieId, type) {
        const user = JSON.parse(localStorage.getItem('user'));
        const arr = user[type];
        arr.splice(arr.indexOf(movieId), 1);
        localStorage.setItem('user', JSON.stringify(user));
        this.#deleteFunc(user);
    }
}