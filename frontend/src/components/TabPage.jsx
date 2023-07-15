import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { TabContext } from "@mui/lab";
import { memo, useState } from "react";
import "../styles/TabPage.css";
import AddDataForm from "./AddDataForm";
import InvoiceDataGrid from "./InvoiceDataGrid";
import SearchField from "./SearchField";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

function SimpleTabs({
  data,
  refreshData,
  loading,
  deleteData,
  editData,
  AddData,
  predictAmount,
}) {
  const [value, setValue] = useState(0);
  const [didSearch, setDidSearch] = useState(false);
  const [buttonText, setButtonText] = useState("Advanced Search");
  const [filterQueries, setFilterQueries] = useState("");
  const [query, setQuery] = useState("");

  const handleChange = (event, newValue) => {
    setDidSearch(false);
    setFilterQueries("");
    setQuery("");
    setButtonText("Advanced Search");
    setValue(newValue);
  };

  return (
    <div className="TabContainer">
      <TabContext>
        <div
          style={{
            display: "flex",
            backgroundColor: "#4f4f4f",
            justifyContent: "space-between",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Home Page" />
            <Tab label="Add Data" />
            {didSearch && <Tab label="Search Results" />}
            {!didSearch && <div></div>}
            <Tab label="Analytics View" />
          </Tabs>
          <SearchField
            setDidSearch={setDidSearch}
            setValue={setValue}
            buttonText={buttonText}
            setButtonText={setButtonText}
            setFilterQueries={setFilterQueries}
            query={query}
            setQuery={setQuery}
          />
        </div>
      </TabContext>
      <TabPanel value={value} index={0}>
        <>
          {loading && (
            <center>
              <h2>Loading...</h2>
            </center>
          )}
          {!loading && (
            <InvoiceDataGrid
              data={data}
              filterQueries={filterQueries}
              refreshData={refreshData}
              deleteData={deleteData}
              editData={editData}
              predictAmount={predictAmount}
            />
          )}
        </>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddDataForm AddData={AddData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <InvoiceDataGrid
          data={data}
          filterQueries={filterQueries}
          refreshData={refreshData}
          deleteData={deleteData}
          editData={editData}
          predictAmount={predictAmount}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h2>Analysis Page</h2>
      </TabPanel>
    </div>
  );
}

export default memo(SimpleTabs);
