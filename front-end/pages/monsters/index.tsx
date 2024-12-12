import { useEffect, useState } from 'react';
import { Monster } from '@types';
import MonsterService from '@services/MonsterService';
import MonsterTable from '@components/monsters/monsterTable';
import Head from 'next/head';
import Header from '@components/header';

const Monsters: React.FC = () => {
    const [monsters, setMonsters] = useState<Monster[]>([]);
    const getMonsters = async () => {
        const response = await MonsterService.getAllMonsters();
        const monsters = await response.json();
        setMonsters(monsters);
    }

    useEffect(() => {
        getMonsters();
    }, []);

    return (
        <>
            <Head>
                <title>Monsters</title>
            </Head>
            <Header />
            <main className='d-flex flex-column justify-content-center align-items-center'>
                <h1>Monsters</h1>
                <section>
                    <h2>Monster Overview</h2>
                    {monsters && (
                        <MonsterTable monsters={monsters} />
                    )}
                </section>
            </main>
        </>
    );
};

export default Monsters;