import getApi from "./api.utils.js";

const verifyToken = () => {
    if(localStorage.length > 0){
        let res = getApi("verify");
        let success = res.error  ?  false : true; //Se mi restituiscono true vuol dire che c'è stato un errore nel token
        return success;
    }else {return false;}

}

export default verifyToken;