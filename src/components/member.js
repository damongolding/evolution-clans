import React from 'react';
import Moment from 'moment';
// Import platform logos
import { ReactComponent as XboxLogo } from '../assets/img/platform-xbox.svg';
import { ReactComponent as PlaystationLogo } from '../assets/img/platform-playstation.svg';
import { ReactComponent as SteamLogo } from '../assets/img/platform-steam.svg';
import { ReactComponent as StadiaLogo } from '../assets/img/platform-stadia.svg';

const Member = ({member, platform}) => {

	const platforms = ["on Unknown", "on Xbox", "on Ps4", "on Steam", "on Blizzard" ,"on Stadia"];
	const xsavePlatforms = ["?", "XB1", "PSN", "PC", "PC", "Stadia"];
	const lastPlayed = Moment.unix(member.lastOnlineStatusChange).fromNow();
	const today = Moment(new Date());
	const daysSincePlayed = Moment.unix(member.lastOnlineStatusChange).diff(today, 'days');

	const platformIcon = 
		platform === 0 ? "" :
		platform === 1 ? <XboxLogo width="1rem" height="1rem" /> :
		platform === 2 ? <PlaystationLogo width="1rem" height="1rem" /> :
		platform === 3 ? <SteamLogo width="1rem" height="1rem" /> :
		platform === 4 ? <SteamLogo width="1rem" height="1rem" /> :
		platform === 5 ? <StadiaLogo width="1rem" height="1rem" /> : "";


// If a user has played/saved Destiny on multiple platforms show them e.g. (XB1, PSN)
	const xsavePlatformDisplay = member.destinyUserInfo.applicableMembershipTypes.length === 1 ? "" : 
		"(" + 
		member.destinyUserInfo.applicableMembershipTypes.map(
			function(xsavePlatform, index) {
				return xsavePlatforms[xsavePlatform] ;
			})
		+ ")";


	if (!member.destinyUserInfo && !member.bungieNetUserInfo)	{ 
		return <div></div>; 
	} else {
		return (
			<div 
				className={`member 
					${(daysSincePlayed - daysSincePlayed * 2) > 89 ? "boot" : "dont-boot"} 
					${member.memberType >= 3 ? "admin" : ""}`}>
						<strong>{member.destinyUserInfo.LastSeenDisplayName}</strong> : Played { lastPlayed } on {platformIcon} {xsavePlatformDisplay}
			</div>
		);
	}
};

export default Member;
