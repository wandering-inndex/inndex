import { Handler } from "$fresh/server.ts";

import { BracketContentsPerChapter } from "@apps/table-of-brackets/models.ts";
import { getDriver } from "../../../utils/db/neo4j.ts";

const query = `
MATCH (bc:BracketContent)-[:MENTIONED_IN]->(c:Chapter)
RETURN c.id AS chapterId, collect(bc.content) AS bracketContents
ORDER BY c.id
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
      rows.push({ chapterId, bracketContents: bracketContents.sort() });
    }
  } catch {
    return Response.error();
  } finally {
    await session.close();
  }

  return Response.json(rows);
};
