import { useEffect, useState } from 'react';
import { LoggedInUser, Monster } from '@types';
import MonsterService from '@services/MonsterService';
import MonsterTable from '@components/monsters/monsterTable';
import Head from 'next/head';
import Header from '@components/header';
import MyMonsterTable from '@components/myMonsterTable.tsx/myMonsterTable';

const Monsters: React.FC = () => {
    const [monsters, setMonsters] = useState<Monster[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
    useEffect(() => {
        const loggedInUserString = localStorage.getItem("loggedInUser");
        if (loggedInUserString !==null) { 
          setLoggedInUser(JSON.parse(loggedInUserString));
        } 
        
      }, []);
    
    if (!loggedInUser || (loggedInUser.role !== 'admin' && loggedInUser.role !== 'gameMaster')) {
        return (
            <>
                <Head>
                    <title>Access Denied</title>
                </Head>
                <Header />
                <main className='d-flex flex-column justify-content-center align-items-center'>
                    <h1>Access Denied</h1>
                    <p>You do not have the required permissions to view this page.</p>
                </main>
            </>
        );
    }
    const getMonsters = async () => {
        const response = await MonsterService.getAllMonstersByUser();
        const monsters = await response.json();
        setMonsters(monsters);
    }

    useEffect(() => {
        getMonsters();
    }, []);
    return (
        <>
            <Head>
                <title> My Monsters</title>
            </Head>
            <Header />
            <main className='d-flex flex-column justify-content-center align-items-center'>
                <h1>My Monsters</h1>
                <section>
                    <h2>Monster Overview</h2>
                    {monsters && (
                        <MyMonsterTable monsters={monsters} />
                    )}
                </section>
            </main>
        </>
    );
};

export default Monsters;