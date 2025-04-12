import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL;

            const response = await axios.post(`${backendURL}/api/auth/login`,
                { email, password },
                { withCredentials: true }

            )
            console.log(response.data)

            const { user, token } = response.data;

            if (!user || !token) {
                alert("Login response incomplete.");
                return;
            }

            const { name, email: userEmail, role } = user;

            localStorage.setItem("user", JSON.stringify({ name, email: userEmail, role, token }));
            alert("Login successful!")
            if (role === "admin") {
                navigate("/admin-dashboard")
            } else if (role === "user") {
                navigate("/user-dashboard")
            } else {
                alert("Invalid role. Access denied.")
                return
            }
        } catch (error) {
            console.error("Login failed:", error)
            alert("Login failed. Please check your credentials.")
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome Back</h2>

                <form className="space-y-5" onSubmit={handleLogin}>
                    <div>
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
                        Login
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-2">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-600 font-medium hover:underline">
                            Register here
                        </a>
                    </p>
                </form>
            </div>
        </div>

    )
}

export default Login