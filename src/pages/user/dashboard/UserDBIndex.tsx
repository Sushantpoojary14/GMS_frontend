// import React from 'react'
import { Card, CardContent, Container, Typography } from "@mui/material";
import { ParaText, Header } from "../../../components/common/Text";
import PersonIcon from "@mui/icons-material/Person";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import userTokenAxios from "../../../hooks/UserAxios";
const UserDBIndex = () => {
  const { user } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["all-user-counts"],
    queryFn: async () => {
      return await userTokenAxios.get(`/all-count-data/${user?.id}`);
    },
  });
  if (isLoading) {
    return <Typography>...Loading</Typography>;
  }
  const countData = data?.data;
  // console.log(countData);
  
  return (
    <Container
      maxWidth="lg"
      sx={{
        my: "40px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap:"15px",
        justifyContent: "space-around",
      }}
    >
      <Card sx={{ width: 345, textAlign: "center" }}>
        <CardContent sx={{}}>
          <PersonIcon
            sx={{ width: "70px", height: "70px", color: `var(--first-color)` }}
          />
          {<Header text={`${countData?.member_data}`} />}
          <ParaText text={"Gym Member's"} />
        </CardContent>
      </Card>
      <Card sx={{ width: 345, textAlign: "center" }}>
        <CardContent sx={{}}>
          <PersonIcon
            sx={{ width: "70px", height: "70px", color: `var(--first-color)` }}
          />
          {<Header text={`${countData?.trainer_data}`} />}
          <ParaText text={"Gym Trainer's"} />
        </CardContent>
      </Card>
      <Card sx={{ width: 345, textAlign: "center" }}>
        <CardContent sx={{}}>
          <PersonIcon
            sx={{ width: "70px", height: "70px", color: `var(--first-color)` }}
          />
          {<Header text={`${countData?.active_member_data}`} />}
          <ParaText text={"Active Member's"} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserDBIndex;
