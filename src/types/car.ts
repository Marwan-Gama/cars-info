export interface CarData {
  mispar_rechev: string;
  tozeret_nm: string;
  kinuy_mishari: string;
  shnat_yitzur: number;
  baalut: string;
  misgeret: string;
  tzeva_rechev: string;
  zmig_kidmi: string;
  zmig_ahori: string;
  sug_delek_nm: string;
}

export interface CarSearchResponse {
  result: {
    records: CarData[];
  };
}

export interface TaxData {
  mispar_rechev: string;
  shnat_yitzur: number;
  sug_rechev: string;
  sug_baalut: string;
  status: string;
  last_payment_date: string;
  next_payment_date: string;
}

export interface TaxSearchResponse {
  result: {
    records: TaxData[];
  };
}

export interface DisabledParkingData {
  mispar_rechev: string;
  status: string;
  expiry_date: string;
  permit_number: string;
}

export interface DisabledParkingResponse {
  result: {
    records: DisabledParkingData[];
  };
}
