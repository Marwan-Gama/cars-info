import axios from "axios";
import type { CarSearchResponse, TaxSearchResponse, DisabledParkingResponse } from "../types/car";

const API_BASE_URL = "https://data.gov.il/api/3/action/datastore_search";

// Mock data for development - matching the original types
const mockCarData: CarSearchResponse = {
  result: {
    records: [
      {
        mispar_rechev: "1234567",
        tozeret_nm: "Toyota",
        kinuy_mishari: "Corolla",
        shnat_yitzur: 2020,
        baalut: "ישראל ישראלי",
        misgeret: "1HGBH41JXMN109186",
        tzeva_rechev: "לבן",
        zmig_kidmi: "אוטומטי",
        zmig_ahori: "אוטומטי",
        sug_delek_nm: "בנזין",
      }
    ]
  }
};

const mockTaxData: TaxSearchResponse = {
  result: {
    records: [
      {
        mispar_rechev: "1234567",
        shnat_yitzur: 2020,
        sug_rechev: "רכב פרטי",
        sug_baalut: "פרטי",
        status: "שולם",
        last_payment_date: "2024-01-15",
        next_payment_date: "2024-12-31",
      }
    ]
  }
};

const mockParkingData: DisabledParkingResponse = {
  result: {
    records: [
      {
        mispar_rechev: "1234567",
        status: "פעיל",
        expiry_date: "2025-01-01",
        permit_number: "DP123456",
      }
    ]
  }
};

export const searchCarByPlate = async (
  plateNumber: string
): Promise<CarSearchResponse> => {
  try {
    console.log("Searching for car with plate number:", plateNumber);
    
    // Use mock data for development
    if (plateNumber.trim() === "1234567") {
      console.log("Using mock car data");
      return mockCarData;
    }
    
    // Try real API if available
    const response = await axios.get(API_BASE_URL, {
      params: {
        resource_id: "053cea08-09bc-40ec-8f7a-156f0677aff3",
        q: plateNumber,
      },
      timeout: 10000, // 10 second timeout
    });
    
    console.log("API Response:", response.data);
    
    if (!response.data || !response.data.result) {
      throw new Error("Invalid response format from API");
    }
    
    return response.data;
  } catch {
    console.log("API failed, using mock data");
    // Return mock data if API fails
    if (plateNumber.trim() === "1234567") {
      return mockCarData;
    }
    // Return empty result for other plate numbers
    return {
      result: {
        records: []
      }
    };
  }
};

export const searchTaxByPlate = async (
  plateNumber: string
): Promise<TaxSearchResponse> => {
  try {
    // Use mock data for development
    if (plateNumber.trim() === "1234567") {
      console.log("Using mock tax data");
      return mockTaxData;
    }
    
    const response = await axios.get(API_BASE_URL, {
      params: {
        resource_id: "c8b9f9c8-4612-4068-934f-d4acd2e3c06e",
        q: plateNumber,
      },
    });
    return response.data;
  } catch {
    console.log("Tax API failed, using mock data");
    if (plateNumber.trim() === "1234567") {
      return mockTaxData;
    }
    return {
      result: {
        records: []
      }
    };
  }
};

export const searchDisabledParkingByPlate = async (
  plateNumber: string
): Promise<DisabledParkingResponse> => {
  try {
    console.log("Searching for disabled parking with plate number:", plateNumber);
    
    // Use mock data for development
    if (plateNumber.trim() === "1234567") {
      console.log("Using mock parking data");
      return mockParkingData;
    }
    
    const response = await axios.get(API_BASE_URL, {
      params: {
        resource_id: "c8b9f9c8-4612-4068-934f-d4acd2e3c06e",
        q: plateNumber,
      },
      timeout: 10000,
    });
    
    console.log("Disabled Parking API Response:", response.data);
    
    if (!response.data || !response.data.result) {
      throw new Error("Invalid response format from API");
    }
    
    return response.data;
  } catch {
    console.log("Parking API failed, using mock data");
    if (plateNumber.trim() === "1234567") {
      return mockParkingData;
    }
    return {
      result: {
        records: []
      }
    };
  }
};
