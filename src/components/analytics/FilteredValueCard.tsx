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
  curveEdge?: boolean;
  oneEdge?: boolean;
  bgColor?: string;
  textColor?: string;
};

function FilteredValueCard(props: props) {
  const {
    startDate,
    endDate,
    count = 0,
    backendCall,
    title = "",
    curveEdge = false,
    oneEdge = false,
    bgColor = "white",
    textColor = "black",
  } = props;

  return (
    <Card
      sx={{
        borderRadius: curveEdge ? 2 : oneEdge ? "40px 40px 0px 40px" : 0,
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <CardHeader
        title={`${startDate === "" && endDate === "" ? "Total" : ""} ${title} ${
          startDate !== "" || endDate !== "" ? "(Filtered)" : ""
        }`}
        sx={{ textAlign: "center" }}
      />
      <CardContent>
        {backendCall ? (
          <Stack alignItems={"center"} justifyContent={"center"}>
            <CircularProgress sx={{ color: textColor }} />
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
