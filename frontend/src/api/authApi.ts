import instance from './axiosConfig';

class AuthApi {
  //tạo

  async requestOtp({ email }: { email: string }) {
    const res = await instance.post('/auth/otp/send', { email });
    return res.data;
  }

  async verifyOtp({ id, otp }: { id: string; otp: string }) {
    const res = await instance.post('/auth/otp/verify', { otp_id: id, otp_value: otp });
    return res.data;
  }

  async loadUser() {
    const res = await instance.get('/auth/authenticated');

    return res.data;
  }
  async login({ email, password }: { email: string; password: string }) {
    const res = await instance.post('/auth/login', {
      email,
      password
    });

    return res.data;
  }

  async register(signInFields: RegisterDTO) {
    const { email, password, firstName, lastName, dob, gender } = signInFields;
    const res = await instance.post('/auth/register', {
      email,
      password,
      dob,
      gender,
      first_name: firstName,
      last_name: lastName
    });

    return res.data;
  }

  async loginWithGoogle(access_token: String) {
    const res = await instance.post('/auth/google', {
      access_token
    });

    return res.data;
  }
}

const authApi = new AuthApi();
export default authApi;
