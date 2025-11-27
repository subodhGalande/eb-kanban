/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

type FormType = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormType) => {
    setServerError("");

    try {
      const res = await axios.post("/api/auth/signup", data);
      if (res.status === 201) {
        router.push("/login");
      }
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create an account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("name")}
          placeholder="Name"
          className="border p-2 w-full rounded"
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}

        <input
          {...register("email")}
          placeholder="Email"
          className="border p-2 w-full rounded"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="border p-2 w-full rounded"
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}

        {serverError && <p className="text-red-600">{serverError}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
