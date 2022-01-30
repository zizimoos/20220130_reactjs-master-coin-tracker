import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bgColor: string;
      bgColor2: string;
      textColor: string;
      btnColor: string;
      accentColor: string;
    };
  }
}
