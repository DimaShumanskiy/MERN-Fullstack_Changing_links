import {useCallback, useEffect, useState} from "react";

export {useState, useCallback} from 'react'
const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)//испровление ошибки при перезапуке страницы
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({
            userId:id,token:jwtToken
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {//проверяем есть ли логин в локал
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data && data.token) {
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, userId, ready}
}