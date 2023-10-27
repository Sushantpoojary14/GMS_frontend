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
import { member } from "../../../../assets/types/user";
import userTokenAxios from "../../../../hooks/UserAxios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { AxiosResponse } from "axios";

const AddMembers = ({
  open,
  handleClose,
  update,
  m_id,
}: {
  open: boolean;
  update: boolean;
  m_id?: number;
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    reset,
  } = useForm<member>();
  const { user } = useContext(AuthContext);
  // const [mData,setMData] = useState<member | undefined>()
  const mData: member = queryClient
    .getQueryData<AxiosResponse>(["all-member-data"])
    ?.data.member_data?.find((item: member) => item.id === m_id);
  // const cachedMember = cacheData?.data.find((item: member) => item.id === m_id);
  useEffect(() => {
    reset();
  }, [mData, reset]);
  const cMember = useMutation({
    mutationFn: async (data: member) => {
      return await userTokenAxios.post(
        `/add-member-data/${user?.id}`,
        JSON.stringify(data),
       
      );
    },
    onSuccess: (response) => {
      
      // if (response.status === 200) {
      //   queryClient.setQueryData(["all-member-data"], response);
      //   reset();
      // }
      console.log(response);
    },
  });
  const uMember = useMutation({
    mutationFn: async (data: member) => {
      return await userTokenAxios.put(
        `/update-member-data/${m_id}`,
        JSON.stringify(data)
      );
    },
    onSuccess: (response) => {
      console.log(response.data.member_data);
      reset();
      if (response.status === 200) {
        queryClient.setQueryData(
          ["all-member-data"],
          (data: AxiosResponse | undefined) => {
            data!.data!.member_data = data!.data!.member_data.map(
              (item: member) => {
                if (item.id === response.data.member_data.id) {
                  return response.data.member_data;
                }
                return item;
              }
            );

            return data;
          }
        );

        handleClose();
      }
      console.log(response);
    },
  });

  const onSubmit: SubmitHandler<member> = async (para_data: member) => {
    para_data.m_image= para_data.m_image[0]
    update ? uMember.mutate(para_data) : cMember.mutate(para_data.m_image[0]);
    console.log(para_data);
  };

  // console.log(mData);

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
          <Box sx={{ ...modelStyle }}>
            <Header
              text={update ? "Update Member" : "Add Member"}
              css={{
                borderBottom: `1px solid gray`,
                textAlign: "center",
                maxWidth: "200px",
                margin: "auto",
              }}
            />
            <LRError
              status={cMember.data?.status}
              message={cMember.data?.data.message}
            />
            <form onSubmit={handleSubmit(onSubmit)} >
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
                    // defaultValue="female"
                    // {...register("gender")}
                    sx={{ flexDirection: "row" }}
                    defaultValue={update ? mData?.gender : ""}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                      {...register("gender")}
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                      {...register("gender")}
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                      {...register("gender")}
                    />
                  </RadioGroup>
                </Box>
                <Input
                  label="Date"
                  type="date"
                  reg={register("DOB")}
                  defaultVal={update ? mData?.DOB : "2000-09-14"}
                />
                <Input
                  label="Occupation"
                  type="text"
                  reg={register("occupation")}
                  defaultVal={update ? mData?.occupation : ""}
                  required={false}
                />
                <Input
                  label="Blood Group"
                  type="text"
                  reg={register("blood_group")}
                  defaultVal={update ? mData?.blood_group : ""}
                  required={false}
                />
                <Input
                  label="Height (cm)"
                  type="number"
                  reg={register("height_cm")}
                  defaultVal={update ? mData?.height_cm : ""}
                  required={false}
                />
                <Input
                  label="Weight (cm)"
                  type="number"
                  reg={register("weight_kg")}
                  defaultVal={update ? mData?.weight_kg : ""}
                  required={false}
                />
                <Input
                  label="Program"
                  type="text"
                  reg={register("program")}
                  defaultVal={update ? mData?.program : ""}
                  required={false}
                />
                  <Input
                  label="Member Photo"
                  type="file"
                  reg={register("m_image")}
                  required ={!update}
                  // defaultVal={update ? mData?.program : ""}
                />
              </Stack>
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                {update ? (
                  <CustomButton
                    name={uMember.isLoading ? "Updating..." : "Update"}
                    css={{ my: "30px", width: "45%" }}
                    type={"submit"}
                    disabled={uMember.isLoading ? true : false}
                  />
                ) : (
                  <CustomButton
                    name={cMember.isLoading ? "Adding...." : "Add"}
                    css={{ my: "30px", width: "45%" }}
                    type={"submit"}
                    disabled={cMember.isLoading ? true : false}
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

export default AddMembers;
