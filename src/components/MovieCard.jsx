import React from 'react'

const MovieCard = (props) => {
    let { moviesObj, addToWatchList, watchList, removeFromWatchList } = props
    // console.log('watch list in moviescard', watchList)

    function doesWatchListContains(moviesObj) {
        for (let i = 0; i < watchList.length; i++ ){
            // console.log('sdfer', watchList[i].id, moviesObj.id)
            if (watchList[i]?.id === moviesObj.id){
                // console.log('exists')
                return true
            }
        }
        // console.log('not exists', moviesObj.id)
        return false
    }
        
        
            
    return (

        <div 
            style= {{ backgroundImage: `url('https://image.tmdb.org/t/p/original${moviesObj.poster_path}')`}}
            className="h-[40vh] w-[200px] bg-cover bg-center flex items-start rounded-xl hover:scale-110 duration-200 hover:cursor-pointer"
        >
        <div 
        className="text-white text-center  w-full p-2 bg-gray-900/50 rounded-xl">{moviesObj.title}</div>
        {doesWatchListContains(moviesObj) ? <div 
        className='m-3 flex justify-center h-6 w-6 items-center' 
        onClick={() => removeFromWatchList(moviesObj)}>❌</div>
        : 
        <div className='m-3 flex justify-center h-6 w-6 items-center' 
        onClick={() => addToWatchList(moviesObj)}>😍</div>
        }
        </div>
        )
}

export default MovieCard