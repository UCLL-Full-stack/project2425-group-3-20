import { User } from "@types";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    useEffect(() => {
        const loggedInUserString = localStorage.getItem("loggedInUser");
        if (loggedInUserString !==null) { 
          setLoggedInUser(JSON.parse(loggedInUserString));
        } 
        
      }, []);
    
      const handleClick = () => {
        localStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
      };
    return (
        <header className='d-flex justify-content-between align-items-center'>
            <h1>Bob the Encounter Builder</h1>
            <nav className="nav justify-content-center">
                <Link href='/' className="nav-link px-4 fs-5">
                    Home
                </Link>
                <Link href='/monsters' className="nav-link px-4 fs-5">
                    Monsters
                </Link>
                {!loggedInUser && (
                <Link
                  href="/login"
                  className="nav-link px-4 fs-5"
                >
                  Login
                </Link>
                  )}
                  {loggedInUser && (
                  <a
                      href="/login"
                      onClick={handleClick}
                      className="nav-link px-4 fs-5"
                  >
                      Logout
                  </a>
                  )}
                  {loggedInUser && (
                  <div className="text-black ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
                      welcome {loggedInUser.name}
                  </div>
                  )}
            </nav>
        </header>
    );
};

export default Header;