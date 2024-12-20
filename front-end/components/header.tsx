import { LoggedInUser } from '@types';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Language from './language/Language';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
    const { t } = useTranslation();
    useEffect(() => {
        const loggedInUserString = localStorage.getItem('loggedInUser');
        if (loggedInUserString !== null) {
            setLoggedInUser(JSON.parse(loggedInUserString));
        }
    }, []);

    const handleClick = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
    };
    return (
        <header className="d-flex justify-content-between align-items-center">
            <h3>{t('header.nav.title')}</h3>
            <nav className="nav justify-content-center">
                <Link href="/" className="nav-link px-4 fs-5">
                    {t('header.nav.home')}
                </Link>
                <Link href="/monsters" className="nav-link px-4 fs-5">
                    {t('header.nav.monster')}
                </Link>
                {loggedInUser && loggedInUser.role == 'gameMaster' && (
                    <Link href="/my_monsters" className="nav-link px-4 fs-5">
                        {t('header.nav.my_monster')}
                    </Link>
                )}
                {loggedInUser && loggedInUser.role == 'gameMaster' && (
                    <Link href="/createmonster" className="nav-link px-4 fs-5">
                        {t('header.nav.monster_creater')}
                    </Link>
                )}
                {loggedInUser && loggedInUser.role == 'gameMaster' && (
                    <Link href="/encounterTables" className="nav-link px-4 fs-5">
                        {t('header.nav.encounterTable')}
                    </Link>
                )}
                {!loggedInUser && (
                    <Link href="/login" className="nav-link px-4 fs-5">
                        {t('header.nav.login')}
                    </Link>
                )}
                {loggedInUser && (
                    <a href="/login" onClick={handleClick} className="nav-link px-4 fs-5">
                        {t('header.nav.logout')}
                    </a>
                )}
                {loggedInUser && (
                    <div className="text-black ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
                        {t('header.nav.welcome')} {loggedInUser.name}
                    </div>
                )}
            </nav>
            <Language />
        </header>
    );
};

export default Header;
