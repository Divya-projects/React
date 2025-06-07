import { createContext, useState, useEffect } from 'react'

const WatchListContext = createContext();

export default function WatchListContextWrapper(props) {
    const [ watchList, setWatchList ] = useState([])

    useEffect(() => {
            const moviesFromLS = localStorage.getItem('movies')
            if (moviesFromLS){
                setWatchList(JSON.parse(moviesFromLS))
            }
        }, [])
    
        console.log('watchlist from local storage', watchList)
    
        function addToWatchList(movieObj) {
            // console.log('added', movieObj)
            // setWatchList([movieObj])
            const updatedWatchList = [...watchList, movieObj]
            setWatchList(updatedWatchList)
    
            // setItem(key, value)
            // set with watchList will store only the old objects not updated one 
            // as setWatchList() is asynchronous, it schedules and update watchList when react re-renders the component
            // localStorage.setItem('movies', JSON.stringify(watchList))
            localStorage.setItem('movies', JSON.stringify(updatedWatchList))
           
            // console.log('added', localStorage.getItem('movies'))
        }
    
        function removeFromWatchList(movieObj) {
            console.log('obj to be removed', movieObj)
            const listAfterRemove = watchList.filter((curr) => curr.id !== movieObj.id)
            console.log('list after', listAfterRemove)
            setWatchList(listAfterRemove)
            console.log('final after remove', watchList)
    
            //keep the local storage updated whenever watchlist is updated
            localStorage.setItem('movies', JSON.stringify(listAfterRemove))
        }

        console.log("props in children", props.children)

        return <WatchListContext.Provider
        value={{addToWatchList, removeFromWatchList, watchList, setWatchList}}
        >
            {props.children}
        </WatchListContext.Provider>
    
}

export { WatchListContext }