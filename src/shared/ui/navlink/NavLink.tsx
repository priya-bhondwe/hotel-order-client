import { NavLink } from "react-router-dom";

interface ILink {
  to: string;
  activeColor: string;
  color: string;
  // children: React.ReactElement;
  children: string | React.ReactElement;
}

const Link: React.FunctionComponent<ILink> = ({
  children,
  activeColor,
  color,
  ...props
}) => (
  <NavLink
    {...props}
    style={({ isActive }) => ({
      textDecoration: "none",
      color: isActive ? activeColor : color,
      margin: "5px 10px",
    })}
  >
    {children}
  </NavLink>
);

export default Link;
