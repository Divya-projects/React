import React, { useEffect, useState, useContext } from "react";
import Pagination from './Pagination'
import MovieCard from "./MovieCard";
import axios from 'axios'
import { WatchListContext } from "../contexts/WatchListContext";
import paginationSlice from "../redux/paginationSlice";
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovieMiddleware } from '../middlewares/fetchMovieMiddleware';
import moviesSlice from '../redux/moviesSlice';

const Movies = () => {
    // static data
    // const [ movies, setMovies ] = useState([
    //     // {
    //     //     url : 'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/03The-Batman-Filming-Locations-Movie-Gotham-SR.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5',
    //     //     title : "Dark Knight"
    //     // },
    //     {
    //         url : 'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/03/The-Batman-Filming-Locations-Movie-Gotham-SR.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5',
    //         title : "Jawan"
    //     },
    //     {
    //         url : 'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/03/The-Batman-Filming-Locations-Movie-Gotham-SR.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5',
    //         title : "Jawan"
    //     },
    //     {
    //         url : 'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/03/The-Batman-Filming-Locations-Movie-Gotham-SR.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5',
    //         title : "Jawan"
    //     },
    //     {
    //         url : 'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/03/The-Batman-Filming-Locations-Movie-Gotham-SR.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5',
    //         title : "Jawan"
    //     },
    //     {
    //         url : 'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/03/The-Batman-Filming-Locations-Movie-Gotham-SR.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5',
    //         title : "Jawan"
    //     },
    //     {
    //         url : 'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/03/The-Batman-Filming-Locations-Movie-Gotham-SR.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5',
    //         title : "Jawan"
    //     },
    //     {
    //         url : 'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/03/The-Batman-Filming-Locations-Movie-Gotham-SR.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5',
    //         title : "Jawan"
    //     },
    //     {
    //         url : 'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/03/The-Batman-Filming-Locations-Movie-Gotham-SR.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5',
    //         title : "Jawan"
    //     },
    //     {
    //         url : 'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/03/The-Batman-Filming-Locations-Movie-Gotham-SR.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5',
    //         title : "Joker"
    //     },
    //     {
    //         url : 'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/03/The-Batman-Filming-Locations-Movie-Gotham-SR.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5',
    //         title : "Batman"
    //     },
    // ])

    // pageNo as state var as React must know when there is a change in pageNo, it has to re-render the page
    // dynamic data
    // const [ movies, setMovies ] = useState([])
    const { movies, loading, error } = useSelector(state => state.moviesSlice)

    // const [ pageNo, setPageNo ] = useState(1) - comment to access from slice
    // const pageNo = useSelector((state) => state.pageNo)
    const { pageNo } = useSelector((state) => state.paginationSlice)
    const dispatch = useDispatch()

    // const [ watchList, setWatchList ] = useState([])
    const { addToWatchList, removeFromWatchList, watchList, setWatchList } = useContext(WatchListContext)

    //whenever browser re-loads, watchlist shudn't be empty & it shud be from local storage
    useEffect(() => {
        const moviesFromLS = localStorage.getItem('movies')
        if (moviesFromLS){
            setWatchList(JSON.parse(moviesFromLS))
        }
    }, [])

    // console.log('watchlist from local storage', watchList)

    // function addToWatchList(movieObj) {
    //     // console.log('added', movieObj)
    //     // setWatchList([movieObj])
    //     const updatedWatchList = [...watchList, movieObj]
    //     setWatchList(updatedWatchList)

    //     // setItem(key, value)
    //     // set with watchList will store only the old objects not updated one 
    //     // as setWatchList() is asynchronous, it schedules and update watchList when react re-renders the component
    //     // localStorage.setItem('movies', JSON.stringify(watchList))
    //     localStorage.setItem('movies', JSON.stringify(updatedWatchList))
       
    //     console.log('added', localStorage.getItem('movies'))
    // }

    // function removeFromWatchList(movieObj) {
    //     const listAfterRemove = watchList.map((curr) => curr.id !== movieObj.id)
    //     setWatchList(listAfterRemove)
    //     console.log('final after remove', watchList)

    //     //keep the local storage updated whenever watchlist is updated
    //     localStorage.setItem('movies', JSON.stringify(listAfterRemove))
    // }


    // useEffect(() => {
    //     // const API_KEY = import.meta.env.REACT_APP_TMDB_API_KEY;
    //     axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=67e809dff6e60e54b35062bc7d6519be&page=${pageNo}`)
    //         // axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${pageNo}`)
    //         .then(response => {
    //             // console.log(response.data);
    //             setMovies(response.data.results)
    //         })
    //         .catch(error => {
    //             console.error("API error", error);
    //         });
    // }, [pageNo])

    useEffect(() => {
        dispatch((fetchMovieMiddleware(pageNo)));
    }, [pageNo])

    console.log('moviesssss', movies)

    function handleNext () {
        // setPageNo(pageNo + 1)
        // dispatch(handleNext())
        dispatch(paginationSlice.actions.handleNext())
    }

    function handlePrevious () {
        if (pageNo > 1) {
            // setPageNo(pageNo - 1)
            // dispatch(handlePrevious())
            dispatch(paginationSlice.actions.handlePrevious())
        }    
    }

    if (loading) {
        return <h4>Trending movies loading...</h4>
    }
    if (error) {
        return <h4>Try again later...</h4>
    }

    return <>
        <div>
            <h2 className="text-2xl font-bold text-center m-4">Trending Movies</h2>
        </div>
        <div className="flex flex-wrap justify-around gap-8 ">
            {movies.map((moviesObj, i) => {
                return <MovieCard moviesObj={moviesObj} addToWatchList={addToWatchList} watchList={watchList} removeFromWatchList={removeFromWatchList} />
            })}
            <Pagination pageNo={pageNo} handleNext={handleNext} handlePrevious={handlePrevious} />
        </div>
    </> 
}

export default Movies;