import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider
} from "@mui/material";

// Iconos de MUI para todas tus páginas
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People'; // Para Clientes (customerSB)
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // Para Proveedores
import InventoryIcon from '@mui/icons-material/Inventory2';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

const drawerWidth = 240;

function Navbar() {
  // Arreglo centralizado con todas las páginas de tu imagen
  const navItems = [
    { text: "Inicio", path: "/", icon: <HomeIcon /> },
    { text: "Clientes", path: "/clientes", icon: <PeopleIcon /> },
    { text: "Inventario", path: "/inventario", icon: <InventoryIcon /> },
    { text: "Pedidos", path: "/Pedidos", icon: <ListAltIcon /> },
    { text: "Ventas", path: "/Ventas", icon: <PointOfSaleIcon /> },
    { text: "Proveedores", path: "/Proveedores", icon: <LocalShippingIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1e1e2f',
          color: 'white'
        },
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" component="h2" fontWeight="bold">
          4 bases
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />

      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                '&.active': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderLeft: '4px solid #90caf9'
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.12)'
                }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Navbar;