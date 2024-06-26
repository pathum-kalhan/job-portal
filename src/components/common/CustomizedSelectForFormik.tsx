import { selectProps } from "../../utils/types/general-types";
import { Select } from "@mui/material";

 export const CustomizedSelectForFormik = (selectProps: selectProps) => {
    const { children, form, field} = selectProps;
    const { name, value } = field;
    const { setFieldValue } = form;
  
    return (
      <Select
        {...field}
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
   