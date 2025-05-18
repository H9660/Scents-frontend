import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { UserIcon } from "@heroicons/react/24/outline";
import { logout } from "@/slices/authSlice";
export default function ProfileButton({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleButtonClick = () => {
    if (user?.name) {
      setIsOpen(!isOpen);
    } else {
      router.push("/login");
    }
  };
  return (
    <div className="relative inline-block text-center" ref={dropdownRef}>
      <button
        onMouseEnter={handleButtonClick}
        className="relative group text-white"
      >
        <span className="relative">
          {user?.name ? <UserIcon className="size-6" /> : "Login"}
        </span>
        <span className="absolute left-0 bottom-0 h-px w-full bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <button
              onClick={() => {
                router.push(`/users/${user.name}`);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              My Profile
            </button>
            <button
              onClick={() => {
                router.push(`/shoppingcart`);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              My Cart
            </button>
            <button
              onClick={() => {
                router.push(`/users/${user.name}/orders`);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              My Orders
            </button>
            <button
              onClick={() => {
                dispatch(logout());
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
