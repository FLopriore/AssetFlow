const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user.model.js");

const SECRET_KEY = process.env.SECRET_KEY || "";

function verifyToken(req, res, next) {
    let token = req.headers.token;
    if (!token) return res.status(401).json({error: true, message: "Provide Token"});
    else {
        const decoded = jsonwebtoken.verify(token, SECRET_KEY,
            (errors, payload) => {
                if (payload) {
                    //Verificato il token dovrebbe restituirmi l'ID dell'utente
                    User.findById(payload.data).then(user => {
                            if (user) {
                                next();
                            } else {
                                res.status(403).json({
                                    error: true,
                                    message: "No User account found."
                                });
                            }
                        }
                    );
                } else {
                    return res.status(401).json({
                        error: true,
                        message: "Invalid Token"
                    });
                }
            }
        );
    }
}

module.exports = verifyToken;