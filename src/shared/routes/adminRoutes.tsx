import { lazy } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DishesIcon from "@mui/icons-material/DiningSharp";
import OrdersIcon from "@mui/icons-material/Book";
import UsersIcon from "@mui/icons-material/PeopleSharp";
import TableIcon from "@mui/icons-material/TableRestaurant";
import BillingIcon from "@mui/icons-material/Money";

const Dashboard = lazy(
  () => import("../../features/admin/dashboard/Dashboard")
);
const Dishes = lazy(() => import("../../features/admin/dishes/Dishes"));
const AddEditDish = lazy(
  () => import("../../features/admin/dishes/AddEditDish")
);
const Orders = lazy(() => import("../../features/admin/orders/Orders"));
const Users = lazy(() => import("../../features/admin/users/Users"));
const Tables = lazy(() => import("../../features/admin/tables/Tables"));
const Billing = lazy(() => import("../../features/admin/billing/Billing"));

const adminRoutes = [
  {
    label: "Dashboard",
    component: <Dashboard />,
    path: "",
    icon: <DashboardIcon />,
    showInMenu: true,
    roles: ["admin", "superadmin"],
  },
  {
    label: "Orders",
    component: <Orders />,
    path: "orders",
    icon: <OrdersIcon />,
    showInMenu: true,
    roles: ["admin", "superadmin"],
  },
  {
    label: "Dishes",
    component: <Dishes />,
    path: "dishes",
    icon: <DishesIcon />,
    showInMenu: true,
    roles: ["superadmin"],
  },
  {
    label: "Add Edit Dishes",
    component: <AddEditDish />,
    path: "dishes/add-edit/:operation/:id",
    icon: <DishesIcon />,
    showInMenu: false,
    roles: ["superadmin"],
  },
  {
    label: "Users",
    component: <Users />,
    path: "users",
    icon: <UsersIcon />,
    showInMenu: true,
    roles: ["superadmin"],
  },
  {
    label: "Tables",
    component: <Tables />,
    path: "tables",
    icon: <TableIcon />,
    showInMenu: true,
    roles: ["superadmin"],
  },
  {
    label: "Billing",
    component: <Billing />,
    path: "billing",
    icon: <BillingIcon />,
    showInMenu: true,
    roles: ["superadmin"],
  },
];
export default adminRoutes;
