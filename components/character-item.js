import useSwr from "swr";

import Emblem from "@/components/items/emblem";
import Subclass from "@/components/items/subclass";
import Weapon from "@/components/items/weapon";
import DummyItem from "@/components/items/dummy-item";

const Other = ({ data }) => (
  <div className="mb-2 order-7 bg-darkblue">
    <div className={`flex flex-row`}>
      <div>
        <img
          className="w-16 h-16"
          src={`https://bungie.net/${data.icon}`}
          alt={data.name}
        />
      </div>
      <div className="px-4 py-1 flex-grow flex flex-col">{data.name}</div>
    </div>
  </div>
);

const Item = ({
  membershipType,
  destinyMembershipId,
  itemInstanceId,
  characterClass,
  characterLight,
  itemHash,
  BASE_URL,
  API_KEY,
}) => {
  const fetcher = (url) =>
    fetch(url, { headers: { "X-API-Key": API_KEY } }).then((res) => res.json());

  const { data: item } = useSwr(
    `${BASE_URL}/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHash}/`,
    fetcher
  );

  function getItemType(itemType) {
    switch (itemType) {
      case 14:
        // Emblem
        return (
          <Emblem
            characterClass={characterClass}
            characterLight={characterLight}
            secondaryIcon={item.Response.secondaryIcon}
            backgroundColor={item.Response.backgroundColor}
          />
        );
        break;

      case 16:
        // Subclass
        return <Subclass data={item.Response.displayProperties} />;
        break;
      case 3:
        // Weapon
        return <Weapon data={item.Response} />;
        break;
      case 2:
        // Armour
        return <Other data={item.Response.displayProperties} />;
        break;
      case 24:
      case 22:
      case 21:
        // ghost (24), ship (22), sparrow (21)
        return <Other data={item.Response.displayProperties} />;
      default:
        // All others
        return null;
        break;
    }
  }

  return <>{item ? getItemType(item.Response.itemType) : <DummyItem order={7} />}</>;
};

export default Item;
