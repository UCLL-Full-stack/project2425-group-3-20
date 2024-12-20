import Header from '@components/header';
import EncounterTableService from '@services/EncounterTableService';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';
import { EncounterTable, LoggedInUser } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import EncounterTableDetail from '@components/encounterTable/EncounterTables';
import DeleteMonsterButton from '@components/encounterTable/DeleteMonsterEncounterTableButton';
import Head from 'next/head';

const EncounterTableInfo: React.FC = () => {
    const router = useRouter();
    const { encounterTableId } = router.query;
    const { t } = useTranslation();

    const [encounterTable, setEncounterTable] = useState<EncounterTable | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);

    useEffect(() => {
        const loggedInUserString = localStorage.getItem('loggedInUser');
        if (loggedInUserString !== null) {
            setLoggedInUser(JSON.parse(loggedInUserString));
        }
    }, []);
    useEffect(() => {
        if (!loggedInUser) {
            getEncounterTableById();
        }
    });
    const getEncounterTableById = async () => {
        if (loggedInUser){
        if (typeof encounterTableId === 'string') {
            const parsedId = parseInt(encounterTableId);
            const response = await EncounterTableService.getEncounterTableById(parsedId);
            const encounter_table = await response.json();
            setIsLoading(false);
            setEncounterTable(encounter_table);
        }}
    };
    

    if (!loggedInUser || (loggedInUser.role !== 'admin' && loggedInUser.role !== 'gameMaster')) {
        return (
            <>
                <Head>
                    <title>{t('monster.title.denied')}</title>
                </Head>
                <Header />
                <main className="d-flex flex-column justify-content-center align-items-center">
                    <h4>{t('monster.title.denied')}</h4>
                    <p>{t('monster.deniedtext')}</p>
                </main>
            </>
        );
    }
    return (
        <>
            <Header />
            <main>
                {!encounterTableId}
                <section>
                    {error && <p>{t('encounterTable.error')}</p>}
                    {isLoading && <p>{t('encounterTable.loading')}</p>}
                    {encounterTable && (
                        <div className="text-center">
                            <h4 className="justify-content-center">{encounterTable.name}</h4>
                            <p>{encounterTable.description}</p>
                            <p>{encounterTable.owner}</p>
                            <table className="w-1/2 border-collapse mx-auto rounded-lg">
                                <thead>
                                    <th className="bg-gray-200 text-gray-600 border border-gray-300 px-4 py-2">
                                        {t('encounterTable.monster')}
                                    </th>
                                    <th className="bg-gray-200 text-gray-600 border border-gray-300 px-4 py-2">
                                        {t('encounterTable.delete')}
                                    </th>
                                </thead>
                                <tbody>
                                    {encounterTable.monsters.map((monster, index) => (
                                        <tr key={monster.id}>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {monster.name}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {encounterTable.id !== undefined &&
                                                    monster.id !== undefined && (
                                                        <DeleteMonsterButton
                                                            encounterTableId={encounterTable.id}
                                                            monsterId={monster.id}
                                                        />
                                                    )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};
export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default EncounterTableInfo;
