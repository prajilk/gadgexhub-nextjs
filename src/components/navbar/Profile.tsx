import { ChevronRight, UserCircle2 } from "lucide-react";
import Link from "next/link";

const Profile = () => {
    return (
        <div className="dropdown dropdown-hover cursor-pointer">
            <label tabIndex={0}>
                <UserCircle2 />
            </label>
            <div className="dropdown-menu w-72 md:w-80 border border-gray-200 rounded-none bg-white p-0 pb-3 cursor-default">
                <div className="flex gap-3 p-5">
                    <UserCircle2 />
                    <Link
                        href="/authentication"
                        className="hover:text-blue-500 hover:underline duration-100"
                    >
                        Sign up
                    </Link>
                    <span>or</span>
                    <Link
                        href="/authentication"
                        className="hover:text-blue-500 hover:underline duration-100"
                    >
                        Sign in
                    </Link>
                </div>
                <div className="divider m-0 h-0"></div>
                <Link
                    href="/orders"
                    className="flex gap-3 py-3 px-5 justify-between hover:bg-gray-100"
                >
                    Orders
                    <ChevronRight />
                </Link>
                <div className="divider m-0 h-0"></div>
                <Link
                    href="/account"
                    className="flex gap-3 py-3 px-5 justify-between hover:bg-gray-100"
                >
                    Account
                    <ChevronRight />
                </Link>
            </div>
        </div>
    );
};

export default Profile;
