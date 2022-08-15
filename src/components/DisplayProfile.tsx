import { Profile } from '@prisma/client';

interface Props {
  profile: Profile | null;
}

const DisplayProfile: React.FC<Props> = ({ profile }) => {
  return (
    <div className="text-gray-800 text-lg text-left max-w-2xl mx-auto mt-10">
      <div className="mb-10">
        <h1 className="text-2xl font-bold ">{profile?.name}</h1>
        <p>{profile?.bio}</p>
      </div>

      <ul>
        <li>
          <span className="font-bold">Slug:</span> {profile?.slug}
        </li>
        <li>
          <span className="font-bold">Email:</span> {profile?.email}
        </li>
        <li>
          {profile?.phone && (
            <>
              <span className="font-bold">Phone:</span> {profile?.phone}
            </>
          )}
        </li>
        <li>
          {profile?.twitter && (
            <>
              <span className="font-bold">Twitter:</span> {profile?.twitter}
            </>
          )}
        </li>
        <li>
          {profile?.facebook && (
            <>
              <span className="font-bold">Facebook:</span> {profile?.facebook}
            </>
          )}
        </li>
        <li>
          {profile?.instagram && (
            <>
              <span className="font-bold">Instagram:</span> {profile?.instagram}
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default DisplayProfile;
