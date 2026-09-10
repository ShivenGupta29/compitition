export const getTasks = () => {
    const tasks = localStorage.getItem('lala_tasks');
    return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks) => {
    localStorage.setItem('lala_tasks', JSON.stringify(tasks));
};

export const addTask = (title, assignee) => {
    const tasks = getTasks();
    const newTask = {
        id: Date.now().toString(),
        title: title,
        assignee: assignee || 'Unassigned',
        status: 'New Request',
        createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
};

export const updateTaskStatus = (id, newStatus) => {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if(taskIndex > -1) {
        tasks[taskIndex].status = newStatus;
        saveTasks(tasks);
    }
};
