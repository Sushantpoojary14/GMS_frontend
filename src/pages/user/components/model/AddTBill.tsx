import { Box, Fade, Modal, Stack } from "@mui/material";
import { modelStyle } from "../../../../assets/css/modelStyle";
import { Header, ParaText } from "../../../../components/common/Text";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LRError from "../../../../components/common/LRError";
import { CustomButton } from "../../../../components/common/Button";
import { Input } from "../../../../components/common/InputBox";
import { t_payment, trainer } from "../../../../assets/types/user";
import userTokenAxios from "../../../../hooks/UserAxios";
import { useEffect } from "react";

const AddTBill = ({
  open,
  handleClose,
  update,
  t_id,
}: {
  open: boolean;
  update: boolean;
  t_id?: number;
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    // watch,

    reset,
  } = useForm<t_payment>();

  // const [mData,setMData] = useState<member | undefined>()
  const temp: trainer[] | undefined = queryClient.getQueryData<trainer[]>([
    "all-trainer-data",
  ]);

  const mData = temp?.find((item: trainer) => item.id === t_id);
  console.log(mData?.name);

  // const cachedMember = cacheData?.data.find((item: member) => item.id === m_id);
  useEffect(() => {
    reset();
  }, [mData, reset]);

  const m_pay = useMutation({
    mutationFn: async (data: t_payment) => {
      return await userTokenAxios.post(
        `/add-trainer-payment/${t_id}`,
        JSON.stringify(data)
      );
    },
    onSuccess: (response) => {
      console.log(response.data);
      if (response.status === 200) {
        queryClient.setQueryData(
          ["all-trainer-data"],
          (data: trainer[] | undefined) => {
            data = data?.map((item: trainer) => {
              if (item.id === response.data.trainer_data.id) {
                return response.data.trainer_data;
              }
              return item;
            });

            return data;
          }
        );

        handleClose();
      }
    },
  });
  const u_pay = useMutation({
    mutationFn: async (data: t_payment) => {
      return await userTokenAxios.put(
        `/update-trainer-payment/${t_id}`,
        JSON.stringify(data)
      );
    },
    onSuccess: (response) => {
      console.log(response.data);
      if (response.status === 200) {
        queryClient.setQueryData(
          ["all-trainer-data"],
          (data: trainer[] | undefined) => {
            data = data?.map((item: trainer) => {
              if (item.id === response.data.trainer_data.id) {
                return response.data.trainer_data;
              }
              return item;
            });

            return data;
          }
        );

        handleClose();
      }
    },
  });
  const d_pay = useMutation({
    mutationFn: async (mp_id: number | undefined) => {
      return await userTokenAxios.delete(`/delete-trainer-payment/${mp_id}`);
    },
    onSuccess: (response) => {
      console.log(response.data);
      if (response.status === 200) {
        queryClient.setQueryData(
          ["all-trainer-data"],
          (data: trainer[] | undefined) => {
            data = data?.map((item: trainer) => {
              if (item.id === response.data.trainer_data.id) {
                return response.data.trainer_data;
              }
              return item;
            });

            return data;
          }
        );

        handleClose();
      }
    },
  });
  const onSubmit: SubmitHandler<t_payment> = async (para_data: t_payment) => {
    update ? u_pay.mutate(para_data) : m_pay.mutate(para_data);
    console.log(para_data);
  };
  const currentDate = new Date().toJSON().slice(0, 10);
  // let [year,month ,date ] = currentDate.split("-")

  // console.log(
  //   year =(month == "12")
  //     ? parseInt(year)  + 1
  //     : year

  // );

  // const mData = cacheData.data?.member_data.filter((member:member)=>{

  // });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Fade in={open}>
          <Box sx={{ ...modelStyle, maxHeight: "90%" }}>
            <Header
              text={update ? "Edit Trainer Bill" : "New Trainer Bill"}
              css={{
                borderBottom: `1px solid gray`,
                textAlign: "center",
                maxWidth: "200px",
                margin: "auto",
              }}
            />
            <LRError
              status={m_pay.data?.status}
              message={m_pay.data?.data.message}
            />
            <ParaText text={`Full Name: ${mData?.name}`} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                sx={{
                  maxHeight: 500,
                  height: "200px",
                  overflowY: "auto",
                  display: "grid",
                  gridTemplateColumns: {
                    lg: "auto auto",
                    md: "auto auto",
                    sm: "auto auto",
                    xs: "auto",
                  },
                  gap: "10px",
                  rowGap: "40px",
                  my: "10px",
                }}
              >
                {/* <ParaText text={`Full Name: ${mData?.name}`}/> */}
                <Input
                  label="Start Date"
                  type="date"
                  reg={register("start_date")}
                  defaultVal={
                    update
                      ? mData?.T_Payments && mData?.T_Payments[0]?.start_date
                      : currentDate
                  }
                />
                <Input
                  label="End Date"
                  type="date"
                  reg={register("end_date")}
                  defaultVal={
                    update
                      ? mData?.T_Payments && mData?.T_Payments[0]?.end_date
                      : ""
                  }
                />

                <Input
                  label="Fee"
                  type="text"
                  reg={register("fee")}
                  defaultVal={
                    update
                      ? mData?.T_Payments && mData?.T_Payments[0]?.fee
                      : "800"
                  }
                />
                <Input
                  label="Total Month"
                  type="number"
                  reg={register("total_month")}
                  defaultVal={
                    update
                      ? mData?.T_Payments && mData?.T_Payments[0]?.total_month
                      : "1"
                  }
                />
              </Stack>
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                {update ? (
                  <CustomButton
                    name={u_pay.isLoading ? "Updating..." : "Update"}
                    css={{ my: "30px", width: "45%" }}
                    type={"submit"}
                    disabled={u_pay.isLoading ? true : false}
                  />
                ) : (
                  <CustomButton
                    name={m_pay.isLoading ? "Adding...." : "Add"}
                    css={{ my: "30px", width: "45%" }}
                    type={"submit"}
                    disabled={m_pay.isLoading ? true : false}
                  />
                )}
                {update ? (
                  <CustomButton
                    name={"Delete"}
                    css={{ my: "30px", width: "45%", backgroundColor: "red" }}
                    type={"button"}
                    func={() =>
                      d_pay.mutate(mData?.T_Payments && mData?.T_Payments[0].id)
                    }
                  />
                ) : (
                  <CustomButton
                    name={"Reset"}
                    css={{ my: "30px", width: "45%" }}
                    type={"button"}
                    func={() => reset()}
                  />
                )}
              </Stack>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddTBill;
