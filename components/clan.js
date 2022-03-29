import ClanMember from "@/components/clan-member";
import useSWR from "swr";

// import LoadingImg from "@/components/assets/img/loading.svg";

export default function Clan(props) {
  const { BASE_URL, API_KEY, groupId, clanName, platform } = props;

  // Fetch data from API
  const fetcher = (url) =>
    fetch(url, { headers: { "X-API-Key": API_KEY } }).then((res) => res.json());

  // Feeds fetcher url and opens a stream for live results
  const { data, error } = useSWR(
    `${BASE_URL}/GroupV2/${groupId}/Members/`,
    fetcher
  );

  if (error || !data || data.Response.results.length === 0) {
    return (
      <div
        className={`flex flex-col w-1/4 border border-${clanName.toLowerCase()}`}
      >
        <header
          className={`text-white p-4 bg-no-repeat bg-right bg-${clanName.toLowerCase()} ${clanName.toLowerCase()}`}
        >
          <h2 className="text-4xl font-thin py-1 my-6">{clanName}</h2>
          <div className="flex flex-row">
            Number of members: <strong> 0 </strong>
          </div>
        </header>
        <section className="flex flex-col">
          {error ? (
            "API call failed :("
          ) : (
            <div className="self-center m-6">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.2"
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="white"
                  strokeWidth="4"
                />
                <path
                  opacity="0.7"
                  d="M4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4V0C5.373 0 0 5.373 0 12H4ZM6 17.291C4.70821 15.8316 3.99661 13.949 4 12H0C0 15.042 1.135 17.824 3 19.938L6 17.291Z"
                  fill="white"
                />
              </svg>
            </div>
          )}
        </section>
      </div>
    );
  } else {
    // Members sorted alphabetically by username
    const members = data.Response.results
      .sort((a, b) =>
        a.destinyUserInfo.LastSeenDisplayName.toString().toLowerCase() >
        b.destinyUserInfo.LastSeenDisplayName.toString().toLowerCase()
          ? 1
          : -1
      )
      .map((member, index) => {
        const currentMember = member;
        return (
          <ClanMember
            member={currentMember}
            platform={currentMember.destinyUserInfo.LastSeenDisplayNameType}
            BASE_URL={BASE_URL}
            API_KEY={API_KEY}
            key={index.toString()}
          />
        );
      });

    return (
      <div
        className={`flex flex-col w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 border border-${clanName.toLowerCase()}`}
      >
        <header
          className={`text-white p-4 bg-no-repeat bg-right bg-${clanName.toLowerCase()} ${clanName.toLowerCase()}`}
        >
          <h2 className="text-4xl font-thin py-1 my-6">{clanName}</h2>
          <div className="flex flex-row">
            Number of members:&nbsp;<strong> {members.length} </strong>
          </div>
        </header>

        <section className="flex flex-col">{members}</section>
      </div>
    );
  }
}
