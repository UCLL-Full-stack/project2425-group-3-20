import Head from "next/head";
import Header from "@components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserLoginForm from "@components/users/userLoginForm";
import { useTranslation } from "next-i18next";

const Login: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>{t("monster.title.singup")}</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center justify-center">
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserLoginForm />
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
