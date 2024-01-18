import { Pool, PoolClient } from "pg";

async function connect(): Promise<PoolClient> {
  const pool = new Pool({ allowExitOnIdle: true });

  const poolClient = await pool.connect();

  return poolClient;
}

export default connect;
