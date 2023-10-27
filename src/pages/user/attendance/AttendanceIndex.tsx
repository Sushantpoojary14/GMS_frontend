import { MRT_ColumnDef } from "material-react-table";
import { member } from "../../../assets/types/user";
import {
  TCellStyle,
  THeadStyle,
  THeader,
} from "../../../assets/css/tableStyle";
import { Checkbox, Container, Typography } from "@mui/material";
import userTokenAxios from "../../../hooks/UserAxios";
import { useContext, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../context/AuthContext";
import AttendanceTable from "../components/AttendanceTable";
import { ParaText } from "../../../components/common/Text";
import { AxiosResponse } from "axios";

const AttendanceIndex = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const [enable, setEnable] = useState<boolean>(false);

  const aD_attendance = useMutation({
    mutationFn: async (m_id: number) => {
      return await userTokenAxios.post(`/add-member-attendance/${m_id}`);
    },
    onSuccess: (response) => {
      // console.log(response.data.user_data);
      console.log(response);
      if (response.status === 200) {
        queryClient.setQueryData(
          ["all-member-attendance"],
          (data: AxiosResponse | undefined) => {
            data!.data!.member_A_data = data!.data!.member_A_data.map(
              (item: member) => {
                if (item.id === response.data.member_A_data.id) {
                  return response.data.member_A_data;
                }
                return item;
              }
            );

            return data;
          }
        );
      }
    },
  });
  const onClickMark = (data: any) => {
    aD_attendance.mutate(data);
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-member-attendance"],
    queryFn: async () => {
      return await userTokenAxios.get(`/all-member-attendance/${user?.id}`);
    },
    refetchOnWindowFocus: false,
  });
  const cMemberData = useMutation({
    mutationFn: async (date: string) => {
      return await userTokenAxios.post(
        `/member-date-attendance/${user?.id}`,
        JSON.stringify({ date: date })
      );
    },
    onSuccess: (response) => {
      // console.log(response.data.user_data);
      // console.log(response!.data!.member_A_data);
      if (response.status === 200) {
        queryClient.setQueryData(
          ["all-member-attendance"],
          (data: AxiosResponse | undefined) => {
            data!.data!.member_A_data = response!.data!.member_A_data;
            return data;
          }
        );
        // console.log(queryClient.getQueryData(["all-member-attendance"]));
        setEnable(true);
      }
    },
  });

  useEffect(() => {
    setEnable(false);
  }, [data]);



  const columns: MRT_ColumnDef<member>[] = useMemo<MRT_ColumnDef<member>[]>(
    () => [
      {
        id: "Attendance",
        header: "Attendance",
        muiTableHeadCellProps: {
          style: THeader,
        },

        columns: [
          {
            accessorKey: "id",
            header: "",
            size: 50,
            Cell: ({ cell, row }: any) => (
              <Checkbox
                checked={row.original.Attendances.length == 0 ? false : true}
                onChange={() => onClickMark(cell.getValue())}
                disabled={enable}
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
            accessorKey: "attendance",
            header: "Time",
            size: 50,
            Cell: ({ cell, row }: any) => (
              <ParaText
                text={
                  row.original.Attendances.length != 0
                    ? row.original.Attendances[0].time
                    : "-"
                }
              />
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

    [enable, onClickMark]
  );
  if (isLoading) {
    return <Typography>...Loading</Typography>;
  }
  return (
    <Container maxWidth="lg" sx={{ my: "40px" }}>
      <AttendanceTable
        refetch={refetch}
        columns={columns}
        data={data?.data.member_A_data}
        changeData={cMemberData}
      ></AttendanceTable>
    </Container>
  );
};

export default AttendanceIndex;
