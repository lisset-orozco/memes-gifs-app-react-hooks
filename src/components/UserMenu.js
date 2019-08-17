import React from "react";

import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import { Divider } from "@material-ui/core";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const useStyles = makeStyles(theme => ({
  login: {
    backgroundColor: "#4CAF50",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    }
  }
}));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    }
  }
}))(MenuItem);

const UserMenu = ({ user, logOut, login }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    login();
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleLogOut() {
    handleClose();
    logOut();
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  return (
    <div>
      {user.uid ? (
        <div
          onClick={handleMenu}
          style={{ alignItems: "center", display: "flex", cursor: "pointer" }}
        >
          <img
            id="photoURL"
            src={
              user
                ? user.photoURL
                : "https://media.giphy.com/avatars/default3.gif"
            }
            width="42px"
            height="42px"
            alt="eyes"
            style={{ borderRadius: "50%", border: "1px solid gray" }}
          />
          <ArrowDropDown />
        </div>
      ) : (
        <Button
          align="right"
          color="secondary"
          variant="contained"
          onClick={handleClick}
          className={classes.login}
        >
          Login
        </Button>
      )}
      {user.uid && (
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <div
            style={{ padding: "8px 16px", fontSize: "0.9rem" }}
            onClick={handleClose}
          >
            <span>Logged in as</span>
            <br />

            {user.displayName ? (
              <span>
                <strong>{user.displayName}</strong>
              </span>
            ) : (
              <span>
                <strong>{user.email}</strong>
              </span>
            )}
          </div>
          <Divider />
          <StyledMenuItem onClick={handleLogOut}>
            <ListItemText primary="Log out" />
          </StyledMenuItem>
          )
        </StyledMenu>
      )}
    </div>
  );
};

export default UserMenu;
