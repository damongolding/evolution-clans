import Head from "next/head";

import Clan from "@/components/clan";

export default function Home(props) {
    const { BASE_URL, API_KEY } = props;

    return (
        <div>
            <Head>
                <title>Evolution Clans</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-row flex-wrap p-2 md:p-4 gap-2 md:gap-4 lg:flex-nowrap bg-gray-200">
                <Clan
                    clanName="Knights"
                    groupId="1770080"
                    BASE_URL={BASE_URL}
                    API_KEY={API_KEY}
                />

                <Clan
                    clanName="Storm"
                    groupId="2057456"
                    BASE_URL={BASE_URL}
                    API_KEY={API_KEY}
                />

                <Clan
                    clanName="Outlaws"
                    groupId="4814867"
                    BASE_URL={BASE_URL}
                    API_KEY={API_KEY}
                />
            </div>
        </div>
    );
}

export async function getStaticProps() {
    return {
        props: { BASE_URL: process.env.BASE_URL, API_KEY: process.env.API_KEY },
    };
}
