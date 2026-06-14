import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 220,
        height: "100vh",
        backgroundColor: "#1976d2",
        color: "white",
      }}
    >
      <List>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/slots")}>
          <ListItemText primary="Slots" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/bookings")}>
          <ListItemText primary="Bookings" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </Box>
  );
}

export default Sidebar;