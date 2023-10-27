import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo, useState, useContext } from "react";
import Table from "../../../components/common/Table";
import { Container, Typography } from "@mui/material";
import {
  TCellStyle,
  THeadStyle,
  THeader,
} from "../../../assets/css/tableStyle";

import { member } from "../../../assets/types/user";
// import { CustomButton } from "../../../components/common/Button";
import userTokenAxios from "../../../hooks/UserAxios";
import { AuthContext } from "../../../context/AuthContext";
import AddMembers from "../components/model/AddMembers";
import AddNewBill from "../components/model/AddNewBill";
import { ParaText, WParaText } from "../../../components/common/Text";
import ViewMember from "../components/model/ViewMember";

const MemberIndex = () => {
  const [openAM, setOpenAM] = useState<boolean>(false);
  const [openAB, setOpenAB] = useState<boolean>(false);
  const [openUM, setOpenUM] = useState<boolean>(false);
  const [openUB, setOpenUB] = useState<boolean>(false);
  const [openVM, setOpenVM] = useState<boolean>(false);
  const [m_id, setM_id] = useState<number | undefined>(0);
  const { user } = useContext(AuthContext);
  const handleAMClose = () => {
    setOpenAM(false);
  };
  const handleABOpen = (m_id: number) => {
    setM_id(m_id);
    setOpenAB(true);
  };
  const handleABClose = () => {
    setOpenAB(false);
  };
  const handleUBOpen = (m_id: number) => {
    setM_id(m_id);
    setOpenUB(true);
  };
  const handleUBClose = () => {
    setOpenUB(false);
  };
  const handleUMOpen = (m_id: number) => {
    setM_id(m_id);
    setOpenUM(true);
  };
  const handleUMClose = () => {
    setOpenUM(false);
  };

  const handleVMOpen = (m_id: number) => {
    setM_id(m_id);
    setOpenVM(true);
  };
  const handleVMClose = () => {
    setOpenVM(false);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["all-member-data"],
    queryFn: async () => {
      return await userTokenAxios.get(`/all-member-data/${user?.id}`);
    },
  });
  const queryClient = useQueryClient();
  const deleteMember = useMutation({
    mutationFn: async (m_id: number) => {
      return await userTokenAxios.delete(`/delete-member/${m_id}/${user?.id}`);
    },
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.setQueryData(["all-member-data"], response);
      }
      console.log(response);
    },
  });
  // console.log(data);

  const columns: MRT_ColumnDef<member>[] = useMemo<MRT_ColumnDef<member>[]>(
    () => [
      {
        id: "Members",
        header: "Gym Members",
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
            accessorKey: "join_date",
            header: "Join Date",
            size: 50,
            Cell: ({ cell }: { cell: any }) => (
              <ParaText text={cell.getValue()} />
            ),
            muiTableHeadCellProps: {
              style: THeadStyle,
            },
            muiTableBodyCellProps: {
              style: TCellStyle,
            },
          },

          {
            accessorKey: "M_Payments",
            header: "Payment Status",
            size: 50,
            Cell: ({ cell }: { cell: any }) =>
              cell.getValue().length === 1 ? (
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
            accessorKey: "M_Payments",
            header: "Last Payment",
            size: 50,
            Cell: ({ cell }: { cell: any }) =>
              cell.getValue().length === 1 ? (
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
        <Table
        admin={false}
          id={3}
          viewModel={handleVMOpen}
          deleteM={deleteMember}
          addModel={setOpenAM}
          columns={columns}
          data={data?.data.member_data}
          editMModel={handleUMOpen}
          editABModel={handleABOpen}
          editUBModel={handleUBOpen}
        ></Table>
      </Container>
      <AddMembers handleClose={handleAMClose} open={openAM} update={false} />
      <AddNewBill
        handleClose={handleABClose}
        open={openAB}
        update={false}
        m_id={m_id}
      />

      <AddNewBill
        handleClose={handleUBClose}
        open={openUB}
        update={true}
        m_id={m_id}
      />

      <AddMembers
        handleClose={handleUMClose}
        open={openUM}
        update={true}
        m_id={m_id}
      />
      <ViewMember handleClose={handleVMClose} open={openVM} m_id={m_id} />
    </>
  );
};

export default MemberIndex;
