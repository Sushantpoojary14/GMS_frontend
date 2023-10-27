import { Box, Fade, Modal, Stack } from "@mui/material";
import { modelStyle } from "../../../../assets/css/modelStyle";
import { Header, ParaText } from "../../../../components/common/Text";
import userTokenAxios from "../../../../hooks/UserAxios";
import { useQuery } from "@tanstack/react-query";

const ViewTrainer = ({
  open,
  handleClose,
  t_id,
}: {
  open: boolean;
  t_id?: number;
  handleClose: () => void;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["member", t_id],
    queryFn: async () => {
      const data = await userTokenAxios.get(`/trainer-data/${t_id}`);
      return data?.data.trainer_data;
    },
  });
  console.log(data);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Fade in={open}>
        <Box sx={{ ...modelStyle }}>
          <Header
            text={"View Member Detail"}
            css={{
              borderBottom: `1px solid gray`,
              textAlign: "center",
              maxWidth: "180px",
              margin: "auto",
            }}
          />

          <Stack
            sx={{
              maxHeight: 320,
              overflowY: "auto",
              display: "flex",
              flexDirection: { sm: "row", xs: "column" },
              rowGap: "10px",
              my: "25px",
            }}
          >
            <Box
              display="flex"
              flexDirection={{ sm: "row", xs: "column" }}
              rowGap={"12px"}
              columnGap={"50px"}
              marginX={"auto"}
            >
              <img
                src="http://localhost:8000/person-icon.png"
                alt="not "
                style={{ width: "100px", height: "100px" ,margin:"auto"}}
              />
              <Stack spacing={2} marginY={"10px"}>
                <ParaText text={`Name: ${data?.name}`} />
                <ParaText text={`Birth Date: ${data?.DOB}`} />
                <ParaText text={`Phone Number: ${data?.phone}`} />
                <ParaText text={`Gender: ${data?.gender}`} />
                <ParaText text={`Email: ${data?.email ? data.email : "-"}`} />
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ViewTrainer;
