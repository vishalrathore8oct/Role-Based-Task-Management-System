import { useState } from "react";
import axios from "axios";

function TaskCreate() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !description) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/task/createTask", {
                title,
                description
            }, {
                withCredentials: true
            });

            console.log(response.data);

            alert("Task created successfully!");

            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error creating task:", error);
            alert("Failed to create task. Please try again.");
        }
    }
    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Task title"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Task description"
                ></textarea>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
                Create Task
            </button>
        </form>
    )
}

export default TaskCreate