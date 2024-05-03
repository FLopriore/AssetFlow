import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { Link, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { ListItemIcon } from '@mui/material';

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const location = useLocation();
  const [value, setValue] = React.useState(0);

  const routes = [
    { path: "/", value: 0, label: "Home", icon: HomeRoundedIcon },
    { path: "/income", value: 1, label: "Entrate", icon: AttachMoneyRoundedIcon},
    { path: "/expense", value: 2, label: "Spese", icon: AddShoppingCartRoundedIcon },
    { path: "/savings", value: 3, label: "Salvadanaio", icon: SavingsRoundedIcon },
    { path: "/asset", value: 4, label: "Trading", icon: AccountBalanceRoundedIcon }
  ]

  useEffect(() => {
    const route = routes.find((route) => route.path === location.pathname);
    if (route) {
      setValue(route.value);
    } else {
      setValue(0);
    }
  }, [location, routes]);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {
          routes.map((route) => (
            <Link key={route.value} to={route.path}>
              <ListItem key={route.value}>
                <ListItemButton>
                  <ListItemIcon>
                    <route.icon />
                  </ListItemIcon>
                  <ListItemText primary={route.label} className='bartext'/>
                </ListItemButton>
              </ListItem>
            </Link>
          ))
        }
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
