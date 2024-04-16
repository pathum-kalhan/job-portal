import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  CircularProgress,
  Typography,
} from "@mui/material";

type props = {
  startDate: string;
  endDate: string;
  count: number;
  backendCall: boolean;
  title: string;
};

function FilteredValueCard(props: props) {
  const { startDate, endDate, count = 0, backendCall, title = "" } = props;

  return (
    <Card>
      <CardHeader
        title={`${startDate === "" && endDate === "" ? "Total" : ""} ${title} ${
          startDate !== "" || endDate !== "" ? "(Filtered)" : ""
        }`}
        sx={{ textAlign: "center" }}
      />
      <CardContent>
        {backendCall ? (
          <Stack alignItems={"center"} justifyContent={"center"}>
            <CircularProgress sx={{ color: "black" }} />
          </Stack>
        ) : (
          <Typography textAlign={"center"} fontSize={60}>
            {count}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default FilteredValueCard;
