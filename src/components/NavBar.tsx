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
import { Card, Grid, useMediaQuery } from "@mui/material";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Image from "next/image";

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
  {
    link: "",
    title: "Employer/ Post a Job",
    dropdownItems: [
      { link: "/post-a-job", title: "Post Job" },
      { link: "/applicants-view", title: "Application View" },
      { link: "/interview-schedule", title: "Interview Schedule" },
    ],
  },
];

function NavBar() {
  const isMdScreen = useMediaQuery("(min-width:900px)");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [subMenuAnchorElNav, setSubMenuAnchorElNav] = React.useState<null | {
    anchor: HTMLElement;
    menuName: string;
  }>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenSubMenuNavMenu = (
    event: React.MouseEvent<HTMLElement>,
    menuName: string
  ) => {
    event.preventDefault();
    setSubMenuAnchorElNav({ anchor: event.currentTarget, menuName });
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
          <Link
            style={{
              textDecoration: "none",
            }}
            href="/"
          >
            <Card
              sx={{
                backgroundColor: "white",
                padding: 0.5,
                display: { xs: "none", md: "flex" },
              }}
            >
              <Image src="/CGPLogo.png" alt="CGPLogo" width={70} height={40} />
            </Card>
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
                      handleOpenSubMenuNavMenu(e, page.title);
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
                  {page.dropdownItems &&
                      (page.title === subMenuAnchorElNav?.menuName ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                    ))}
                  
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Mobile hamburger menu end */}

          {/* Mobile Logo start */}
          <Grid
            container
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Grid container item alignItems="center" justifyContent="center">
              <Grid item>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  href="/"
                >
                  <Card
                    sx={{
                      backgroundColor: "white",
                      padding: 0.5,
                      display: { xs: "flex", md: "none" },
                    }}
                  >
                    <Image
                      src="/CGPLogo.png"
                      alt="CGPLogo"
                      width={70}
                      height={40}
                    />
                  </Card>
                </Link>
              </Grid>
            </Grid>
          </Grid>

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
                      handleOpenSubMenuNavMenu(e, page.title);
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
                      (page.title === subMenuAnchorElNav?.menuName ? (
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
            <Tooltip title="View Profile">
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
            if (pageItem.dropdownItems && pageItem.title === subMenuAnchorElNav?.menuName) {
              return (
                <Menu
                  key={pageItem.title}
                  id={`menu-${pageItem.title}`}
                  anchorEl={subMenuAnchorElNav?.anchor}
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
export {NavBar};
