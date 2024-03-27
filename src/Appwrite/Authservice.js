import conf from "../Conf/Conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(conf.appwriteproject); // Your project ID
    this.account = new Account(this.client);
  }
  async SignUp({ email, password, name }) {
    const User = await this.account.create(ID.unique(), email, password, name);
    if (User) {
      //call login method
      return this.Login({ email, password });
    } else {
      return User;
    }
  }

  async Login({ email, password }) {
    return await this.account.createEmailSession(email, password);
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
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }
}

const authService = new AuthService();

export default authService;
