import { Skeleton, Card, CardContent, Box } from "@mui/material";

export const LoadingSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: 3,
          }}
        >
          {[...Array(10)].map((_, index) => (
            <Box key={index} sx={{ p: 2 }}>
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="80%" height={24} />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
