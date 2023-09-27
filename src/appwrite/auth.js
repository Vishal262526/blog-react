import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password}) {
        try{
            const userAccount =  await this.account.create(ID.unique(), email, password);
            if(userAccount){
                // call another method 
                this.login(email, password);
            }else{
                return userAccount;
            }
        }catch(error){
            console.log(error);
        }

    }

    async login({email, password}) {
        try{
            const userAccount =  await this.account.createEmailSession(email, password);
            return userAccount;

        }catch(error){
            console.log(error);
        }

    }

    async getCurrentUser() {
        try{
            return await this.account.get();

        }catch(error){
            console.log(`Appwrite services : getCurrentUser :: ${error}`);
        }

        return null;
    }

    async logout() {
        try{
            return await this.account.deleteSessions();
            
        }catch(error){
            console.log("Appwrite services : logout ::", error);
        }

    }

}

const authService = new AuthService()

export default authService;