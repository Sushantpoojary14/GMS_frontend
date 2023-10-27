import { Button } from "@mui/material";
import { ReactNode } from "react";


interface props {
    name?: ReactNode;
    func?: () => void;
    css?: object;
    type?: "button" | "submit" | "reset" | undefined;
    checked?: boolean;
    children?: ReactNode;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
  }


const CustomButton = (props: props) => {
    return (
      <Button
        variant="contained"
        type={props.type}
        sx={{
          backgroundColor: `var(--first-color)`,
          color: "#FFFFFF",
          borderRadius: "3px",
          height: "60px",
          fontSize: "16px",
          fontWeight: 600,
          border: "1px solid #FFFFFF",
          transition:"all ease 0.7s",
          "&:hover": {
           opacity:'0.8',
          },
          "&:active":{
            scale:"0.9"
          },
          ...props.css,

        }}
        size="large"
        disableElevation
        onClick={props.func}
        disabled={props.disabled}
      >
        {props.children}
        {props.name}
      </Button>
    );
  };
  export {CustomButton};