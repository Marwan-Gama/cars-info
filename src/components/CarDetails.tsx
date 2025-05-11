import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import type { CarData } from "../types/car";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AccessibleIcon from "@mui/icons-material/Accessible";

interface CarDetailsProps {
  carData: CarData;
  hasDisabledParking?: boolean;
}

export const CarDetails = ({ carData, hasDisabledParking = false }: CarDetailsProps) => {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Typography variant="h5">פרטי הרכב</Typography>
          <DirectionsCarIcon color="primary" />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              מספר רכב
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {carData.mispar_rechev}
            </Typography>
          </Box>

          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              יצרן
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {carData.tozeret_nm}
            </Typography>
          </Box>

          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              דגם
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {carData.kinuy_mishari}
            </Typography>
          </Box>

          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              שנת ייצור
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {carData.shnat_yitzur}
            </Typography>
          </Box>

          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              בעלות
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {carData.baalut}
            </Typography>
          </Box>

          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              מספר שלדה
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {carData.misgeret}
            </Typography>
          </Box>

          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              צבע
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {carData.tzeva_rechev}
            </Typography>
          </Box>

          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              סוג דלק
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {carData.sug_delek_nm}
            </Typography>
          </Box>

          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              צמיג קדמי
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {carData.zmig_kidmi}
            </Typography>
          </Box>

          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              צמיג אחורי
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {carData.zmig_ahori}
            </Typography>
          </Box>

          <Box sx={{ p: 2, bgcolor: "rgba(33, 150, 243, 0.04)", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              תג חניה לנכה
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Chip
                label={hasDisabledParking ? "יש תג חניה לנכה" : "אין תג חניה לנכה"}
                color={hasDisabledParking ? "success" : "default"}
                icon={<AccessibleIcon />}
              />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}; 