import { getTasks, addTask } from './tasks.js';

document.addEventListener('DOMContentLoaded', () => {
    const quickAddInput = document.querySelector('.quick-add-input');
    const assigneeSelect = document.querySelector('.select-assignee');
    const statCards = document.querySelectorAll('.stat-number');

    const renderStats = () => {
        const tasks = getTasks();
        
        const waitingForUs = tasks.filter(t => t.status !== 'Done' && t.status !== 'Waiting on Client').length;
        const waitingOnClient = tasks.filter(t => t.status === 'Waiting on Client').length;
        const unassigned = tasks.filter(t => (t.assignee === 'Unassigned' || t.assignee === 'Assign to...') && t.status !== 'Done').length;
        const overdue = tasks.filter(t => 
            t.status !== 'Done' && 
            t.status !== 'Waiting on Client' && 
            (Date.now() - new Date(t.createdAt).getTime() > 60000) 
        ).length;

        if(statCards.length >= 4) {
            statCards[0].innerText = waitingForUs;
            statCards[1].innerText = waitingOnClient;
            statCards[2].innerText = unassigned;
            statCards[3].innerText = overdue;
        }
    };

    if (quickAddInput) {
        quickAddInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && quickAddInput.value.trim() !== '') {
                const assignee = assigneeSelect ? assigneeSelect.value : 'Unassigned';
                addTask(quickAddInput.value.trim(), assignee);
                quickAddInput.value = ''; 
                renderStats(); 
                window.dispatchEvent(new Event('storage')); 
            }
        });
    }

    window.addEventListener('storage', (e) => {
        if (e.key === 'lala_tasks') renderStats();
    });

    renderStats();
});
