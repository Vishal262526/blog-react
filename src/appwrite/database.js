import conf from "../conf/conf";
import { Client, Databases, Query } from "appwrite";

export class DatabaseServices {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async createPost({ title, slug, content, blogImg, status, userId }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          blogImg,
          status,
          userId,
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  async updateDocument(slug, { title, content, blogImg, status }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          blogImg,
          status,
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  async deleteDocument(slug) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (e) {
      console.log(e);
    
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (e) {
      console.log(e);
    }
  }
}

const database = new DatabaseServices();
export default database;
