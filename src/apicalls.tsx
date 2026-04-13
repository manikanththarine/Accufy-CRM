const BASE_URL = 'http://127.0.0.1:1000';

async function handleResponse(response: Response) {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export const api = {

    Signin: (email: string, password: string) =>
        fetch(`${BASE_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }).then(handleResponse),

    // Leads
    getDashboardStats: () =>
        fetch(`${BASE_URL}/api/dashboard-stats`).then(handleResponse),

    createLead: (data: any) =>
        fetch(`${BASE_URL}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(handleResponse),

    updateLeadStage: (leadId: string, stage: string) =>
        fetch(`${BASE_URL}/api/update-lead-stage`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ leadId, stage }),
        }).then(handleResponse),

    // Tasks
    getTasks: (leadId: string) =>
        fetch(`${BASE_URL}/api/tasks?lead_id=${leadId}`).then(handleResponse),

    createTask: (taskData: any) =>
        fetch(`${BASE_URL}/api/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        }).then(handleResponse),

    updateTask: (taskId: string, data: any) =>
        fetch(`${BASE_URL}/api/tasks/${taskId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(handleResponse),


};