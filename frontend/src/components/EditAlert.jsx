import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { memo, useEffect, useState } from "react";

function EditAlert({ open, handleEditConfirm, handleEditClose, data }) {
  const [orderCurrency, setOrderCurrency] = useState(
    data ? data.order_currency : ""
  );
  const [companyCode, setCompanyCode] = useState(data ? data.company_code : 0);
  const [distributionChannel, setDistributionChannel] = useState(
    data ? data.distribution_channel : ""
  );
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (
      orderCurrency === "" ||
      companyCode === "" ||
      distributionChannel === "" ||
      (orderCurrency === data.order_currency &&
        distributionChannel === data.distribution_channel &&
        companyCode === data.company_code)
    ) {
      setDisableButton(true);
    } else {
      if (disableButton) setDisableButton(false);
    }
  }, [orderCurrency, companyCode, distributionChannel]);

  return (
    <Dialog
      open={open}
      onClose={handleEditClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Edit"}</DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", marginBottom: "5px" }}>
          <TextField
            style={{ marginRight: "2px" }}
            label="Order Currency"
            variant="outlined"
            value={orderCurrency}
            onChange={(e) => {
              setOrderCurrency(e.target.value);
            }}
          />
          <TextField
            style={{ marginLeft: "2px" }}
            label="Company Code"
            type="number"
            variant="outlined"
            value={companyCode}
            onChange={(e) => {
              setCompanyCode(e.target.value);
            }}
          />
        </div>
        <TextField
          style={{ marginTop: "5px" }}
          fullWidth={true}
          label="Distribution Channel"
          variant="outlined"
          value={distributionChannel}
          onChange={(e) => {
            setDistributionChannel(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() =>
            handleEditConfirm(orderCurrency, companyCode, distributionChannel)
          }
          color="primary"
          autoFocus
          disabled={disableButton}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(EditAlert);
