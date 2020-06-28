import React from "react";
import { Header, Icon, List } from "semantic-ui-react";
import axios from "axios";

function App() {
  axios.get("https://localhost:5001/WeatherForecast").then((response: any) => {
    console.log(response);
  });
  return (
    <div>
      <Header as="h2" icon="users" content="Insurers" />
      <List>
        <List.Item>Apples</List.Item>
        <List.Item>Pears</List.Item>
        <List.Item>Oranges</List.Item>
      </List>
    </div>
  );
}

export default App;
