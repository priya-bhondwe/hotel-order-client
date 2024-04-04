import { Box, Switch, Typography } from "@mui/material";
import * as React from "react";

interface ITypeFilterProps {
  onChange(value: string): void;
}

const TypeFilter: React.FunctionComponent<ITypeFilterProps> = ({
  onChange,
}) => {
  const [checked, setChecked] = React.useState<string>("");

  const handleToggle = (value: string) => () => {
    if (checked === "veg") {
      setChecked("");
    } else {
      setChecked("veg");
    }
  };

  React.useEffect(() => {
    onChange(checked);
  }, [checked]);
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
      <Typography component="span">Veg Only</Typography>
      <Switch
        edge="end"
        onChange={handleToggle("veg")}
        checked={checked.indexOf("veg") !== -1}
        inputProps={{
          "aria-labelledby": "switch-list-label-wifi",
        }}
      />
    </Box>
  );
};

export default TypeFilter;
