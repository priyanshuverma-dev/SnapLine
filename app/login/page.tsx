import LoginForm from "@/components/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <div
      className="
    flex
    min-h-full
    max-h-screen
    flex-col
    justify-center
    py-12
    sm:px-6
    lg:px-8
  "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          className="
        mt-6
        text-center
        text-3xl
        font-bold
        tracking-tight
        text-gray-900
        dark:text-gray-100
      "
        >
          Log back in to your account
        </h2>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
