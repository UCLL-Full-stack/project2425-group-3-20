import Header from "@components/header";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const Home: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>{t('app.title')}</title>
            </Head>
            < Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <div>
                    <h4 className="">{t('app.text')}</h4>
                </div>
            </main>
        </>
    );
}
export const getServerSideProps = async (context:{locale: any}) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};
export default Home;