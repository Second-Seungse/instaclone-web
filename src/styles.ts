import { createGlobalStyle, IDefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightTheme: IDefaultTheme = {
  accent: "#0095f6",
  bgColor: "#FAFAFA",
  fontColor: "rgb(38, 38, 38)",
  borderColor: "rgb(219, 219, 219)",
};

export const darkTheme: IDefaultTheme = {
  fontColor: "white",
  bgColor: "#000",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
      background-color:${(props: any) => props.theme.bgColor};
      font-size:14px;
      font-family:'Open Sans', sans-serif;
      color:${(props: any) => props.theme.fontColor};
    }
    a {
      text-decoration: none;
      color:inherit;
    }
`;

/* interface IContainerProps {
  floating: boolean;
}

const Container = styled.div<IContainerProps>`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.fontColor};
  box-shadow: ${(props) => (props.floating ? "" : "")};
`; */
