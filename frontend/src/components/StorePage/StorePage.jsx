import {useEffect, useMemo, useState} from 'react';
import {useKeenSlider} from 'keen-slider/react'
import { useDispatch, useSelector } from 'react-redux';
import 'keen-slider/keen-slider.min.css'
import { useNavigate } from 'react-router-dom';
import './StorePage.css'
import * as gamesAction from '../../store/games'

const CarouselComponent = () => {
    const allGames = useSelector((state) => state.games?.allGames)
    const navigate = useNavigate();

    let allGamesArray
    if(allGames){
        allGamesArray = Object.entries(allGames)
    }

    const handleClick = (game) =>{
        navigate(`/games/${game.id}`)
    }

    const isReady = allGamesArray?.length > 0

    const sliderKey = useMemo(() => (isReady ? `slider-${allGamesArray.length}`: null), [allGamesArray, isReady])

    const [sliderRef, slider] = useKeenSlider({
        loop: true,
        mode: "free-snap",
        slides:{
            perView: 1,
        }
    }
    , 
    {
        enabled: isReady
    }
)

    return (
        <div id='container'>
        <span className='slide-button'  onClick={() => slider.current.prev()}>ARROW</span>
        <span className='keen-slider gameShadow' ref={sliderRef} 
        key={sliderKey}
        >
            {allGamesArray?.map(game => (
                <div key={`${game[0]}`} className='keen-slider__slide gameSlide' onClick={() => {handleClick(game[1])}}>
                    <div className='game-image-container'>
                        <img src={game[1].headerImage} className='game-image' />
                        {console.log('HERE IT IS LOOK OVER HERE', game[1].headerImage)}
                    </div>
                    <div className='game-info-container'>
                        <h1>{game[1].title}</h1>
                        <p>{game[1].shortDescription}</p>
                        <h3>${game[1].price}</h3>
                        <span className='subContainer'>
                        {Array.isArray(game[1].screenshots) &&
                            game[1].screenshots.slice(0, 4).map((url, index) => (
                            <img src={url} className='subImage' key={index} />
                            ))}
                        </span>
                        </div>
                </div>
            ))}
        </span>
        <span className='slide-button' onClick={() => slider.current.next()}>ARROW</span>
        </div>
    )
}

function StorePage(){
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        async function fetchData(){
            await dispatch(gamesAction.populateGames())
        }
        fetchData()
        setIsLoaded(true)
    }, [dispatch])

    return (
        <>
        {isLoaded ? 
        <div className='store-page'>
        <div className='featured-games-menu'>
            <CarouselComponent />
        </div>
        </div> :
            <div>Loading...</div>  
        }
        </>
    )
}

export default StorePage
