import {
  Box,
  Button,
  Typography,
  Avatar,
  AppBar,
  Toolbar,
} from "@mui/material";

export type HeaderProps = {
  userEmail?: string;
  loginHandler: () => void;
};

export const Header: React.FC<HeaderProps> = ({ userEmail, loginHandler }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{flexGrow: 1}}>Learn English with AI</Typography>

        {userEmail ? (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1">
              Hello, {userEmail.split("@")[0]}
            </Typography>
            <Avatar>{userEmail[0].toUpperCase()}</Avatar>
          </Box>
        ) : (
          <Button variant="outlined" color="inherit" onClick={loginHandler}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
