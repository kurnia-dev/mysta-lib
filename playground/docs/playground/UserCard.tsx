export const UserCard = ({ name, isAdmin, age }: Record<string, any>) => {
  return (
    <div className="flex flex-col">
      <span>{name}</span>
      <span>{age}</span>
      <span>{isAdmin ? 'Admin' : 'Member'}</span>
    </div>
  );
};
