import { ThemeProvider, createTheme } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { memo } from "react";
import "../styles/SearchField.css";

function SearchField({
  setDidSearch,
  setValue,
  buttonText,
  setButtonText,
  setFilterQueries,
  query,
  setQuery,
}) {
  const inputStyles = {
    background: "white",
    color: "black",
    borderRadius: "4px",
  };

  const theme = createTheme({
    palette: {
      green: {
        main: "#8fd163",
      },
      red: {
        main: "#db4437",
      },
    },
  });
  return (
    <div style={{ display: "flex" }}>
      <TextField
        style={{ margin: "auto 5px auto 5px" }}
        label="Search Customer Order ID"
        type="number"
        size="small"
        variant="filled"
        inputProps={{
          style: inputStyles,
        }}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={(key) => {
          if (key.key === "Enter" && query !== "") {
            setFilterQueries(query);
            setValue(2);
            setButtonText("Clear");
            setDidSearch(true);
          }
        }}
      />
      <ThemeProvider theme={theme}>
        <Button
          className={`searchButton ${buttonText === "Advanced Search" ? "" : "redButton"
            }`}
          color={buttonText === "Advanced Search" ? "green" : "red"}
          variant="contained"
          size="small"
          onClick={() => {
            if (buttonText === "Advanced Search") {
              console.log("Advanced Search");
            } else {
              setQuery("");
              setValue(0);
              setFilterQueries("");
              setButtonText("Advanced Search");
              setDidSearch(false);
            }
          }}
        >
          {buttonText}
        </Button>
      </ThemeProvider>
    </div>
  );
}
export default memo(SearchField);
