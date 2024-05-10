


protobuf.load('./Data.proto',(error,root)=>{
if (error){console.log(error)}
const Ticker = root.lookupType("ticker");
let ws = new WebSocket('wss://streamer.finance.yahoo.com');
ws.onopen = function open() {
	ws.send(
	JSON.stringify({
		subscribe: assetList.map(asset => {asset.tracker}),
	})
	);
	};
	
ws.onmessage = function incoming(message) {
	const ticker = Ticker.decode(Buffer.from(message.data, "base64")).toJSON();
	setPriceList(ticker);
	};
ws.onclose = function close() {console.log("Socket closed");};
});