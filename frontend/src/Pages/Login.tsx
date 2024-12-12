import "./pagesStyles/logSign-bg.css";
import "./pagesStyles/logSign-form.css";
import "./pagesStyles/logSign-btn.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { useLoginMutation } from "../redux/slices/api";
import { showToast } from "../lib/error/handleError";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formSchema = z.object({
    userId: z.string().min(4).max(40),
    password: z.string().min(4),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  async function handleLogin(values: z.infer<typeof formSchema>) {
    
    try {
      const response = await login(values).unwrap();
      console.log(response);
      showToast.success("Login Successful");
      navigate("/compiler");
    } catch (error) {
      console.log(error);
      showToast.error("Invalid Credentials");
    }
    
  }

  return (
    <div className="log-sign-bg w-full h-screen flex justify-center items-center px-4">
      <div className="card">
        <h2 className="text-white text-3xl font-bold text-center mb-6">
          Welcome Back!
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="space-y-6"
          >
            {/* User ID Input */}
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Username or Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username or email"
                      className="bg-gray-800/50 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all duration-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Input */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="bg-gray-800/50 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all duration-300 pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-white focus:outline-none"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <Button className="custom-btn">
                {isLoading? <Loader2 className="animate-spin" /> :<span className="text">Login</span>}
              </Button>
            </div>
          </form>
        </Form>
        <div>
          <p className="text-white text-center text-sm mt-6">
            Don't have an account?{" "}
            <a className="text-violet-500 hover:text-violet-400 " href="/signup">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
