import * as React from 'react';
import Sidebar from './Sidebar';
import { Box, Fab, Grid, List, ListItem, ListItemButton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import BasicLineChart from './LineChart';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";
import {getApi, postApi} from '../utils/api.utils';
import protobuf from 'protobufjs'
import {Buffer} from "buffer/"

const BASE_URL = 'http://localhost:3000/';

const removeMarket = (string) => {
    const re = /:.*/;
    if(!re.test(string)) return string
    else {
    const result = re.exec(string)
    return result[0].slice(1,);
}
}

function getTicker(AssetList){
  const data = []
  AssetList.forEach((el, index) => {
    const dataElement = {idx: index, label: removeMarket(el.tracker), id: el._id};
    data.push(dataElement)
  });
  return data;
}

async function deleteAsset(assetId){
    try {
        let response = await fetch(`${BASE_URL}api/asset/${assetId}?id`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
        });
        response = await response.json();
        return response;
    } catch (e) {
        console.log(e);
    }
}

async function getHistData(symbol){
    // fai la fetch all'url
    const startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0];
    symbol = symbol.toLowerCase()
    const data = await postApi("price",{'symbol':symbol ,'startDate':startDate})
    console.log(data)
}

export default function Asset() {

    const [assetList, setAssetList] = useState([])
    const [priceList,setPriceList] = useState([])
    const [graphData,setGraphData] = useState([])

    async function getGraphData(symbol) {
        if((!localStorage.getItem(symbol)) || ((new Date).getDate >= JSON.parse(localStorage.getItem(symbol)).expDate)){
            const date = new Date(new Date().setDate(new Date().getDate() + 1));
            const data = await getHistData(symbol)
            setGraphData(data)
            localStorage.setItem(symbol,JSON.stringify({
                "data": data,
                "expDate": date
            }))
        }else setGraphData(JSON.parse(localStorage.getItem(symbol)).data)
    }

    const getActualPrice = (symbol) => {
        const str = symbol+"_price"
        if (!priceList || symbol!==priceList.id) {
            if(localStorage.getItem(str)) return localStorage.getItem(str) 
                else return 0
        }
        if(symbol===priceList.id){
            localStorage.setItem(str,(priceList.price).toFixed(2))
            return (priceList.price).toFixed(2)
        }
    }


    useEffect(()=>{
      getApi('asset/').then((data) => {
        setAssetList(getTicker(data));
    });
       //Pulisco l'array con gli asset prendendo quello che mi interessa
      console.log(assetList);

      //WebSocket yahoo finance
      protobuf.load("Data.proto",(error,root)=>{
        if (error){console.log(error)}
        const Ticker = root.lookupType("ticker");
        let ws = new WebSocket('wss://streamer.finance.yahoo.com');
        ws.onopen = function open() {
          ws.send(
          JSON.stringify({
            subscribe: assetList.map(asset => asset.label),
          })
          );
          };
          
        ws.onmessage = function incoming(message) {
          const ticker = Ticker.decode(Buffer.from(message.data, "base64")).toJSON(); //
          setPriceList(ticker)
          };
        ws.onclose = function close() {console.log("Socket closed");};
        });
        
      
      console.log(priceList)
    },[assetList,priceList]);
    

    //FUNZIONE PROVVISORIA PER L'AGGIUNTA DELL'ASSET
    /*
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      fetch(`${baseURL}/api/user/asset`, {
          method: 'post',
          headers: {
              'Content-Type': 'application/json',
              'token': localStorage.getItem('token')
          },
          body: JSON.stringify({
              tracker: data.get('tracker'),
              investedCapital: data.get('capital')
          })
      }).then((response) => response.json()).then((data) => {
          if(!data.success) {
              alert("Impossibile aggiungere asset")
          }
      }).catch(e => {
          console.log(e)
      })
    };*/

    return (
        <Box className='window'>
            <Sidebar />
            <Box className='main-content'>
                <Grid container display='flex' flexDirection='row' alignItems='stretch'>
                    <Grid item xs={12}>
                        <Box sx={{ 
                            width: '100%',
                            textAlign: 'center',
                            mt: '1rem',
                            mb: '4rem'
                        }}>
                        </Box>
                    </Grid>
                    {/*<div>{assetList.map(asset => <p>{asset.label}</p>)}</div>*/}
                    <Grid item xs={6}>
                       <BasicLineChart histData={graphData}/> 
                    </Grid>
                    <Grid item xs={6} display='flex' flexWrap='wrap' justifyContent='center'>
                        <Box sx={{
                            width: '80%',
                            height: '100%',
                            bgcolor: '#eaeaea',
                            borderRadius: '20px',
                            alignSelf: 'center',
                            textAlign: 'center',
                            padding: '0.5rem',
                        }}>
                            <h3>I tuoi asset</h3>
                            <List>
                            {
                                assetList.map((el) => (
                            <ListItem key={el.idx}>
                                <ListItemButton onClick={() => deleteAsset(el.id)}>
                                    <DeleteIcon/>    
                                </ListItemButton> 
                                <ListItemButton onClick={()=> getGraphData(el.label)}>
                                    <ListItemText primary={el.label}></ListItemText>
                                </ListItemButton>
                                <ListItemText primary={getActualPrice(el.label)}></ListItemText>           
                            </ListItem>
                        
                    ))
                }
                            </List>

                            <Fab color='primary' sx={{
                                position: 'absolute',
                                top: '71%',
                                left: '91%'
                            }}>
                            <AddIcon />
                            </Fab>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}