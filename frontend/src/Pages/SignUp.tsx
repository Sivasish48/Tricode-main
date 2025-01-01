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
import { useSignupMutation } from "../redux/slices/api";
import { showToast } from "../lib/error/handleError";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { currentUser, isLoggedIn } from "../redux/slices/appSlice";

function Signup() {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formSchema = z.object({
    username: z.string().min(4).max(40),
    email: z.string().email(),
    password: z.string().min(4),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function handleSignup(values: z.infer<typeof formSchema>) {
    try {
      const response = await signup(values).unwrap();
      console.log(response);
      showToast.success("Account Created Successfully");
      dispatch(currentUser(response))
      dispatch(isLoggedIn(true));
      navigate("/compiler");
    } catch (error) {
      console.log(error);
      showToast.error("Error occurred");
    }
  }

  return (
    <div className="log-sign-bg w-full h-screen flex justify-center items-center px-4">
      <div className="card">
        <h2 className="text-white text-3xl font-bold text-center mb-6">
          Create Your Account
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="space-y-6"
          >
            {/* Username Input */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      className="bg-gray-800/50 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all duration-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Input */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
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
                {isLoading ? <Loader2 className="animate-spin" /> : <span className="text">Sign Up</span>}
              </Button>
            </div>
          </form>
        </Form>
        <div>
          <p className="text-white text-center text-sm mt-6">
            Already have an account?{" "}
            <a className="text-violet-500 hover:text-violet-400 " href="/login">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
