import Head from "next/head";
import Header from "@components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserLoginForm from "@components/users/userLoginForm";
import MonsterCreationForm from "@components/monsters/monsterCreationForm";

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>Monster creater</title>
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

export default Login;
