import { useState } from "react";
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
    if (!plateNumber.trim()) return;

    setLoading(true);
    setError("");
    setCarData(null);
    setTaxData(null);
    setParkingData(null);

    try {
      const [carResponse, taxResponse, parkingResponse] = await Promise.all([
        searchCarByPlate(plateNumber),
        searchTaxByPlate(plateNumber),
        searchDisabledParkingByPlate(plateNumber),
      ]);

      if (carResponse.result.records.length > 0) {
        setCarData(carResponse.result.records[0]);
        if (taxResponse.result.records.length > 0) {
          setTaxData(taxResponse.result.records[0]);
        }
        if (parkingResponse.result.records.length > 0) {
          setParkingData(parkingResponse.result.records[0]);
        }

        setNotification({
          open: true,
          message: "Vehicle information retrieved successfully",
          severity: "success",
        });
      } else {
        setError("No car found with this plate number");
        setNotification({
          open: true,
          message: "No car found with this plate number",
          severity: "warning",
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setNotification({
        open: true,
        message: err instanceof Error ? err.message : "An error occurred",
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
    <div className="app-container">
      <h1 className="app-title">Car Information Search</h1>

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
          {error && <div className="error-message">{error}</div>}
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
    </div>
  );
}

export default App;
