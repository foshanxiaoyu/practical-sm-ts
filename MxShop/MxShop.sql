CREATE TABLE goods_category (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(30) DEFAULT '' COMMENT 'Category name',
    category_code VARCHAR(30) DEFAULT '' COMMENT 'Category Code',
    category_desc TEXT DEFAULT '' COMMENT 'Category description',
    category_type INTEGER COMMENT 'Category level', -- 1, 2, or 3
    parent_category_id INTEGER COMMENT 'Parent category',
    is_tab BOOLEAN DEFAULT FALSE COMMENT 'Navigate or not',
    add_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Add time',
    
    CONSTRAINT fk_parent_category
      FOREIGN KEY (parent_category_id)
      REFERENCES goods_category(id)
      ON DELETE CASCADE
);


-- Table for GoodsCategory (referenced by Goods model)
CREATE TABLE goods_goodscategory (
    id SERIAL PRIMARY KEY,
    -- Add other fields as needed since the original model isn't provided
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Table for Goods
CREATE TABLE goods_goods (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL,
    goods_sn VARCHAR(50) NOT NULL DEFAULT '',
    name VARCHAR(100) NOT NULL,
    click_num INTEGER NOT NULL DEFAULT 0,
    sold_num INTEGER NOT NULL DEFAULT 0,
    fav_num INTEGER NOT NULL DEFAULT 0,
    goods_num INTEGER NOT NULL DEFAULT 0,
    market_price DOUBLE PRECISION NOT NULL DEFAULT 0,
    shop_price DOUBLE PRECISION NOT NULL DEFAULT 0,
    goods_brief TEXT NOT NULL,
    goods_desc TEXT NOT NULL DEFAULT '',
    ship_free BOOLEAN NOT NULL DEFAULT TRUE,
    goods_front_image VARCHAR(100),
    is_new BOOLEAN NOT NULL DEFAULT FALSE,
    is_hot BOOLEAN NOT NULL DEFAULT FALSE,
    add_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES goods_goodscategory(id) ON DELETE CASCADE
);

-- Table for GoodsImage
CREATE TABLE goods_goodsimage (
    id SERIAL PRIMARY KEY,
    goods_id INTEGER NOT NULL,
    image VARCHAR(100),
    add_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (goods_id) REFERENCES goods_goods(id) ON DELETE CASCADE
);

-- Indexes (Django automatically creates indexes for foreign keys)
CREATE INDEX goods_goods_category_id ON goods_goods (category_id);
CREATE INDEX goods_goodsimage_goods_id ON goods_goodsimage (goods_id);

-- 交易
-- Shopping Cart Table
CREATE TABLE trade_shoppingcart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    goods_id INTEGER NOT NULL,
    nums INTEGER NOT NULL DEFAULT 0,
    add_time DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES auth_user(id),
    FOREIGN KEY (goods_id) REFERENCES goods_goods(id),
    UNIQUE (user_id, goods_id)
);

-- Order Info Table
CREATE TABLE trade_orderinfo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    order_sn VARCHAR(30) UNIQUE,
    nonce_str VARCHAR(50) UNIQUE,
    trade_no VARCHAR(100) UNIQUE,
    pay_status VARCHAR(30) NOT NULL DEFAULT 'paying',
    pay_type VARCHAR(10) NOT NULL DEFAULT 'alipay',
    post_script VARCHAR(200) NOT NULL,
    order_mount FLOAT NOT NULL DEFAULT 0.0,
    pay_time DATETIME,
    address VARCHAR(100) NOT NULL DEFAULT '',
    signer_name VARCHAR(20) NOT NULL DEFAULT '',
    singer_mobile VARCHAR(11) NOT NULL,
    add_time DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES auth_user(id),
    CHECK (pay_status IN ('TRADE_SUCCESS', 'TRADE_CLOSED', 'WAIT_BUYER_PAY', 'TRADE_FINISHED', 'paying')),
    CHECK (pay_type IN ('alipay', 'wechat'))
);

-- Order Goods Table
CREATE TABLE trade_ordergoods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    goods_id INTEGER NOT NULL,
    goods_num INTEGER NOT NULL DEFAULT 0,
    add_time DATETIME NOT NULL,
    FOREIGN KEY (order_id) REFERENCES trade_orderinfo(id),
    FOREIGN KEY (goods_id) REFERENCES goods_goods(id)
);