import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import { Header, ParaText, WParaText } from "../common/Text";

const pages = [
  { name: "Dashboard", url: "/admin" },
  { name: "Members", url: "/admin/members" },
  { name: "About Us", url: "/admin/about-us" },
  { name: "Contact Us", url: "/admin/contact-us" },
];
// const settings = [
//   { name: "Profile", url: "/admin/profile" },
//   { name: "Logout", url: "/admin/logout" },
// ];

const AdminNavbar = () => {
  const { admin, adminLogout } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState<boolean>(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = () => {
    setAnchorElNav(true);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //   const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <AppBar
      position="static"
      sx={{ width: "100%", backgroundColor: `var(--first-color)` }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon
            sx={{
              display: admin ? { xs: "none", md: "flex" } : { md: "flex" },
              mr: 1,
            }}
          />
          <Header
            text="GMS"
            css={{
              mr: 2,
              display: admin ? { xs: "none", md: "flex" } : { md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          />

          {admin && (
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
                    <Link to={page.url} style={{ textDecoration: "none" }}>
                      <MenuItem key={page.name}>
                        <ParaText
                          text={page.name}
                          css={{ textDecoration: "none" }}
                        />
                      </MenuItem>
                    </Link>
                  ))}
                </Drawer>
              </Box>
              <AdbIcon
                sx={{
                  display: { xs: "flex", md: "none" },
                  mr: 1,
                }}
              />
              <Header
                text="GMS"
                css={{
                  mr: 2,
                  display: admin ? { xs: "flex", md: "none" } : { md: "flex" },
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
                  <Link to={page.url} style={{ textDecoration: "none" }}>
                    <MenuItem key={page.name}>
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
                    <Avatar alt="User" src="/static/images/avatar/2.jpg" />
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
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* {settings.map((setting) => ( */}
                  <MenuItem>
                    <Link to={""} style={{ textDecoration: "none" }}>
                      <ParaText text={"profile"} />
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <ParaText text={"Logout"} func={adminLogout} />
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
export default AdminNavbar;
