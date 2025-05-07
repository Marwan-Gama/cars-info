import { Card, CardContent, Typography, Box, Chip, Alert } from "@mui/material";
import type { TaxData } from "../types/car";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";

interface TaxInfoProps {
  taxData: TaxData;
}

export const TaxInfo = ({ taxData }: TaxInfoProps) => {
  const getStatusColor = (status: string): "success" | "error" | "warning" => {
    switch (status.toLowerCase()) {
      case "paid":
        return "success";
      case "unpaid":
        return "error";
      default:
        return "warning";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("he-IL");
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <CheckCircleIcon color="success" />;
      case "unpaid":
        return <ErrorIcon color="error" />;
      default:
        return <WarningIcon color="warning" />;
    }
  };

  const isTaxValid = taxData.status.toLowerCase() === "paid";

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Typography variant="h5">
            Tag Nachim Status
          </Typography>
          {getStatusIcon(taxData.status)}
        </Box>

        <Alert 
          severity={isTaxValid ? "success" : "error"}
          sx={{ mb: 3 }}
        >
          {isTaxValid 
            ? "This vehicle has valid tag nachim payments"
            : "This vehicle has unpaid tag nachim payments"}
        </Alert>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Payment Status
            </Typography>
            <Chip
              label={taxData.status}
              color={getStatusColor(taxData.status)}
              sx={{ mt: 1 }}
            />
          </Box>
          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Last Payment Date
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {formatDate(taxData.last_payment_date)}
            </Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Next Payment Due
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {formatDate(taxData.next_payment_date)}
            </Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Vehicle Type
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {taxData.sug_rechev}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}; 