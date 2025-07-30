import React, { useId, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Link, Navigate, useNavigate } from "react-router";
import { useFormState } from "react-dom";
import { Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Api_url from "../api/apiClient";
import { ExtructErrorMessages } from "@/utils/errorUtil";

// function SubmitButton() {
//   const { pending } = useFormState();
//   return (
//     <Button className={"w-full"}>
//       {pending ? (
//         <span className="text-sm flex items-center gap-2">
//           <Loader className=" animate-spin" /> Creating...
//         </span>
//       ) : (
//         "Create account"
//       )}
//     </Button>
//   );
// }

export const RegisterForm = () => {
  const userNameId = useId();
  const PasswordId = useId();
  const emailId = useId();
  const comfirmId = useId();
  
  const navigete=useNavigate()

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    comfirm: "",
  });
  const [errs, setErrs] = useState(null);

  // mutatin func
  const mutation=useMutation({
    mutationFn: async(userData)=>{
      const response = await Api_url.post("/auth/register", userData);
      console.log(response)
      return response.data
      
    } ,
    onSuccess:(data)=>{
      setFormValues({
      name: "",
      email: "",
      password: "",
      comfirm: "",
     })
    navigete("/login")

    },
    onError:(err)=>{
    
        setErrs(ExtructErrorMessages(err))
      console.log(err)
      
    }
  })

  //  handleSubmit for from
  const handleSubmit = (e) => {
   e.preventDefault()

    setErrs(null);

    if (
      !formValues.name ||
      !formValues.email ||
      !formValues.password ||
      !formValues.comfirm
    ) {
      setErrs("All fields are required");
      return;
    }
    if (formValues.password !== formValues.comfirm) {
      setErrs("Password mus match!");
      return;
    }

    // mutation
    mutation.mutate({
      name:formValues.name,
      email:formValues.email,
      password:formValues.password
    })
  };


  // hanldeChane
  const handleChange=(e)=>{
    const {name, value}=e.target
    setFormValues({
      ...formValues,
      [name]:value
    })
  }

  return (
    <Card className={"w-full"}>
      <CardHeader className={"space-y-1 pb-4"}>
        <CardTitle className={"text-3xl text-center"}>
          Create an account
        </CardTitle>
        <CardDescription className={"text-center"}>
          Enter your details registeration
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className={"flex flex-col space-y-4"}>
          {errs && (
            <div className="p-2 rounded-md bg-destructive/10 text-sm text-destructive">
              {errs}
            </div>
          )}
          <div className="flex flex-col space-y-2">
            <label htmlFor={userNameId} className="text-sm ">
              Full Name
            </label>
            <Input
              type={"text"}
              name="name"
              id={userNameId}
              placeholder="John doh"
              required
              onChange={handleChange}
              value={formValues.name}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor={emailId} className="text-sm ">
              Email
            </label>
            <Input
              type={"email"}
              id={emailId}
              placeholder="John@email.com"
              name="email"
              required
               onChange={handleChange}
              value={formValues.email}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor={PasswordId} className="text-sm ">
              Password
            </label>
            <Input
              type={"password"}
              name="password"
              id={PasswordId}
              placeholder="*******"
              required
               onChange={handleChange}
              value={formValues.password}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor={comfirmId} className="text-sm ">
              Comfirm Password
            </label>
            <Input
              type={"password"}
              name="comfirm"
              id={comfirmId}
              placeholder="******"
              required
               onChange={handleChange}
              value={formValues.comfirm}
            />
          </div>
          <div className="mt-6">
            <Button className={"w-full"}>
              {mutation.isPending ? (
                <span className="text-sm flex items-center gap-2">
                  <Loader className=" animate-spin" /> Creating...
                </span>
              ) : (
                "Create account"
              )}
            </Button>
          </div>
        </CardContent>
      </form>
      <CardFooter className={"mt-5 flex flex-col justify-center"}>
        <div className="text-sm text-center">
          {" "}
          already have an account?{" "}
          <Link
            to={"/login"}
            className="text-primary hover:underline cursor-pointer "
          >
            Sing in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
