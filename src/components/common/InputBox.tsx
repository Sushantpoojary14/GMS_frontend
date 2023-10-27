import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  outlinedInputClasses,
  TextField,
} from "@mui/material";
import { ParaText } from "./Text";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Inputs =
  | "email"
  | "password"
  | "name"
  | "phone"
  | "gym_name"
  | "logo"
  | "gender"
  | "DOB"
  | "payment"
  | "occupation"
  | "blood_group"
  | "height_cm"
  | "weight_kg"
  | "program"
  | "start_date"
  | "end_date"
  | "fee"
  | "total_month"
  | "m_image";

interface props {
  reg: UseFormRegisterReturn<Inputs>;
  inputProps?: object;
  label: string;
  type?: "text" | "password" | "number" | "file" | "tel" | "email" | "date";
  css?: object;
  defaultVal?: string | number;
}

interface defaultProps {
  required?: boolean;
}

interface mainProps extends props, defaultProps {}
const defaultProps: defaultProps = {
  required: true,
};
const Input = (props: mainProps) => {
  return (
    <Box sx={{ ...props.css }}>
      <ParaText text={props.label} css={{ textAlign: "left" }} />
      <TextField
        type={props.type}
        required={props.required}
        defaultValue={props.defaultVal}
        InputLabelProps={{
          sx: {
            color: "#000000",
            fontWeight: "500",
          },
        }}
        sx={{
          width: "100%",
          height: "36px",

          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FFFFFF",
            color: "#000000",
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "#FA8128",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              border: "1px solid #FA8128",
            },
          },
        }}
        {...props.reg}
        {...props.inputProps}
      />
    </Box>
  );
};


const InputPassword = (props: mainProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <Box sx={{ ...props.css }}>
      <ParaText text={props.label} css={{ textAlign: "left" }} />
      <TextField
        type={showPassword ? "text" : "password"}
        required={props.required}
        defaultValue={props.defaultVal}
        // required={props.required}
        InputLabelProps={{
          sx: {
            color: "#000000",
            fontWeight: "500",
          },
        }}
        sx={{
          width: "100%",
          height: "36px",

          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FFFFFF",
            color: "#000000",
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "#FA8128",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              border: "1px solid #FA8128",
            },
          },
        }}
        {...props.reg}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
Input.defaultProps = defaultProps;
export { Input, InputPassword };
