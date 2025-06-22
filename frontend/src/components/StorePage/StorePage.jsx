 import {useEffect, useMemo} from 'react';
import {useKeenSlider} from 'keen-slider/react'
import { useDispatch, useSelector } from 'react-redux';
import 'keen-slider/keen-slider.min.css'
import { useNavigate } from 'react-router-dom';
import './StorePage.css'
import * as gamesAction from '../../store/games'

const CarouselComponent = (props) => {
    
    const navigate = useNavigate();

    console.log(props)

    const handleClick = (game) =>{
        navigate(`/games/${game.id}`)
    }

    const isReady = props.allGamesProp?.allGames?.length > 0

    const sliderKey = useMemo(() => (isReady ? `slider-${props.allGamesProp?.allGames.length}`: null), [props.allGamesProp.allGames, isReady])

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
            {props.allGamesProp?.allGames?.map(game => (
                <div key={`${game.id}`} className='keen-slider__slide gameSlide' onClick={() => {handleClick(game)}}>
                    <div className='game-image-container'><img src={game.GameImages.find(gameImage => gameImage.displayPic === true).url} className='game-image' /></div>
                    <div className='game-info-container'>
                        <h1>
                        {game.title}
                        </h1>
                        <p>{game.description}</p>
                        <h3>${game.price}</h3>
                        <span className='subContainer'>
                        {game.GameImages?.map(image => (
                            <img src={image.url} className='subImage' key={image}></img>
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
    const storeGames = useSelector((state) => state.games)
    const storeGamesImages = useSelector((state) => state.gameImages)

    useEffect(() => {
        dispatch(gamesAction.populateGames())
    }, [dispatch])

    return (
        <div className='store-page'>
        <div className='featured-games-menu'>
            <CarouselComponent allGamesProp={storeGames}/>
        </div>
        </div>
    )
}

export default StorePage
