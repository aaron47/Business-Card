import { useForm } from 'react-hook-form';
import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';

const CreateProfile = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmitForm = async (values: any) => {
    const config: AxiosRequestConfig = {
      url: '/api/createprofile',
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
      router.push(router.asPath);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900">
        Create Your Profile
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
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
