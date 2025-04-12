import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:8080/api/auth/register",
                { name, email, password },
                { withCredentials: true }

            )

            console.log(response.data);
            
            alert(response.data.message)

            navigate("/login")
        } catch (error) {
            console.error("Register failed:", error)
            alert("Register failed. Please check your credentials.")
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome Back</h2>

                <form className="space-y-5" onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Register
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-2">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-600 font-medium hover:underline">
                            Login here
                        </a>
                    </p>
                </form>
            </div>
        </div>

    )
}

export default Register