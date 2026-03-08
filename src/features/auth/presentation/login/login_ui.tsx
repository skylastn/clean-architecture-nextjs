"use client";

import Link from "next/link";
import { useLoginLogic } from "./login_logic";

const LoginUI = () => {
  const { setUsername, setPassword, handlerLogin } = useLoginLogic();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">
          Welcome Back
        </h1>

        <form className="space-y-5" onSubmit={handlerLogin}>
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Masukkan username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Masukkan password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#EE1458] px-4 py-3 text-sm font-medium text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <span>Belum punya akun? </span>
          <Link
            href="/auth/register"
            className="font-medium text-[#EE1458] hover:underline"
          >
            Registrasi di sini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginUI;
