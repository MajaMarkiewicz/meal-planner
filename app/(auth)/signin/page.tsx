import { NextPage } from "next";
import AuthForm from "@/components/AuthForm";

const Signin: NextPage = () => {
  return <AuthForm mode="signin" />
}

export default Signin;