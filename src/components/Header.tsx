import { Button, Typography, AppBar, Toolbar } from "@mui/material";
import { UserProfile } from "./UserProfile";

export type HeaderProps = {
  userEmail?: string;
  loginHandler: () => void;
  registerHandler: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  userEmail,
  loginHandler,
  registerHandler,
}) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Learn English with AI
        </Typography>

        <UserProfile userEmail={userEmail} />

        {!userEmail && (
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
