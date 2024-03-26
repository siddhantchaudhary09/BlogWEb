import conf from "../Conf/Conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(conf.appwriteproject); // Your project ID
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, content, featuredImage, status, slug, userId }) {
    try {
      return await databases.createDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("error in createPost", error);
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseid,
        conf.collectionid,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log("error in updatePost", error);
    }
  }
  async deletePost(slug) {
    try {
      this.databases.deleteDocument(conf.databaseid, conf.collectionid, slug);
      return true;
    } catch (error) {
      console.log("error in deletePost", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseid,
        conf.collectionid,
        slug
      );
    } catch (error) {
      console.log("error in getPost", error);
    }
  }
  async getAllPosts(queries = [Query.equal("status", "Active")]) {
    try {
      return await this.databases.listDocuments(
        conf.databaseid,
        conf.collectionid,
        queries
      );
    } catch (error) {
      console.log("error in getAllPosts", error);
    }
  }

  //   FILE UPLOAD SERVICES

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.bucketid, ID.unique(), file);
    } catch (error) {
      console.log("error in uploadFile", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.bucketid, fileId);
      return true;
    } catch (error) {
      console.log("error in deleteFile", error);
      return false;
    }
  }

  async getfilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.bucketid, fileId);
    } catch (error) {
      console.log("error in getfilePreview", error);
    }
  }
}

const service = new Service();
export default service;
