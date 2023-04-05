import { Link } from "react-router-dom"



export const AuthLayout = ({ children, title = '' }) => {
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <h1 className="font-bold text-center text-2xl mb-5 text-slate-800">{title}</h1>
                    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                        {children}

                        <div className="py-5">
                            <div className="grid grid-cols-2 gap-1">
                                <div className="text-center sm:text-left whitespace-nowrap">
                                    <Link to={'/'} className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                        <i className="fa-solid fa-arrow-left inline-block align-text-top"></i>
                                        <span className="inline-block ml-1">Back to your-app.com</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}
