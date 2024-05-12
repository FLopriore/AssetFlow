const KEY =  process.env.ALPHA_API_KEY || "";

const getMonthlyPrices = ((req,res)=>{
        //const {tracker} = req.params;
        const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=AAPL&apikey=BY6LBJPX9GB3433O';
        fetch(url).then(resp => {resp.json();}).then(data => {res.status(200).json(data)}).catch(e => res.status(500).json(e.message))
})

module.exports = {getMonthlyPrices}