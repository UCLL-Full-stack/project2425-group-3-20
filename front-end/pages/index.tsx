import Header from "@components/header";
import Head from "next/head";

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            < Header />
            <main>
                <div>
                    <h1>Home</h1>
                </div>
            </main>
        </>
    );
}

export default Home;