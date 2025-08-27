import { useEffect, useMemo, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { useDispatch, useSelector } from "react-redux";
import "keen-slider/keen-slider.min.css";
import { useNavigate } from "react-router-dom";
import "./StorePage.css";
import * as gamesAction from "../../store/games";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Decoder from "../ChatArea/Decoder.jsx";
import Chat from "../ChatArea/Chat.jsx";

function StorePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  const allGames = useSelector((state) => state.games?.allGames);
  const allGamesArray = allGames ? Object.entries(allGames) : [];
  const isReady = allGamesArray.length > 0;

  const sliderKey = useMemo(
    () => (isReady ? `slider-${allGamesArray.length}` : null),
    [allGamesArray, isReady]
  );

  const [sliderRef, slider] = useKeenSlider(
    { loop: true, mode: "snap", slides: { perView: 1 } },
    { enabled: isReady }
  );

  useEffect(() => {
    dispatch(gamesAction.populateGames());
    setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      {isLoaded ? (
      <div className="store-background">
          <Decoder 
            message="HELLO AND WELCOME TO GLEAM! I AM HERE TO ASSIST YOU WITH ANYTHING GLEAM!" 
            speed={22} 
          />
          <Chat />

          <div className="store-background">
            <div className="page-wrapper">
              <button className="left-slide-button" onClick={() => slider.current.prev()}>
                <FontAwesomeIcon icon={faChevronLeft} size="4x" />
              </button>

              <div id="container">
                <div className="keen-slider gameShadow" ref={sliderRef} key={sliderKey}>
                  {allGamesArray.map(([key, game]) => (
                    <div
                      key={key}
                      className="keen-slider__slide gameSlide"
                      onClick={() => navigate(`/games/${game.id}`)}
                    >
                      <div className="game-image-container">
                        <img src={game.headerImage} className="game-image" alt={game.title} />
                      </div>
                      <div className="game-info-container">
                        <h1 style={{color: 'white'}}>{game.title}</h1>
                        <p style={{color: 'white'}}>{game.shortDescription}</p>
                        <h3 style={{color: 'white'}}>${game.price}</h3>
                        <span className="subContainer">
                          {Array.isArray(game.screenshots) &&
                            game.screenshots.slice(0, 3).map((url, index) => (
                              <img src={url} className="subImage" key={index} alt={`screenshot-${index}`} />
                            ))}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="right-slide-button" onClick={() => slider.current.next()}>
                <FontAwesomeIcon icon={faChevronRight} size="4x" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default StorePage;
