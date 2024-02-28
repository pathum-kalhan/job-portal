import * as Yup from "yup";

const validationSchema = {
  name: Yup.string()
    .required("Name is required.")
    .max(30, "Maximum length for the first name is 15.")
    .min(3, "Minimum length for the first name is 3.")
    .matches(/^[A-Za-z ]*$/, "Please enter valid name"),
  email: Yup.string()
    .required("Email is required.")
    .email("Please enter a valid email."),
  contactNo: Yup.string(),
  dateOfBirth: Yup.string(),
  linkedInProfileUrl: Yup.string(),
  password: Yup.string()
    .required("Password is required.")
    .max(15, "Maximum length for the password is 15.")
    .min(8, "Minimum length for the password is 8."),
};

export const accountValidationSchema = Yup.object().shape(validationSchema);

export const backEndAccountValidation = () => {
  const copiedValidationSchema = { ...validationSchema };
  //   @ts-ignore
  delete copiedValidationSchema.confirmEmail;
  return Yup.object().shape(copiedValidationSchema); 
};
