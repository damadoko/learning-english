import { Box, Button, Typography } from "@mui/material";

export type User = {
  id: number;
  name: string;
};

export type HeaderProps = {
  user: User;
  onLogin: (user: User) => void;
};

export const Header: React.FC<HeaderProps> = ({ user, onLogin }) => {
  const handleLogin = () => {
    const mockUser = { id: 1, name: "John Doe" };
    onLogin(mockUser);
  };

  return (
    <Box display="flex" justifyContent="space-between" mb={2}>
      <Typography variant="h6">Learn English with AI</Typography>
      {user ? (
        <Typography variant="body1">👤 {user.name}</Typography>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
    </Box>
  );
};
