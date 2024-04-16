import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  CircularProgress,
  Typography,
} from "@mui/material";

type props = {
  count: number;
  backendCall: boolean;
  title: string;
};

function SimpleValueCard(props: props) {
  const { count = 0, backendCall, title = "" } = props;

  return (
    <Card>
      <CardHeader title={title} sx={{ textAlign: "center" }} />
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

export default SimpleValueCard;
