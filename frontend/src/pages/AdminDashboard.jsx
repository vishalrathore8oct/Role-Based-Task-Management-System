import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import axios from "axios";

function AdminDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) {
            alert("Please login to access this page.");
            navigate("/login");
        } else if (user.role !== "admin") {
            alert("Access denied. You do not have permission to view this page.");
            navigate("/login");
        }
    }, []);

    const handleLogout = async () => {
        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL;

            const response = await axios.get(`${backendURL}/api/auth/logout`, {
                withCredentials: true,
            });
            console.log(response.data);
            alert(response.data.message);
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        }
    
        localStorage.removeItem("user");
        navigate("/login");
    };

    

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
            {/* Top Navigation Bar */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-6">
                {/* Left */}
                <div className="text-left">
                    <p className="text-xl font-semibold text-gray-800">
                        Hello, {user?.name} 🧑‍💼
                    </p>
                    <p className="text-sm text-gray-500">Role: {user?.role}</p>
                </div>

                {/* Center */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-blue-600">Admin Dashboard</h2>
                </div>

                {/* Right */}
                <div className="text-right">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Task List Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg h-[85vh] overflow-y-auto">
                <TaskList />
            </div>
        </div>
    );
}

export default AdminDashboard;
