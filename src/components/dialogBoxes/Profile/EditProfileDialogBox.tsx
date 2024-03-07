import React from "react";
import {
  Dialog,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CandidateEditProfileForm } from "@/components/forms/Candidate/CandidateEditProfileForm";
import { EmployerEditProfileForm } from "@/components/forms/Employer/EmployerEditProfileForm";

type initialData = {
  name: string;
  linkedInProfileUrl?: string;
  contactNo: string;
  email: string;
  companyDetails?: string;
  location?: string;
  education?: string;
  experience?: string;
  skills?: string[];
  websiteUrl?: string;
};

type props = {
  openEditProfile: boolean;
  handleCloseEditProfile: () => void;
  getProfileData: () => void;
  initialData: initialData | null;
  userRole?: string;
};

function EditProfileDialogBox(props: props) {
  const {
    openEditProfile,
    handleCloseEditProfile,
    getProfileData,
    initialData,
    userRole,
  } = props;
  return (
    <Dialog
      fullScreen={false}
      fullWidth
      maxWidth="sm"
      open={openEditProfile}
      onClose={handleCloseEditProfile}
    >
      <Card
        sx={{ padding: { lg: "2rem", md: "2rem", sm: "2rem", xs: "1rem" } }}
      >
        <CardHeader
          action={
            <IconButton onClick={handleCloseEditProfile} autoFocus>
              <CloseIcon fontSize="large" sx={{ color: "black" }} />
            </IconButton>
          }
          title="Edit Profile"
          sx={{ textAlign: "center" }}
        />
        {userRole && <CardContent sx={{ maxHeight: "20rem", overflowY: "auto" }}>
          {userRole === "candidate" ? (
            <CandidateEditProfileForm
              getProfileData={getProfileData}
              initialData={initialData}
              handleCloseEditProfile={handleCloseEditProfile}
            />
          ) : userRole === "employer" ? (
              <EmployerEditProfileForm
              getProfileData={getProfileData}
              initialData={initialData}
              handleCloseEditProfile={handleCloseEditProfile}/>
          ): <></>}
        </CardContent>}
      </Card>
    </Dialog>
  );
}

export { EditProfileDialogBox };
