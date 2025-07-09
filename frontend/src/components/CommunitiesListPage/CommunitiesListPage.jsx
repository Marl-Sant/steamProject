function CommunitiesListPage() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await dispatch(gamesAction.populateGames());
    }
    fetchData();
    setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      {isLoaded ? (
        <div className="store-page">
          <div className="featured-games-menu">
            <CarouselComponent />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default CommunitiesListPage;
