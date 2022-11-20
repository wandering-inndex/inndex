import { Handler } from "$fresh/server.ts";

import { getDriver } from "../../../utils/db/neo4j.ts";

const query = `
MATCH (bc:BracketContent)
RETURN COUNT(bc) AS total
`;

export const handler: Handler = async (): Promise<Response> => {
  const [driver, err] = getDriver();
  if (err !== null) return Response.error();

  let total = 0;
  const session = driver.session();
  try {
    const result = await session.executeRead((tx) => tx.run(query));
    const records = result.records;
    for (let i = 0; i < records.length; i++) {
      const rawData: number = records[i].get("total").toInt();
      total = rawData;
    }
  } catch {
    return Response.error();
  } finally {
    await session.close();
  }

  return Response.json(total);
};
