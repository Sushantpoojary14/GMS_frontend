import { Box, Input } from "@mui/material";
import { member } from "../../../assets/types/user";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import {UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { CustomButton } from "../../../components/common/Button";
import { useEffect, useState } from "react";
// import { Input } from "../../../components/common/InputBox";

const AttendanceTable = <T extends member>({
  columns,
  data,
  changeData,
  refetch,

}: {
  
  refetch:any;
  columns: MRT_ColumnDef<T>[];
  data: T[];
  changeData:UseMutationResult<AxiosResponse<any, any>, unknown, string, unknown>
}) => {
  const currentDate = new Date().toJSON().slice(0, 10);
  const [date , setDate]  =useState(currentDate);
  const reset = ()=>{
    setDate(currentDate);
    refetch()
  }
// console.log(date);

  return (
    <MaterialReactTable
      columns={columns}
      data={data ?? []}
      enableColumnFilterModes={false}
      enableColumnOrdering={false}
      enableGrouping={false}
      enablePinning={false}
      enableFullScreenToggle={false}
      enableDensityToggle={false}
      initialState={{ showColumnFilters: false }}
      enableColumnActions={false}
      renderTopToolbarCustomActions={() => {
        return (
          <Box
            sx={{ display: "flex", gap: "1rem", p: "0.5rem", flexWrap: "wrap" }}
          >
            <Input
              type="date"
              value={date}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setDate(e.target.value);
                changeData.mutate(e.target.value);
              }}
            />
            <CustomButton name="reset" type="button" func={reset} css={{height:"30px"}}/>
          </Box>
        );
      }}
    />
  );
};

export default AttendanceTable;
