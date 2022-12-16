import { createTheme } from '@mui/material/styles';
import { createFilterOptions } from "@mui/material";

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
          },
          overflow: 'auto'
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
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: '20px',
          svg: {
            height: '16px',
            width: '16px'
          }
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          height: '30px',
          width: '30px',
          color: 'black',
          fontSize: '10px',
          svg: {
            fontSize: '20px'
          }
        }
      }
    }
  }
});

export const filterOptions = (options: any, state: any): any[] => {
  const defaultFilterOptions = createFilterOptions();
  return defaultFilterOptions(options, state).slice(0, 30);     // limit autocomplete to display 15 items max
};

