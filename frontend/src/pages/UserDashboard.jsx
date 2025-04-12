import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskCreate from "../components/TaskCreate";
import TaskList from "../components/TaskList";
import axios from "axios";

function UserDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) {
            alert("Please login to access this page.");
            navigate("/login");
        } else if (user.role !== "user") {
            alert("Access denied. You do not have permission to view this page.");
            navigate("/login");
        }
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/auth/logout", {
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
            {/* Top Navigation */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-6">
                {/* Left */}
                <div className="text-left">
                    <p className="text-xl font-semibold text-gray-800">
                        Hello, {user?.name} 👋
                    </p>
                    <p className="text-sm text-gray-500">Role: {user?.role}</p>
                </div>

                {/* Center */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-blue-600">User Dashboard</h2>
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

            {/* Main Content */}
            <div className="flex gap-6 h-[80vh]">
                {/* Left Side */}
                <div className="w-1/2 bg-white p-6 rounded-2xl shadow-lg flex flex-col h-[40vh]">
                    <h3 className="text-xl font-semibold text-blue-600 mb-4 text-center">
                        Create New Task
                    </h3>
                    <div className="flex-1 overflow-auto">
                        <TaskCreate />
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-1/2 bg-white p-6 rounded-2xl shadow-lg overflow-y-auto h-full">
                    <TaskList />
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
