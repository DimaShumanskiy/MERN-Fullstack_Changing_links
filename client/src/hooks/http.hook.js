import {useState, useCallback} from 'react'

export const useHttp = () => { // кастомный хук запроса
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, {method, body, headers})// запрос
            const data = await response.json()   //распарсить

            if (!response.ok) {
                throw new Error(data.message || 'что-то пошло не так')
            }
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])//useCallback - что бы реакт не входил в рекурсию,  async - делает функцию синхронной

    const clearError = useCallback(() => setError(null), [])
    return {loading, request, error, clearError}
}