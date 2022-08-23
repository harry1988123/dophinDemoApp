import "./App.css";
import { API } from "aws-amplify";
import React, { useState } from "react";
import LoginPage from "./LoginPage";

const myAPI = "api8c92fafa";
const path = "/customers";

const App = () => {
  const [input, setInput] = useState("");
  const [customers, setCustomers] = useState([]);

  //Function to fetch from our backend and update customers array
  function getCustomer(e) {
    let customerId = e.input;
    API.get(myAPI, path + "/" + customerId)
      .then((response) => {
        console.log("Success" + response);
        let newCustomers = [...customers];
        newCustomers.push(response);
        setCustomers(newCustomers);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <LoginPage />
      <h1>Super Simple React App</h1>
      <div>
        <input
          placeholder="customer id"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <br />
      <button onClick={() => getCustomer({ input })}>
        Get Customer From Backend
      </button>

      <h2 style={{ visibility: customers.length > 0 ? "visible" : "hidden" }}>
        Response
      </h2>
      {customers.map((thisCustomer, index) => {
        return (
          <div key={thisCustomer.customerId}>
            <span>
              <b>CustomerId:</b> {thisCustomer.customerId} - <b>CustomerName</b>
              : {thisCustomer.customerName}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default App;
