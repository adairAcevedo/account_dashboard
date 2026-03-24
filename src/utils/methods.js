import {base_url} from './endpoints' 

export const postApi = async (endpoint, data, headers = {}) => {
    try{
        let response = await fetch(`${base_url}${endpoint}`,{
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
    let queryParams = new URLSearchParams(query).toString();

    let url = queryParams.length > 0 ? `${base_url}${endpoint}?${queryParams}` : `${base_url}${endpoint}`
    try{
        let response = await fetch(`${url}`,{
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
        return {errorMsj: "Service not available ", status: err};
    }finally{
        console.log("finish get request")
    }
}

export const centsToUnits = (amount) => {
    return (amount /100).toFixed(2)
}

export const formatDate = (dateISO, dateStyle = 'medium') => {
  if (!dateISO) return '';
  const date = new Date(dateISO);
  
  return new Intl.DateTimeFormat('en-US', {
    //es-ES
    dateStyle: dateStyle, // 'short', 'medium', 'long', 'full'
    timeStyle: 'short' 
  }).format(date);
};