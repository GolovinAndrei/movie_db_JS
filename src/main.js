import MoviePersistService from "./service/MoviesPersistSrvice.js";
import MainScreen from "./ui/MainScreen.js";
import barConfig from "./config/bar-config.json" assert{type: 'json'};
import ApplicationBar from "./ui/ApplicationBar.js";
import DetailsModal from "./ui/DetailsModal.js";
import Pagination from "./ui/Pagination.js";

const parentElement =  document.getElementById("movies-galery");
const childElements = Array.from(parentElement.children);

const menu = new ApplicationBar('menu-place', barConfig.sections, menuHandler);
const API_KEY = '2c46288716a18fb7aadcc2a801f3fc6b';
const moviesPersistService = new MoviePersistService(API_KEY);
const mainScreen = new MainScreen(childElements[0], moviesPersistService.getAllMovies.bind(moviesPersistService), getDetailsForMovie);
const detailsModal = new DetailsModal("movie-details-place");
const pagination = new Pagination(childElements[1], rebuild) //mainScreen.buildMainCollection.bind(mainScreen));
const totalPages = await mainScreen.buildMainCollection();
pagination.addPagination(totalPages);







// function getPages(){
//     const res = [];
//         for (let i =1; i<=3; i++){
//             res.push(`<a class="page-number">${i}</a>`)
//     }
//         return res.join('');
//     }
    
//     function addPagination(){
//         const element = childElements[1];
//         element.innerHTML += `<div id="${element.id}-pages">${getPages()}</div>`;
//         const allPageNumbers = document.querySelectorAll('.page-number');
//         allPageNumbers.forEach(e=>e.addEventListener("click", function(event){
//             const page = event.target.innerText;
//             mainScreen.buildMainCollection(page);
//          }));
    
//     }

//     addPagination("movies-galery");

//--------------------------------------------------------------------------------------------
async function menuHandler(index){
    switch (index){
        case 0: {
            // const employees = await action (companyService.getAllEmployees.bind(companyService));
            // employeeTable.fillData(employees, companyService.removeById.bind(companyService), openAndUpdate.bind(companyService));
            break;
        }
    
        case 1:{
   
            break; 
        }
        case 2:{
        
            break; 
        }
        case 3:{
       
            break; 
        }
    }
}


async function getDetailsForMovie(id){
    const details = await moviesPersistService.getMovieById(id)
    detailsModal.getMovieDetails(details);

}

async function rebuild (page){
    const total = await mainScreen.buildMainCollection(page);
    pagination.addPagination(total, page);
}