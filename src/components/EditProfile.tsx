import { useForm } from 'react-hook-form';
import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import { Profile } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  profile: Profile | null;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const EditProfile: React.FC<Props> = ({ profile, setIsEditing }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: profile?.name,
      slug: profile?.slug,
      bio: profile?.bio,
      phone: profile?.phone,
      twitter: profile?.twitter,
      facebook: profile?.facebook,
      instagram: profile?.instagram,
    },
  });

  const onSubmitForm = async (values: any) => {
    const config: AxiosRequestConfig = {
      url: '/api/editprofile',
      data: values,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios(config);
    console.log(res);
    console.log(values);

    if (res.status === 200) {
      router.reload();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900">
        Edit Your Profile
      </h1>

      <form onSubmit={handleSubmit(onSubmitForm)}>
        <input
          type="text"
          className="w-full bg-gray-100 text-gray-900 rounded-md h-12 pl-2 mt-3"
          placeholder="Name"
          {...register('name', { required: true })}
        />
        <input
          type="text"
          className="w-full bg-gray-100 text-gray-900 rounded-md h-12 pl-2 mt-3"
          placeholder="Enter your unique profile url"
          {...register('slug', { required: true })}
        />
        <textarea
          {...register('bio', { required: true })}
          className="w-full bg-gray-100 text-gray-900 rounded-md pl-2 mt-3"
          placeholder="A little bit about you"
        />

        <input
          type="text"
          className="w-full bg-gray-100 text-gray-900 rounded-md h-12 pl-2 mt-3"
          placeholder="Enter your phone number"
          {...register('phone')}
        />
        <input
          type="text"
          className="w-full bg-gray-100 text-gray-900 rounded-md h-12 pl-2 mt-3"
          placeholder="Twitter"
          {...register('twitter')}
        />
        <input
          type="text"
          className="w-full bg-gray-100 text-gray-900 rounded-md h-12 pl-2 mt-3"
          placeholder="Instagram"
          {...register('instagram')}
        />

        <input
          type="text"
          className="w-full bg-gray-100 text-gray-900 rounded-md h-12 pl-2 mt-3"
          placeholder="Facebook"
          {...register('facebook')}
        />

        <button
          type="submit"
          className="bg-indigo-700 text-white rounded-md px-4 py-2 hover:bg-indigo-600 mt-3"
        >
          Edit Profile
        </button>
      </form>

      <button
        onClick={() => setIsEditing(false)}
        className="bg-indigo-100 text-black rounded-md px-4 py-2 max-w-sm mx-auto hover:bg-indigo-200 mt-3"
      >
        Cancel
      </button>
    </div>
  );
};

export default EditProfile;
