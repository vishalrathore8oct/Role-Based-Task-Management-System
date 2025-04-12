import { useState } from 'react'
import axios from 'axios'

function TaskList() {

    const [tasks, setTasks] = useState([])

    const fetchTasks = async () => {
        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL;

            const response = await axios.get(`${backendURL}/api/task/getTask`, {
                withCredentials: true
            });
            console.log(response.data);

            const { tasks: userTask } = response.data;
            if (!userTask || userTask.length === 0) {
                alert("No tasks found.");
                return;
            }
            setTasks(userTask);
            alert("Tasks fetched successfully!");

        } catch (error) {
            console.error("Error fetching tasks:", error);
            alert("Failed to fetch tasks. Please try again.");
        }
    }
    return (
        <>
            <div className="flex items-center justify-center p-4 bg-sky-100">
                <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Task List</h2>
                    <button onClick={fetchTasks} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Fetch Tasks</button>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Tasks</h3>
                <ul className="space-y-3">
                    {tasks.length === 0 ? (
                        <p className="text-gray-500">No tasks available.</p>
                    ) : (
                        tasks.map((task, idx) => (
                            <li
                                key={idx}
                                className="p-4 bg-gray-100 rounded-xl shadow-sm border border-gray-200"
                            >
                                <h4 className="font-bold text-blue-700">Title: {task.title}</h4>
                                <p className="text-gray-600 mt-1"><strong>description</strong> {task.description}</p>
                                <p className="text-gray-600 mt-1"><strong>Created By:</strong> {task.userId.name}</p>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </>



    )
}

export default TaskList