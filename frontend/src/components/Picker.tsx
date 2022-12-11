import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField'
import { makeStyles } from "@mui/material";

// const useStyles = makeStyles((theme: any) => ({
//   root: {
//     "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
//       // Default transform is "translate(14px, 20px) scale(1)""
//       // This lines up the label with the initial cursor position in the input
//       // after changing its padding-left.
//       transform: "translate(34px, 20px) scale(1);"
//     },
//     "&.Mui-focused .MuiInputLabel-outlined": {
//       color: "purple"
//     }
//   },
//   inputRoot: {
//     color: "purple",
//     // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
//     '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
//       // Default left padding is 6px
//       paddingLeft: 26
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "green"
//     },
//     "&:hover .MuiOutlinedInput-notchedOutline": {
//       borderColor: "red"
//     },
//     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "purple"
//     }
//   }
// }));

export const Picker = () => {
  // const classes = useStyles();
  return (
    <Autocomplete
      id="combo-box-demo"
      options={['Canada', 'USA']}
      // classes={useStyles}
      // options={top100Films}
      // getOptionLabel={(option) => option.title}
      style={{ width: 400 }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
          />
        );
      }}
    />
  )

}