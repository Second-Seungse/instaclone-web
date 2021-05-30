import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { ourTheme } from "./styles";

interface IContainerProps {
  floating: boolean;
}

const Container = styled.div<IContainerProps>`
  background-color:${(props) => props.theme.bgColor}
  color: ${(props) => props.theme.fontColor}
  box-shadow: ${(props) => (props.floating ? "" : "")}
`;

function App() {
  return (
    <Router>
      <Route path="/"></Route>
      <Route path="/potato">
        <ThemeProvider theme={ourTheme}>
          <Container floating={true}>Potato</Container>
        </ThemeProvider>
      </Route>
      <Route path="/banana">
        <ThemeProvider theme={ourTheme}>
          <Container floating={true}>banana</Container>
        </ThemeProvider>
      </Route>
    </Router>
  );
}

export default App;
