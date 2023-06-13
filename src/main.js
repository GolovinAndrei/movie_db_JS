import MoviePersistService from "./service/MoviesPersistSrvice.js";
import MainScreen from "./ui/MainScreen.js";
import barConfig from "./config/bar-config.json" assert{type: 'json'};
import accountConfig from "./config/account-page-config.json" assert{type: 'json'};
import ApplicationBar from "./ui/ApplicationBar.js";
import DetailsModal from "./ui/DetailsModal.js";
import Pagination from "./ui/Pagination.js";
import SearchForm from "./ui/SearchForm.js";
import Spinner from "./ui/Spinner.js";
import RegistrationForm from "./ui/RegistrationForm.js";
import ProfilePersistService from "./service/ProfilePersistService.js";
import AythenForm from "./ui/AuthenForm.js";
import DataGrid from "./ui/DataGrid.js";


const API_KEY = '2c46288716a18fb7aadcc2a801f3fc6b';


const spinner = new Spinner();
const parentElement = document.getElementById("movies-galery");
const childElements = Array.from(parentElement.children);
const menu = new ApplicationBar('menu-place', barConfig.sections, menuHandler);
const moviesPersistService = new MoviePersistService(API_KEY);
const profilePersistService = new ProfilePersistService();
const elementForSearcResult = document.getElementById("search-form-place")
const mainScreen = new MainScreen(childElements[0], getDetailsForMovie);
const detailsModal = new DetailsModal("movie-details-place", profilePersistService.updateProfile.bind(profilePersistService), menu.setWindow.bind(menu));
const pagination = new Pagination(childElements[1], rebuild);
const favoriteTable = new DataGrid("account-favorite-place", accountConfig.favoriteColumns, profilePersistService.updateProfile.bind(profilePersistService))
const watchingTable = new DataGrid("account-watching-place", accountConfig.watchingColumns, profilePersistService.updateProfile.bind(profilePersistService))
const genres = await moviesPersistService.getAllGenres();
const totalPages = mainScreen.buildCollection(await action(moviesPersistService.getAllMovies.bind(moviesPersistService)));
pagination.addPagination(totalPages);



async function menuHandler(index) {
    switch (index) {
        case 0: {
            const totalPages = mainScreen.buildCollection(await action(moviesPersistService.getAllMovies.bind(moviesPersistService)));
            pagination.addPagination(totalPages);
            break;
        }
        case 1: {
            const searchForm = new SearchForm("search-form-place", genres.genres);
            searchForm.addHandler(async (data) => {
                const searchResult = await moviesPersistService.getByParametrs(data);
                const totalPages = mainScreen.buildCollection(searchResult, elementForSearcResult);
                pagination.addPagination(totalPages);
                //menu.setWindow(1);
            });
            break;
        }
        case 2: {
            const authForm = new AythenForm("signIn-form-place", menu.setWindow.bind(menu));
            authForm.addHandler(async (data) => {
                const response = await profilePersistService.getProfileById(data.login);
                if (response.length != 0) {
                    if (response[0].password == data.password) {
                        localStorage.setItem('user', JSON.stringify(response[0]));
                        menu.setWindow(0);
                        menu.signInActions();
                    } else {
                        alert('Wrong password!')
                    }
                } else {
                    alert('User with such login not exist!')
                }
            })
            break;
        }
        case 3: {
            const regForm = new RegistrationForm('signUp-form-place', menu.setWindow.bind(menu));
            regForm.addHandler(async (profile) => {
                const check = await profilePersistService.getProfileById(profile.login);
                if (check.length == 0) {
                    const response = await profilePersistService.addProfile(profile);
                    if (response.ok) {
                        alert('New user has been added!');
                        menu.setWindow(0);
                    }
                } else {
                    alert("There is user with such login!")
                }
            })
            break;
        }
        case 4: {
            const user = JSON.parse(localStorage.getItem('user'));
            const favoriteMovies = await moviesPersistService.getAllMoviesByIds(user.favorite);
            favoriteMovies.forEach(movie => movie.genres = movie.genres.map(g => g.name));
            favoriteMovies.forEach(movie => movie.production_countries = movie.production_countries.map(c => c.name));
            favoriteTable.fillData(favoriteMovies, 'favorite');
            const watchingMovies = await moviesPersistService.getAllMoviesByIds(user.watching);
            watchingTable.fillData(watchingMovies, 'watching');
        }
    }
}


async function getDetailsForMovie(id) {
    const details = await moviesPersistService.getMovieById(id)
    detailsModal.getMovieDetails(details)
}

async function rebuild(page) {
    const total = (mainScreen.buildCollection(await action(moviesPersistService.getAllMovies.bind(moviesPersistService, page))));
    pagination.addPagination(total, page);
}

async function action(serviceFn) {
    spinner.start();
    const res = await serviceFn();
    spinner.stop();
    return res;
}