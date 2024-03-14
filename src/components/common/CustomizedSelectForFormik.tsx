import { selectProps } from "@/utils/types";
import { Select } from "@mui/material";

 export const CustomizedSelectForFormik = (selectProps: selectProps) => {
    const { children, form, field } = selectProps;
    const { name, value } = field;
    const { setFieldValue } = form;
  
    return (
      <Select
        label="Locations"
        name={name}
        value={value}
        fullWidth
        onChange={(e) => {
          setFieldValue(name, e.target.value);
        }}
      >
        {children}
      </Select>
    );
 };
   