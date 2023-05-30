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
    MuiSelect: {
      styleOverrides: {
        select: {
          fontSize: '14px',
          backgroundColor: '#FFFFFF',
          height: '20px',
          padding: '0.5rem',
          border: 'none',
          //MuiAutocomplete-root .MuiAutocomplete-inputRoot .MuiOutlinedInput-notchedOutline
          //MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline
          inputBase: {
            "&.MuiOutlinedInput-input": {
              minHeight: '0em'
            },
            "&.MuiOutlinedInput-root": {
              lineHeight: '0em'
            },
            root: {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000000"
              },
              "&.MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000000"
              }
            }
          },
          "&.Mui-focused.MuiOutlinedInput-notchedOutline": {
            borderColor: "#000000"
          },
          inputRoot: {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000000"
            }
          }
        },
        // outlined: {
        //   borderColor: "#000000"
        // }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '0px'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px'
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
          svg: {
            fontSize: '20px'
          }
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          height: '30px',
          width: '30px',
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
  return defaultFilterOptions(options, state).slice(0, 30);     // limit autocomplete to display 30 items max for large lists
};

