# Inventory Management System Overview

## 14-06-2024:
``` 
Created authentication service and Database for the inventory management system.
```

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
```
This section likely contains JavaScript code that sets up configuration parameters for your application, such as API endpoints and project IDs for Appwrite services.
```
### <span style="color:orange;">auth.js:</span>
```
This section likely contains JavaScript code that defines an authentication service using the Appwrite SDK (`Client`, `Account`, `ID`), providing methods for creating user accounts, logging users in, retrieving current user information, and logging users out.

```



