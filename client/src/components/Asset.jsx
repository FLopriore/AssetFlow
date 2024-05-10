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
import getApi from '../utils/api.utils';

import protobuf from 'protobufjs'
import {Buffer} from "buffer/"


function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

function getTicker(AssetList){
  const data = []
  AssetList.forEach((el, index) => {
    const dataElement = {id: index, label: el.tracker};
    data.push(dataElement)
  });
  return data;
}

export default function Asset() {

    const [assetList, setAssetList] = useState([])
    const [priceList,setPriceList] = useState([])

    useEffect(()=>{
      getApi('asset/').then((data) => {
        setAssetList(getTicker(data));
    });
       //Pulisco l'array con gli asset prendendo quello che mi interessa
      console.log(assetList);

      protobuf.load("../../public/Data.proto",(error,root)=>{
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
                    <div>{assetList.map(asset => <p>{asset.label}</p>)}</div>
                    <Grid item xs={6}>
                       <BasicLineChart /> 
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
                            overflowY: 'scroll'
                        }}>
                            <h3>I tuoi asset</h3>
                            <List>
                            {  /* assetList.map((asset) => {
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                        </IconButton>
                                    
                                    
                                    <ListItemButton>
                                    <ListItemText
                                        primary='prova'
                                    />
                                    </ListItemButton>
                                </ListItem>
                            
                                */
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