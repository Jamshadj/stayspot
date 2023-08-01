import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import {
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GroupIcon from '@mui/icons-material/Group';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import { postBlockHost, postBlockUser, postUnBlockHost, postUnBlockUser } from '../../../api/adminApi';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function SideDrawer({ dashBoard, data, user, userData, host, hostsData, onHostStatusChange, properties, onUserStatusChange, tableHead,userCount,hostCount }) {

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState(null)
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const component = user || host;

  useEffect(() => {
    if (dashBoard) {
      setStyle(dashBoard);
    } else if (user) {
      setStyle(user);
    } else if (host) {
      setStyle(host);
    }
    else if (host) {
      setStyle(properties);
    }
  }, [dashBoard, user, host, properties]);

  console.log(user, "selected");
  const handleItemClick = (itemType) => {
    setSelectedItem(itemType);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const handleNavigation = (path) => {
    navigate(path);
  };
  console.log(style, "fr");
  const unBan = async (data_id, type) => {
    console.log("cl", type);
    const unbanConfirmation = (title, text, onSuccess) => {
      Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, unban!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await onSuccess();
        } else {
          console.log("Cancelled unBan");
        }
      });
    };

    if (type === "user") {
      console.log("uuuuuuuuu");
      unbanConfirmation(
        'Are you sure?',
        'Do you want to unban this user?',
        async () => {
          // Call the API to unban the user
          await postUnBlockUser(data_id);
          console.log("unBan", data_id, type);
          onUserStatusChange("refresh");
          // Show a success modal
          Swal.fire({
            title: 'Un-Ban Successful',
            icon: 'success',
            text: 'The user has been successfully un-banned.',
          });
        }
      );
    } else if (type === "host") {
      unbanConfirmation(
        'Are you sure?',
        'Do you want to unban this host?',
        async () => {
          // Call the API to unban the host
          await postUnBlockHost(data_id);
          console.log("unBan", data_id, type);
          onHostStatusChange("refresh");
          // Show a success modal
          Swal.fire({
            title: 'Un-Ban Successful',
            icon: 'success',
            text: 'The host has been successfully un-banned.',
          });
        }
      );
    }
  };


  const ban = async (data_id, type) => {
    console.log("cl", type);
    const banConfirmation = (title, text, onSuccess) => {
      Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, ban!',
      }).then((result) => {
        if (result.isConfirmed) {
          onSuccess();
        } else {
          console.log("Cancelled ban");
        }
      });
    };

    if (type === "user") {
      banConfirmation(
        'Are you sure?',
        'Do you want to ban this user?',
        async () => {
          // Call the API to ban the user
          await postBlockUser(data_id);
          console.log("ban", data_id, type);
          onUserStatusChange("refresh");
          // Show a success modal
          Swal.fire({
            title: 'Ban Successful',
            icon: 'success',
            text: 'The user has been successfully banned.',
          });
        }
      );
    } else if (type === "host") {
      await banConfirmation(
        'Are you sure?',
        'Do you want to ban this host?',
        () => {
          // Call the API to ban the host
          postBlockHost(data_id);
          console.log("ban", data_id, type);
          onHostStatusChange("refresh");
          // Show a success modal
          Swal.fire({
            title: 'Ban Successful',
            icon: 'success',
            text: 'The host has been successfully banned.',
          });
        }
      );
    }
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin', type: 'dashboard' },
            { text: 'UserList', icon: <GroupIcon />, path: '/admin/users', type: 'user' },
            { text: 'HostList', icon: <GroupIcon />, path: '/admin/hosts', type: 'host' },
            { text: 'Properties', icon: <MapsHomeWorkIcon />, path: '/admin/properties', type: 'properties' },
          ].map(({ text, icon, path, type }, index) => (
            <ListItem

              key={text}
              disablePadding
              sx={{
                display: 'block',
                background: type === style ? 'cornflowerblue' : 'transparent', // Add this line
              }}
            >
              <ListItemButton
                onClick={() => handleNavigation(path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* {index % 2 === 0 ? <GroupIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {dashBoard !== 'dashboard' ? (
          // properties === 'properties' ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {tableHead.map((head) => (

                    <TableCell align="left">{head}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {component &&
                  data.map((data, index) => (
                    <TableRow key={data._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left">{`${data.firstName} ${data.lastName}`}</TableCell>
                      <TableCell align="left">{data.email}</TableCell>
                      {host && <TableCell align="left">{data.phoneNumber ? data.phoneNumber : "Google loged"}</TableCell>}
                      <TableCell align="left">{data.blocked ? "Banned" : "Not-Banned"}</TableCell>
                      <TableCell align="left">
                        {data.blocked ? (
                          <Button onClick={() => unBan(data._id, component)} color="green">
                            Un-Ban
                          </Button>
                        ) : (
                          <Button onClick={() => ban(data._id, component)} color="red">
                            Ban
                          </Button>
                        )}

                      </TableCell>
                    </TableRow>
                  ))}
                {properties && data.map((data, index) => (
                  <TableRow key={data._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left" className='w-96'>
                      <img src={data.images[0]} className='max-w-[12%]' alt={data.title} />
                    </TableCell>
                    <TableCell align="left">{data.title}</TableCell>
                    <TableCell align="left">{data.location}</TableCell>
                    <TableCell align="left">{data.structure}</TableCell>
                    <TableCell align="left">₹{data.pricePerNight}</TableCell>
                    <TableCell align="left">{data.status}</TableCell>
                    <TableCell align="left">
                      <Button color="blue" onClick={() => navigate(`properties-details/${data._id}`)}>View details</Button>
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>

            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h4" component="div">
            <div className='flex gap-14'>
              <div>
              <Card className="mt-6 w-64">
                <CardBody>
                  <GroupIcon fontSize='20px' />
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                   Users:{userCount}
                  </Typography>
                </CardBody>
              </Card>
              </div>
              <div>
              <Card className="mt-6 w-64">
                <CardBody>
                  <GroupIcon fontSize='20px' />
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                   Host:{hostCount}
                  </Typography>
                </CardBody>
              </Card>
              </div>
            </div>
          </Typography>
        )}
      </Box>
    </Box>
  );
}
