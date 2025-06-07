import React, { useState, useEffect, useContext } from 'react'
import genreIds from '../constants/genreIds'
import { WatchListContext } from '../contexts/WatchListContext'

const WatchList = () => {
    // const [ watchListMovies, setWatchListMovies ] = useState([])

    //destructuring context to access it
    const { addToWatchList, removeFromWatchList, watchList, setWatchList } = useContext(WatchListContext)

    // for search bar
    const [ search, setSearch ] = useState('')

    // for selecting genres
    const [ genres, setGenres ] = useState([])
    const [ selectedGenre, setSelectedGenre ] = useState('All Genres')

        useEffect(() => {
            const moviesFromLS = localStorage.getItem('movies')
            if (moviesFromLS){
                setWatchList(JSON.parse(moviesFromLS))
            }
        }, [])
    
        // console.log('movies from watchlist', watchListMovies)
    
        useEffect(() => {
        let genreList = watchList.map((movie) => getGenreFromGenreIds(movie.genre_ids))
        // let genreList = watchListMovies.map((movie) => genreIds[movie.genre_ids[0]])
        // convert it into a flat array of genres combining all array of strings
        genreList = genreList.flatMap(str => str.split(',').map(genre => genre.trim()));
        // console.log('genreListsssssss', genreList)

        // remove duplicates
        genreList = new Set(genreList);
        // console.log('genreList', genreList)
        setGenres(['All Genres', ...genreList])
    }, [watchList])
    
    function getGenreFromGenreIds(genreIdsArr) {
        let res = [];
        for (let i = 0; i < genreIdsArr.length; i++){
            res.push(genreIds[genreIdsArr[i]])
        }
        // console.log('genre', res)
        //to convert array to string separated with commas
        return res.join(', ')
    } 
    
    function handleAscRatings() {
        const sortedAsc = watchList.sort((a, b) => a.vote_average - b.vote_average)
        // to create a copy of array, since .sort returns same reference of memory
        setWatchList([...sortedAsc])
    }

    function handleDescRatings() {
        const sortedDesc = watchList.sort((a, b) => b.vote_average - a.vote_average)
        setWatchList([...sortedDesc])
    }

    function handleSearch(e) {
        setSearch(e.target.value)
    }

    function handleGenreSelection(genre) {
        setSelectedGenre(genre)
    }

    return <>
        <div className='flex flex-wrap justify-center my-4'>
            { genres.map((genre, i) => {
                const isActive = genre === selectedGenre;
                return <div key={i} className={`mx-3 my-2 flex justify-center items-center h-[2.5rem] w-[8rem] rounded-xl font-bold cursor-pointer 
                    ${isActive ? 'bg-blue-400' : 'bg-gray-400'}`} onClick={() => handleGenreSelection(genre)}
                >{genre}</div>
            })}
        </div>
    {/* search bar starts here */}
    <div className='flex my-8 justify-center'>
        <input type='text' placeholder='Enter movie' value={search}
        className='h-[3rem] w-[20rem] bg-gray-200 outline-none 
        border border-gray-400 p-2 rounded-lg' onChange={handleSearch} />
    </div>

    {/* rendering table starts */}
        <div className='border border-gray-400 rounded-lg m-5 overflow-hidden'>
            <table className='w-full bg-white border-collapse text-left text-sm'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='px-6 py-4 font-medium text-gray-900'>Name</th>
                        <th className='font-medium text-gray-900'>
                            <div className='flex'>
                                <div>
                                    <i className='fa-solid fa-arrow-up cursor-pointer p-1' onClick={handleAscRatings}></i>
                                    Ratings
                                    <i className='fa-solid fa-arrow-down cursor-pointer p-1' onClick={handleDescRatings}></i>
                                </div>
                            </div>
                        </th>
                        <th className='font-medium text-gray-900'>
                            <div className='flex'>
                                <div>
                                    Popularity
                                </div>
                            </div>
                        </th>
                        <th className='font-medium text-gray-900'>
                            <div className='flex'>
                                <div>
                                    Genre
                                </div>
                            </div>
                        </th>
                        <th className='font-medium text-gray-900'>
                            <div className='flex'>
                                <div>
                                    Delete
                                </div>
                            </div>
                        </th>
                    </tr>   
                </thead>
                <tbody className='border-t border-gray-600 divide-y divide-gray-200'>
                        { watchList
                        .filter((movie) => {
                            if (selectedGenre === 'All Genres'){
                                console.log('all genres')
                                return true
                            }
                            else{
                                console.log('other than all genres', selectedGenre)
                                return getGenreFromGenreIds(movie.genre_ids).includes(selectedGenre)
                            }
                        })
                        .filter((movie) => movie.title.toLowerCase().startsWith(search.toLowerCase()))
                        .map((movie) => {
                            return (
                                <tr key={movie.id}>
                                <td className='flex items-center px-6 py-4 font-normal text-gray-900'>
                                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                                alt='' className='h-[5rem] w-[8rem] object-fit' />
                                <div className='text-sm font-medium pl-1'>{movie.title}</div>
                        </td>
                        <td className=' py-4'>{movie.vote_average}</td>
                        <td className=' py-4'>{movie.popularity}</td>
                        <td className=' py-4'>{getGenreFromGenreIds(movie.genre_ids)}</td> 
                        <td className=' py-4'>
                            <div className='text-gray-600 underline cursor-pointer hover:text-red-600 
                            transition-colors duration-200' onClick={() => removeFromWatchList(movie)}>
                                Delete</div>
                        </td>
                        {/* <td className=' py-4 text-red-500'>Delete</td> */}
                        </tr>)
                        })}
                </tbody>
            </table>
        </div>
    </>
}

export default WatchList;