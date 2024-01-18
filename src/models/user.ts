import bcrypt from "bcrypt";
import connect from "../db/pool";
import { RegisterUser, ReturnUser } from "../types/user";

const schema =
  process.env.NODE_ENV === "production" ? "production" : "development";

async function register(user: RegisterUser): Promise<ReturnUser | undefined> {
  const poolClient = await connect();

  try {
    await poolClient.query("BEGIN");

    const hashedPassword = await bcrypt.hash(
      user.password,
      await bcrypt.genSalt(12)
    );
    const { rows } = await poolClient.query<ReturnUser>(
      `
      INSERT INTO ${schema}.users (
          first_name, last_name, email, password
      )
          values
      ($1, $2, $3, $4) RETURNING id,
      first_name,
      last_name,
      email,
      created_at;
      `,
      [user.firstName, user.lastName, user.email, hashedPassword]
    );

    await poolClient.query("COMMIT");

    return rows.at(0);
  } catch (error) {
    await poolClient.query("ROLLBACK");

    if (error instanceof Error) {
      throw new Error(error.message);
    }
  } finally {
    poolClient.release();
  }

  return undefined;
}

export default { register };
