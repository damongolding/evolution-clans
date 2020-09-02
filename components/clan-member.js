import Link from "next/link";
import Moment from "moment";

const ClanMember = ({ member, platform }) => {
  const platforms = ["?", "xbox", "PS4", "PC", "PC", "Stadia"];
  const platformIcons = [
    "",
    <img src="/evolution-clans/img/platform-xbox.svg" />,
    <img src="/evolution-clans/img/platform-playstation.svg" />,
    <img src="/evolution-clans/img/platform-steam.svg" />,
    <img src="/evolution-clans/img/platform-steam.svg" />,
    <img src="/evolution-clans/img/platform-stadia.svg" />,
  ];
  const lastPlayed = Moment.unix(member.lastOnlineStatusChange).fromNow();
  const today = Moment(new Date());
  const daysSincePlayed = Moment.unix(member.lastOnlineStatusChange).diff(
    today,
    "days"
  );

  // If a user has played/saved Destiny on multiple platforms show them e.g. (XB1, PSN)
  const xsaveUserPlatforms =
    member.destinyUserInfo.applicableMembershipTypes.length === 1
      ? ""
      : member.destinyUserInfo.applicableMembershipTypes.map(
          (platform, index) => {
            return (
              <div
                className={`flex flex-col w-4 h-4 mr-1`}
                key={`platformIcon${index}`}
              >
                {platformIcons[platform]}
              </div>
            );
          }
        );

  if (!member.destinyUserInfo && !member.bungieNetUserInfo) {
    return null;
  } else {
    const toBoot = daysSincePlayed - daysSincePlayed * 2 > 89 ? true : false; // mark to boot if inactive for XX amount of time
    const isAdmin = member.memberType >= 3 ? true : false; // Is member a admin

    return (
      <div
        className={`text-white bg-darkblue p-2 m-1 ${
          toBoot ? "bg-boot order-1" : isAdmin ? "order-2" : "order-3"
        } ${ isAdmin ? "relative admin" : null}`}
      >
        <Link
          href={{
            pathname: "/member",
            query: {
              member: member.destinyUserInfo.LastSeenDisplayName,
              membershipId: member.destinyUserInfo.membershipId,
              membershipType: member.destinyUserInfo.membershipType,
            },
          }}
          as="/member"
        >
          <a>
            <div>
              <strong>{member.destinyUserInfo.LastSeenDisplayName}</strong> :
              Played {lastPlayed} on {platforms[platform]}
              {/* Conditional Rendering if cross save data */}
              {member.destinyUserInfo.applicableMembershipTypes.length > 1 && (
                <div className="flex flex-row mt-2">
                  <div className={`w-4 h-4 mr-1`}>
                    <img src="/evolution-clans/img/xsave.svg" />
                  </div>
                  {xsaveUserPlatforms}
                </div>
              )}
            </div>
          </a>
        </Link>
      </div>
    );
  }
};

export default ClanMember;
