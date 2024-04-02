import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import adminRoutes from "../../shared/routes/adminRoutes";
import Link from "../../shared/ui/navlink/NavLink";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/slice/authSlice";

interface ISidebarMenuProps {
  open: boolean;
}

const SidebarMenu: React.FunctionComponent<ISidebarMenuProps> = ({ open }) => {
  const loggedUser = useSelector(selectUser);
  return (
    <List>
      {Array.isArray(adminRoutes) &&
        adminRoutes
          .filter(({ showInMenu }) => showInMenu)
          .filter(
            ({ roles }) => loggedUser?.role && roles?.includes(loggedUser?.role)
          )
          .map(({ path, label, icon }, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Link to={`/secured/${path}`} activeColor="#666" color="#000">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
    </List>
  );
};

export default SidebarMenu;
