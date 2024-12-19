import { useState, useEffect } from 'react';
import { LoggedInUser, Monster } from '@types';
import MonsterService from '@services/MonsterService';
import Head from 'next/head';
import Header from '@components/header';
import MyMonsterTable from '@components/monsters/myMonsterTable';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Monsters: React.FC = () => {
    const [monsters, setMonsters] = useState<Monster[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
    const { t } = useTranslation();
    // Fetch the logged-in user from localStorage on initial load
    useEffect(() => {
        const loggedInUserString = localStorage.getItem("loggedInUser");
        if (loggedInUserString !== null) {
            setLoggedInUser(JSON.parse(loggedInUserString));
        }
    }, []);

    // Fetch monsters if the user is logged in
    useEffect(() => {
        if (loggedInUser) {
            const getMonsters = async () => {
                const response = await MonsterService.getAllMonstersByUser();
                const monsters = await response.json();
                setMonsters(monsters);
            };
            getMonsters();
        }
    }, [loggedInUser]);

    // Check user permissions
    if (!loggedInUser || (loggedInUser.role !== 'admin' && loggedInUser.role !== 'gameMaster')) {
        return (
            <>
                <Head>
                    <title>{t("monster.title.denied")}</title>
                </Head>
                <Header />
                <main className='d-flex flex-column justify-content-center align-items-center'>
                    <h1>{t("monster.title.denied")}</h1>
                    <p>{t("monster.deniedtext")}</p>
                </main>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>My Monsters</title>
            </Head>
            <Header />
            <main className='d-flex flex-column justify-content-center align-items-center'>
                <h1>My Monsters</h1>
                <section>
                    <h2>Monster Overview</h2>
                    {monsters && <MyMonsterTable monsters={monsters} />}
                </section>
            </main>
        </>
    );
};
export const getServerSideProps = async (context:{locale: any}) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};
export default Monsters;
