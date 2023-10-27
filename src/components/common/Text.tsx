import {  Typography } from "@mui/material";
interface props {
    text:string | number;  
    css?: object;
    func?: () => void;
  }
const ParaText = (props: props) => {
    return (
      <Typography
        onClick={props.func}
        sx={{
          fontSize: "16px",
          fontWeight: 400,
          color: "#000000",
          ...props.css,
        }}
      >
        {props.text}
      </Typography>
    );
  };

  const WParaText = (props: props) => {
    return (
      <Typography
        onClick={props.func}
        sx={{
          fontSize: "16px",
          fontWeight: 400,
          color: "#FFFFFF",
          ...props.css,
        }}
      >
        {props.text}
      </Typography>
    );
  };
  const Header = (props: props) => {
    return (
      <Typography
        sx={{
          fontSize: { xs: "18px", md: "24px", lg: "24" },
          fontWeight: 700,
          color: "#1E1E1E",
          ...props.css,
        }}
      >
        {props.text}
      </Typography>
    );
  };
  export {ParaText,Header,WParaText }