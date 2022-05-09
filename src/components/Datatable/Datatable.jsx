import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
const Datatable = () => {
  const [coins, setCoins] = useState([]);

  const columns = [
    { field: "name", headerName: "Name", width: 70 },
    { field: "symbol", headerName: "Symbol", width: 130 },
    { field: "current_price", headerName: "Price", width: 130 },
    {
      field: "price_change_percentage_24h",
      headerName: "Change",
      type: "number",
      width: 90,
    },
  ];
  const fetchCoins = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const data = await res.json();
      setCoins(data);
    } catch (e) {
      alert("Api error");
    }
  };
  useEffect(() => {
    fetchCoins();
  }, []);
  return (
    <div>
      <div style={{ width: "100%", height: "24rem" }}>
        <DataGrid
          rows={coins}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default Datatable;