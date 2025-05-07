import {
  TextField,
  Button,
  Box,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchBarProps {
  plateNumber: string;
  onPlateNumberChange: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
  error: string;
}

export const SearchBar = ({
  plateNumber,
  onPlateNumberChange,
  onSearch,
  loading,
  error,
}: SearchBarProps) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !loading) {
      onSearch();
    }
  };

  const handleClear = () => {
    onPlateNumberChange("");
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="Enter Plate Number"
          value={plateNumber}
          onChange={(e) => onPlateNumberChange(e.target.value)}
          onKeyPress={handleKeyPress}
          error={!!error}
          helperText={error}
          placeholder="Enter Israeli license plate number"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: plateNumber && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClear}
                  edge="end"
                  size="small"
                  sx={{ visibility: plateNumber ? "visible" : "hidden" }}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderWidth: 2,
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={onSearch}
          disabled={loading || !plateNumber.trim()}
          sx={{
            minWidth: "120px",
            height: "56px",
            fontSize: "1rem",
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)",
              transform: "translateX(-100%)",
              transition: "transform 0.6s",
            },
            "&:hover::after": {
              transform: "translateX(100%)",
            },
          }}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </Box>
    </Paper>
  );
};
