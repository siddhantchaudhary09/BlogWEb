import conf from "../Conf/Conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl) // Your API Endpoint
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
      throw error;
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
      throw error;
    }
  }
  async deletePost(slug) {
    try {
      this.databases.deleteDocument(conf.databaseid, conf.collectionid, slug);
      return true;
    } catch (error) {
      throw error;
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
      throw error;
    }
  }
  async getAllPosts(Queries = [Query.equal("status", "Active")]) {
    try {
      return await this.databases.listDocuments(
        conf.databaseid,
        conf.collectionid,
        Queries
      );
    } catch (error) {
      throw error;
    }
  }

  //   FILE UPLOAD SERVICES

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.bucketid, ID.unique(), file);
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.bucketid, fileId);
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  async getfilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.bucketid, fileId);
    } catch (error) {
      throw error;
    }
  }
}

const service = new Service();
export default service;
