// Restituisce solo i parametri specificati nell'array
//
// Parametri:
// - responseArray: array con i risultati della query dal database
// - fieldsArray: array con i campi che voglio mandare in risposta tramite JSON
// ----------------------------------------------------
// Esempio:
// Abbiamo un responseArray formato da oggetti del tipo:
// {
//    "_id": "abcdefg1234",
//    "tracker": "AAPL",
//    "investedCapital": 2300,
//    "userId": "12345678",
//    "createdAt": "2024-05-06T15:08:38.378Z",
//    "updatedAt": "2024-05-06T15:08:38.378Z",
//    "__v": 0,
// }
// L'obiettivo è quello di restituire un array con oggetti del tipo:
// {
//    "_id": "abcdefg1234",
//    "tracker": "AAPL",
//    "investedCapital": 2300,
// }

function filterResponse(responseArray, fieldsArray) {
    return responseArray.map((resElement) => {
        const responseObject = {};  // create a new object, which will replace resElement

        // Add to responseObject only fields specified in fieldsArray
        fieldsArray.forEach((field) => {
            responseObject[field] = resElement[field];
        })
        return responseObject;
    })
}

module.exports = {filterResponse};