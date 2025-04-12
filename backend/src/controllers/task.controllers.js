import Task from "../models/task.models.js";

export const createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;

    try {
        const newTask = new Task({ title, description, userId });
        await newTask.save();
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }

}

export const getTasks = async (req, res) => {
    const userRole = req.user.role;
    const userId = req.user.id;

    try {
        if (userRole === "admin") {
            const tasks = await Task.find().populate("userId", "name email");
            res.status(200).json({ message: "All tasks fetched successfully", tasks });
        } else {
            const tasks = await Task.find({ userId: userId }).populate("userId", "name email");
            res.status(200).json({ message: "User tasks fetched successfully", tasks });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }

}