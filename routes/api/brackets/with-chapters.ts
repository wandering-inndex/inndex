import { Handler } from "$fresh/server.ts";

import { BracketContentWithChapters } from "@apps/table-of-brackets/models.ts";
import { getDriver } from "../../../utils/db/neo4j.ts";

const query = `
MATCH (bc:BracketContent)-[:MENTIONED_IN]->(c:Chapter)
RETURN bc.content AS content, collect(c.id) AS chapterIds
ORDER BY bc.content
`;

export const handler: Handler = async (): Promise<Response> => {
  const [driver, err] = getDriver();
  if (err !== null) return Response.error();

  const rows: BracketContentWithChapters[] = [];
  const session = driver.session();
  try {
    const result = await session.executeRead((tx) => tx.run(query));
    const records = result.records;
    for (let i = 0; i < records.length; i++) {
      const content: string = records[i].get("content");
      const chapterIds: string[] = records[i].get("chapterIds");
      rows.push({ content, chapterIds: chapterIds.sort() });
    }
  } catch {
    return Response.error();
  } finally {
    await session.close();
  }

  return Response.json(rows.sort((a, b) => {
    return a.content.localeCompare(b.content, undefined, {
      sensitivity: "base",
    });
  }));
};
