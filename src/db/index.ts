import { Pool } from "pg";
import "dotenv/config";

(async () => {
  const pool = new Pool({ allowExitOnIdle: true });

  const poolClient = await pool.connect();

  try {
    await poolClient.query("BEGIN");

    await poolClient.query(`
    DROP TABLE IF EXISTS users, addresses, books, authors, purchases CASCADE;

    CREATE TABLE users (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        first_name text NOT NULL,
        last_name text NOT NULL,
        email text UNIQUE NOT NULL,
        password varchar(60) NOT NULL,
        created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE addresses (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id uuid references users (id) ON DELETE CASCADE,
        street text NOT NULL,
        zip_code text NOT NULL,
        city text NOT NULL,
        state text NOT NULL
    );

    CREATE TABLE books (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        title text NOT NULL,
        genre text NOT NULL,
        isbn varchar(17) UNIQUE NOT NULL,
        price money NOT NULL,
        stock_quantity integer NOT NULL
    );

    CREATE TABLE authors (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        first_name text NOT NULL,
        last_name text NOT NULL
    );

    CREATE TABLE purchases (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id uuid references users (id) ON DELETE SET NULL,
        books_ids uuid[] NOT NULL,
        quantities integer[] NOT NULL,
        created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

    await poolClient.query("COMMIT");
  } catch (error) {
    await poolClient.query("ROLLBACK");
  } finally {
    poolClient.release();
  }
})();
