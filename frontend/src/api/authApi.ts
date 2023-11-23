import instance from "./axiosConfig";

class AuthApi {
  async loadUser() {
    const res = await instance.get("/auth/authenticated");

    return res.data;
  }
  async login({ email, password }: { email: string; password: string }) {
    const res = await instance.post("/auth/login", {
      email,
      password,
    });

    return res.data;
  }
  async register(signInFields: RegisterDTO) {
    const { email, password, firstName, lastName, dob, gender, role } =
      signInFields;
    const res = await instance.post("/auth/register", {
      email,
      password,
      dob,
      gender,
      first_name: firstName,
      last_name: lastName,
      role,
    });

    return res.data;
  }
}

const authApi = new AuthApi();
export default authApi;
