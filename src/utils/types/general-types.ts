import { FormikProps } from "formik";

export type AlertType = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

export type AnchorOriginType = {
  vertical: "top" | "bottom";
  horizontal: "left" | "right" | "center";
};

export type IFormData = {
  file:
    | {
        image: Blob;
        fileName: string;
        fileLastModified: number;
      }
    | any;
};

export type selectProps = {
  children: React.ReactNode;
  form: FormikProps<any>;
  field: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    ref: React.Ref<HTMLInputElement>;
    type: string;
    id: string;
    placeholder: string;
    multiline: boolean;
    rows: number;
    maxRows: number;
    minRows: number;
    fullWidth: boolean;
    required: boolean;
    label: string;
    error: boolean;
  };
};

export type applicationType = {
  _id: string;
  jobId: string;
  candidateId: string;
  name: string;
  email: string;
  dateOfBirth: string;
  jobRole: string;
  jobSkills: string;
  candidateSkills: string;
  resultOfTheQuiz: string | number;
  applicationStatus: string;
  industry: string;
  candidateCVUrl?: string;
  isJobExpired?; boolean;

  interview?:{
    jobApplicationId: string;
    jobId: string;
    candidateId: string;
    applicationStatus: string;
  expiredDate: string;
    status: string;
    scheduleDate: string;
    interviewType: string;
    meetingUrl: string;
    notes: string;
  };
};

export type jobPostInfo = {
  _id: string;
  websiteUrl: string;
  companyName: string;
  companyDetails: string;
  location: string;
  industry: string;
  position: string;
  jobDescription: string;
  requiredQualifications: string[];
  workingHoursPerDay: number;
  savedJob: boolean;
  employer: string;
  jobRole?: string;
  cvReviewStatus?: string;
  appliedDate?: string;
  alreadyApplied?: boolean;
  jobType?: string;
  jobExpirationDate?: string;
};

export type companyInfo = {
  _id?: string;
  websiteUrl?: string;
  email?: string;
  companyName?: string;
  companyDetails?: string;
  location?: string;
  industry?: string;
  position?: string;
  jobDescription?: string;
  requiredQualifications?: string[];
  workingHoursPerDay?: number;
  jobRole?: string;
  companyContactNo?: string;
  acceptTerms?: boolean;
  verificationCode?: string;
  password?: string;
  reenterPassword?: string;
  jobType?: string;
  jobExpirationDate?:string;
};

export type adminInfo = {
  _id?: string;
  email?: string;
  adminName?: string;
  acceptTerms?: boolean;
  verificationCode?: string;
  password?: string;
  reenterPassword?: string;
};

export type profileData = {
  name: string;
  email: string;
  contactNo: string;
  dateOfBirth: string;
  education: string;
  experience: string;
  skills: string[];
  quiz: {
    latestScore:string
  }
  profilePic: {
    image: string;
    status: {
      type: boolean;
    };
  };
  linkedInProfileUrl: string;
  companyDetails?: string;
  websiteUrl?: string;
  location?: string;
  cvUrl?: string;
  password?: string;
  reenterPassword?: string;
  verificationCode?: string;
  acceptTerms?: boolean;
};

export type Messages = {
  type: {type:string, enum: ["left" | "right"]};
  message: string;
  timestamp: string;
  displayName: string;
  avatarDisp: boolean;
}[];

export type Question = {
  _id:string,
  question: string,
  answers: [
    {
      text: string,
      isCorrect: boolean,
    },
  ],
}