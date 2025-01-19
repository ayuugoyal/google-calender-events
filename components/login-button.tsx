"use client"
import React from 'react'
import { signIn } from "next-auth/react"

const LoginButton = () => {
  return (
    <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
      onClick={() => {
        signIn('google', { redirectTo: "/" });
      }}>
      Login With Google
    </button>)
}

export default LoginButton