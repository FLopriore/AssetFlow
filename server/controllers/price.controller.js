const KEY =  process.env.API_KEY || "";

const getMonthlyPrices = async (req,res) =>{
  const symbol = req.body.symbol;
  const startDate = req.body.startDate;
  const url = "https://api.tiingo.com/tiingo/daily/"+symbol+"/prices?startDate="+startDate+"&token="+KEY;
  const response = await fetch(url,{
        method:"get",
  });
  const data = await response.json()
  if(data) res.status(200).json(data)
  else res.status(500).json({success:"false"})
}

module.exports = {getMonthlyPrices}