import Link from "next/link";

const Header: React.FC = () => {
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
                {/* <Link href='/actions' className="nav-link px-4 fs-5">
                    Actions
                </Link> */}
            </nav>
        </header>
    );
};

export default Header;