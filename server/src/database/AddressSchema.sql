CREATE TABLE Products
(
    product_id uuid DEFAULT uuidv7(),
    product_name TEXT NOT NULL,
    product_description TEXT NOT NULL,
    brand_id uuid NOT NULL,
    product_gender CHAR(1) NOT NULL,
    product_gender_age SMALLINT NOT NULL CHECK(product_gender_age > 17 AND product_gender_age < 98),
    original_price NUMERIC NOT NULL,
    sale_price NUMERIC NOT NULL,
    discount_percentage NUMERIC NOT NULL,
    product_stock_id uuid NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY ("product_id"),
    FOREIGN KEY ("brand_id") REFERENCES Brands("brand_id"),
    FOREIGN KEY ("product_stock_id") REFERENCES ProductStoks("product_stock_id")
)

CREATE TABLE Brands
(
    brand_id uuid DEFAULT uuidv7(),
    brand_name TEXT NOT NULL,
    brand_description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY ("brand_id")
)

CREATE TABLE ProductStoks
(
    product_stock_id uuid DEFAULT uuidv7(),
    product_id uuid NOT NULL,
    stock_quantity SMALLINT NOT NULL CHECK(stock_quantity >= 0),
    seller_id uuid NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY ("product_stock_id"),
    FOREIGN KEY ("product_id") REFERENCES Products("product_id"),
    FOREIGN KEY ("seller_id") REFERENCES Sellers("seller_id")
)

CREATE TABLE ProductImages
(
    image_id uuid DEFAULT uuidv7(),
    product_id uuid NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY ("image_id"),
    FOREIGN KEY ("product_id") REFERENCES Products("product_id")
)

CREATE TABLE Carts
(
    cart_id uuid DEFAULT uuidv7(),
    user_id uuid NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY ("cart_id"),
    FOREIGN KEY ("user_id") REFERENCES Users("user_id")
)

CREATE TABLE CartInventory
(
    cart_inventory_id uuid DEFAULT uuidv7(),
    cart_id uuid NOT NULL,
    product_id uuid NOT NULL,
    quantity SMALLINT NOT NULL CHECK(quantity > 0),
    cart_status CART_STATUS NOT NULL DEFAULT 'CART',
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY ("cart_inventory_id"),
    FOREIGN KEY ("cart_id") REFERENCES Carts("cart_id"),
    FOREIGN KEY ("product_id") REFERENCES Products("product_id")
)

CREATE TABLE Orders
(
    order_id uuid DEFAULT uuidv7(),
    cart_inventory_id uuid NOT NULL,
    total_price NUMERIC NOT NULL,
    order_status ORDER_STATE NOT NULL DEFAULT 'PENDING',
    payment_status TEXT NOT NULL DEFAULT 'UNPAID',
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY ("order_id"),
    FOREIGN KEY ("cart_inventory_id") REFERENCES CartInventory("cart_inventory_id")
)

CREATE TABLE Payments
(
    payment_id uuid DEFAULT uuidv7(),
    order_id uuid NOT NULL,
    payment_method TEXT NOT NULL,
    payment_amount NUMERIC NOT NULL,
    payment_status PAYMENT_STATE NOT NULL DEFAULT 'PENDING',
    transaction_id uuid NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY ("payment_id"),
    FOREIGN KEY ("order_id") REFERENCES Orders("order_id")
)

CREATE TABLE Sellers
(
    seller_id uuid DEFAULT uuidv7(),
    seller_name TEXT NOT NULL,
    seller_email TEXT NOT NULL,
    seller_phone TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY ("seller_id")
)

CREATE TABLE Users
(
    user_id uuid DEFAULT uuidv7(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY ("user_id")
)

CREATE TABLE UserContact
(
    contact_id uuid DEFAULT uuidv7(),
    user_id uuid NOT NULL,
    phone_number TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY ("contact_id"),
    FOREIGN KEY ("user_id") REFERENCES Users("user_id")
)


CREATE TYPE PAYMENT_STATE AS ENUM
('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

CREATE TYPE ORDER_STATE AS ENUM
('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED');

CREATE TYPE ORDER_PAYMENT_STATUS AS ENUM
('UNPAID', 'PARTIALLY_PAID', 'PAID');

CREATE TYPE CART_STATUS AS ENUM
('CART', 'ORDERED', 'ABANDONED');
