const backendDomain = import.meta.env.VITE_API_URL;

const Api = {
    signUp: {
        url: `${backendDomain}/api/sign-up`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/sign-in`,
        method: "post"
    },
    getEmployee: {
        url: `${backendDomain}/api/employees`,
        method: "get"
    },
    deleteEmployee: {
        url: `${backendDomain}/api/employees/:id`,
        method: "delete"
    },
    updateRole: {
        url: `${backendDomain}/api/employees/:id/role`,
        method: "put"
    },
    EmployeeDetails: {
        url: `${backendDomain}/api/employees/:id`,
        method: "get"
    },
    updateEmployee: {
        url: `${backendDomain}/api/employees/:id`,
        method: "put"
    },
    addProject: {
        url: `${backendDomain}/api/projects`,
        method: "post"
    },
    getProject: {
        url: `${backendDomain}/api/projects`,
        method: "get"
    },
    checkProjectId: {
        url: `${backendDomain}/api/check-project-id/:projectId`,
        method: "get"
    },
    addClient: {
        url: `${backendDomain}/api/clients`,
        method: "post"
    },
    getClient: {
        url: `${backendDomain}/api/clients`,
        method: "get"
    },
    addProjectManager: {
        url: `${backendDomain}/api/project-managers`,
        method: "post"
    },
    getProjectManager: {
        url: `${backendDomain}/api/project-managers`,
        method: "get"
    },
    addTask: {
        url: `${backendDomain}/api/tasks`,
        method: "post"
    },
    getTask: {
        url: `${backendDomain}/api/tasks`,
        method: "get"
    },
    getUserTasks: {
        url: `${backendDomain}/api/user-tasks`,
        method: "get"
    },
    submitTask: {
        url: `${backendDomain}/api/task-submit`,
        method: "post"
    },
    startTask: {
        url: `${backendDomain}/api/task-start`,
        method: "post"
    },
    getProjectDetail: {
        url: `${backendDomain}/api/projects/:projectId`,
        method: "get"
    },
};

export default Api;
