
export const getEnvVariables = () => {

    // import.meta.env

    return {
        // ...import.meta.env
        VITE_API_URL: import.meta.env.VITE_API_URL,
        STRIPE_PUBLIC_KEY: import.meta.env.STRIPE_PUBLIC_KEY,
    }
}