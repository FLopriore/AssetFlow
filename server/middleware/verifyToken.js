const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user.model.js");

const SECRET_KEY = process.env.SECRET_KEY || "";

function verifyToken(req, res, next) {
    let token = req.headers.token; //Prendo il token dall'header
    if (!token) return res.status(401).json({error: true, message: "Provide Token"});
    else {
        //Uso il modulo jsonwebtoken che verifica il token passandogli come parametro la secret_key che uso per firmare
        jsonwebtoken.verify(token, SECRET_KEY,
            (errors, payload) => {
                if (payload) {
                    //Verificato il token dovrebbe restituirmi l'ID dell'utente
                    User.findById(payload.data.userId).then(user => {
                            if (user) {
                                req.userId = payload.data.userId;
                                next();
                            } else {
                                res.status(403).json({error: true, message: "No account associated with this user was found."});
                            }
                        }
                    );
                } else {
                    return res.status(401).json({error: true, message: "Invalid Token"});
                }
            }
        );
    }
}

module.exports = verifyToken;