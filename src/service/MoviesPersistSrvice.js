
export default class MoviePersistService {

    #key;

    constructor(key) {
        this.#key = key;
    }

    async getAllMovies(page = 1) {
        const urlForAllMovies = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=${this.#key}`
        return this.#getFromUrl(urlForAllMovies)

    }

    async getMovieById(id) {
        const urlForPartMovie = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${this.#key}`;
        return this.#getFromUrl(urlForPartMovie)
    }

    async getAllGenres() {
        const urlForAllGenres = `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${this.#key}`;
        return this.#getFromUrl(urlForAllGenres)
    }

    async getByParametrs(data, page = 1) {
        const urlByPrametrs = `https://api.themoviedb.org/3/search/movie?query=${data.name}&language=en-US&page=${page}&region=${data.region}&year=${data.year}&api_key=${this.#key}`;
        let searcRes = await this.#getFromUrl(urlByPrametrs);
        if (data.genre!=""|| data.rateFrom!="" || data.rateTo!=""){
            searcRes = this.#filterByRateAndGenre(searcRes, data);
        }
        return searcRes;
    }

    async #getFromUrl(url) {
        try {
            const res = await fetch(url);
            return await res.json();
        } catch (err) {
            alert(err);
        }
    }

   async getAllMoviesByIds(ids){
        const res =[];
        const idsSet= new Set(ids);
        for (const item of idsSet){
            const movie = await this.getMovieById(item);
            res.push(movie);
        }
        return res;
    }


    #filterByRateAndGenre(dataRow, params) {
        const res = dataRow.results.filter(data => {
            let res = true;
            if (params.rateFrom != "" && data.vote_average < params.rateFrom) {
                res = false;
            } else if (params.rateTo != "" && data.vote_average > params.rateTo) {
                res = false;
            } else if (params.genre != "" && !data.genre_ids.includes(+params.genre)) {
                res = false
            }
            return res;
        })
        dataRow.results = res;
        return dataRow;
    }



}