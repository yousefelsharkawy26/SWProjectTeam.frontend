import { useEffect, useState } from "react";
import { Search, User, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import Notification from "../ui/notification";
import UserProvider from "../../context/UserContext";

interface userSchema {
  name: string;
  email: string;
  bio: string;
  permission: string;
  imageUrl: string;
}

const TopNavbar = () => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const context = UserProvider.useUser();

  const [user, setUser] = useState<userSchema>(context.user || null);

  useEffect(() => {
    setUser(context.user);
  }, [context]);

  // Fetch users by name
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (search.length < 3) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await axios.get(
          `${apiUrl}/api/users/search?name=${search}`,
          {
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          }
        );
        console.log("search result: ", response.data);

        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [search, context, apiUrl]);

  const handleCancelSearch = () => {
    setSearch("");
  };

  const handleLogout = () => {
    // Here you would typically clear authentication tokens or session data
    toast.success("Logged out successfully");
    context.handleLogout();
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1000);
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-white">
      <div className="flex-1 flex items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-9 bg-gray-50 border-gray-200"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <X
            onClick={handleCancelSearch}
            className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer"
            visibility={search.length > 0 ? "visable" : "hidden"}
          />
          {search && searchResults.length > 0 && (
            <div className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto">
              {searchResults?.map((result, i) => (
                <Link
                  to={`/profile/${result.name}`}
                  key={i}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  <div
                    key={i}
                    className="flex items-center p-2 hover:bg-gray-100"
                  >
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src={
                          result.imageUrl != undefined
                            ? apiUrl + "/images/" + result.imageUrl
                            : apiUrl + "/images/" + "Avatar.png"
                        }
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium capitalize">
                        {result.name}
                      </span>
                      <span className="text-xs text-gray-500 uppercase">
                        {result.permission}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Notification />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={
                  user?.imageUrl
                    ? apiUrl + "/images/" + user.imageUrl
                    : "placeholder.svg"
                }
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left hidden md:block">
              <span className="text-sm font-medium capitalize">
                Dr. {user?.name}
              </span>
              <span className="text-xs text-gray-500 uppercase">
                {" "}
                / {user?.permission}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/my-account">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopNavbar;
