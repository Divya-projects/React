import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Banner = () => {
    const [ movieImg, setMovieImg ] = useState("")
    const [ title, setTitle ] = useState("")

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=67e809dff6e60e54b35062bc7d6519be')
            .then(response => {
                console.log(response.data);
                const trendingMovie = response.data.results[0]
                console.log("tttttt", trendingMovie)
                const trendingMovieTitle = trendingMovie.title
                console.log("ttttcscdsctt", trendingMovieTitle)
                setTitle(trendingMovieTitle)
                const trendingMovieImg = trendingMovie.backdrop_path
                setMovieImg('https://image.tmdb.org/t/p/original${trendingMovieImg}')
            })
            .catch(error => {
                console.error(error);
            })
            .finally(function () {
                // always executed
            });
    }, [])

    return <>
        <div>Banner</div>
        <div
            className='h-[25vh] md:h-[75vh] bg-cover bg-center flex items-end'
            style={{ backgroundImage: `url(${movieImg})` }}
        >

            <div className='text-white text-xl text-center w-full'>
                {title}
            </div>
        </div>
    </>
}

export default Banner;