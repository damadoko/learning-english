import { Button, Typography, AppBar, Toolbar } from "@mui/material";
import { UserProfile } from "./UserProfile";

export type HeaderProps = {
  username?: string;
  loginHandler: () => void;
  logoutHandler: () => void;
  registerHandler: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  username,
  loginHandler,
  logoutHandler,
  registerHandler,
}) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Learn English with AI
        </Typography>

        <UserProfile logoutHandler={logoutHandler} username={username} />

        {!username && (
          <>
            <Button
              variant="outlined"
              color="inherit"
              onClick={registerHandler}
              sx={{ mr: 1 }}
            >
              Register
            </Button>
            <Button variant="outlined" color="inherit" onClick={loginHandler}>
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
