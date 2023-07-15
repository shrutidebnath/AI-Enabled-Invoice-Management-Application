import { makeStyles } from "@material-ui/core";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { memo, useCallback, useState } from "react";
import DeleteAlert from "./DeleteAlert";
import EditAlert from "./EditAlert";

const theme = createTheme({
  palette: {
    orange: {
      main: "#f37a15",
    },
    steelBlue: {
      main: "#0e50bb",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function CustomButton({
  selectedRows,
  refreshData,
  deleteData,
  editData,
  predictAmount,
}) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);

  const handleDeleteConfirm = useCallback(() => {
    const ids = selectedRows.map((row) => row.id);
    deleteData(ids);
    setShowDeleteAlert(false);
  }, [selectedRows]);

  const handleDeleteClose = useCallback(() => {
    setShowDeleteAlert(false);
  }, []);

  const handleEditConfirm = useCallback(
    (orderCurrency, companyCode, distributionChannel) => {
      const id = selectedRows[0].id;
      editData(id, orderCurrency, companyCode, distributionChannel);
      setShowEditAlert(false);
    },
    [selectedRows]
  );

  const handleEditClose = useCallback(() => {
    setShowEditAlert(false);
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Stack direction="row" gap={1}>
          <Button
            color="orange"
            variant="contained"
            size="small"
            onClick={() => {
              refreshData();
            }}
          >
            Refresh Data
          </Button>
          <Button
            color="orange"
            variant="contained"
            size="small"
            disabled={!(selectedRows.length === 1)}
            onClick={() => {
              setShowEditAlert(true);
            }}
          >
            Edit
          </Button>
          <EditAlert
            open={showEditAlert}
            handleEditConfirm={handleEditConfirm}
            handleEditClose={handleEditClose}
            data={selectedRows[0]}
          />
          <Button
            color="orange"
            variant="contained"
            size="small"
            disabled={selectedRows.length === 0}
            onClick={() => {
              setShowDeleteAlert(true);
            }}
          >
            Delete
          </Button>
          <DeleteAlert
            open={showDeleteAlert}
            handleDeleteConfirm={handleDeleteConfirm}
            handleDeleteClose={handleDeleteClose}
          />

          <Button
            color="steelBlue"
            variant="contained"
            size="small"
            disabled={!(selectedRows.length === 1)}
            onClick={() => {
              predictAmount(selectedRows[0].id);
            }}
          >
            Predict
          </Button>
        </Stack>
      </ThemeProvider>
    </div>
  );
}
export default memo(CustomButton);
