import { Card, CardContent, Typography, Box, Chip, Alert } from "@mui/material";
import type { DisabledParkingData } from "../types/car";
import AccessibleIcon from "@mui/icons-material/Accessible";
import WarningIcon from "@mui/icons-material/Warning";

interface DisabledParkingInfoProps {
  parkingData: DisabledParkingData;
}

export const DisabledParkingInfo = ({ parkingData }: DisabledParkingInfoProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("he-IL");
  };

  const isPermitValid = parkingData.status.toLowerCase() === "active";
  const isExpired = new Date(parkingData.expiry_date) < new Date();

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Typography variant="h5">
            תג חניה לנכה
          </Typography>
          <AccessibleIcon color={isPermitValid ? "primary" : "disabled"} />
        </Box>

        <Alert 
          severity={isPermitValid ? "success" : "warning"}
          sx={{ mb: 3 }}
        >
          {isPermitValid 
            ? "לרכב זה יש תג חניה לנכה תקף"
            : "לרכב זה אין תג חניה לנכה תקף"}
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
              סטטוס התג
            </Typography>
            <Chip
              label={isPermitValid ? "פעיל" : "לא פעיל"}
              color={isPermitValid ? "success" : "error"}
              sx={{ mt: 1 }}
            />
          </Box>
          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              מספר תג
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {parkingData.permit_number || "N/A"}
            </Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              תאריך תפוגה
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {formatDate(parkingData.expiry_date)}
            </Typography>
          </Box>
          {isExpired && (
            <Box sx={{ p: 2, bgcolor: "rgba(255, 152, 0, 0.1)", borderRadius: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WarningIcon color="warning" />
                <Typography color="warning.main">
                  התג פג תוקף
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}; 