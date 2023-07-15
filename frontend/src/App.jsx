import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import SimpleTabs from "./components/TabPage";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/h2h_backend/DataLoadingServlet"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const AddData = async (invoice) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/h2h_backend/AddServlet",
        invoice
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    fetchData();
  };

  const deleteData = async (rows) => {
    const data = { idList: rows };
    try {
      const response = await axios.delete(
        "http://localhost:8080/h2h_backend/DataDeletingServlet",
        { data }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    fetchData();
  };

  const editData = async (
    id,
    orderCurrency,
    companyCode,
    distributionChannel
  ) => {
    const oldInvoice = data.find((row) => row.ID === id);
    const invoice = {
      ...oldInvoice,
      DISTRIBUTION_CHANNEL: distributionChannel,
      ORDER_CURRENCY: orderCurrency,
      COMPANY_CODE: companyCode,
    };
    const newData = { id: invoice.ID, invoice };
    try {
      const response = await axios.put(
        "http://localhost:8080/h2h_backend/DataEditingServlet",
        newData
      );
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    fetchData();
  };

  const convertDateStringToNumber = (dateString) => {
    var parts = dateString.split("-");
    var day = parseInt(parts[0]);
    var month = parseInt(parts[1]);
    var year = parseInt(parts[2]);
    var date = new Date(year, month - 1, day);
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString().padStart(2, "0");
    var dd = date.getDate().toString().padStart(2, "0");
    var convertedDate = parseInt(yyyy + mm + dd);
    return convertedDate;
  };

  const predictAmount = async (id) => {
    const invoice = data.find((row) => row.ID === id);
    const orderDate = convertDateStringToNumber(invoice.ORDER_CREATION_DATE);
    const deliveryDate = convertDateStringToNumber(
      invoice.REQUESTED_DELIVERY_DATE
    );
    const updatedInvoice = {
      ...invoice,
      ORDER_CREATION_DATE: orderDate,
      REQUESTED_DELIVERY_DATE: isNaN(deliveryDate) ? orderDate : deliveryDate,
    };
    try {
      const flaskRes = await axios.post(
        "http://127.0.0.1:5000/get_price",
        updatedInvoice
      );
      const newInvoice = {
        ...invoice,
        AMOUNT_IN_USD: flaskRes.data.price,
      };
      const newData = { id: newInvoice.ID, invoice: newInvoice };
      const response = await axios.put(
        "http://localhost:8080/h2h_backend/DataEditingServlet",
        newData
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <SimpleTabs
        data={data}
        refreshData={fetchData}
        deleteData={deleteData}
        editData={editData}
        AddData={AddData}
        predictAmount={predictAmount}
        loading={loading}
      />
    </>
  );
}

export default App;

