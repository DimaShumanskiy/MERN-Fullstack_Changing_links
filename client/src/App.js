import React from "react";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {NavBar} from "./components/NavBar";
import {Loader} from "./components/Loader";
import 'materialize-css'


// AuthContext получение данных через Context
function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = Boolean(token)// проверка зареган ли пользователь через токен приведение к булиан
    const routes = useRoutes(isAuthenticated)

    if(!ready){
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId,isAuthenticated
        }}>
            {isAuthenticated && <NavBar/>}
            <div className='container'>
                {/*<h1>Hello</h1>*/}
                {routes}
            </div>
        </AuthContext.Provider>
    );
}

export default App;
