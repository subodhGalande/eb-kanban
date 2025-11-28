"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

type LoginForm = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setServerError("");
    setLoading(true);
    setSuccessMsg("");

    try {
      const res = await axios.post("/api/auth/login", data);

      if (res.status === 200) {
        setSuccessMsg("Login successful! Redirecting...");
        setTimeout(() => router.push("/dashboard"), 1200);
      }
    } catch (err: any) {
      setServerError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans w-full flex-col flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-[90%] sm:max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex flex-col gap-1 mb-6">
          <h1 className="text-3xl font-sans font-semibold text-gray-800 text-center">
            Welcome Back
          </h1>
          <p className="font-sans text-center text-text">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Success Notification */}
        {successMsg && (
          <div className="w-full mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm text-center">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <input
              {...register("email")}
              placeholder="Email Address"
              className="w-full px-4 py-2 bg-card-background rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
            {errors.email && (
              <p className="text-danger text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full px-4 py-2 bg-card-background rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
            {errors.password && (
              <p className="text-danger text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Server Errors */}
          {serverError && (
            <p className="text-danger text-sm text-center">{serverError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading && (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup link */}
        <p className="text-center font-sans text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
