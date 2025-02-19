import {useContext} from "react";
import {AuthContext} from "../Context/AuthContext.tsx";

const Home = () => {
    const {tokenContext,emailContext,usernameContext} = useContext(AuthContext);

    return(
        <div>
            <p>Home</p>
            {tokenContext ? (
                <p>Token: {tokenContext}</p>
            ) : (
                <p>No token available.</p>
            )}
            {emailContext ? (
                <p>Email: {emailContext}</p>
            ) : (
                <p>No Email available.</p>
            )}
            {usernameContext ? (
                <p>userName: {usernameContext}</p>
            ) : (
                <p>No userName available.</p>
            )}
        </div>
    )
}
export default Home;
