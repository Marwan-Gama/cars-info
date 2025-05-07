import axios from "axios";
import type { CarSearchResponse, TaxSearchResponse, DisabledParkingResponse } from "../types/car";

const API_BASE_URL = "https://data.gov.il/api/3/action/datastore_search";

export const searchCarByPlate = async (
  plateNumber: string
): Promise<CarSearchResponse> => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        resource_id: "053cea08-09bc-40ec-8f7a-156f0677aff3",
        q: plateNumber,
      },
    });
    return response.data;
  } catch (error) {
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
    const response = await axios.get(API_BASE_URL, {
      params: {
        resource_id: "c8b9f9c8-4612-4068-934f-d4acd2e3c06e",
        q: plateNumber,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching disabled parking data:", error);
    throw error;
  }
};
