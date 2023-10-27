import { Box, Fade, Modal, Stack, Typography } from "@mui/material";
import { modelStyle } from "../../../../assets/css/modelStyle";
import { Header } from "../../../../components/common/Text";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LRError from "../../../../components/common/LRError";
import { CustomButton } from "../../../../components/common/Button";
import { InputPassword, Input } from "../../../../components/common/InputBox";
import adminTokenAxios from "../../../../hooks/AdminAxios";
import { user } from "../../../../assets/types/user";
import { useEffect } from "react";
import { AxiosResponse } from "axios";

type Inputs = {
  email: string;
  name: string;
  phone: number;
  logo: string;
  gym_name: string;
  password?: string;
};

const AddUser = ({
  open,
  handleClose,
  update,
  u_id,
}: {
  open: boolean;
  update: boolean;
  u_id?: number;
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const temp: Inputs[] | undefined = queryClient.getQueryData<Inputs[]>([
    "all-user",
  ]);
  const mData = temp?.find((item: user) => item.id === u_id);
  console.log(mData);
  useEffect(() => {
    reset();
  }, [mData, reset]);
  const addUserMU = useMutation({
    mutationFn: async (data: Inputs) => {
      return await adminTokenAxios.post(
        "/add-user-data",
        JSON.stringify(data),
        {
          headers: {
            // "Content-Type": "application/json ",
          },
        }
      );
    },
    onSuccess: (response) => {
      console.log(response.data.user_data);

      if (response.status === 200) {
        queryClient.setQueryData(["all-user"], response.data.user_data);
        reset();
      }
      console.log(response);
    },
  });
  const updateUserMU: any = useMutation({
    mutationFn: async (data: Inputs) => {
      return await adminTokenAxios.put(
        `/update-user-data/${u_id}`,
        JSON.stringify(data)
      );
    },
    onSuccess: (response) => {
      console.log(response.data);
      // return response
      if (response.status === 200) {
        queryClient.setQueryData(["all-user"], (data: user[] | undefined) => {
          const new_data: user[] | undefined = data?.map((item: user) => {
            if (item.id === response.data.trainer_data.id) {
              return response.data.trainer_data;
            }
            return item;
          });
          return new_data;
        });
        reset();
      }
      return response;
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (para_data: Inputs) => {
    update ? updateUserMU.mutate(para_data) : addUserMU.mutate(para_data);
    console.log(para_data.logo[0]);
  };
  console.log(updateUserMU.data?.data);
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
              text={update ? "Update Member" : "Add Member"}
              css={{
                borderBottom: `1px solid gray`,
                maxWidth: "200px",
                margin: "auto",
                textAlign: "center",
              }}
            />
            <LRError
              status={
                !update ? addUserMU.data?.status : updateUserMU.data?.status
              }
              message={
                !update
                  ? addUserMU.data?.data.message
                  : updateUserMU.data?.data.message
              }
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
                  required={update && false}
                  defaultVal={update ? mData?.email : ""}
                />
                <Input
                  label="Full Name"
                  type="text"
                  reg={register("name")}
                  defaultVal={update ? mData?.name : ""}
                  required={update && false}
                />
                <Stack spacing={4}>
                  <Input
                    label="Phone *"
                    type="tel"
                    required={update && false}
                    reg={register("phone", { maxLength: 10 })}
                    defaultVal={update ? mData?.phone : ""}
                  />
                  {errors.phone && errors.phone.type === "maxLength" && (
                    <Typography sx={{ color: "red", textAlign: "left" }}>
                      * Maximum 10 digit
                    </Typography>
                  )}
                </Stack>
                <Input
                  label="Gym Name"
                  type="text"
                  defaultVal={update ? mData?.gym_name : ""}
                  reg={register("gym_name")}
                  required={update && false}
                />
                <Input
                  label="Logo Image"
                  type="file"
                  reg={register("logo")}
                  //  defaultVal={update ? mData?. : ""}
                  required={false}
                />
                <InputPassword
                  label="Password"
                  type="password"
                  required={update && false}
                  // defaultVal={update ? mData?.password : ""}
                  reg={register("password")}
                />
              </Stack>
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                {update ? (
                  <>
                    <CustomButton
                      name={updateUserMU.isLoading ? "Updating...." : "Update"}
                      css={{ my: "30px", width: "45%" }}
                      type="submit"
                      disabled={updateUserMU.isLoading}
                    />
                    <CustomButton
                      name={"Reset"}
                      css={{ my: "30px", width: "45%" }}
                      type={"button"}
                      func={() => reset()}
                      disabled={updateUserMU.isLoading}
                    />
                  </>
                ) : (
                  <>
                    <CustomButton
                      name={addUserMU.isLoading ? "Adding...." : "Add"}
                      css={{ my: "30px", width: "45%" }}
                      type="submit"
                      disabled={addUserMU.isLoading}
                    />
                    <CustomButton
                      name={"Reset"}
                      css={{ my: "30px", width: "45%" }}
                      type={"button"}
                      func={() => reset()}
                      disabled={addUserMU.isLoading}
                    />
                  </>
                )}
              </Stack>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddUser;
