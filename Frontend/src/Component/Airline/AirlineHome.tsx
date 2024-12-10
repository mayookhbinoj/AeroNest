import React, { useEffect, useState } from 'react';
import { reset, resetTrips } from '../../reducers/Slice/airlineSlice';
import { useNavigate } from 'react-router-dom';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ReactMapGL, { ViewStateChangeEvent } from 'react-map-gl';
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
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Stepper,
  Step,
  StepLabel,
  TextField,
  IconButton
} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useAppDispatch } from '../../../src/Store/Configure';
import 'mapbox-gl/dist/mapbox-gl.css';
import { airlineTrip, getTrip } from '../../actions/AirlineAction';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const AirlineHome: React.FC = () => {
  let token=import.meta.env.VITE_APP_REACT_APP_MAPBOX_API_KEY

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);
  const [activePage, setActivePage] = useState<string>('Home');
  const [searchQuery, setSearchQuery] = useState("");
  const [tosearchQuery, tosetSearchQuery] = useState("");
  const {_id}=useSelector((state:any)=>state.airline.airline)
  const trips=useSelector((state:any)=>state.airline.trips)
 const result=trips.map((item:any)=>{
  return {
    flightNumber:item.flightNumber,
    aircraftType:item.aircraftType,
    from:item.from,
    to:item.to,
    price:item.price
  }

 })
