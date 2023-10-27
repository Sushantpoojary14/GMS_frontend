import { AppBar, Stack, Toolbar } from "@mui/material";
import { WParaText } from "../common/Text";

const Footer = () => {
  return (
    <AppBar position="relative" color="primary" sx={{ top: "auto", bottom: 0 }} >
      <Toolbar>
        <Stack>
          <WParaText text="Copyright@2023" />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
