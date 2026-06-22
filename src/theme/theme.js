import { createTheme } from "@mui/material/styles";

const theme = createTheme({
 palette: {
  mode: "dark",

  primary: {
    main: "#8B5CF6",
  },

  background: {
    default: "#171717",
    paper: "#212121",
  },

  text: {
    primary: "#ECECEC",
    secondary: "#A3A3A3",
  }
}
});

export default theme;