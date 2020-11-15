import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    basicWidth: string;
    colors: {
      main: string;
      secondary: string;
    };
  }
}
