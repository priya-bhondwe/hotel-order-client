import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import frontendRoutes from "../../shared/routes/frontendRoutes";
import Link from "../../shared/ui/navlink/NavLink";

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ background: "#000" }}>
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ width: 100, height: 100 }}>
            <img
              src="images\logo.png"
              alt="Hotel logo"
              style={{ width: "120", height: "80px" }}
            />
          </Box>

          <Box
            sx={{
              ms: "auto",
              flexGrow: 1,
              display: { xs: "flex", md: "none"  },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{}}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
              }}
            >
              {Array.isArray(frontendRoutes) &&
                frontendRoutes
                  ?.filter(({ showInMenu }) => showInMenu)
                  .map(({ path, label }, i) => (
                    <MenuItem onClick={handleCloseNavMenu} key={i}>
                      <Link key={i} to={path} activeColor="#666" color="#000">
                        {label}
                      </Link>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>

          {/* desktop view  */}
          <Box
            sx={{
              justifyContent: "center",
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {Array.isArray(frontendRoutes) &&
              frontendRoutes
                ?.filter(({ showInMenu }) => showInMenu)
                .map(({ path, label }, i) => (
                  <Link key={i} to={path} activeColor="#ddd" color="#fff">
                    {label}
                  </Link>
                ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
