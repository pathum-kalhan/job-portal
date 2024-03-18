import * as Yup from "yup";

const validationSchema = {
  name: Yup.string()
    .required("Name is required.")
    .max(80, "Maximum length for the first name is 15.")
    .min(3, "Minimum length for the first name is 3."),
  email: Yup.string()
    .required("Email is required.")
    .email("Please enter a valid email."),
  contactNo: Yup.string(),
  websiteUrl: Yup.string(),
  location: Yup.string(),
  companyDetails: Yup.string(),
  password: Yup.string()
    .required("Password is required.")
    .max(15, "Maximum length for the password is 15.")
    .min(8, "Minimum length for the password is 8."),
};

export const employerAccountValidationSchema = Yup.object().shape(validationSchema);

export const backEndEmployerAccountValidation = () => {
  const copiedValidationSchema = { ...validationSchema };
  //   @ts-ignore
  delete copiedValidationSchema.confirmEmail;
  return Yup.object().shape(copiedValidationSchema); 
};
