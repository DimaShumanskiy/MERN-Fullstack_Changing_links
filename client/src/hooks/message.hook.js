import {useCallback} from 'react'
//window.M.toast - берется из библиотеки матиреалайс
export const useMessage = () => {
    return useCallback(text => {
        if(window.M && text){
            window.M.toast({html:text})
        }
    }, [])
}