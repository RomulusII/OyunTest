import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { GameMap } from "./components/GameMap";
import { Home } from "./components/Home";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/gamemap',
        element: <GameMap />
    }
];

export default AppRoutes;
