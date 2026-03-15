const url = import.meta.env.VITE_BASE_URL;

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
        throw err
    }finally{
        console.log("finish post request")
    }
}
