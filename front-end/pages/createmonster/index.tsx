import Head from "next/head";
import Header from "@components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserLoginForm from "@components/users/userLoginForm";
import MonsterCreationForm from "@components/monsters/monsterCreationForm";
import { useTranslation } from "next-i18next";

const Login: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>{t("monster.title.creator")}</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <MonsterCreationForm />
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
export default Login;
