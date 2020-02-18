import React from 'react';
import Moment from 'moment';
// Import platform logos
import { ReactComponent as XboxLogo } from '../assets/img/platform-xbox.svg';
import { ReactComponent as PlaystationLogo } from '../assets/img/platform-playstation.svg';
import { ReactComponent as SteamLogo } from '../assets/img/platform-steam.svg';
import { ReactComponent as StadiaLogo } from '../assets/img/platform-stadia.svg';

const Member = ({member, platform}) => {

	const platforms = ["?" , "xbox", "PS4", "PC", "PC", "Stadia"];
	const platformIcons = [
		"",
		<XboxLogo title="Xbox logo" width="1rem" height="1rem" />,
		<PlaystationLogo title="Playstation logo" width="1rem" height="1rem" />,
		<SteamLogo title="Steam logo" width="1rem" height="1rem" />,
		<SteamLogo title="Steam logo" width="1rem" height="1rem" />,
		<StadiaLogo title="Stadia logo" width="1rem" height="1rem" />
	];
	const lastPlayed = Moment.unix(member.lastOnlineStatusChange).fromNow();
	const today = Moment(new Date());
	const daysSincePlayed = Moment.unix(member.lastOnlineStatusChange).diff(today, 'days');

// If a user has played/saved Destiny on multiple platforms show them e.g. (XB1, PSN)
	const xsaveUserPlatforms = 
		member.destinyUserInfo.applicableMembershipTypes.length === 1 ? "" :
		member.destinyUserInfo.applicableMembershipTypes.map( (platform,index) => {
			return(
				<div className="icon baseline" key={`platformIcon${index}`}>
						{ platformIcons[platform] }
				</div>
			);
		});


	if (!member.destinyUserInfo && !member.bungieNetUserInfo)	{ 
		return <div></div>; 
	} else {
		return (
			<div 
				className={`member 
					${(daysSincePlayed - daysSincePlayed * 2) > 89 ? "boot" : "dont-boot"} 
					${member.memberType >= 3 ? "admin" : ""}`}>
						<strong>{member.destinyUserInfo.LastSeenDisplayName}</strong> : Played { lastPlayed } on {platforms[platform]}
						{/* Conditional Rendering if cross save data */}
						{ member.destinyUserInfo.applicableMembershipTypes.length > 1 &&
							<div className="xsave">
								<div className="icon baseline">
									<img src="https://www.bungie.net/img/theme/bungienet/icons/icon_cross_save_sm_light.png" alt=""/>
								</div>
								{xsaveUserPlatforms}
							</div>
						}
			</div>
		);
	}
};

export default Member;
