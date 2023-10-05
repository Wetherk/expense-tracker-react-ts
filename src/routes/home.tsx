import { useSelector } from "react-redux";
import { RootState } from "../store/redux";

const Home: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return (
        <>
            {isLoggedIn && <h1>Logged in </h1>}
            {!isLoggedIn && <h1>Not logged in </h1>}
        </>
    );
};

export default Home;
