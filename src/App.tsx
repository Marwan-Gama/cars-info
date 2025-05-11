import { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { searchCarByPlate, searchTaxByPlate, searchDisabledParkingByPlate } from "./services/carService";
import type { CarData, TaxData, DisabledParkingData } from "./types/car";
import { SearchBar } from "./components/SearchBar";
import { CarDetails } from "./components/CarDetails";
import { TaxInfo } from "./components/TaxInfo";
import { DisabledParkingInfo } from "./components/DisabledParkingInfo";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { Notification } from "./components/Notification";
import "./App.css";

function App() {
  const [plateNumber, setPlateNumber] = useState("");
  const [carData, setCarData] = useState<CarData | null>(null);
  const [taxData, setTaxData] = useState<TaxData | null>(null);
  const [parkingData, setParkingData] = useState<DisabledParkingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "info" | "warning",
  });

  const handleSearch = async () => {
    if (!plateNumber) {
      setError("Please enter a plate number");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const [carResponse, taxResponse, parkingResponse] = await Promise.all([
        searchCarByPlate(plateNumber),
        searchTaxByPlate(plateNumber),
        searchDisabledParkingByPlate(plateNumber),
      ]);

      console.log('Car API Response:', carResponse);
      console.log('Tax API Response:', taxResponse);
      console.log('Parking API Response:', parkingResponse);

      if (carResponse.result.records.length > 0) {
        setCarData(carResponse.result.records[0]);
        if (taxResponse.result.records.length > 0) {
          setTaxData(taxResponse.result.records[0]);
        } else {
          setTaxData(null);
        }
        const parkingRecord = parkingResponse.result.records[0];
        if (parkingRecord && parkingRecord.status) {
          setParkingData(parkingRecord);
        } else {
          setParkingData(null);
        }
        setNotification({
          open: true,
          message: "Car information found successfully!",
          severity: "success",
        });
      } else {
        setError("No car found with this plate number");
        setCarData(null);
        setTaxData(null);
        setParkingData(null);
        setNotification({
          open: true,
          message: "No car found with this plate number",
          severity: "warning",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error fetching car data");
      setCarData(null);
      setTaxData(null);
      setParkingData(null);
      setNotification({
        open: true,
        message: "Error fetching car data. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="md" className="app-container">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Car Information Search
        </Typography>

        <SearchBar
          plateNumber={plateNumber}
          onPlateNumberChange={setPlateNumber}
          onSearch={handleSearch}
          loading={loading}
          error={error}
        />

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {error && (
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="error.main">
                  {error}
                </Typography>
              </Box>
            )}
            {carData && !error && (
              <CarDetails 
                carData={carData} 
                hasDisabledParking={parkingData?.status.toLowerCase() === "active"} 
              />
            )}
            {taxData && !error && <TaxInfo taxData={taxData} />}
            {parkingData && !error && <DisabledParkingInfo parkingData={parkingData} />}
          </>
        )}

        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />
      </Box>
    </Container>
  );
}

export default App;
