import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo, useState, useContext } from "react";
import Table from "../../../components/common/Table";
import { Container, Stack, Typography } from "@mui/material";
import {
  TCellStyle,
  THeadStyle,
  THeader,
} from "../../../assets/css/tableStyle";

import { trainer } from "../../../assets/types/user";
import { CustomButton } from "../../../components/common/Button";
import userTokenAxios from "../../../hooks/UserAxios";
import { AuthContext } from "../../../context/AuthContext";
import AddTrainer from "../components/model/AddTrainer";
import ViewTrainer from "../components/model/ViewTrainer";
import AddTBill from "../components/model/AddTBill";
import { ParaText, WParaText } from "../../../components/common/Text";

const TrainerIndex = () => {
  const [openAT, setOpenAT] = useState<boolean>(false);
  const [openUT, setOpenUT] = useState<boolean>(false);
  const [openVT, setOpenVT] = useState<boolean>(false);
  const [openUB, setOpenUB] = useState<boolean>(false);
  const [openAB, setOpenAB] = useState<boolean>(false);
  const [t_id, setT_id] = useState<number>(0);
  const handleABOpen = (m_id: number) => {
    setT_id(m_id);
    setOpenAB(true);
  };
  const handleABClose = () => {
    setOpenAB(false);
  };
  const handleUBOpen = (m_id: number) => {
    setT_id(m_id);
    setOpenUB(true);
  };
  const handleUBClose = () => {
    setOpenUB(false);
  };
  const handleVTOpen = (id: number) => {
    setT_id(id);
    setOpenVT(true);
  };
  const handleVTClose = () => {
    setOpenVT(false);
  };
  const handleUTOpen = (id: number) => {
    // console.log(id);

    setT_id(id);
    setOpenUT(true);
  };
  const handleUTClose = () => {
    setOpenUT(false);
  };

  const { user } = useContext(AuthContext);
  const handleATClose = () => {
    setOpenAT(false);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["all-trainer-data"],
    queryFn: async () => {
      const data = await userTokenAxios.get(`/all-trainer-data/${user?.id}`);
      return data?.data.trainer_data;
    },
  });

  // console.log(data);
  const queryClient = useQueryClient();
  const deleteTrainer = useMutation({
    mutationFn: async (t_id: number) => {
      return await userTokenAxios.delete(`/delete-trainer/${t_id}/${user?.id}`);
    },
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.setQueryData(
          ["all-trainer-data"],
          response.data.trainer_data
        );
      }
      console.log(response);
    },
  });

  const columns: MRT_ColumnDef<trainer>[] = useMemo<MRT_ColumnDef<trainer>[]>(
    () => [
      {
        id: "Trainer",
        header: "Gym Trainer",
        muiTableHeadCellProps: {
          style: THeader,
        },

        columns: [
          {
            accessorKey: "name",
            header: "Full Name",
            size: 50,
            muiTableHeadCellProps: {
              style: THeadStyle,
            },
            muiTableBodyCellProps: {
              style: TCellStyle,
            },
          },
          {
            accessorKey: "gender",
            header: "Gender",
            size: 50,
            muiTableHeadCellProps: {
              style: THeadStyle,
            },
            muiTableBodyCellProps: {
              style: TCellStyle,
            },
          },
          {
            accessorKey: "phone",
            header: "Phone Number",
            size: 50,
            muiTableHeadCellProps: {
              style: THeadStyle,
            },

            muiTableBodyCellProps: {
              style: TCellStyle,
            },
          },
          {
            accessorKey: "email",
            header: "Email",
            size: 50,
            muiTableHeadCellProps: {
              style: THeadStyle,
            },
            muiTableBodyCellProps: {
              style: TCellStyle,
            },
          },
          {
            accessorKey: "T_Payments",
            header: "Payment Status",
            size: 50,
            Cell: ({ cell }: { cell: any }) =>
              cell.getValue()?.length === 1 ? (
                <WParaText
                  text={"Paid"}
                  css={{
                    backgroundColor: "green",
                    textAlign: "center",
                    width: "80px",
                    borderRadius: "10px",
                  }}
                />
              ) : (
                <WParaText
                  text={"Not Paid "}
                  css={{
                    backgroundColor: "red",
                    textAlign: "center",
                    width: "80px",
                    borderRadius: "10px",
                  }}
                />
              ),
            muiTableHeadCellProps: {
              style: THeadStyle,
            },

            muiTableBodyCellProps: {
              style: TCellStyle,
            },
          },
          {
            id: "lp",
            accessorKey: "T_Payments",
            header: "Last Payment",
            size: 50,
            Cell: ({ cell }: { cell: any }) =>
              cell.getValue()?.length === 1 ? (
                <ParaText text={cell.getValue()[0].start_date} />
              ) : (
                <ParaText text={"-"} />
              ),
            muiTableHeadCellProps: {
              style: THeadStyle,
            },

            muiTableBodyCellProps: {
              style: TCellStyle,
            },
          },
          //   {
          //     accessorKey: "id",
          //     header: "",
          //     size: 200,
          //     Cell: ({ cell, row }: any) => (
          //       <Link to={`view/${cell.getValue()}`}>
          //         <FindInPageOutlinedIcon
          //           sx={{
          //             width: "25px",
          //             height: "25px",
          //             color: "#3A9BDC",
          //             cursor: "pointer",
          //           }}
          //           // onClick={() =>
          //           //   TestMU.mutate({
          //           //     ps_id: row.original.purchase_id,
          //           //     set_id: cell.getValue(),
          //           //   })
          //           // }
          //         />
          //       </Link>
          //     ),
          //     enableSorting: false,
          //     muiTableHeadCellProps: {
          //       align: "center",
          //     },
          //     muiTableBodyCellProps: {
          //       align: "center",
          //     },
          //   },
          //   },
        ],
      },
    ],

    []
  );
  if (isLoading) {
    return <Typography>...Loading</Typography>;
  }
  return (
    <>
      <Container maxWidth="lg" sx={{ my: "40px" }}>
        {/* <Stack width={"100%"}>
          <CustomButton
            name="Add"
            css={{
              width: "150px",
              height: "40px",
              marginLeft: "auto",
              marginBottom: "10px",
            }}
            func={() => setOpenAT(true)}
          />
        </Stack> */}
        <Table
          id={2}
          admin={false}
          editABModel={handleABOpen}
          editUBModel={handleUBOpen}
          deleteM={deleteTrainer}
          viewModel={handleVTOpen}
          addModel={setOpenAT}
          columns={columns}
          data={data}
          editMModel={handleUTOpen}
        ></Table>
      </Container>
      <AddTrainer handleClose={handleATClose} open={openAT} update={false}/>
      <AddTrainer
        handleClose={handleUTClose}
        open={openUT}
        update={true}
        t_id={t_id}
      />
      <AddTBill handleClose={handleABClose} open={openAB} update={false}  t_id={t_id}/>
      <AddTBill
        handleClose={handleUBClose}
        open={openUB}
        update={true}
        t_id={t_id}
      />
      <ViewTrainer handleClose={handleVTClose} open={openVT} t_id={t_id} />
    </>
  );
};

export default TrainerIndex;
