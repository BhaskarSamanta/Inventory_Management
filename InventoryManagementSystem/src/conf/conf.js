const conf = {
    appwrite_Url: String(import.meta.env.VITE_APPWRITE_URL),
    appwrite_ProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwrite_DatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID), // Fixed Typo
    appwrite_Product_CollectionId: String(import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID),
    appwrite_Supplier_CollectionId: String(import.meta.env.VITE_APPWRITE_SUPPLIER_COLLECTION_ID), // Fixed Typo
    appwrite_Category_CollectionId: String(import.meta.env.VITE_APPWRITE_CATEGORY_COLLECTION_ID),
    appwrite_Purchase_Order_CollectionId: String(import.meta.env.VITE_APPWRITE_PURCHASE_ORDER_COLLECTION_ID),
    appwrite_Purchase_Order_Detail_CollectionId: String(import.meta.env.VITE_APPWRITE_PURCHASE_ORDER_DETAIL_COLLECTION_ID),
    appwrite_BucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf;
