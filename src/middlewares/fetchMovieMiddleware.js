import MoviesSlice from "../redux/moviesSlice";

const actions = MoviesSlice.actions;

export const fetchMovieMiddleware = params => {
    return async function (dispatch) {
        try {
            dispatch(actions.movieLoading(true));
            const resp = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=67e809dff6e60e54b35062bc7d6519be&page=${params}`)
            const data = await resp.json();
            console.log(data, "data in fetchmoviemoddlware")
            dispatch(actions.movieData(data.results));

        } catch (error) {
            dispatch(actions.movieError());
            dispatch(actions.movieLoading(false));
        }
    }
}