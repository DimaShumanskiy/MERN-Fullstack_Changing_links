import React from "react";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import 'materialize-css'
import {AuthContext} from "./context/AuthContext";


// AuthContext получение данных через Context
function App() {
    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = Boolean(token)// проверка зареган ли пользователь через токен приведение к булиан
    const routes = useRoutes(isAuthenticated)

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId,isAuthenticated
        }}>
            <div className='container'>
                {/*<h1>Hello</h1>*/}
                {routes}
            </div>
        </AuthContext.Provider>
    );
}

export default App;
