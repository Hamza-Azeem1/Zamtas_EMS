const backendDomin = import.meta.env.VITE_API_URL

const Api = {
    signUp: {
        url: `${backendDomin}/api/sign-up`,
        method: "post"
    },
    signIn: {
        url: `${backendDomin}/api/sign-in`,
        method: "post"
    },

}

export default Api