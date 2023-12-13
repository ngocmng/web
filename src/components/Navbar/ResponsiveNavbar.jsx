import  items  from "./ItemInfor";

import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { NavbarContext } from "./NavbarContext";
import UserInfo from "../UserInfo";

function ResponsiveDrawer(props) {
  const drawerWidth = 245;
  const nonDrawerWidth = 65;

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open, changeOpen } = useContext(NavbarContext);
  const [userInfoOpen, setUserInfoOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const popUpUserInfo = () => setUserInfoOpen(true);
  const popDownUserInfo = () => setUserInfoOpen(false);

  const handleDrawer = () => {
    changeOpen();
  };

  const drawer = (
    <>
      <Toolbar
        sx={{
          minHeight: { xs: "45px", md: "50px" },
          marginLeft: open ? 10 : -1.5,
          transition: "all 0.3s ease",
        }}
      >
        <IconButton
          onClick={handleDrawer}
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <MenuIcon
            sx={{
              color: "var(--title-color)",
              textAlign: "center",
            }}
          />
        </IconButton>
      </Toolbar>
      <Divider />
      <List
        sx={{
          height: 1,
          // backgroundColor: "var(--navbar-color)",
        }}
      >
        
        {items.map((item, index) => (
          <ListItem key={index} disablePadding>
            <Link
              to={item.path}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <ListItemButton
                sx={{
                  transition: "0.3s",
                  pl: open ? 1.5 : 1,
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ color: "var(--font1-color)" }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ p: 0 }}>
        <ListItem
          sx={{
            p: 0,
            hover: "none",
          }}
        >
          <ListItemButton
            onClick={popUpUserInfo}
            sx={{ transition: "0.3s", pl: open ? 4.5 : 1.5 }}
          >
            <ListItemIcon>
              <Avatar>MG</Avatar>
            </ListItemIcon>
            <ListItemText
              primary="Magic Post"
              sx={{ color: "var(--title-color)", fontWeight: "bold" }}
            />
          </ListItemButton>
          <UserInfo open={userInfoOpen} close={popDownUserInfo} />
        </ListItem>
      </List>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", bgcolor: "var(--navbar-color)" }}>
      <AppBar
        position="fixed"
        sx={{
          width: {
            md: `calc(100% - ${open ? drawerWidth : nonDrawerWidth}px)`,
          },
          ml: { md: `${open ? drawerWidth : nonDrawerWidth}px` },
          bgcolor: "var(--border-color)",
          boxShadow: "none",
          color: "var(--secondary-color)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: "45px", md: "50px" },
            display: { md: "none" },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Magic Post
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { md: open ? drawerWidth : nonDrawerWidth },
          flexShrink: { md: 0 },
          transition: "width 0.3s ease",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: open ? drawerWidth : nonDrawerWidth,
              whiteSpace: "nowrap",
              overflowX: "hidden",
              transition: "width 0.3s ease",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
