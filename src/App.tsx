import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { ourTheme } from "./styles";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { isLoggedInVar } from "./apollo";

interface IContainerProps {
  floating: boolean;
}

const Container = styled.div<IContainerProps>`
  background-color:${(props) => props.theme.bgColor}
  color: ${(props) => props.theme.fontColor}
  box-shadow: ${(props) => (props.floating ? "" : "")}
`;

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <ThemeProvider theme={ourTheme}>
            <Container floating={true}>
              {isLoggedIn ? <Home /> : <Login />}
            </Container>
          </ThemeProvider>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
