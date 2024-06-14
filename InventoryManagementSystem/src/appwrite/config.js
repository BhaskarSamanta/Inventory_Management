import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class AppwriteService{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwrite_Url)
        .setProject(conf.appwrite_ProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

     async addProduct ({Product_name, slug, User_id, Product_price, Product_quantity, Product_description}) {
        try {
            return await this.databases.createDocument(
                conf.appwrite_DatabaseId, 
                conf. appwrite_Pruduct_CollectionId, 
                slug,
                {
                    Product_name, 
                    Product_price, 
                    Product_quantity, 
                    Product_description,
                    User_id
                });
        } catch (error) {
            return ("Appwrite serive :: addProduct :: error", error)
        }
    }

    async updateProduct(slug,{ Product_name, Product_price, Product_quantity, Product_description}){
        try {
            return await this.databases.updateDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Pruduct_CollectionId,
                slug,
                {
                    Product_name, 
                    Product_price, 
                    Product_quantity, 
                    Product_description,
                }
            )
        } catch (error) {
            return ("Appwrite serive :: deleteProduct :: error",error);
        }
    }

    async deleteProduct(slug){
        try {
            return await this.databases.deleteDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Pruduct_CollectionId,
                slug
            )
        } catch (error) {
            return ("Appwrite serive :: deletePost :: error",error);         
        }
    }

    async getProduct(slug){
        try {
            return await this.databases.getDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Pruduct_CollectionId,
                slug
            );
        } catch (error) {
            return ("Appwrite serive :: getProduct :: error",error);
        }
        
    }

    async getProducts(querys = Query.equal("Product_ID", [true])){
        try {
            return await this.databases.listDocuments(
                conf.appwrite_DatabaseId,
                conf.appwrite_Pruduct_CollectionId,
                querys
            )
        } catch (error) {
            return ("Appwrite serive :: getProducts :: error",error);
        }
    }
}