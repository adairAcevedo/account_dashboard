const url = import.meta.env.VITE_BASE_URL;


// client urls
export const clientMovementsURL = '/users/myMovements'
export const moneyConversionURL = 'money/conversion'

// admin urls
export const userMovementsURL = '/users/:user_uid/movements'
export const usersURL = '/users/list'


export const loginApi = async (endpoint, data, headers = {}) => {
    try{
        let response = await fetch(`${url}${endpoint}`,{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        if(response.status == 200){
            return {sucess: true, res: response};
        }
        if(response.status == 403 || response.status == 401){
            const errorMsj = await response.text()
            return {errorMsj: errorMsj, status: response.status};
        } 
        return {errorMsj: "Unknow error, contact support", status: response.status};
    }catch(err){
        console.log(err);
        return {errorMsj: "Service not available ", status: err};
    }finally{
        console.log("finish post request")
    }
}

export const get = async (endpoint, query = {}, headers = {}) => {
    const defaultHeaders = {'Content-Type': 'application/json'}
    console.log('hola')
    try{
        let response = await fetch(`${url}${endpoint}`,{
            method: "GET",
            headers: {...defaultHeaders, ...headers}
        })
        if(response.status == 200){
            return {sucess: true, res: await response.json()};
        }
        if(response.status == 403 || response.status == 401){
            const errorMsj = await response.text()
            return {errorMsj: errorMsj, status: response.status};
        }
        return {errorMsj: "Unknow error, contact support", status: response.status};
    }catch(err){
        throw err
    }finally{
        console.log("finish post request")
    }
}

export const centsToUnits = (amount) => {
    return amount /100
}