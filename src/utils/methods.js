const url = import.meta.env.VITE_BASE_URL;

export const loginApi = async (endpoint, data, headers = {}) => {
    console.log('la base url',url)
    try{
        let response = await fetch(`${url}${endpoint}`,{
            method: "POST",
            // headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        if(response.status == 200){
            return {sucess: true, res: response};
        }
        if(response.status == 403 || response.status == 401){
            const errorMsj = await response.text()
            return {errorMsj: errorMsj, status: response.status};
            // throw new Error(`Response status: ${response.status}`)
        } 
        return {errorMsj: "Unknow error, contact support", status: response.status};
        // msj_errors.value = "Unknow error, contact support"
        // throw new Error(`Response status: ${response.status}`)
    }catch(err){
        // return {errorMsj: "Unknow error, contact support", status: JSON.stringify(err)};
        throw err
    }finally{
        console.log("finish post request")
    }
}
