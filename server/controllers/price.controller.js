const request = require('request');
const KEY =  process.env.ALPHA_API_KEY || "";

const getMonthlyPrices = ((req,res)=>{
    try{
        const {tracker} = req.params;
        const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol='+tracker+'&apikey='+KEY;
        fetch(url).then(resp => {
          resp.json();
        }).then(data => {console.log(data)})

    }catch(e) {res.status(500).json({message: e.message});}
})

module.exports = {getMonthlyPrices}