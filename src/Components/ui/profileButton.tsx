import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { UserIcon } from "@heroicons/react/24/outline";
import { logout } from "@/slices/authSlice";
import { User, defaultUser } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/slices/store";
export default function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(defaultUser);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedin } = useSelector((state: RootState) => state.auth);
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
    if (isLoggedin) {
      setIsOpen(!isOpen);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="relative inline-block text-center" ref={dropdownRef}>
      <button onClick={handleButtonClick} className="relative group text-white">
        <span className="relative">
          {isLoggedin ? <UserIcon className="size-6" /> : "Login"}
        </span>
        <span className="absolute left-0 bottom-0 h-px w-full bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <button
              onClick={() => {
              
                if (user) {
                  console.log("I am in")
                  let savedUser = user;
                  if (user.name === "") {
                    savedUser = JSON.parse(
                      localStorage.getItem("savedUser") || ""
                    );
                    setUser(savedUser!);
                  }
                  console.log(savedUser)
                  if (savedUser?.name) {
                    console.log("done")
                    router.push(`/users/${savedUser.name}`);
                    setIsOpen(false);
                  }
                }
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
                dispatch(logout());
                setUser(defaultUser);
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
