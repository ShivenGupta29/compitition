import { getTasks, addTask, updateTaskStatus } from './tasks.js';

document.addEventListener('DOMContentLoaded', () => {
    const quickAddInput = document.querySelector('.quick-add-input');
    const kanbanBoard = document.querySelector('.kanban-board');

    const renderBoard = () => {
        const tasks = getTasks();
        
        const newRequests = tasks.filter(t => t.status === 'New Request' || t.status === 'Needs Clarification');
        const readyToAssign = tasks.filter(t => t.status === 'Ready to Assign');
        const inProgress = tasks.filter(t => t.status === 'In Progress');
        const waitingOnClient = tasks.filter(t => t.status === 'Waiting on Client');

        const drawCard = (task, nextStatus) => `
            <div class="task-card card" style="margin-bottom: 12px; animation: fadeIn 0.3s ease; padding: 16px;">
                <h4 style="margin-bottom: 8px;">${task.title}</h4>
                <span class="status-pill" style="background: #e2e8f0; color: #475569;">${task.status}</span>
                <p style="font-size: 12px; margin-top: 8px; color: #64748B;">Assignee: ${task.assignee}</p>
                <button onclick="window.advanceTask('${task.id}', '${nextStatus}')" style="margin-top: 12px; padding: 8px; font-size: 12px; width: 100%; cursor: pointer; border-radius: 6px; border: 1px solid #cbd5e1; background: white; font-weight: bold;">
                    Move to ${nextStatus}
                </button>
            </div>
        `;

        kanbanBoard.innerHTML = `
            <div class="kanban-column">
                <h3>Intake (${newRequests.length})</h3>
                <div style="margin-top:12px;">${newRequests.map(t => drawCard(t, 'Ready to Assign')).join('')}</div>
            </div>
            <div class="kanban-column">
                <h3>Ready (${readyToAssign.length})</h3>
                <div style="margin-top:12px;">${readyToAssign.map(t => drawCard(t, 'In Progress')).join('')}</div>
            </div>
            <div class="kanban-column">
                <h3>In Progress (${inProgress.length})</h3>
                <div style="margin-top:12px;">${inProgress.map(t => drawCard(t, 'Waiting on Client')).join('')}</div>
            </div>
            <div class="kanban-column">
                <h3>Waiting on Client (${waitingOnClient.length})</h3>
                <div style="margin-top:12px;">${waitingOnClient.map(t => drawCard(t, 'Done')).join('')}</div>
            </div>
        `;
    };

    window.advanceTask = (id, newStatus) => {
        updateTaskStatus(id, newStatus);
        renderBoard();
        window.dispatchEvent(new Event('storage')); 
    };

    if (quickAddInput) {
        quickAddInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && quickAddInput.value.trim() !== '') {
                addTask(quickAddInput.value.trim(), 'Employee');
                quickAddInput.value = ''; 
                renderBoard(); 
                window.dispatchEvent(new Event('storage')); 
            }
        });
    }

    window.addEventListener('storage', (e) => {
        if (e.key === 'lala_tasks') renderBoard();
    });

    renderBoard();
});
