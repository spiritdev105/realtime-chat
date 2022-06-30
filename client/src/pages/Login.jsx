import axios from '../axiosConfig'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"

export default function Login() {
    const { register, handleSubmit, reset } = useForm();

    async function loginUser(data) {
        try {
            const res = await axios.post('/auth/login', data)
            console.log(res.data)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            console.log(message)
        }
    }

    return (
        <section className="min-h-screen relative flex justify-center items-center">
            <img src="/images/nightBg.jpg" alt="" className="absolute top-0 left-0 h-screen w-full object-cover" />
            <form className="bg-gray-700 rounded-xl py-10 px-8 z-10 w-[50rem]" onSubmit={handleSubmit(loginUser)}>
                <h1 className="text-center text-gray-300 text-5xl font-semibold pb-3">Welcome back</h1>

                <div className="email">
                    <label htmlFor="e-post" className="inline-block uppercase text-xl text-gray-400 font-medium mb-2">e-post :</label>
                    <input {...register("email", { required: true })} type="email" id="e-post" className="w-full bg-gray-800 text-xl text-gray-300 py-4 px-6 rounded-md outline-1 outline outline-gray-800 focus:outline-blue-500" />
                </div>

                <div className="password mt-4">
                    <label htmlFor="password" className="inline-block uppercase text-xl text-gray-400 font-medium mb-2">password :</label>
                    <input {...register("pass", { required: true })} type="password" id="password" className="w-full bg-gray-800 text-xl text-gray-300 py-4 px-6 rounded-md outline-1 outline outline-gray-800 focus:outline-blue-500" />
                </div>

                <input type="submit" value="Login" className="w-full mt-8 py-4 text-center text-2xl text-gray-300 font-medium bg-blue-500 rounded-md cursor-pointer transition-all hover:bg-blue-600" />
                <p className="text-xl text-gray-500 mt-3">
                    You need an account?
                    <Link to="/register" className="text-blue-400 hover:underline ml-1">
                        Register
                    </Link>
                </p>
            </form>
        </section>
    )
}
