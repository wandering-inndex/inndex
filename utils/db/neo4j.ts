import neo4j, { Driver, hasReachableServer } from "neo4j";

import { ResultOrError } from "../../types/app.ts";

let singleton: Driver;

interface Config {
  url: string;
  username: string;
  password: string;
}

export const getDriver = (): ResultOrError<Driver> => {
  if (!singleton) return [singleton, new Error("driver not initialized")];

  return [singleton, null];
};

export const init = async (
  { url, username, password }: Config,
): Promise<Error | null> => {
  try {
    const driver = neo4j.driver(
      url,
      neo4j.auth.basic(username, password),
    );

    if (url === "" || username === "" || password === "") {
      throw new Error("invalid credentials");
    }

    const valid = await hasReachableServer(url);
    if (!valid) {
      throw new Error("url cannot be reached");
    }

    singleton = driver;

    return null;
  } catch (e) {
    return new Error(e);
  }
};
