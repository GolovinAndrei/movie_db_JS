
//const moviesDbUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=2&api_key=2c46288716a18fb7aadcc2a801f3fc6b'


export default class MoviePersistService {

#key;

    constructor(key){
        this.#key = key;
    }
   
    async getAllMovies(page=1) {
        const allMov = await fetch(this.#createUrl(page));
        return await allMov.json();
    
    }
    
    #createUrl(page) {
        return `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=${this.#key}`
    }

    async getMovieById (id){
        const urlForPartMovie = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${this.#key}`;
        const allMov = await fetch(urlForPartMovie);
        return await allMov.json();
    }



    
}