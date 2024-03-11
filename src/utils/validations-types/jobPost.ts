import * as Yup from "yup";

const validationSchema = {
  companyName: Yup.string().min(1).max(30),
  companyDetails: Yup.string()
    .min(1)
    .max(300)
    .required("Company Details are required"),
  websiteUrl: Yup.string()
    .url("Invalid URL format")
    .required("Website URL is required"),
  location: Yup.string().required("Location is required"),
  industry: Yup.string().required(
    "Industry is required"
  ),
  position: Yup.string().required("Position is required"),
  jobDescription: Yup.string().required("Job Description is required"),
  requiredQualifications: Yup.array().min(
    1,
    "Please select at least one qualification"
  ),
  workingHoursPerDay: Yup.number().required(
    "Working Hours Per Day is required"
  ),
};

export const backEndAccountValidation = () => {
  const copiedValidationSchema = { ...validationSchema };
  //   @ts-ignore
  delete copiedValidationSchema.confirmEmail;
  return Yup.object().shape(copiedValidationSchema);
};
