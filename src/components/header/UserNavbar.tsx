import {
  AppBar,
  Avatar,
  Box,
  Container,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Header, ParaText, WParaText } from "../common/Text";
// import AdbIcon from "@mui/icons-material/Adb";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import setting_image from "../../assets/images/icon/setting_icon.png";
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
const pages = [
  { name: "Dashboard", url: "/user" },
  { name: "Members", url: "/user/members" },
  { name: "Attendance", url: "/user/attendance" },
  { name: "Trainer", url: "/user/trainer" },

];

const UserNavbar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState<boolean>(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElUserNav, setAnchorElUserNav] = useState<boolean>(false);
  const handleOpenNavMenu = () => {
    setAnchorElNav(true);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUserNav(true)
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // 
  // console.log(!!anchorElUser,anchorElUser);
  
  //   const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <AppBar
      position="sticky"
      sx={{ width: "100%", backgroundColor: `var(--first-color)` }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FitnessCenterIcon
            sx={{
              display: user ? { xs: "none", md: "flex" } : { md: "flex" },
              mr: 1,
            }}
          />
          <Header
            text={user ? user.gym_name : "GMS"}
            css={{
              mr: 2,
              display: user ? { xs: "none", md: "flex" } : { md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          />

          {user && (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  //   size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon sx={{ width: "40px", height: "40px" }} />
                </IconButton>
                <Drawer
                  //   container={container}
                  variant="temporary"
                  open={anchorElNav}
                  onClose={handleCloseNavMenu}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                  sx={{
                    display: { md: "block", lg: "none" },
                    "& .MuiDrawer-paper": {
                      boxSizing: "border-box",
                      width: 240,
                    },
                  }}
                >
                  {pages.map((page) => (
                    <Link to={page.url} style={{ textDecoration: "none" }} key={page.name}>
                      <MenuItem >
                        <ParaText
                          text={page.name}
                          css={{ textDecoration: "none" }}
                        />
                      </MenuItem>
                    </Link>
                  ))}
                </Drawer>
              </Box>
              <FitnessCenterIcon
                sx={{
                  display: { xs: "flex", md: "none" },
                  mr: 1,
                }}
              />
              <Header
                text={user ? user.gym_name : "GMS"}
                css={{
                  mr: 2,
                  display: user ? { xs: "flex", md: "none" } : { md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              />
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  marginLeft: "90px",
                }}
              >
                {pages.map((page) => (
                  <Link to={page.url} style={{ textDecoration: "none" }} key={page.name}>
                    <MenuItem >
                      <WParaText
                        text={page.name}
                        // css={{ textDecoration: "none" }}
                      />
                    </MenuItem>
                  </Link>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User" src={setting_image} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={anchorElUserNav}
                  onClose={handleCloseUserMenu}
                >
                  {/* {settings.map((setting) => ( */}
                  <MenuItem>
                    <Link to={""} style={{ textDecoration: "none" }}>
                      <ParaText text={"profile"} />
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <ParaText text={"Logout"} func={userLogout} />
                  </MenuItem>
                  {/* ))} */}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default UserNavbar;
