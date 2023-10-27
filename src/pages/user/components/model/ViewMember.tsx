import { Box, Fade, Modal, Stack } from "@mui/material";
import { modelStyle } from "../../../../assets/css/modelStyle";
import { Header, ParaText } from "../../../../components/common/Text";
import userTokenAxios from "../../../../hooks/UserAxios";
import { useQuery } from "@tanstack/react-query";

const ViewMember = ({
  open,
  handleClose,
  m_id,
}: {
  open: boolean;
  m_id?: number;
  handleClose: () => void;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["member", m_id],
    queryFn: async () => {
      const data = await userTokenAxios.get(`/member-data/${m_id}`);
      return data?.data.member_data;
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
              maxWidth: "200px",
              margin: "auto",
            }}
          />

          <Stack
            sx={{
              maxHeight: 300,
              overflowY: "auto",
              display: "flex",
              flexDirection: { sm: "row", xs: "column" },
              rowGap: "10px",
              justifyContent: "space-between",
              my: "25px",
            }}
          >
            <Box display="flex" flexDirection={"column"} rowGap={"12px"}>
              <img
                src="http://localhost:8000/person-icon.png"
                alt="not "
                style={{ width: "100px", height: "100px" }}
              />
              <ParaText text={`Name: ${data?.name}`} />
              <ParaText text={`Birth Date: ${data?.DOB}`} />
              <ParaText text={`Phone Number: ${data?.phone}`} />
              <ParaText text={`Join Date : ${data?.join_date}`} />
            </Box>
            <Box display="flex" flexDirection="column" rowGap={"12px"}>
              <ParaText text={`Gender: ${data?.gender}`} />
              <ParaText text={`Email: ${data?.email ? data.email : "-"}`} />

              <ParaText
                text={`Blood Group: ${
                  data?.blood_group ? data?.blood_group : "-"
                }`}
              />
              <ParaText
                text={`Occupation: ${
                  data?.occupation ? data?.occupation : "-"
                }`}
              />
              <ParaText text={`Program: ${data?.email ? data.program : "-"}`} />
              <ParaText
                text={`weight_kg: ${data?.weight_kg ? data?.weight_kg : "-"}`}
              />
              <ParaText
                text={`height_cm: ${data?.height_cm ? data?.height_cm : "-"}`}
              />
            </Box>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ViewMember;
