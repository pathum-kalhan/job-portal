import React from "react";
import {
  Dialog,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CandidateEditProfileForm from "@/components/forms/Candidate/CandidateEditProfileForm";
// import EmployerEditProfileForm from "@/components/forms/Employer/EmployerEditProfileForm";

type props = {
  openEditProfile: boolean;
  handleCloseEditProfile: () => void;
};

function EditProfileDialogBox(props: props) {
  const { openEditProfile, handleCloseEditProfile } = props;
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
        <CardContent  sx={{maxHeight:"20rem", overflowY:"auto"}}>
         <CandidateEditProfileForm/>
         {/* <EmployerEditProfileForm/> */}
        </CardContent>
      </Card>
    </Dialog>
  );
}

export default EditProfileDialogBox;
