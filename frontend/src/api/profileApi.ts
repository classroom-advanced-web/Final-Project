import { ProfileFields } from '@/type';
import instance from './axiosConfig';

class ProfileApi {
  async updateProfile(profile: ProfileFields) {
    const res = await instance.put('/users', {
      id: profile.id,
      first_name: profile.firstName,
      last_name: profile.lastName,
      dob: profile.birthday,
      gender: profile.gender
    });

    return res.data;
  }
}

const profileApi = new ProfileApi();
export default profileApi;
