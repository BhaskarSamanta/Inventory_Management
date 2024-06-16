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

     async addProduct ({Product_Name, Product_ID, User_ID, Price, Description, Stock_Qty, Supplier_ID,Category_ID}) {
        try {
            return await this.databases.createDocument(
                conf.appwrite_DatabaseId, 
                conf.appwrite_Product_CollectionId, 
                Product_ID,
                {
                    Product_Name, 
                    Price, 
                    Description,
                    User_ID,
                    Stock_Qty,
                    Supplier_ID,
                    Category_ID
                });
        } catch (error) {
            throw ("Appwrite serive :: addProduct :: error", error)
        }
    }

    async updateProduct(Product_ID,{ Product_Name, Price, Stock_Qty, Description}){
        try {
            return await this.databases.updateDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Product_CollectionId,
                Product_ID,
                {
                    Product_Name, 
                    Price, 
                    Stock_Qty, 
                    Description,
                }
            )
        } catch (error) {
            throw ("Appwrite serive :: deleteProduct :: error",error);
        }
    }

    async deleteProduct(Product_ID){
        try {
            return await this.databases.deleteDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Product_CollectionId,
                Product_ID
            )
        } catch (error) {
            throw ("Appwrite serive :: deletePost :: error",error);         
        }
    }

    async getProduct(Product_ID){
        try {
            return await this.databases.getDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Product_CollectionId,
                Product_ID
            );
        } catch (error) {
            throw ("Appwrite serive :: getProduct :: error",error);
        }
        
    }

    async getProducts(querys = Query.equal("Product_ID", [true])){
        try {
            return await this.databases.listDocuments(
                conf.appwrite_DatabaseId,
                conf.appwrite_Product_CollectionId,
                querys
            )
        } catch (error) {
            throw ("Appwrite serive :: getProducts :: error",error);
        }
    }
    async addCatagory({Category_Name, Category_ID}){
        try {
            return await this.databases.createDocument(
               conf.appwrite_DatabaseId,
               conf.appwrite_Category_CollectionId,
                { 
                    Category_ID,
                    Category_Name
            }


            )
        } catch (error) {
            throw ("Appwrite serive :: addCatagory :: error",error);
        }
    }

    async deleteCatagory(Category_ID){
        try {
            return await this.databases.deleteDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Category_CollectionId,
                Category_ID
            )
        } catch (error) {
            throw ("Appwrite serive :: deleteCatagory :: error",error);
        }
    }

    async getCatagory(Category_ID){
        try {
            return await this.databases.getDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Category_CollectionId,
                Category_ID
            )
        } catch (error) {
            throw ("Appwrite serive :: getCatagory :: error",error);
        }
    }

    async addSupplier(Supplier_ID,{Supplier_Name, Address, Contact}){
        try {
            return await this.databases.createDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Supplier_CollectionId,
                Supplier_ID,
                {
                    Supplier_Name,
                    Address,
                    Contact
                }
            )
        } catch (error) {
            throw ("Appwrite serive :: addSupplier :: error",error);
        }
    }

    async deleteSupplier(Supplier_ID){
        try {
            return await this.databases.deleteDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Supplier_CollectionId,
                Supplier_ID
            )
        } catch (error) {
            throw ("Appwrite serive :: deleteSupplier :: error",error);
        }
    }

    async updateSupplier(Supplier_ID,{Supplier_Name, Address, Contact}){
        try {
            return await this.databases.updateDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Supplier_CollectionId,
                Supplier_ID,
                {
                    Supplier_Name,
                    Address,
                    Contact
                }

            )
        } catch (error) {
            throw ("Appwrite serive :: updateSupplier :: error",error);
        }
    }

    async getSupplier(Supplier_ID){
        try {
            return await this.databases.getDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Pruduct_CollectionId,
                Supplier_ID
            );
        } catch (error) {
            throw ("Appwrite serive :: getProduct :: error",error);
        }
        
    }

    async getSuppliers(querys = Query.equal("Supplier_ID", [true])){
        try {
            return await this.databases.listDocuments(
                conf.appwrite_DatabaseId,
                conf.appwrite_Supplier_CollectionId,
                querys
            )
        } catch (error) {
            throw ("Appwrite serive :: getSuppliers :: error",error);
        }
    }

    async addPurchaseOrder(Order_Id,{Total_Amount,Order_Date,supplier_Id}){
        try {
            return await this.databases.createDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Purchase_Order_CollectionId,
                Order_Id,
                {
                    Total_Amount,
                    Order_Date,
                    supplier_Id
                }
            )
        } catch (error) {
            throw ("Appwrite serive :: addPerchaseOrder :: error",error);
        }

    }

    async deletePurchaseOrder(Order_Id){
        try {
            return await this.databases.deleteDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Purchase_Order_CollectionId,
                Order_Id
            )
        } catch (error) {
            throw ("Appwrite serive :: deletePerchaseOrder :: error",error);
        }
    }

    async getPurchaseOrder(Order_Id){
        try {
            return await this.databases.getDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Purchase_Order_CollectionId,
                Order_Id
            )
        } catch (error) {
            throw ("Appwrite serive :: getPerchaseOrder :: error",error);
        }
    }

    async addPurchaseOrderdetails(Detail_Id,{Quantity,Unit_Price,Total_Price, purchaseOrder, Product_ID}){
        try {
            return await this.databases.createDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Purchase_Order_Detail_CollectionId,
                Detail_Id,
                {
                    Quantity,
                    Unit_Price,
                    Total_Price,
                    purchaseOrder,
                    Product_ID
                }
            )
        } catch (error) {
            throw("Appwrite serive :: addPerchaseOrderdetails :: error",error);
        }
    }

    async deletePurchaseOrderdetails(Detail_Id){
        try {
            return await this.databases.deleteDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Purchase_Order_Detail_CollectionId,
                Detail_Id
            )
        } catch (error) {
            throw("Appwrite serive :: deletePerchaseOrderdetails :: error",error);
        }
    }

    async getPurchaseOrderdetails(Detail_Id){
        try {
            return await this.databases.getDocument(
                conf.appwrite_DatabaseId,
                conf.appwrite_Purchase_Order_Detail_CollectionId,
                Detail_Id
            )
        } catch (error) {
            throw("Appwrite serive :: getPerchaseOrderdetails :: error",error);
        }
    }

    // file service

    async uploadPicture(file){
        try {
            return this.bucket.createFile(
                conf.appwrite_BucketId,
                ID.unique(),
                file    
            );
        } catch (error) {
            throw ("Appwrite serive :: uploadPicture :: error",error);
        }
    }

    async deletePicture(fileId){
        try {
            return this.bucket.deleteFile(
                conf.appwrite_BucketId,
                fileId
            );
        } catch (error) {
            throw ("Appwrite serive :: deletePicture :: error",error);
        }
    }

    async picturePreview(fileId){
        try {
            return this.bucket.getFile(
                conf.appwrite_BucketId,
                fileId
            )
        } catch (error) {
            throw("Appwrite serive :: picturePreview :: error",error);
        }
    }
}

const appwriteService = new AppwriteService();

export default appwriteService;