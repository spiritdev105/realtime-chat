import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";

export default function Register() {
    const { register, handleSubmit, reset } = useForm();

    function registerUser(data) {
        console.log(data)
    }

    return (
        <section className="min-h-screen relative flex justify-center items-center">
            <img src="/images/nightBg.jpg" alt="" className="absolute top-0 left-0 h-screen w-full object-cover" />
            <form className="bg-gray-700 rounded-xl py-10 px-8 z-10 w-[50rem]" onSubmit={handleSubmit(registerUser)}>
                <h1 className="text-center text-gray-300 text-5xl font-semibold pb-3">Create an account</h1>
                <p className="text-center text-gray-400 text-2xl mb-6">We are so glad to see you again</p>

                <div className="email">
                    <label htmlFor="e-post" className="inline-block uppercase text-xl text-gray-400 font-medium mb-2">e-post :</label>
                    <input {...register("email", { required: true })} type="email" id="e-post" className="w-full bg-gray-800 text-xl text-gray-300 py-4 px-6 rounded-md outline-1 outline outline-gray-800 focus:outline-blue-500" />
                </div>

                <div className="username mt-4">
                    <label htmlFor="username" className="inline-block uppercase text-xl text-gray-400 font-medium mb-2">username :</label>
                    <input {...register("username", { required: true })} type="text" id="username" className="w-full bg-gray-800 text-xl text-gray-300 py-4 px-6 rounded-md outline-1 outline outline-gray-800 focus:outline-blue-500" />
                </div>

                <div className="password mt-4">
                    <label htmlFor="password" className="inline-block uppercase text-xl text-gray-400 font-medium mb-2">password :</label>
                    <input {...register("password", { required: true })} type="password" id="password" className="w-full bg-gray-800 text-xl text-gray-300 py-4 px-6 rounded-md outline-1 outline outline-gray-800 focus:outline-blue-500" />
                </div>

                <div className="avatar mt-4">
                    <label htmlFor="avatar" className="inline-block uppercase text-xl text-gray-400 font-medium mb-2">avatar :</label>
                    <input {...register("avatar")} type="file" id="avatar" className="w-full bg-gray-800 text-xl text-gray-300 py-4 px-6 rounded-md" />
                </div>

                <input type="submit" value="Login" className="w-full mt-8 py-4 text-center text-2xl text-gray-300 font-medium bg-blue-500 rounded-md cursor-pointer transition-all hover:bg-blue-600" />
                <p className="text-xl text-gray-500 mt-3">
                    You already have an account?
                    <Link to="/login" className="text-blue-400 hover:underline ml-1">
                        Login
                    </Link>
                </p>
            </form>
        </section>
    )
}
