import axios from "axios";
import type { CarSearchResponse, TaxSearchResponse, DisabledParkingResponse } from "../types/car";

const API_BASE_URL = "https://data.gov.il/api/3/action/datastore_search";

export const searchCarByPlate = async (
  plateNumber: string
): Promise<CarSearchResponse> => {
  try {
    console.log("Searching for car with plate number:", plateNumber);
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      throw new Error(`API Error: ${error.message}`);
    }
    console.error("Error fetching car data:", error);
    throw error;
  }
};

export const searchTaxByPlate = async (
  plateNumber: string
): Promise<TaxSearchResponse> => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        resource_id: "c8b9f9c8-4612-4068-934f-d4acd2e3c06e",
        q: plateNumber,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tax data:", error);
    throw error;
  }
};

export const searchDisabledParkingByPlate = async (
  plateNumber: string
): Promise<DisabledParkingResponse> => {
  try {
    console.log("Searching for disabled parking with plate number:", plateNumber);
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Disabled Parking API Error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      // Return empty result instead of throwing error
      return {
        result: {
          records: []
        }
      };
    }
    console.error("Error fetching disabled parking data:", error);
    // Return empty result instead of throwing error
    return {
      result: {
        records: []
      }
    };
  }
};
