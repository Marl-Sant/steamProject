 import {useEffect, useMemo} from 'react';
import {useKeenSlider} from 'keen-slider/react'
import { useDispatch, useSelector } from 'react-redux';
import 'keen-slider/keen-slider.min.css'
import { useNavigate } from 'react-router-dom';
import './StorePage.css'
import * as gameActions from '../../store/game'

const CarouselComponent = (props) => {
    
    const navigate = useNavigate()

    const handleClick = (game) =>{
        navigate(`/game/${game.id}`)
    }

    const isReady = props.props.allGames?.length > 0

    const sliderKey = useMemo(() => (isReady ? `slider-${props.props.allGames.length}`: null), [props.props.allGames, isReady])

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
            {props.props.allGames?.map(game => (
                <div key={`${game.id}`} className='keen-slider__slide gameSlide' onClick={() => {handleClick(game)}}>
                    <div className='game-image-container'><img src={game.mainImage} className='game-image' /></div>
                    <div className='game-info-container'>
                        <h1>
                        {game.title}
                        </h1>
                        <p>{game.description}</p>
                        <h3>${game.price}</h3>
                        <span className='subContainer'>
                        {game.subImages?.map(image => (
                            <img src={image} className='subImage' key={image}></img>
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

    useEffect(() => {
        dispatch(gameActions.populateGames())
    }, [dispatch])

    return (
        <div className='store-page'>
        <div className='featured-games-menu'>
            <CarouselComponent props={storeGames} />
        </div>
        </div>
    )
}

export default StorePage
