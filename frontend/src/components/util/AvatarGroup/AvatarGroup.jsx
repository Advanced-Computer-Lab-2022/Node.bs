import AvatarGroup from 'react-avatar-group';
const AvatarGrouping = ({ instructors }) => {
  return (
    <AvatarGroup
      avatars={instructors.map((instructor) => instructor.name)}
      initialCharacters={1}
      max={2}
      size={26}
      displayAllOnHover
      shadow={1}
      tooltipArrow
      style={{ flex: 1 }}
    />
  );
};
export default AvatarGrouping;
