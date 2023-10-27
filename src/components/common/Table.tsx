// import { Button } from "@mui/material";
import MaterialReactTable, {
  MRT_ColumnDef,
  // MRT_Row,
} from "material-react-table";
import { member, trainer, user } from "../../assets/types/user";
import { Box, MenuItem } from "@mui/material";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import { userColumn } from "../../assets/types/tableColumn";
// import { CSVLink } from "react-csv";
import { CustomButton } from "./Button";
const Table = <T extends trainer | user | member>({
  id,
  columns,
  data,
  editMModel,
  editABModel,
  editUBModel,
  addModel,
  viewModel,
  deleteM,
  admin,
}: {
  id: number;
  columns: MRT_ColumnDef<T>[];
  data: T[];
  editABModel?: (id: number) => void;
  editMModel?: (id: number) => void;
  editUBModel?: (id: number) => void;
  addModel: (val: boolean) => void;
  deleteM?: any;
  viewModel?: (id: number) => void;
  admin: boolean;
}) => {
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
      enableRowActions={true}
      enableRowSelection={false}
      initialState={{ showColumnFilters: false }}
      enableColumnActions={false}
      // autoResetAll={!!data}

      // renderDetailPanel={({ row }) => (
      //   <Box
      //     sx={{
      //       display: "flex",
      //       justifyContent: "space-around",
      //       alignItems: "center",
      //     }}
      //   >
      //     {/* <img
      //       alt="avatar"
      //       height={200}
      //       src={row.original.avatar}
      //       loading="lazy"
      //       style={{ borderRadius: '50%' }}
      //     /> */}
      //     <Box sx={{ textAlign: "center" }}>
      //       {/* <Typography variant="h4">
      //         {row.original?.occupation}
      //       </Typography>
      //       <Typography variant="h1">

      //       </Typography> */}
      //     </Box>
      //   </Box>
      // )}
      renderRowActionMenuItems={({ row }) =>
        admin
          ? [
              // <MenuItem
              //   key={4}
              //   onClick={() => row.original.id && viewModel(row.original.id)}
              //   sx={{ m: 0 }}
              // >
              //   View Member
              // </MenuItem>,
              <MenuItem
                key={0}
                onClick={() => row.original.id && editMModel(row.original.id)}
                sx={{ m: 0 }}
              >
                Edit Member
              </MenuItem>,
              // <MenuItem
              //   key={1}
              //   onClick={() => {
              //     row.original.id &&
              //       editABModel &&
              //       editABModel(row.original.id);
              //   }}
              //   sx={{ m: 0 }}
              //   disabled={
              //     !!(
              //       id == 3 && row.getValue<any>("M_Payments")?.length !== 0
              //     ) ||
              //     !!(id == 2 && row.getValue<any>("T_Payments")?.length !== 0)
              //   }
              // >
              //   New Bill
              // </MenuItem>,
              // <MenuItem
              //   key={2}
              //   onClick={() =>
              //     row.original.id && editUBModel && editUBModel(row.original.id)
              //   }
              //   sx={{ m: 0 }}
              //   disabled={
              //     !!(
              //       id == 3 && row.getValue<any>("M_Payments")?.length === 0
              //     ) ||
              //     !!(id == 2 && row.getValue<any>("T_Payments")?.length === 0)
              //   }
              // >
              //    Edit Bill
              // </MenuItem>,
              <MenuItem
                key={3}
                onClick={() =>
                  row.original.id && deleteM.mutate(row.original.id)
                }
                sx={{ m: 0, color: "red" }}
                disabled={
                  !!(
                    id == 3 && row.getValue<any>("M_Payments")?.length !== 0
                  ) ||
                  !!(id == 2 && row.getValue<any>("T_Payments")?.length !== 0)
                }
              >
                Delete Member
              </MenuItem>,
            ]
          : [
              <MenuItem
                key={4}
                onClick={() => row.original.id && viewModel(row.original.id)}
                sx={{ m: 0 }}
              >
                View Member
              </MenuItem>,
              <MenuItem
                key={0}
                onClick={() => row.original.id && editMModel(row.original.id)}
                sx={{ m: 0 }}
              >
                Edit Member
              </MenuItem>,
              <MenuItem
                key={1}
                onClick={() => {
                  row.original.id &&
                    editABModel &&
                    editABModel(row.original.id);
                }}
                sx={{ m: 0 }}
                disabled={
                  !!(
                    id == 3 && row.getValue<any>("M_Payments")?.length !== 0
                  ) ||
                  !!(id == 2 && row.getValue<any>("T_Payments")?.length !== 0)
                }
              >
                New Bill
              </MenuItem>,
              <MenuItem
                key={2}
                onClick={() =>
                  row.original.id && editUBModel && editUBModel(row.original.id)
                }
                sx={{ m: 0 }}
                disabled={
                  !!(
                    id == 3 && row.getValue<any>("M_Payments")?.length === 0
                  ) ||
                  !!(id == 2 && row.getValue<any>("T_Payments")?.length === 0)
                }
              >
                {!!(id == 2 && row.getValue<any>("T_Payments")?.length !== 0)}
                {/* {(row.original.)} */}
                Edit Bill
              </MenuItem>,
              <MenuItem
                key={3}
                onClick={() =>
                  row.original.id && deleteM.mutate(row.original.id)
                }
                sx={{ m: 0, color: "red" }}
                disabled={
                  !!(
                    id == 3 && row.getValue<any>("M_Payments")?.length !== 0
                  ) ||
                  !!(id == 2 && row.getValue<any>("T_Payments")?.length !== 0)
                }
              >
                Delete Member
              </MenuItem>,
            ]
      }
      renderTopToolbarCustomActions={({ table }) => {
        //  console.log(data);

        return (
          <Box
            sx={{ display: "flex", gap: "1rem", p: "0.5rem", flexWrap: "wrap" }}
          >
            {/* {
              <CSVLink
                headers={table.initialState.columnOrder}
                data={data ?? []}
                filename="csv_file"
              >
                <Button
                  color="primary"
                  // onClick={handleExportData}
                  startIcon={<FileDownloadIcon />}
                  variant="contained"
                >
                  Export
                </Button>
              </CSVLink>
            } */}
            <CustomButton
              name="Add"
              css={{
                width: "100px",
                height: "40px",
                marginLeft: "auto",
                marginBottom: "10px",
              }}
              func={() => addModel(true)}
            />

            {/* <Button
              disabled={
                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
              }
              
              onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
              startIcon={<FileDownloadIcon />}
              variant="contained"
            >
              Export Selected Rows
            </Button> */}
          </Box>
        );
      }}
    />
  );
};

export default Table;
