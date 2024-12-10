import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Bk from "../../assets/Images/hanson-lu-FT2WwbS1LJQ-unsplash.jpg";
import {FormControl, InputLabel,Select,MenuItem,FormHelperText,} from "@mui/material";
import { airlineRegister } from "../../actions/AirlineAction";
import { useAppDispatch } from "../../Store/Configure";
import { useNavigate } from "react-router-dom";
import { Step1Schema,Step2Schema } from "../../Validation/Validation";
import toast,{Toaster} from "react-hot-toast"

const AirlineRegistrationDesign: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  console.log(activeStep)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setData] = React.useState<{ [key: string]: string | number }>(
    {
      airlineName: "",
      email: "",
      countryRegistration: "",
      IATA: "",
      ICAO: "",
      website: "",
      phone: "",
      role: "",
      adress: "",
      fax: "",
    }
  );

  const steps = ["Basic Information", "Operational Details", "Review"];
  const [error, setErrors] = React.useState<{ [key: string]: string | number }>({});

  const handleNext = () => {
    let response = Step1Schema.safeParse(formData);
    let response1=Step2Schema.safeParse(formData)
    if(activeStep==0){
    if (!response.success) {
      const errorMessages: { [key: string]: string } = {};
      response.error.errors.forEach((err:any) => {
        if (err.path.length > 0) {
          errorMessages[err.path[0]] = err.message;
        }
      });
      setErrors(errorMessages);
    } else {
      console.log("hey")
      setErrors({})
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }else if(activeStep==1){
    if (!response1.success) {
      const errorMessages: { [key: string]: string } = {};
      response1.error.errors.forEach((err:any) => {
        if (err.path.length > 0) {
          errorMessages[err.path[0]] = err.message;
        }
      });
      setErrors(errorMessages);
    } else {
      console.log("hey")
      setErrors({})
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }
}

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try { 
      const result = await dispatch(airlineRegister(formData));
      if (result) {
        toast.success("Airline Registered Kindly LogIn")
        navigate("/airline/login");
      }
      
    } catch (error) {
      toast.error("failed to Register Airline")
    }
  
       
     
    
  };
 console.log(error)

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <form onSubmit={handleSubmit}>
            <Box>
              <TextField
                label="Airline Name"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                name="airlineName"
                onChange={handleChange}
                value={formData.airlineName as string}
                error={!!error.airlineName} 
                helperText={error.airlineName ? error.airlineName : ""}
              />
             
              <TextField
                label="Country of Registration"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                name="countryRegistration"
                onChange={handleChange}
                value={formData.countryRegistration as string}
                error={!!error.countryRegistration} 
                helperText={error.countryRegistration ? error.countryRegistration : ""}
              />
              <TextField
                label="IATA Code"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                name="IATA"
                onChange={handleChange}
                value={formData.IATA as string}
                error={!!error.IATA} 
                helperText={error.IATA ? error.IATA : ""}
              />
              <TextField
                label="ICAO Code"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                name="ICAO"
                onChange={handleChange}
                value={formData.ICAO as string}
                error={!!error.ICAO} 
                helperText={error.ICAO ? error.ICAO : ""}
              />
              <TextField
                label="Website (Optional)"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                name="website"
                onChange={handleChange}
                value={formData.website as string}
              />
            </Box>
          </form>
        );
      case 1:
        return (
          <form onSubmit={handleSubmit}>
            <Box>
          
              <TextField
                label="Email"
                name="email"
                value={formData.email as string}
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                onChange={handleChange}
                error={!!error.email} 
                helperText={error.email ? error.email : ""}
              />
            
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                type="tel"
                name="phone"
                onChange={handleChange}
                value={formData.phone as string}
                error={!!error.phone} 
                helperText={error.phone ? error.phone : ""}
              />
              <FormControl fullWidth margin="normal" size="small">
                <InputLabel>Role</InputLabel>
                <Select
                  label="Role"
                  name="role"
                  value={formData.role as string}
                  onChange={handleChange}
                  error={!!error.role} 
                  helperText={error.role ? error.role : ""}
                >
                  <FormHelperText>Choose your role</FormHelperText>
                  <MenuItem value="airline_representative">
                    Airline Representative
                  </MenuItem>
                  <MenuItem value="customer_relations_manager">
                    Customer Relations Manager
                  </MenuItem>
                  <MenuItem value="operations_head">Operations Head</MenuItem>
                  <MenuItem value="marketing_manager">Marketing Manager</MenuItem>
                  <MenuItem value="technical_support">Technical Support</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Office address"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                name="adress"
                value={formData.adress as string}
                onChange={handleChange}
                error={!!error.adress} 
                helperText={error.adress ? error.adress : ""}
              />
              <TextField
                label="Fax Number"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                type="tel"
                name="fax"
                value={formData.fax as string}
                onChange={handleChange}
                error={!!error.fax} 
                helperText={error.fax ? error.fax : ""}
              />
            </Box>
          </form>
        );
      case 2:
        return (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <div className="centered-container font-custom ">
              <h3 className="font-bold font-custom mb-2">
                Review Your Information
              </h3>
              <div className="font-custom opacity-75">
                <p>AirlineName-{formData.airlineName}</p>
                <p>Country-{formData.countryRegistration}</p>
                <p>IATA-{formData.IATA}</p>
                <p>ICAO-{formData.ICAO}</p>
                <p>Website-{formData.website}</p>
                <p>Phone-{formData.phone}</p>
                <p>Role-{formData.role}</p>
                <p>Email-{formData.email}</p>
                <p>Adress-{formData.adress}</p>
                <p className="mb-4">Fax-{formData.fax}</p>
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-[70px] flex relative justify-center">
      <img
        src={Bk}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative bg-white p-10 w-full max-w-md rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold font-custom mb-2">
            Airline Registration
          </h1>
          <p className="text-sm mb-4 text-[#948f8f] font-custom">
            Welcome to AeroNest, your travel companion.
          </p>
        </div>
        {renderStepContent()}
        <MobileStepper
          variant="progress"
          steps={steps.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
          sx={{ mt: 2 }}
        />
      </div>
    </div>
  );
};

export default AirlineRegistrationDesign;
