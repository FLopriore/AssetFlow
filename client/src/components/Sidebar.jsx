import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem key="Home">
          <ListItemButton>
            <HomeRoundedIcon></HomeRoundedIcon>
            <ListItemText primary="Home" className='bartext' sx={{mt: 1}}/>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="Entrate"> 
        <ListItemButton>
            <AttachMoneyRoundedIcon></AttachMoneyRoundedIcon>
            <ListItemText primary="Entrate" className='bartext' sx={{mt: 1}}/>
          </ListItemButton>
        </ListItem>
        <ListItem key="Spese">
        <ListItemButton>
            <AddShoppingCartRoundedIcon></AddShoppingCartRoundedIcon>
            <ListItemText primary="Spese" className='bartext' sx={{mt: 1}}/>
          </ListItemButton>
        </ListItem>
        <ListItem key="Salvadanaio">
        <ListItemButton>
            <SavingsRoundedIcon></SavingsRoundedIcon>
            <ListItemText primary="Salvadanaio" className='bartext' sx={{mt: 1}}/>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="Trading">
        <ListItemButton>
            <AccountBalanceRoundedIcon></AccountBalanceRoundedIcon>
            <ListItemText primary="Trading" className='bartext' sx={{mt: 1}}/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer variant="permanent" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
