import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import UploadIcon from "@material-ui/icons/CloudUpload";
import MenuIcon from "@material-ui/icons/Menu";
import PhotoIcon from "@material-ui/icons/Photo";
import LocalPlayIcon from "@material-ui/icons/LocalPlay";
import HomeIcon from "@material-ui/icons/Home";
import Toolbar from "@material-ui/core/Toolbar";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import categories from "../data/Categories";
import Button from "@material-ui/core/Button";
import Results from "./Results";
import Icon from "../images/alienIcon3.png";
import { gmailLogin, logOut } from "../services/Firebase.js";
import UserMenu from "./UserMenu";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: "auto",
    minWidth: "0px",
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    backgroundColor: "#311f68",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: {
    justifyContent: "space-between",
    toolbar: theme.mixins.toolbar
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#352c53",
    color: "white"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "60%"
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 5)
  },
  login: {
    backgroundColor: "#4CAF50",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    }
  },
  backColor: {
    backgroundColor: "#512da8",
    color: "white"
  },
  rightIcon: {
    marginRight: theme.spacing(1)
  }
}));

function DrawerBar({
  onClickCategory,
  onChangeSearch,
  onClickUpload,
  results,
  load
}) {
  const { container } = PropTypes.object; //props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let [user, setUser] = useState(null);

  //life cicles:
  useEffect(() => {
    let userInText = localStorage.getItem("user");
    let user = JSON.parse(userInText);
    setUser(user);
  }, [user]);

  //kind of method
  function login() {
    gmailLogin().then(user => {
      setUser(user);
    });
  }

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div className="backColor">
      <List>
        {user && (
          <ListItem>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.login}
              onClick={onClickUpload}
            >
              <UploadIcon className={classes.rightIcon} />
              Upload Meme
            </Button>
          </ListItem>
        )}

        {["Home"].map((text, index) => (
          // <AppBar position="fixed" className={classes.appBar}>
          <ListItem button key={text} onClick={() => onClickCategory(text)}>
            <ListItemIcon>{<HomeIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
          // </AppBar>
        ))}

        {/*     ********** CATEGORIES **********     */}
        {categories.map((text, index) => (
          <ListItem
            button
            key={index}
            id={text}
            onClick={() => onClickCategory(text)}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <LocalPlayIcon /> : <PhotoIcon />}
            </ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          {/*    ******              SEARCH         *****          */}
          <img
            className={classes.rightIcon}
            alt="result"
            src={Icon}
            style={{ maxHeight: "45px", maxWidth: "45px", cursor: "pointer" }}
            onClick={() => onClickCategory("Home")}
          />

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search your meme…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={onChangeSearch}
            />
          </div>
          <div>
            {/* Login */}
            <UserMenu user={{ ...user }} logOut={logOut} login={login} />
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <Results
        results={results}
        load={load}
        onClickCategory={onClickCategory}
      />
    </div>
  );
}

DrawerBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.object
};

export default DrawerBar;
