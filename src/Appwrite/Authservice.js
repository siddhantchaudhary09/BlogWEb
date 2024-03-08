import conf from "../Conf/Conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl) // Your API Endpoint
      .setProject(conf.appwriteproject); // Your project ID
    this.account = new Account(this.client);
  }
  async SignUp({ email, password, name }) {
    try {
      const User = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (User) {
        //call login method
        return this.Login({ email, password });
      } else {
        return User;
      }
    } catch (error) {
      console.log("error in Signup:", error);
    }
  }

  async Login(email, password) {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      console.log("error in Login:", error);
    }
  }

  async Logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }

  async getCurrentuser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("error::getCurrentuser", error);
    }
  }
}

const authService = new AuthService();

export default authService;
