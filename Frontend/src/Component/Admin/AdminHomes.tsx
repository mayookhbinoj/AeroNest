import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Modal from '@mui/material/Modal';
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FlightRoundedIcon from "@mui/icons-material/FlightRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useAppDispatch } from "../../../src/Store/Configure";
import { reset } from "../../reducers/Slice/adminSlice";
import { useNavigate } from "react-router-dom";
import { getFlights, getTrips, verifyTrip } from "../../actions/AdminAction";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { resetTrips } from "../../reducers/Slice/adminSlice";



interface Flight {
  flightNumber: string;
  destination: string;
  departure: string;
  price: number;
}

interface RootState {
  admin: {
    flights: Flight[];
  };
}

const AdminHomes: React.FC = () => {
  const mainListItems = [
    { text: "Home", icon: <HomeRoundedIcon /> },
    { text: "Flights", icon: <FlightRoundedIcon /> },
  ];

  const [activePage, setActivePage] = useState<string>("Home");

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const flights = useTypedSelector((state) => state.admin.flights);
  const trips = useTypedSelector((state:any) => state.admin.trips);


  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOut = (e: React.FormEvent) => {
    dispatch(reset());
    navigate("/admin/login");
  };

  useEffect(() => {
    if (activePage === "Flights") {
      dispatch(getFlights());
    }
  }, [activePage, dispatch]);


  interface Trip {
    tripNumber: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: string;
  }

  const [open, setOpen] = useState(false);
  const handleViewTrips = (flight: Flight) => {
     dispatch(getTrips(flight))
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(resetTrips())
  };


  const handleVerifiy=async(id:any)=>{
    const result=await dispatch(verifyTrip(id))
   
 

  }
  return (
    <Box display="flex" height="100vh">
      <AppBar position="fixed" sx={{ zIndex: 1300, backgroundColor: "#00266b" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ fontFamily:"serif"}}>
            Admin Dashboard
          </Typography>
          <Button color="inherit"  sx={{ fontFamily:"serif"}} startIcon={<LogoutRoundedIcon />} onClick={logOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        }}
      >
        <Stack sx={{ p: 2, height: "100%", justifyContent: "space-between", marginTop: "30%" ,}}>
          <List dense>
            {mainListItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => setActivePage(item.text)}>
                  <ListItemIcon sx={{ fontSize: "2.5rem" }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontSize: "1.2rem", fontWeight: "semiBold",fontFamily:"serif"  }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "white",
          p: 3,
          mt: 8,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {activePage === "Home" && (
          <Typography variant="h4" sx={{ mb: 30, fontFamily:"serif",fontWeight: "bold"   }}>
            Welcome Admin
          </Typography>
        )}
        {activePage === "Flights" && (
          <Box>
            <Typography variant="h4" sx={{ mb: 4 ,fontFamily:"serif",fontWeight: "bold" }}>
              Flight List
            </Typography>
            <TableContainer component={Paper} >
              <Table>
                <TableHead sx={{ bgcolor: "#00266b" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Flight Number</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>countryRegistration</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>IATA</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>ICAO</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Role</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flights.length > 0 ? (
                    flights.map((flight:any, index) => (
                      <TableRow key={index}>
                        <TableCell>{flight.airlineName}</TableCell>
                        <TableCell>{flight.email}</TableCell>
                        <TableCell>{flight.countryRegistration}</TableCell>
                        <TableCell>{flight.IATA}</TableCell>
                        <TableCell>{flight.ICAO}</TableCell>
                        <TableCell>{flight.role}</TableCell>
                        <TableCell align="center">
                          <Button variant="contained" sx={{ bgcolor: "#00266b" }} onClick={() => handleViewTrips(flight._id)} >
                           View Trips
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No flights available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Box
  sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "95%", md: "80%" }, // Adjust width for small screens
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    maxHeight: "80vh",
    overflowY: "auto",
    borderRadius: 2,
  }}
>
  <Typography
    variant="h6"
    id="modal-title"
    sx={{
      fontFamily: "serif",
      fontWeight: "bold",
      color: "#00266b",
    }}
  >
    Trip Details
  </Typography>
  <TableContainer
    component={Paper}
    sx={{
      mt: 2,
      borderRadius: 2,
      overflow: "auto",
    }}
  >
    <Table
      sx={{
        minWidth: 650, // Ensure table adapts to larger screens
      }}
    >
      <TableHead
        sx={{
          bgcolor: "#00266b",
          "& th": {
            color: "white",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: "0.875rem",
          },
        }}
      >
        <TableRow>
          <TableCell>Aircraft Type</TableCell>
          <TableCell>Flight No</TableCell>
          <TableCell>From</TableCell>
          <TableCell>To</TableCell>
          <TableCell>Departure Time</TableCell>
          <TableCell>Arrival Time</TableCell>
          <TableCell align="center">Action Approval</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {trips.length > 0 ? (
          trips.map((element: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{element.aircraftType}</TableCell>
              <TableCell>{element.flightNumber}</TableCell>
              <TableCell>{element.from}</TableCell>
              <TableCell>{element.to}</TableCell>
              <TableCell>{element.startDate}</TableCell>
              <TableCell>{element.reachDate}</TableCell>
              <TableCell align="center">
                {element.isVerified ? (
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "green",
                      ":hover": { bgcolor: "green" },
                      color: "white",
                      fontSize: "0.75rem",
                    }}
                  >
                    Approved
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "red",
                      ":hover": { bgcolor: "red" },
                      color: "white",
                      fontSize: "0.75rem",
                    }}
                    onClick={()=>handleVerifiy(element._id)}
                  >
                    Pending  
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} align="center" sx={{ fontStyle: "italic" }}>
              No flights available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
  <Button
    variant="contained"
    sx={{
      mt: 2,
      bgcolor: "#00266b",
      ":hover": { bgcolor: "#003a9c" },
      color: "white",
      fontWeight: "bold",
      borderRadius: 1.5,
      fontSize: "0.875rem",
    }}
    onClick={handleClose}
  >
    Close
  </Button>
</Box>


            </Modal>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminHomes;
