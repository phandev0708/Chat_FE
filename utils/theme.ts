import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
export let theme = createTheme({
    typography: {
        fontFamily: '"Roboto","Arial",sans-serif',
    },
    palette: {
        primary: {
            main: "rgba( 0, 113, z )",
        },
        secondary: {
            main: "#19857b",
        },
        error: {
            main: red.A400,
        },
    },
    components: {
        MuiLink: {
            defaultProps: {
                underline: "none",
            },
            styleOverrides: {
                root: {
                    color: "#000",
                    "&:hover, &.active": {
                        color: "rgba( 0, 113, 188 )",
                    },
                },
            },
        },
    },
});

theme = responsiveFontSizes(theme);
