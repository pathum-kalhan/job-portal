"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import WorkIcon from "@mui/icons-material/Work";
import { Grid, useMediaQuery } from "@mui/material";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const pages = [
  { link: "/find-job", title: "Find Job" },
  {
    title: "Job Listings",
    link: "",
    dropdownItems: [
      { link: "/saved-jobs", title: "Saved Jobs" },
      { link: "/recommended-jobs", title: "Recommended Jobs" },
      { link: "/recent-job-views", title: "Recent Job Views" },
    ],
  },
  { link: "/contact-us", title: "Contact Us" },
  { link: "/privacy-policy", title: "Privacy & Policy" },
  { link: "/about", title: "About Us" },
  { link: "/post-a-job", title: "Employer/ Post a Job" },
];

function NavBar() {
  const isMdScreen = useMediaQuery("(min-width:900px)");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [subMenuAnchorElNav, setSubMenuAnchorElNav] =
    React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenSubMenuNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setSubMenuAnchorElNav(event.currentTarget);
  };

  const handleCloseSubMenuNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setSubMenuAnchorElNav(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop desktop Logo Start */}
          <WorkIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link
            style={{
              textDecoration: "none",
            }}
            href="/"
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
              }}
            >
              C.G.P
            </Typography>
          </Link>
          {/* Desktop desktop Logo end */}

          {/* Mobile hamburger menu start */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  href={page.link}
                  key={page.title}
                  onClick={(e) => {
                    if (page.dropdownItems) {
                      handleOpenSubMenuNavMenu(e);
                    }
                  }}
                >
                  <Typography
                    component="a"
                    href={page.link}
                    textAlign="center"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Mobile hamburger menu end */}

          {/* Mobile Logo start */}
          <WorkIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            C.G.P
          </Typography>
          {/* Mobile Logo end */}

          {/* Desktop nav Menu Start */}
          <Grid container display={{ xs: "none", md: "inline" }}>
            <Grid
              container
              item
              alignItems="center"
              justifyContent="center"
              columnGap={3}
            >
              {pages.map((page) => (
                <Link
                  key={page.title}
                  href={page.link}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontFamily: "sans-serif",
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                  onClick={(e) => {
                    if (page.dropdownItems) {
                      handleOpenSubMenuNavMenu(e);
                    }
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {page.title}{" "}
                    {page.dropdownItems &&
                      (subMenuAnchorElNav ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      ))}
                  </span>
                </Link>
              ))}
            </Grid>
          </Grid>
          {/* Desktop nav Menu end */}

          {/* Nav bar Profile Icon start */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Link href="/profile">
                <IconButton sx={{ p: 0 }}>
                  <Avatar
                    alt="Profile Icon"
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Link>
            </Tooltip>
          </Box>
          {/* Nav bar Profile Icon end */}

          {/* Nav dropdown menu start */}
          {pages.map((pageItem) => {
            if (pageItem.dropdownItems) {
              return (
                <Menu
                  key={pageItem.title}
                  id={`menu-${pageItem.title}`}
                  anchorEl={subMenuAnchorElNav}
                  open={Boolean(subMenuAnchorElNav)}
                  onClose={handleCloseSubMenuNavMenu}
                  anchorOrigin={{
                    vertical: isMdScreen ? "bottom" : "top",
                    horizontal: isMdScreen ? "left" : "right",
                  }}
                >
                  {pageItem?.dropdownItems.map((item) => (
                    <MenuItem
                      key={item.title}
                      component={Link}
                      href={item.link}
                    >
                      {item.title}
                    </MenuItem>
                  ))}
                </Menu>
              );
            }
          })}
          {/* Nav bar dropdown end */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar
