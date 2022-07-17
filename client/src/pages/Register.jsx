import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from '../axiosConfig'
import { v4 } from 'uuid'
import uploadImg from '../utils/uploadImg'
import { toast } from 'react-toastify'
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';

export default function Register() {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (user) navigate('/')
    }, [user, navigate])

    async function registerUser(data) {
        setLoading(true)

        const imageName = v4()
        let imageUrl = null

        try {
            if (data.avatar[0]) {
                imageUrl = await uploadImg(data.avatar[0], imageName)
            }

            await axios.post('/auth/register', { ...data, imageName, imageUrl })
            navigate('/login')
            reset()

        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            toast(message, { type: 'error', autoClose: 2000 })
        }

        setLoading(false)
    }

    return (
        <section className="min-h-screen relative flex justify-center items-center px-10">
            <img src="/images/nightBg.jpg" alt="" className="absolute top-0 left-0 min-h-screen w-full object-cover" />
            <form className="bg-gray-700 rounded-xl py-10 px-8 z-10 w-[50rem] max-w-[50rem]" onSubmit={handleSubmit(registerUser)}>
                <h1 className="text-center text-gray-300 text-4xl sm:text-5xl font-semibold pb-1 sm:pb-3">Create an account</h1>
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

                {
                    loading ? <Loader /> : (
                        <input type="submit" value="Register" className="w-full mt-8 py-4 text-center text-2xl text-gray-300 font-medium bg-blue-500 rounded-md cursor-pointer transition-all hover:bg-blue-600" />
                    )
                }

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
