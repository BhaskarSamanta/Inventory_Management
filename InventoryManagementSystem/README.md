# Inventory Management System Overview

## 14-06-2024:
`Created authentication service and Database for the inventory management system.`

## <span style="color:orange;">The Database Tables:</span>

### category:

| AttributeName | Category_ID | Category_Name |
|---------------|-------------|---------------|
| AttributeType | primaryKey  | not null      |

### Products:
| AttributeName | Product_ID | Product_Name | Stock_Qty | Price   | Description | Supplier_ID | Category_ID | User_ID    |
|---------------|------------|--------------|-----------|---------|-------------|-------------|-------------|------------|
| AttributeType | primaryKey | notNull      | notNull   | notNull | string      | ForeignKey  | ForeignKey  | ForeignKey |

### Purchase_Order:
| AttributeName | Order_Id   | Total_Amount | Order_Date | Supplier_Id |
|---------------|------------|--------------|------------|-------------|
| AttributeType | primaryKey | notNull      | notNull    | foreignKey  |

### Purchase_Order_Detail:
| AttributeName | Detail_Id  | Quantity | Unit_Price | Total_Price | purchaseOrder | Product_ID |
|---------------|------------|----------|------------|-------------|---------------|------------|
| AttributeType | primaryKey | notNull  | notNull    | notNull     | notNull       | ForeignKey |

### Supplier:
| AttributeName | Supplier_ID | Supplier_Name | Address | Contact |
|---------------|-------------|---------------|---------|---------|
| AttributeType | primaryKey  | notNull       | notNull | notNull |


### <span style="color:orange;">config.js:</span>
`This section likely contains JavaScript code that sets up configuration parameters for your application, such as API endpoints and project IDs for Appwrite services.`
### <span style="color:orange;">auth.js:</span>
`This section likely contains JavaScript code that defines an authentication service using the Appwrite SDK ('Client', 'Account', 'ID'), providing methods for creating user accounts, logging users in, retrieving current user information, and logging users out.`


## 16-06-2024
- **Initialized store**: Implemented CRUD operations for various tables within the inventory system, excluding the Products table which was previously set up.

## Database Structure

### <span style="color:orange;">Tables Overview:</span>

#### Category Table
| Attribute Name | Type       | Description                        |
|----------------|------------|------------------------------------|
| Category_ID    | PrimaryKey | Unique ID for each category        |
| Category_Name  | String     | Name of the category               |

#### Products Table
| Attribute Name | Type       | Description                        |
|----------------|------------|------------------------------------|
| Product_ID     | PrimaryKey | Unique ID for each product         |
| Product_Name   | String     | Name of the product                |
| Stock_Qty      | Integer    | Quantity in stock                  |
| Price          | Decimal    | Price per unit                     |
| Description    | String     | Description of the product         |
| Supplier_ID    | ForeignKey | References the Supplier table      |
| Category_ID    | ForeignKey | References the Category table      |
| User_ID        | ForeignKey | References the User table          |

#### Purchase_Order Table
| Attribute Name | Type       | Description                        |
|----------------|------------|------------------------------------|
| Order_Id       | PrimaryKey | Unique ID for each order           |
| Total_Amount   | Decimal    | Total amount of the order          |
| Order_Date     | Date       | Date of the order                  |
| Supplier_Id    | ForeignKey | References the Supplier table      |

#### Purchase_Order_Detail Table
| Attribute Name | Type       | Description                        |
|----------------|------------|------------------------------------|
| Detail_Id      | PrimaryKey | Unique ID for each order detail    |
| Quantity       | Integer    | Quantity of the product            |
| Unit_Price     | Decimal    | Price per unit                     |
| Total_Price    | Decimal    | Total price for the quantity       |
| PurchaseOrder  | ForeignKey | References the Purchase_Order table|
| Product_ID     | ForeignKey | References the Products table      |

#### Supplier Table
| Attribute Name | Type       | Description                        |
|----------------|------------|------------------------------------|
| Supplier_ID    | PrimaryKey | Unique ID for each supplier        |
| Supplier_Name  | String     | Name of the supplier               |
| Address        | String     | Address of the supplier            |
| Contact        | String     | Contact details of the supplier    |

## Configuration

### <span style="color:orange;">config.js</span>
`This file contains configuration parameters for the application, including API endpoints and project IDs for integrating with Appwrite services. Ensure to set up this file with your Appwrite project details.`

### <span style="color:orange;">auth.js</span>
`This file defines an authentication service using the Appwrite SDK. It provides methods for creating user accounts, logging users in, retrieving current user information, and logging users out.`

## Usage

1. **Initialize Database**: Ensure all the tables are created as per the schema mentioned above.
2. **Configure Appwrite**: Update the `config.js` file with your Appwrite project details.
3. **Set Up Authentication**: Use the `auth.js` file to manage user authentication and authorization.
4. **CRUD Operations**: Utilize the CRUD methods in `AppwriteService` to manage products, categories, suppliers, and purchase orders.
5. **File Management**: Handle file uploads and deletions using the Appwrite Storage service integrated within the application.

## Conclusion

`This Inventory Management System is designed to provide a streamlined approach to handling inventory tasks. The system is scalable and easily extendable to include additional functionalities as required. Ensure regular updates and maintenance to keep the system running smoothly.`


