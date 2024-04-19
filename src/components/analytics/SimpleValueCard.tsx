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
  curveEdge?: boolean;
  oneEdge?: boolean;
  bgColor?: string;
  textColor?: string;
  fontSize?: "h6" | "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "inherit" | "overline" | "subtitle1" | "subtitle2" | "body1" | "body2";
};

function SimpleValueCard(props: props) {
  const {
    count = 0,
    backendCall,
    title = "",
    curveEdge = false,
    oneEdge = false,
    bgColor = "white",
    textColor = "black",
    fontSize ='h6'
  } = props;

  return (
    <Card
      sx={{
        borderRadius: curveEdge ? 4 : oneEdge ? "30px 30px 0px 30px" : 0,
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <CardHeader titleTypographyProps={{variant:fontSize}} title={title} sx={{ textAlign: "center" }} s />
      <CardContent>
        {backendCall ? (
          <Stack alignItems={"center"} justifyContent={"center"}>
            <CircularProgress sx={{ color:textColor }} />
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
