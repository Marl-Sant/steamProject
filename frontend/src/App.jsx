import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage.jsx";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage.jsx";
import StorePage from "./components/StorePage/StorePage.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
import GameDetailPage from "./components/GameDetailPage/GameDetailPage.jsx";
import CommunitiesListPage from "./components/CommunitiesListPage/CommunitiesListPage.jsx";
import ProfilePage from "./components/ProfilePage/ProfilePage.jsx";
import WrongTurn from "./components/WrongTurn/WrongTurn.jsx";
import CommunityDetail from "./components/CommunityDetail/CommunityDetail.jsx";
import ChatArea from "./components/ChatArea/Chat.jsx";
import * as sessionActions from "./store/session";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <StorePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "games/:gameId",
        element: <GameDetailPage />,
      },
      {
        path: "communities",
        element: <CommunitiesListPage />,
      },
      {
        path: "communities/:communityId",
        element: <CommunityDetail />,
      },
      {
        path: "users/:userId",
        element: <ProfilePage />,
      },
      {
        path: "chat",
        element: <ChatArea />,
      },
      {
        path: "*",
        element: <WrongTurn />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
