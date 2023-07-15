import DateFnsUtils from "@date-io/date-fns";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { createTheme } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import "date-fns";
import { Fragment, memo, useCallback, useEffect, useState } from "react";
import "../styles/AddDataForm.css";

function AddDataForm({ AddData }) {
  const demoInvoice = {
    DISTRIBUTION_CHANNEL: "",
    DIVISION: "",
    PURCHASE_ORDER_TYPE: "",
    ORDER_CREATION_DATE: new Date(),
    ORDER_CREATION_TIME: "",
    CREDIT_CONTROL_AREA: "",
    REQUESTED_DELIVERY_DATE: "",
    ORDER_CURRENCY: "",
    CREDIT_STATUS: "",
    ID: 0,
    CUSTOMER_ORDER_ID: "",
    SALES_ORG: "",
    COMPANY_CODE: "",
    SOLD_TO_PARTY: 0,
    CUSTOMER_NUMBER: "",
    RELEASED_CREDIT_VALUE: 0,
    ORDER_AMOUNT: 0,
    AMOUNT_IN_USD: "",
    UNIQUE_CUST_ID: 0,
  };
  const [invoice, setInvoice] = useState(demoInvoice);
  const [disableAdd, setDisableAdd] = useState(true);
  const [addSuccess, setAddSuccess] = useState(false);
  const inputStyles = {
    background: "white",
    color: "black",
    borderRadius: "4px",
  };

  const theme = createTheme({
    palette: {
      orange: {
        main: "#f37a15",
      },
      red: {
        main: "#db4437",
      },
    },
  });

  const formatDate = useCallback((date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }, []);

  const clearData = () => {
    setInvoice(demoInvoice);
  };
  const dataAddHandler = () => {
    const formattedDate = formatDate(invoice.ORDER_CREATION_DATE);
    const inv = {
      ...invoice,
      ORDER_CREATION_DATE: formattedDate,
    };
    setInvoice(demoInvoice);
    setAddSuccess(true);
    AddData(inv);
  };

  const snackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAddSuccess(false);
  };

  useEffect(() => {
    if (
      invoice.CUSTOMER_ORDER_ID !== "" &&
      invoice.SALES_ORG !== "" &&
      invoice.DISTRIBUTION_CHANNEL !== "" &&
      invoice.CUSTOMER_NUMBER !== "" &&
      invoice.COMPANY_CODE !== "" &&
      invoice.ORDER_CURRENCY !== "" &&
      invoice.AMOUNT_IN_USD !== ""
    ) {
      setDisableAdd(false);
    } else {
      if (!disableAdd) {
        setDisableAdd(true);
      }
    }
  }, [invoice]);

  return (
    <div className="addDataContainer">
      <div className="Form">
        <div className="row">
          <div className="firstHalf">
            <TextField
              fullWidth
              className="oneForth"
              label="Customer Order ID"
              type="number"
              value={invoice.CUSTOMER_ORDER_ID}
              onChange={(e) => {
                setInvoice({
                  ...invoice,
                  CUSTOMER_ORDER_ID: e.target.value,
                });
              }}
              size="medium"
              variant="filled"
              inputProps={{
                style: inputStyles,
              }}
            />
            <TextField
              fullWidth
              className="oneForth"
              label="Sales Org"
              type="number"
              size="medium"
              variant="filled"
              inputProps={{
                style: inputStyles,
              }}
              value={invoice.SALES_ORG}
              onChange={(e) => {
                setInvoice({
                  ...invoice,
                  SALES_ORG: e.target.value,
                });
              }}
            />
          </div>
          <div className="secondHalf">
            <TextField
              fullWidth
              className="twoForth"
              label="Distribution Channel"
              size="medium"
              variant="filled"
              inputProps={{
                style: inputStyles,
              }}
              value={invoice.DISTRIBUTION_CHANNEL}
              onChange={(e) => {
                setInvoice({
                  ...invoice,
                  DISTRIBUTION_CHANNEL: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="firstHalf">
            <TextField
              fullWidth
              className="oneForth"
              label="Customer Number"
              type="number"
              value={invoice.CUSTOMER_NUMBER}
              onChange={(e) => {
                setInvoice({
                  ...invoice,
                  CUSTOMER_NUMBER: e.target.value,
                });
              }}
              size="medium"
              variant="filled"
              inputProps={{
                style: inputStyles,
              }}
            />
            <TextField
              fullWidth
              className="oneForth"
              label="Company Code"
              type="number"
              size="medium"
              variant="filled"
              inputProps={{
                style: inputStyles,
              }}
              value={invoice.COMPANY_CODE}
              onChange={(e) => {
                setInvoice({
                  ...invoice,
                  COMPANY_CODE: e.target.value,
                });
              }}
            />
          </div>
          <div className="secondHalf">
            <TextField
              fullWidth
              className="twoForth"
              label="Order Currency"
              size="medium"
              variant="filled"
              inputProps={{
                style: inputStyles,
              }}
              value={invoice.ORDER_CURRENCY}
              onChange={(e) => {
                setInvoice({
                  ...invoice,
                  ORDER_CURRENCY: e.target.value,
                });
              }}
            />
            <TextField
              fullWidth
              className="twoForth"
              label="Amount in USD"
              type="number"
              size="medium"
              variant="filled"
              inputProps={{
                style: inputStyles,
              }}
              value={invoice.AMOUNT_IN_USD}
              onChange={(e) => {
                setInvoice({
                  ...invoice,
                  AMOUNT_IN_USD: e.target.value,
                });
              }}
            />
            <div className="twoForth datePickerContainer">
              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                className="datePicker"
              >
                <KeyboardDatePicker
                  margin="none"
                  label="Order Creation Date"
                  format="dd/MM/yyyy"
                  value={invoice.ORDER_CREATION_DATE}
                  onChange={(date) => {
                    setInvoice({
                      ...invoice,
                      ORDER_CREATION_DATE: date,
                    });
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
        </div>
        <ThemeProvider theme={theme}>
          <div className="buttonContainer">
            <Button
              disabled={disableAdd}
              color="orange"
              variant="contained"
              size="small"
              style={{ width: "100%" }}
              onClick={() => {
                dataAddHandler();
              }}
            >
              Add
            </Button>
            <Button
              color="red"
              variant="contained"
              size="small"
              style={{ width: "100%" }}
              onClick={() => clearData()}
            >
              Clear Data
            </Button>
          </div>
        </ThemeProvider>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={addSuccess}
        autoHideDuration={6000}
        onClose={snackBarClose}
        message="Data Added"
        action={
          <Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={snackBarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
      />
    </div>
  );
}

export default memo(AddDataForm);
