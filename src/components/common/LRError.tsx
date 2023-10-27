import { Typography } from "@mui/material";

const LRError = ({
  status,
  message,
}: {
  status: number | undefined;
  message: string | undefined;
}) => {
  return status && status !== 200 ? (
    <Typography sx={{ color: "red", textAlign: "left" }}>
      {`*${message}`}
    </Typography>
  ) : (
    <Typography sx={{ color: "red", textAlign: "left" }}>&nbsp;</Typography>
  );
};

export default LRError;
