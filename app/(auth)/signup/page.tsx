"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const schema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

type FormType = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormType) => {
    setServerError("");
    setLoading(true);
    setSuccessMsg("");

    try {
      const res = await axios.post("/api/auth/signup", data);

      if (res.status === 201) {
        setSuccessMsg("Signup successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1400);
      }
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  font-sans w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-[90%] sm:max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex flex-col gap-1 mb-6">
          <h1 className="text-3xl font-sans font-semibold text-gray-800 text-center">
            Create an account
          </h1>
          <p className="font-sans text-center text-text">
            Enter your information below to create your account
          </p>
        </div>

        {successMsg && (
          <div className="w-full mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm text-center">
            {successMsg}
          </div>
        )}

        {/* signup form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full px-4 py-2 bg-card-background rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
            {errors.name && (
              <p className="text-danger text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

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

          {/* Server sent errors */}
          {serverError && (
            <p className="text-danger text-sm text-center">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading && (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center font-sans text-sm text-text mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
