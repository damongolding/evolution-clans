import { useEffect } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import Head from "next/head";
import useSWR from "swr";

import Character from "@/components/character";
import DummyItem from "@/components/items/dummy-item";

const MemberPage = (props) => {
  const { BASE_URL, API_KEY } = props;

  const router = useRouter();

  useEffect(() => {
    if (!query.member) router.push("/");
  });

  const query = router.query;

  const fetcher = (url) =>
    fetch(url, { headers: { "X-API-Key": API_KEY } }).then((res) => res.json());

  const { data: member } = useSWR(
    `${BASE_URL}/Destiny2/${router.query.membershipType}/Profile/${router.query.membershipId}?components=100,200,205`,
    fetcher
  );

  const characters = member ? (
    Object.keys(member.Response.characters.data).map((characterHash) => {
      return (
        <Character
          BASE_URL={props.BASE_URL}
          API_KEY={props.API_KEY}
          characterClass={
            member.Response.characters.data[characterHash].classType
          }
          characterLight={member.Response.characters.data[characterHash].light}
          items={member.Response.characterEquipment.data[characterHash].items}
          membershipType={query.membershipType}
          destinyMembershipId={query.membershipId}
          key={characterHash}
        />
      );
    })
  ) : (
    <div className="flex flex-row w-full flex-wrap">
      <div className="p-4 flex flex-col sm:w-full md:w-1/3 max-w-md mx-auto">
        <DummyItem order={1} />
        <div className="order-2 mt-4 mb-2">Subclass</div>
        <DummyItem order={3} />
        <div className="order-4 mt-4 mb-2">Weapons</div>
        <DummyItem order={5} />
        <DummyItem order={5} />
        <DummyItem order={5} />
        <div className="order-6 mt-4 mb-2">Armour and other shit</div>
        <DummyItem order={7} />
        <DummyItem order={7} />
        <DummyItem order={7} />
      </div>

      <div className="p-4 flex flex-col sm:w-full md:w-1/3 max-w-md mx-auto">
        <DummyItem order={1} />
        <div className="order-2 mt-4 mb-2">Subclass</div>
        <DummyItem order={3} />
        <div className="order-4 mt-4 mb-2">Weapons</div>
        <DummyItem order={5} />
        <DummyItem order={5} />
        <DummyItem order={5} />
        <div className="order-6 mt-4 mb-2">Armour and other shit</div>
        <DummyItem order={7} />
        <DummyItem order={7} />
        <DummyItem order={7} />
      </div>
      <div className="p-4 flex flex-col sm:w-full md:w-1/3 max-w-md mx-auto">
        <DummyItem order={1} />
        <div className="order-2 mt-4 mb-2">Subclass</div>
        <DummyItem order={3} />
        <div className="order-4 mt-4 mb-2">Weapons</div>
        <DummyItem order={5} />
        <DummyItem order={5} />
        <DummyItem order={5} />
        <div className="order-6 mt-4 mb-2">Armour and other shit</div>
        <DummyItem order={7} />
        <DummyItem order={7} />
        <DummyItem order={7} />
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>
          {query.member ? query.member : "Member"}&apos;s characters
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-white container p-4 mx-auto">
        <nav className="mb-3">
          <Link href="/">
            <a className="underline">Back</a>
          </Link>
        </nav>

        <h1 className="text-4xl">{query.member ? query.member : null}</h1>

        <div className="flex flex-row flex-wrap sm:justify-center justify-start">
          {characters}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: { BASE_URL: process.env.BASE_URL, API_KEY: process.env.API_KEY },
  };
}

export default MemberPage;
