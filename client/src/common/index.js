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
};

export default Api;
