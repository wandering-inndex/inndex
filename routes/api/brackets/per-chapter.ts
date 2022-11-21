import { Handler } from "$fresh/server.ts";

import { BracketContentsPerChapter } from "@apps/table-of-brackets/models.ts";
import { getDriver } from "../../../utils/db/neo4j.ts";

const query = `
MATCH (c:Chapter)<-[:MENTIONED_IN]-(bc)
WITH c, bc ORDER BY c.id ASC, bc.content ASC
RETURN c.id AS chapterId, collect(DISTINCT bc.content) AS bracketContents
`;

export const handler: Handler = async (): Promise<Response> => {
  const [driver, err] = getDriver();
  if (err !== null) return Response.error();

  const rows: BracketContentsPerChapter[] = [];
  const session = driver.session();
  try {
    const result = await session.executeRead((tx) => tx.run(query));
    const records = result.records;
    for (let i = 0; i < records.length; i++) {
      const chapterId: string = records[i].get("chapterId");
      const bracketContents: string[] = records[i].get("bracketContents");
      rows.push({ chapterId, bracketContents });
    }
  } catch {
    return Response.error();
  } finally {
    await session.close();
  }

  return Response.json(rows);
};
