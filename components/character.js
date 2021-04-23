import CharacterItem from "@/components/character-item.js";

const Character = ({
  BASE_URL,
  API_KEY,
  characterClass,
  characterLight,
  items,
  membershipType,
  destinyMembershipId,
}) => {
  const allCharacterItems = items.map((item) => {
    return (
      <CharacterItem
        membershipType={membershipType}
        destinyMembershipId={destinyMembershipId}
        itemInstanceId={item.itemInstanceId}
        itemHash={item.itemHash}
        characterClass={characterClass}
        characterLight={characterLight}
        BASE_URL={BASE_URL}
        API_KEY={API_KEY}
        key={item.itemInstanceId}
      />
    );
  });

  return (
    <div className="p-4 flex flex-col sm:w-full md:w-1/3 max-w-md">
      <div className="order-2 mt-4 mb-2">Subclass</div>
      <div className="order-4 mt-4 mb-2">Weapons</div>
      <div className="order-6 mt-4 mb-2">Armour and other shit</div>
      { allCharacterItems }
    </div>
  );
};

export default Character;
