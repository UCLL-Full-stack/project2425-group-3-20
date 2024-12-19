import { useEffect, useState } from 'react';
import { Monster } from '@types';
import MonsterService from '@services/MonsterService';
import MonsterTable from '@components/monsters/monsterTable';
import Head from 'next/head';
import Header from '@components/header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Monsters: React.FC = () => {
    const { t } = useTranslation();
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
                <title>{t("monster.title.name")}</title>
            </Head>
            <Header />
            <main className='d-flex flex-column justify-content-center align-items-center'>
                <h1>{t("monster.monsters")}</h1>
                <section>
                    <h2>{t("monster.overview")}</h2>
                    {monsters && (
                        <MonsterTable monsters={monsters} />
                    )}
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