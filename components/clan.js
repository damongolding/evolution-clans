import ClanMember from "./clan-member";
import useSWR from "swr";

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
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
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
        className={`flex flex-col w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 border border-${clanName.toLowerCase()}`}
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
