import * as React from 'react';
import {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import {Box, Fab, List, ListItem, ListItemButton, Typography} from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import ListItemText from '@mui/material/ListItemText';
import BasicLineChart from './LineChart';
import AddIcon from '@mui/icons-material/Add';
import {getApi, postApi} from '../utils/api.utils';
import protobuf from 'protobufjs'
import {Buffer} from "buffer/"
import AddAssetDialog from './AddAssetDialog';
import DeleteAssetDialog from './DeleteAssetDialog';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import IconButton from '@mui/material/IconButton';

function getTicker(AssetList) {
    const data = []
    AssetList.forEach((el, index) => {
        const dataElement = {idx: index, label: (el.tracker).toUpperCase(), id: el._id};
        data.push(dataElement)
    });
    return data;
}

//Prende i dati facendo la chiamata all'API
async function getHistData(symbol) {
    // fai la fetch all'url
    const startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0];
    symbol = symbol.toLowerCase()
    const data = await postApi("price/", {"symbol": symbol, "startDate": startDate})
    console.log(data)
    return data
}

export default function Asset() {

    const [assetList, setAssetList] = useState([]);
    const [priceList, setPriceList] = useState(null);
    const [graphData, setGraphData] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [assetDelete, setAssetDelete] = useState([]);
    const [isSelected, setIsSelected] = useState("")

    const handleDeleteAssetDialog = () => setOpenDelete(true);
    const handleOpenAssetDialog = () => setOpenAdd(true);


    async function getGraphData(symbol) {
        if ((!localStorage.getItem(symbol)) || ((new Date).getDate >= JSON.parse(localStorage.getItem(symbol)).expDate)) {
            const date = new Date(new Date().setDate(new Date().getDate() + 1));
            const data = await getHistData(symbol)
            setGraphData(data)
            localStorage.setItem(symbol, JSON.stringify({
                "data": data,
                "expDate": date
            }))
        } else setGraphData(JSON.parse(localStorage.getItem(symbol)).data)
    }

    const getActualPrice = (symbol) => {
        const str = symbol + "_price"
        if (!priceList || symbol !== priceList.id) {
            if (localStorage.getItem(str)) return localStorage.getItem(str)
            else return 0
        }
        if (symbol === priceList.id) {

            localStorage.setItem(str, (priceList.price).toFixed(2))
            return (priceList.price).toFixed(2)
        }
    }
    const getActualDir = (symbol) => {
        const str = symbol + "_dir"
        if (!priceList) {
            return null
        }
        if (symbol !== priceList.id) return localStorage.getItem(str)
        if (symbol === priceList.id) {
            localStorage.setItem(str, (priceList.changePercent).toFixed(2))
            return (priceList.changePercent).toFixed(2)
        }
    }

    useEffect(() => {
        getApi("asset/")
            .then((data) => {
                const newAssetList = getTicker(data);
                setAssetList(newAssetList);
                if (newAssetList.length > 0) {
                    setIsSelected(newAssetList[0].label);
                    return getGraphData(newAssetList[0].label);
                }
            })
            .catch((e) => console.log(e));
    }, []);

    useEffect(() => {
        const ws = new WebSocket('wss://streamer.finance.yahoo.com');
        //WebSocket yahoo finance, protobuf serve per decodificare i messaggi provenienti dal socket
        protobuf.load("Data.proto", (error, root) => {
            if (error) {
                console.log(error)
            }
            const Ticker = root.lookupType("ticker");
            ws.onopen = function open() {
                ws.send(
                    JSON.stringify({
                        subscribe: assetList.map(asset => asset.label),
                    })
                );
            };
            ws.onmessage = function incoming(message) {
                const ticker = Ticker.decode(Buffer.from(message.data, "base64")).toJSON();
                console.log(ticker)
                setPriceList(ticker)
            };

            return () => {
                ws.close();
            };
        });
    }, [assetList]);

    return (
        <Box className='window'>
            <AddAssetDialog setOpen={setOpenAdd} isOpen={openAdd} assetList={assetList}
                            setAssetList={setAssetList}/>
            <DeleteAssetDialog setOpen={setOpenDelete} isOpen={openDelete} assetId={assetDelete}
                               setAssetId={setAssetDelete} assetList={assetList} setAssetList={setAssetList}/>
            <Sidebar/>
            <Box className='main-content' sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                flexWrap: 'wrap'
            }}>
                <Box sx={{
                    width: '100%',
                    textAlign: 'center',
                    mt: 3,
                    height: '10%'
                }}>
                    <Typography variant='h4'>La tua Watchlist</Typography>
                </Box>
                <Box sx={{width: '60%', height: '80%'}}>
                    <BasicLineChart histData={graphData}/>
                </Box>
                <Box sx={{
                    width: '40%',
                    height: '80%',
                }}>
                    <Box sx={{
                        bgcolor: '#eaeaea',
                        borderRadius: '20px',
                        textAlign: 'center',
                        padding: '0.5rem',
                        ml: '10%',
                        mr: '10%',
                        height: '100%',
                        overflowY: 'auto'

                    }}>
                        <Typography variant='h5' sx={{mt: 2}}>I tuoi Asset</Typography>
                        <List>
                            {
                                assetList.map((el) => (
                                    <ListItem key={el.idx}
                                              sx={{
                                                  background: (isSelected === el.label) ? '#cfcccc' : '#eaeaea',
                                                  borderRadius: 4
                                              }}>
                                        <IconButton
                                            aria-label="Delete"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setAssetDelete([el.id, el.label])
                                                handleDeleteAssetDialog()
                                            }}
                                        >
                                            <DeleteForeverRoundedIcon/>
                                        </IconButton>
                                        <ListItemButton onClick={() => {
                                            getGraphData(el.label)
                                            setIsSelected(el.label)
                                        }}>
                                            <ListItemText primary={el.label}></ListItemText>
                                            <ListItemText primary={getActualPrice(el.label)}
                                                          sx={{color: getActualDir(el.label) > 0 ? '#009b7e' : '#CE310E'}}></ListItemText>
                                            <ListItemText
                                                primary={getActualDir(el.label) > 0 ? <KeyboardDoubleArrowUpIcon/> :
                                                    <KeyboardDoubleArrowDownIcon/>}
                                                sx={{color: getActualDir(el.label) > 0 ? '#009b7e' : '#CE310E'}}></ListItemText>
                                        </ListItemButton>
                                    </ListItem>

                                ))
                            }
                        </List>

                        <Fab onClick={handleOpenAssetDialog} color='primary' sx={{
                            position: 'absolute',
                            top: '86%',
                            left: '91%'
                        }}>
                            <AddIcon/>
                        </Fab>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}