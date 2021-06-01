import "styled-components";

declare module "styled-components" {
  export interface IDefaultTheme {
    bgColor?: string;
    fontColor?: string;
    borderColor?: String;
    accent?: String;
  }
}
