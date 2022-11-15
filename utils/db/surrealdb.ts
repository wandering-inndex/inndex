import Surreal from "surrealdb/mod.ts";

interface Config {
  url: string;
  namespace: string;
  database: string;
  username: string;
  password: string;
}

export const init = async (
  { url, namespace, database, username, password }: Config,
): Promise<Error | null> => {
  try {
    await Surreal.Instance.connect(url);
    await Surreal.Instance.signin({
      user: username,
      pass: password,
    });
    await Surreal.Instance.use(namespace, database);

    return null;
  } catch (e) {
    return new Error(e);
  }
};
