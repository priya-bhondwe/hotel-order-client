import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import DataService from "../../../services/DataService";

interface ICategoryFilterProps {
  onFilter(categories: string[]): void;
}
const CategoryFilter: React.FunctionComponent<ICategoryFilterProps> = ({
  onFilter,
}) => {
  const [categories, setCategories] = React.useState<string[]>([]);

  const [checked, setChecked] = React.useState<string[]>([]);

  const loadCategories = async () => {
    const { data } = await DataService.fetchAllData(`?q=category`);
    if (data?.data) {
      setCategories(data?.data?.category);
    }
  };

  React.useEffect(() => {
    loadCategories();
  }, []);

  React.useEffect(() => {
    onFilter(checked);
  }, [checked]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {Array.isArray(categories) &&
          categories.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem
                key={value}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemText id={labelId} primary={value} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </>
  );
};

export default CategoryFilter;
