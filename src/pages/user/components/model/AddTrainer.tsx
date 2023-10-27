import {
  Box,
  Fade,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { modelStyle } from "../../../../assets/css/modelStyle";
import { Header, ParaText } from "../../../../components/common/Text";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LRError from "../../../../components/common/LRError";
import { CustomButton } from "../../../../components/common/Button";
import { Input } from "../../../../components/common/InputBox";
import { trainer } from "../../../../assets/types/user";
import userTokenAxios from "../../../../hooks/UserAxios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../context/AuthContext";

const AddTrainer = ({
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
    formState: { errors },
    reset,
  } = useForm<trainer>();
  const { user } = useContext(AuthContext);
  const temp: trainer[] | undefined = queryClient.getQueryData<trainer[]>([
    "all-trainer-data",
  ]);

  const mData = temp?.find((item: trainer) => item.id === t_id);
  useEffect(() => {
    reset();
  }, [mData, reset]);
  const aTrainerMU = useMutation({
    mutationFn: async (data: trainer) => {
      return await userTokenAxios.post(
        `/add-trainer-data/${user?.id}`,
        JSON.stringify(data)
      );
    },
    onSuccess: (response) => {
      console.log(response.data.user_data);

      if (response.status === 200) {
        queryClient.setQueryData(
          ["all-trainer-data"],
          response.data.trainer_data
        );
        reset();
      }
      console.log(response);
    },
  });
  const uTrainerMU = useMutation({
    mutationFn: async (data: trainer) => {
      return await userTokenAxios.put(
        `/update-trainer-data/${t_id}`,
        JSON.stringify(data)
      );
    },
    onSuccess: (response) => {
      console.log(response.data);
      handleClose();
      if (response.status === 200) {
        queryClient.setQueryData(
          ["all-trainer-data"],
          (data: trainer[] | undefined) => {
            const new_data: trainer[] | undefined = data?.map(
              (item: trainer) => {
                if (item.id === response.data.trainer_data.id) {
                  return response.data.trainer_data;
                }
                return item;
              }
            );
            return new_data;
          }
        );
        reset();
      }
      console.log(response);
    },
  });
  const onSubmit: SubmitHandler<trainer> = async (para_data: trainer) => {
    update ? uTrainerMU.mutate(para_data) : aTrainerMU.mutate(para_data);
    // console.log(para_data);
  };
  // console.log(mData);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Fade in={open}>
          <Box sx={{ ...modelStyle }}>
            <Header
              text={update ? "Update Trainer" : "Add Trainer"}
              css={{
                borderBottom: `1px solid gray`,
                textAlign: "center",
                maxWidth: "150px",
                margin: "auto",
              }}
            />
            <LRError
              status={aTrainerMU.data?.status}
              message={aTrainerMU.data?.data.message}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                sx={{
                  maxHeight: 300,
                  overflowY: "auto",
                  display: "grid",
                  gridTemplateColumns: {
                    lg: "auto auto auto",
                    md: "auto auto auto",
                    sm: "auto auto",
                    xs: "auto",
                  },
                  gap: "10px",
                  rowGap: "40px",
                  my: "10px",
                }}
              >
                <Input
                  label="Email"
                  type="email"
                  reg={register("email")}
                  defaultVal={update ? mData?.email : ""}
                />
                <Input
                  label="Full Name *"
                  type="text"
                  reg={register("name")}
                  defaultVal={update ? mData?.name : ""}
                />
                <Stack spacing={4}>
                  <Input
                    label="Phone *"
                    type="tel"
                    reg={register("phone", { maxLength: 10 })}
                    defaultVal={update ? mData?.phone : ""}
                  />
                  {errors.phone && errors.phone.type === "maxLength" && (
                    <Typography sx={{ color: "red", textAlign: "left" }}>
                      * Maximum 10 digit
                    </Typography>
                  )}
                </Stack>
                <Box sx={{ margin: 0, padding: 0 }}>
                  <ParaText text={"Gender *"} css={{ textAlign: "left" }} />
                  <RadioGroup
                    aria-labelledby="radio-buttons-group-label"
                    defaultValue={update ? mData?.gender : ""}
                    // {...register("gender")}
                    sx={{ flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                      {...register("gender", { required: true })}
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                      {...register("gender", { required: true, })}
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                      {...register("gender", { required: true })}
                    />
                  </RadioGroup>
                </Box>
                <Input
                  label="Date"
                  type="date"
                  reg={register("DOB")}
                  defaultVal={update ? mData?.DOB : "2000-09-14"}
                />
                {/* <Input label="Payment*" type="number" reg={register("payment")} /> */}
              </Stack>

              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                {update ? (
                  <CustomButton
                    name={uTrainerMU.isLoading ? "Updating..." : "Update"}
                    css={{ my: "30px", width: "45%" }}
                    type={"submit"}
                    disabled={uTrainerMU.isLoading ? true : false}
                  />
                ) : (
                  <CustomButton
                    name={aTrainerMU.isLoading ? "Adding...." : "Add"}
                    css={{ my: "30px", width: "45%" }}
                    type={"submit"}
                    disabled={aTrainerMU.isLoading ? true : false}
                  />
                )}
                <CustomButton
                  name={"Reset"}
                  css={{ my: "30px", width: "45%" }}
                  type={"button"}
                  func={() => reset()}
                />
              </Stack>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddTrainer;
