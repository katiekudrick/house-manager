PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE inventory (
            item_id text PRIMARY KEY,
            category text NOT NULL,
            type text NOT NULL,
            description text NOT NULL,
            vendor text NOT NULL,
            cost text NOT NULL,
            purchase_date text NOT NULL
        );
INSERT INTO inventory VALUES('test-id-01','Top','Sweatshirt','2XL Oversized Gray Midnights Hoodie','Etsy','21.99','2023-09-15');
CREATE TABLE uses (
            use_id integer PRIMARY KEY,
            item_id text NOT NULL,
            use_date text NOT NULL,
            FOREIGN KEY (item_id) REFERENCES inventory (item_id)
        );
COMMIT;
