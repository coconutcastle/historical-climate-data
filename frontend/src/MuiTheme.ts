import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const MuiTheme = createTheme({
  palette: {
    primary: {
      main: '#59A1D6'
    },
    secondary: {
      main: '#59A1D6'
    }
  },
  typography: {
    "fontFamily": "Montserrat"
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "&.MuiAutocomplete-root": {
            backgroundColor: '#E8E8E8',
            height: '35px',
            fontSize: '12px',
            padding: 'none',
          }
        },
        inputRoot: {
          height: '35px',
          fontSize: '12px',
          padding: '0px 4px 0px 6px',
          "& .MuiOutlinedInput-notchedOutline": {
            border: 'none',
            borderRadius: '0px'
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: 'none',
            borderRadius: '0px'
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: 'none',
            borderRadius: '0px'
          },
          "&.MuiInputBase-input": {
            height: '35px',
            fontSize: '12px',
            padding: 'none',
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        }
      }
    }
  }
});