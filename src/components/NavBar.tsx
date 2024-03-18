"use client";
import React, { useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";

const logedInCandidate = [
  { link: "/dashboard/candidate/find-jobs", title: "Find Job" },
  {
    title: "Job Listings",
    link: "",
    dropdownItems: [
      { link: "/dashboard/candidate/saved-jobs", title: "Saved Jobs" },
      { link: "/dashboard/candidate/applied-jobs", title: "Applied Jobs" },
      { link: "/dashboard/candidate/recommended-jobs", title: "Recommended Jobs" },
    ],
  },

  { link: "/contact-us", title: "Contact Us" },
  { link: "/privacy-policy", title: "Privacy & Policy" },
  { link: "/about", title: "About Us" },
];

const logedInEmployer = [
  { link: "/contact-us", title: "Contact Us" },
  { link: "/privacy-policy", title: "Privacy & Policy" },
  { link: "/about", title: "About Us" },
  {
    link: "",
    title: "Employer/ Post a Job",
    dropdownItems: [
      { link: "/dashboard/employer/post-a-job", title: "Post Job" },
      { link: "/dashboard/employer/manage-jobs", title: "Manage Jobs" },
      { link: "/dashboard/employer/applicants-view", title: "Application View" },
      { link: "/dashboard/employer/interview-schedule", title: "Interview Schedule" },
    ],
  },
];

const defaultPages = [
  { link: "/contact-us", title: "Contact Us" },
  { link: "/privacy-policy", title: "Privacy & Policy" },
  { link: "/about", title: "About Us" }
];

function NavBar() {
  const [pages, setPages] = useState(defaultPages);
  const { data: session } = useSession();
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

  useEffect(() => {
    if (session) {
      // @ts-ignore
      if (session?.user?.role === "candidate") {
        setPages(logedInCandidate);
        // @ts-ignore
      } else if (session?.user?.role === "employer") {
        setPages(logedInEmployer);
      }
    } else { 
      setPages(defaultPages)
    }
  }, [session]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop desktop Logo Start */}
          <Link
            style={{
              textDecoration: "none",
            }}
            href={"/"}
          >
            <Card
              sx={{
                backgroundColor: "white",
                padding: 0.5,
                display: { xs: "none", md: "flex" },
              }}
            >
              <Image priority src="/CGPLogo.png" alt="CGPLogo" width={70} height={40} />
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
                    // @ts-ignore
                    if (page?.dropdownItems) {
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
                    {/* @ts-ignore */}
                  {page?.dropdownItems &&
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
                     // @ts-ignore
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
                    {/* @ts-ignore */}
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
          {session && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="View Profile">
              <Link href="/dashboard/profile">
                <IconButton sx={{ p: 0 }}>
                  {/* @ts-ignore */} 
                  <Avatar alt="Profile Icon" src={session?.user?.profileImage ?? ""} />
                </IconButton>
              </Link>
            </Tooltip>
          </Box>}
          {/* Nav bar Profile Icon end */}

          {/* Nav dropdown menu start */}
          {pages.map((pageItem) => {
            if (
               // @ts-ignore
              pageItem.dropdownItems &&
              pageItem.title === subMenuAnchorElNav?.menuName
            ) {
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
                  {/* @ts-ignore */}
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
export { NavBar };
