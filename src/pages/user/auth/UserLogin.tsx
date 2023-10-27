import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Container } from "@mui/material";
import { Input, InputPassword } from "../../../components/common/InputBox";
import { CustomButton } from "../../../components/common/Button";
import { Header } from "../../../components/common/Text";
import { useMutation } from "@tanstack/react-query";
import axiosBaseURL from "../../../hooks/BaseAxios";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { userData } from "../../../assets/types/auth";
import LRError from "../../../components/common/LRError";
type Inputs = {
  email: string;
  password: string;
};


const UserLogin = () => {
    const { userLogin } = useContext(AuthContext);
    const {
      register,
      handleSubmit,
      // watch,
      // formState: { errors },
      // reset,
    } = useForm<Inputs>();
  
    const { data, mutate, isLoading } = useMutation({
      mutationFn: async (data: Inputs) => {
        return await axiosBaseURL.post("/user/login", JSON.stringify(data));
      },
      onSuccess: (response) => {
        if (response.status === 200) {
          const data: userData = response?.data?.data;
          const token: string = response?.data?.token;
          if (data && token) {
            userLogin({ data, token });
            // adminLogin(user, accessToken);
          }
        }
        console.log(response);
      },
    });
  
  
    const onSubmit: SubmitHandler<Inputs> = async (para_data: Inputs) => {
      mutate(para_data);
      console.log(para_data);
    };
  
  return (
    <Container
    maxWidth="xl"
    sx={{
      my: "50px",
      height: "auto",
    }}
  >
    <Box
      sx={{
        width: { lg: "450px", xs: "320px" },
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        m: "auto",
        // px: "30px",
      }}
    >
      <Header text="Login" css={{ mb: "1rem" }} />
      <LRError status={data?.status} message={data?.data.message} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          reg={register("email")}
          css={{ mb: "30px" }}
        />
        <InputPassword
          label="Password"
          type="password"
          reg={register("password")}
          css={{ my: "20px" }}
        />
        {/* <Typography sx={{ color: "#FA8128", textAlign: "right" }}>
          Forgot Password?
        </Typography> */}
        <CustomButton
          name={isLoading ? "...." : "Login"}
          css={{ my: "30px", width: "100%" }}
          type={isLoading ? "button" : "submit"}
        />
      </form>
    </Box>
  </Container>
  )
}

export default UserLogin
