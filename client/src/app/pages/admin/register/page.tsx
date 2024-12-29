import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";

export default function AdminRegister() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* LEFT SECTION */}
            <div className="w-full md:w-1/3 flex-col  my-auto justify-center px-12 hidden md:block">
                <img
                    src="/sait-logo.png"
                    alt="Campus Connect"
                    className="w-80 h-auto mx-auto"
                />
                <Link href="/admin/login">
                    <h2 className="text-lg text-left mt-36 text-saitLightBlue underline tracking-wide">Already Have an Account?</h2>
                </Link>
                <p className="text-md mt-2 text-left text-gray-400">
                    Login to the admin dashboard with a valid SAIT email and a password.
                </p>
            </div>

            {/* MAIN FORM SECTION */}
            <div className="w-full md:w-2/3 flex flex-col items-center justify-center bg-blue-gradient p-8">
                <h1 className="text-saitWhite text-4xl mb-10 font-bold tracking-wider">CREATE AN ACCOUNT</h1>
                <div className="flex flex-col text-white bg-saitWhite bg-opacity-70 p-12 rounded-xl">
                    {/* FORM CONTAINER */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* EMAIL */}
                        <div>
                            <label htmlFor="email" className="text-saitGray text-md font-semibold">Email *</label>
                            <div className="bg-saitWhite rounded-xl mt-2 py-4 pr-8">
                                <input
                                    required
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your SAIT Email"
                                    className="w-full font-light text-saitGray placeholder-saitGray bg-transparent px-4 focus:outline-none focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label htmlFor="password" className="text-saitGray text-md font-semibold">Password *</label>
                            <div className="bg-saitWhite rounded-xl mt-2 py-4 pr-8">
                                <input
                                    required
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your Password"
                                    className="w-full font-light text-saitGray placeholder-saitGray bg-transparent px-4 focus:outline-none focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* FIRST NAME */}
                        <div>
                            <label htmlFor="firstName" className="text-saitGray text-md font-semibold">First Name *</label>
                            <div className="bg-saitWhite rounded-xl mt-2 py-4 pr-8">
                                <input
                                    required
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Enter your First Name"
                                    className="w-full font-light text-saitGray placeholder-saitGray bg-transparent px-4 focus:outline-none focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* LAST NAME */}
                        <div>
                            <label htmlFor="lastName" className="text-saitGray text-md font-semibold">Last Name *</label>
                            <div className="bg-saitWhite rounded-xl mt-2 py-4 pr-8">
                                <input
                                    required
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Enter your Last Name"
                                    className="w-full font-light text-saitGray placeholder-saitGray bg-transparent px-4 focus:outline-none focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* ROLE */}
                        <div>
                            <label htmlFor="role" className="text-saitGray text-md font-semibold">Role *</label>
                            <div className="bg-saitWhite rounded-xl mt-2 py-4 pr-8">
                                <input
                                    required
                                    type="text"
                                    id="role"
                                    name="role"
                                    placeholder="Enter your Role within the IC"
                                    className="w-full font-light text-saitGray placeholder-saitGray bg-transparent px-4 focus:outline-none focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* SAIT ID */}
                        <div>
                            <label htmlFor="saitId" className="text-saitGray text-md font-semibold">SAIT ID *</label>
                            <div className="bg-saitWhite rounded-xl mt-2 py-4 pr-8">
                                <input
                                    required
                                    type="text"
                                    id="saitId"
                                    name="saitId"
                                    placeholder="Enter a valid 9 digit SAIT ID"
                                    pattern="\d{9}"
                                    maxLength={9}
                                    className="w-full font-light text-saitGray placeholder-saitGray bg-transparent px-4 focus:outline-none focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* PHONE */}
                        <div>
                            <label htmlFor="phone" className="text-saitGray text-md font-semibold">Phone Number</label>
                            <div className="bg-saitWhite rounded-xl mt-2 py-4 pr-8">
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter your Phone Number"
                                    className="w-full font-light text-saitGray placeholder-saitGray bg-transparent px-4 focus:outline-none focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* LOGIN BUTTON */}
                        <div className="flex items-end justify-center">
                            <button
                                type="submit"
                                className="bg-green-500 text-saitWhite font-bold py-3 px-6 rounded-xl hover:bg-opacity-90 focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Additional Info for Small Screens */}
            <div className="block md:hidden my-16 px-12 text-center">
                    <Link href="/admin/login">
                        <h2 className="text-lg text-saitLightBlue underline tracking-wide">Already Have an Account?</h2>
                    </Link>
                    <p className="text-md mt-2 text-gray-400">
                        Login to the admin dashboard with a valid SAIT email and a password.
                    </p>
                </div>
        </div>
    );
}
