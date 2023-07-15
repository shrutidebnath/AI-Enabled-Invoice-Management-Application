import { DataGrid, GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import { memo, useState } from "react";
import "../styles/InvoiceDataGrid.css";
import CustomButton from "./CustomButton";

const columns = [
  {
    field: "id",
    headerName: "Sl No",
    width: 100,
    sortable: true,
  },
  {
    field: "customer_order_id",
    headerName: "Customer Order ID",
    width: 150,
    sortable: true,
  },
  {
    field: "sales_org",
    headerName: "Sales Org",
    width: 100,
    sortable: true,
  },
  {
    field: "distribution_channel",
    headerName: "Distribution Channel",
    width: 200,
    sortable: true,
  },
  {
    field: "company_code",
    headerName: "Company Code",
    sortable: true,
    width: 120,
  },
  {
    field: "order_creation_date",
    headerName: "Order Creation Date",
    sortable: true,
    width: 150,
    type: "date",
  },
  {
    field: "order_amount",
    headerName: "Order Amount",
    sortable: true,
    width: 120,
    type: "number",
  },
  {
    field: "order_currency",
    headerName: "Order Currency",
    sortable: true,
    width: 120,
  },
  {
    field: "customer_number",
    headerName: "Customer Number",
    sortable: true,
    width: 140,
  },
];

function InvoiceDataGrid({
  data,
  filterQueries,
  refreshData,
  deleteData,
  editData,
  predictAmount,
}) {
  const [selectedRows, setSelectedRows] = useState([]);
  const getDate = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const CustomFooter = () => {
    return (
      <GridFooterContainer
        sx={{ color: "#EEF1F6" }}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <CustomButton
          selectedRows={selectedRows}
          refreshData={refreshData}
          deleteData={deleteData}
          editData={editData}
          predictAmount={predictAmount}
        />
        <GridFooter style={{ color: "white" }} />
      </GridFooterContainer>
    );
  };

  const rows =
    data === null
      ? []
      : data?.map((row) => ({
          id: row.ID,
          customer_order_id: row.CUSTOMER_ORDER_ID,
          sales_org: row.SALES_ORG,
          distribution_channel: row.DISTRIBUTION_CHANNEL,
          company_code: row.COMPANY_CODE,
          order_creation_date: getDate(row.ORDER_CREATION_DATE),
          order_amount: row.AMOUNT_IN_USD,
          order_currency: row.ORDER_CURRENCY,
          customer_number: row.CUSTOMER_NUMBER,
        }));

  const filteredRows =
    filterQueries === ""
      ? rows
      : rows.filter(
          (row) => row.customer_order_id.toString() === filterQueries.toString()
        );

  return (
    <div className="gridBox">
      <DataGrid
        sx={{ color: "#EEF1F6" }}
        style={{ borderBottom: "none" }}
        className="gridCell"
        rowHeight={40}
        rows={filteredRows}
        columns={columns}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Footer: CustomFooter,
        }}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = rows.filter((row) => selectedIDs.has(row.id));
          setSelectedRows(selectedRowData);
        }}
      />
    </div>
  );
}

export default memo(InvoiceDataGrid);