console.log(result)

 
 
  const [formData,setData]=useState<{[key:string]:string|number}>({

    flight:_id,flightNumber:"",aircraftType:"",startDate:"",reachDate:"",from:searchQuery,to:tosearchQuery,
    EconomySeat:"",EconomyPrice:"",BusinessSeat:"",BusinessPrice:"",
  })
  const [activeStep, setActiveStep] = useState<number>(0);
  const [viewport, setViewport] = useState({
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 6,
  }); 

  useEffect(()=>{
    if(activePage=="Flights"){
   
      dispatch(getTrip(_id))
    }else if(activePage=="Home"){
      dispatch(resetTrips())
    }
     
  },[activePage])
 
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${token}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const { center } = data.features[0];
        setViewport({
          latitude: center[1],
          longitude: center[0],
          zoom: 10,
        });
        setMarker({ latitude: center[1], longitude: center[0] });
        setData((prev) => ({
          ...prev,
          from: searchQuery,
          to:tosearchQuery
        }));
  
      } else {
       console.log("location not found")
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  const flights = [
    { id: 1, name: 'Flight A', origin: 'New York', destination: 'London', price: '$500' },
    { id: 2, name: 'Flight B', origin: 'Paris', destination: 'Tokyo', price: '$700' },
    { id: 3, name: 'Flight C', origin: 'Dubai', destination: 'Sydney', price: '$800' },
  ];

  const steps = ['Enter Flight Details', 'Enter Flight Dates  ', ' Confirm'];

  const handleLogout = () => {
    dispatch(reset());
    navigate('/airline/login');
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    setData((prevState)=>({
      ...prevState,[e.target.name]:e.target.value
    }))
  }

  const handleClick=async(e:React.MouseEvent<HTMLButtonElement>)=>{
   e.preventDefault()
    const result=await dispatch(airlineTrip(formData))
    if(result){
      setActiveStep(0)
      setData({
        flight: _id,
        flightNumber: "",
        aircraftType: "",
        startDate: "",
        reachDate: "",
        from: "",
        to: "",
        EconomySeat: "",
        EconomyPrice: "",
        BusinessSeat: "",
        BusinessPrice: "",
      });
      toast.success("Requested for approval")
      
    }

  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
       
            <TextField
              label="Flight Number"
              variant="outlined"
               name='flightNumber'
              fullWidth
              sx={{ flex: '1 1 calc(50% - 16px)' }}
              InputProps={{
                sx: { height: 50 },
              }}
              onChange={handleChange}
              value={formData.flightNumber as string}
            />
            <TextField
              label="Aircraft type"
              variant="outlined"
              name='aircraftType'
              fullWidth
              sx={{ flex: '1 1 calc(50% - 16px)' }}
              InputProps={{
                sx: { height: 50 },
              }}
              placeholder="Enter price for Economy Class"
              onChange={handleChange}
              value={formData.aircraftType as string}
            />
            <TextField
              label="Economy total Seat"
              variant="outlined"
              name='EconomySeat'
              fullWidth
              sx={{ flex: '1 1 calc(50% - 16px)' }}
              InputProps={{
                sx: { height: 50 },
              }}
             
              onChange={handleChange}
              value={formData.EconomySeat as string}
            />
            <TextField
              label="Economy Price"
              variant="outlined"
              name='EconomyPrice'
              fullWidth
              sx={{ flex: '1 1 calc(50% - 16px)' }}
              InputProps={{
                sx: { height: 50 },
              }}
             
              onChange={handleChange}
              value={formData.EconomyPrice as string}
            />
            <TextField
              label="Business total Seat"
              variant="outlined"
              name='BusinessSeat'
              fullWidth
              sx={{ flex: '1 1 calc(50% - 16px)' }}
              InputProps={{
                sx: { height: 50 },
              }}
             
              onChange={handleChange}
              value={formData.BusinessSeat as string}
            />
            <TextField
              label="Business Price"
              variant="outlined"
              name='BusinessPrice'
              fullWidth
              sx={{ flex: '1 1 calc(50% - 16px)' }}
              InputProps={{
                sx: { height: 50 },
              }}
             
              onChange={handleChange}
              value={formData.BusinessPrice as string}
            />
       
           
            
          </Box>
        );
      case 1:
        return (
          <Box sx={{ position: 'relative', width: '100%',  }}>
              <div style={{ width: '100%', height: '350px', }}>
              <Box
              sx={{
               position: "absolute",
               top: 10,
              left: 10,
              zIndex: 2,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 3,
              padding: "0.5rem",
             }}
            >
        <TextField
          size="small"
          placeholder="From"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearch}>
                <SearchRoundedIcon />
              </IconButton>
            ),
          }}
            />
        <TextField sx={{ marginLeft:2  }}
          size="small"
          placeholder="To"
          variant="outlined"
          value={tosearchQuery}
          onChange={(e) => tosetSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearch}>
                <SearchRoundedIcon />
              </IconButton>
            ),
          }}
            />
            </Box>
                 <ReactMapGL
                  {...viewport}
                 mapboxAccessToken={token}
                   mapStyle="mapbox://styles/mapbox/streets-v11"
                  onMove={(event: ViewStateChangeEvent) => setViewport(event.viewState)}
                    />
              </div>
               <Box
              sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              marginTop:5
              }}
              >
       
            <TextField
              label="From"
              name='from'
              variant="outlined"
              fullWidth
              sx={{ flex: '1 1 calc(50% - 16px)' }}
              InputProps={{
                sx: { height: 50 },
              }}
              onChange={handleChange}
              value={formData.from as string}
            />
            <TextField
              label="To"
              variant="outlined"
              name='to'
              fullWidth
              sx={{ flex: '1 1 calc(50% - 16px)' }}
              InputProps={{
                sx: { height: 50 },
              }}
              placeholder="Enter price for Economy Class"
              onChange={handleChange}
              value={formData.to as string}
            />
            
        <TextField
        label="Start Date"
        type="date"
         name='startDate'
        variant="outlined"
        fullWidth
        sx={{ flex: '1 1 calc(50% - 16px)' }}
        InputLabelProps={{
          shrink: true, 
        }}
        InputProps={{
          sx: { height: 50 },
        }}
        onChange={handleChange}
        value={formData.startDate as string}
      />

   
      <TextField
        label="Reach Date"
        type="date"
         name='reachDate'
        variant="outlined"
        fullWidth
        sx={{ flex: '1 1 calc(50% - 16px)' }}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: { height: 50 },
        }}
        onChange={handleChange}
        value={formData.reachDate as string}
      />
          </Box>
            
          </Box>
        );
      case 2:
        return (
          <Typography variant="body1">
           
          </Typography>
        );
      default:
        return 'Unknown step';
    }
  };

  const mainListItems = [
    { text: 'Home', icon: <HomeRoundedIcon /> },
    { text: 'Flights', icon: <FlightRoundedIcon /> },
  ];

  return (
    <Box display="flex" height="100vh">
      <AppBar position="fixed" sx={{ zIndex: 1300, backgroundColor: '#00266b' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Airline Dashboard
          </Typography>
          <Button
            color="inherit"
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
      <Stack sx={{ p: 2, height: '100%', justifyContent: 'space-between', marginTop: '30%' }}>
  <List dense>
    {mainListItems.map((item, index) => (
      <ListItem key={index} disablePadding>
        <ListItemButton onClick={() => setActivePage(item.text)}>
          <ListItemIcon sx={{ fontSize: '2.5rem' }}>{item.icon}</ListItemIcon>
          <ListItemText 
            primary={item.text} 
            primaryTypographyProps={{ fontSize: '1.2rem',fontWeight:'semiBold'  }} 
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
          bgcolor: 'white',
          p: 3,
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {activePage === 'Flights' && (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', }}>
              Add Trip
            </Typography>
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 ,}}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box sx={{ marginTop: 3 }}>
                {renderStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined"   sx={{ borderColor: '#00266b', color: '#00266b' }}>
                    Back
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <Button variant="contained" onClick={handleClick} sx={{backgroundColor: '#00266b'}}>
                      Submit
                    </Button>
                  ) : (
                    <Button onClick={handleNext} variant="contained" color="primary" sx={{ backgroundColor: '#00266b' }}>
                      Next
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                Flight List
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell>Aircraft Type</TableCell>
                    <TableCell>Flight no</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.map((flight:any) => (
                    <TableRow key={flight.flightNumber}>
                    <TableCell>{flight.aircraftType}</TableCell>
                    <TableCell>{flight.flightNumber}</TableCell>
                    <TableCell>{flight.from}</TableCell>
                    <TableCell>{flight.to}</TableCell>
                    <Button  variant="contained" sx={{ mt: 1 ,backgroundColor: '#00266b'}}>
                      View
                    </Button>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </>
        )}
        {activePage === 'Home' && (
          <Typography variant="h4" sx={{ mb: 30 }}>
            Welcome 
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AirlineHome;
