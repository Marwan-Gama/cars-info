import "./SearchBar.css";

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
    <div className="search-container">
      <div className="search-form">
        <div className="search-input-container">
          <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            type="text"
            className={`search-input ${error ? "error" : ""}`}
            value={plateNumber}
            onChange={(e) => onPlateNumberChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter Israeli license plate number"
          />
          {plateNumber && (
            <svg
              className="clear-icon"
              onClick={handleClear}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          )}
          {error && <div className="error-message">{error}</div>}
        </div>
        <button
          className="search-button"
          onClick={onSearch}
          disabled={loading || !plateNumber.trim()}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
};
