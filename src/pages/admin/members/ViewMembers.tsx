import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo, useState } from "react";
import Table from "../../../components/common/Table";
import { Container, Stack, Typography } from "@mui/material";
import {
  TCellStyle,
  THeadStyle,
  THeader,
} from "../../../assets/css/tableStyle";
import adminTokenAxios from "../../../hooks/AdminAxios";
import { user } from "../../../assets/types/user";
import AddUser from "../components/model/AddUser";
// import { CustomButton } from "../../../components/common/Button";

const ViewMembers = () => {
  const [openAM, setOpenAM] = useState<boolean>(false);
  const [openUM, setOpenUM] = useState<boolean>(false);
  const [u_id, setU_id] = useState<number>(0);
  const handleUMOpen = (id: number) => {
    setU_id(id);
    setOpenUM(true);
  };
  const handleUMClose = () => {
    setOpenUM(false);
  };
  const handleAMClose = () => {
    setOpenAM(false);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const data = await adminTokenAxios.get("/all-user-data");
      return data?.data.user_data;
    },
  });
  const queryClient = useQueryClient();
  const deleteMember = useMutation({
    mutationFn: async (u_id: number) => {
      return await adminTokenAxios.delete(`/delete-user/${u_id}`);
    },
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.setQueryData(["all-user"], response.data?.user_data);
      }
      console.log(response);
    },
  });
  // console.log(data);

  const columns: MRT_ColumnDef<user>[] = useMemo<MRT_ColumnDef<user>[]>(
    () => [
      {
        id: "Owner",
        header: "Gym Owner's",
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
            accessorKey: "gym_name",
            header: "Gym Name",
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
        <Stack width={"100%"}>
          {/* <CustomButton
            name="Add New Members"
            css={{
              width: "230px",
              marginLeft: "auto",
              marginBottom: "10px",
            }}
            func={() => setOpenAM(true)}
          /> */}
        </Stack>
        <Table
          admin={true}
          columns={columns}
          data={data}
          editMModel={handleUMOpen}
          addModel={setOpenAM}
          deleteM={deleteMember}
        ></Table>
      </Container>
      <AddUser handleClose={handleAMClose} open={openAM} update={false} />
      <AddUser
        handleClose={handleUMClose}
        open={openUM}
        update={true}
        u_id={u_id}
      />
    </>
  );
};

export default ViewMembers;
