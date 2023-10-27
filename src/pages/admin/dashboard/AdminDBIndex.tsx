import { Card, CardContent, Container, Typography } from "@mui/material";
import { ParaText, Header } from "../../../components/common/Text";
import PersonIcon from "@mui/icons-material/Person";
import { useQuery } from "@tanstack/react-query";
import adminTokenAxios from "../../../hooks/AdminAxios";
const AdminDBIndex = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-counts"],
    queryFn: async () => {
      return await adminTokenAxios.get("/count-user-data");
    },
  });
  if (isLoading) {
    return <Typography>...Loading</Typography>;
  }
  const countData = data?.data;
  return (
    <Container
      maxWidth="lg"
      sx={{
        my: "40px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      <Card sx={{ width: 345, textAlign: "center" }}>
        <CardContent sx={{}}>
          <PersonIcon
            sx={{ width: "70px", height: "70px", color: `var(--first-color)` }}
          />
          { <Header text={`${countData?.user_data}`} />}
          <ParaText text={"Gym Owner's"} />
        </CardContent>
      </Card>
      <Card sx={{ width: 345, textAlign: "center" }}>
        <CardContent sx={{}}>
          <PersonIcon
            sx={{ width: "70px", height: "70px", color: `var(--first-color)` }}
          />
          { <Header text={`${countData?.member_data}`} />}
          <ParaText text={"Gym Owner's"} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminDBIndex;
