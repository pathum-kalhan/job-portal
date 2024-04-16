import { LoadingButton } from "@mui/lab";
import { Grid, Typography } from "@mui/material";

type props = {
  loadData: () => void;
  resetData: () => void;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  startDate: string;
  endDate: string;
  backendCall: boolean;
};

function FilterComponent(props: props) {
  const {
    loadData,
    resetData,
    setStartDate,
    setEndDate,
    startDate,
    endDate,
    backendCall,
  } = props;

  return (
    <Grid
      container
      item
      lg={12}
      md={12}
      sm={12}
      xs={12}
      gap={3}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12}>
      <Typography textAlign={"center"} fontSize={40} textTransform={"uppercase"}>Date Range</Typography>
      </Grid>
      <Grid item xs={"auto"}>
        <input
          value={startDate}
          name="startDate"
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Grid>

      <Grid item xs={"auto"}>
        <input
          value={endDate}
          name="endDate"
          type="date"
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Grid>

      <Grid item xs={"auto"}>
        <LoadingButton
          disabled={(startDate === "" && endDate === "")}
          loading={backendCall}
          variant="contained"
          size="small"
          onClick={loadData}
        >
          Submit
        </LoadingButton>
      </Grid>

      <Grid item xs={"auto"}>
        <LoadingButton
          disabled={(startDate === "" && endDate === "") || backendCall}
          loading={startDate !== "" && endDate !== "" && backendCall}
          variant="outlined"
          size="small"
          onClick={resetData}
        >
          Reset
        </LoadingButton>
      </Grid>
    </Grid>
  );
}

export default FilterComponent;
