import { Head } from "$fresh/runtime.ts";

import { GraphEdge, GraphNode } from "@apps/rewrite-mapping/models.ts";

import {
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_NAME,
} from "../constants/site.ts";
import SiteHeader from "../components/ui/SiteHeader.tsx";
import DocumentHead from "../components/document/DocumentHead.tsx";
import SiteFooter from "../components/ui/SiteFooter.tsx";

import RewriteMapping from "../islands/RewriteMapping.tsx";

const oldChapters: GraphNode[] = [
  {
    id: "twiwnch0001011",
    title: "1.00",
    order: 1,
    url: "https://wanderinginn.com/2016/07/27/1-00/",
  },
  {
    id: "twiwnch0002011",
    title: "1.01",
    order: 2,
    url: "https://wanderinginn.com/2016/07/27/1-01/",
  },
  {
    id: "twiwnch0003011",
    title: "1.02",
    order: 3,
    url: "https://wanderinginn.com/2016/07/30/1-02/",
  },
  {
    id: "twiwnch0004011",
    title: "1.03",
    order: 4,
    url: "https://wanderinginn.com/2016/08/07/1-03/",
  },
  {
    id: "twiwnch0005011",
    title: "1.04",
    order: 5,
    url: "https://wanderinginn.com/2016/08/10/1-04/",
  },
  {
    id: "twiwnch0006011",
    title: "1.05",
    order: 6,
    url: "https://wanderinginn.com/2016/08/13/1-05/",
  },
  {
    id: "twiwnch0007011",
    title: "1.06",
    order: 7,
    url: "https://wanderinginn.com/2016/08/17/1-06/",
  },
  {
    id: "twiwnch0008011",
    title: "1.07",
    order: 8,
    url: "https://wanderinginn.com/2016/08/20/1-07/",
  },
  {
    id: "twiwnch0009011",
    title: "1.08",
    order: 9,
    url: "https://wanderinginn.com/2016/08/24/1-08/",
  },
  {
    id: "twiwnch0010011",
    title: "1.09",
    order: 10,
    url: "https://wanderinginn.com/2016/08/28/1-09/",
  },
  {
    id: "twiwnch0011011",
    title: "1.10",
    order: 11,
    url: "https://wanderinginn.com/2016/08/31/1-10/",
  },
  {
    id: "twiwnch0012011",
    title: "1.11",
    order: 12,
    url: "https://wanderinginn.com/2016/09/04/1-11/",
  },
  {
    id: "twiwnch0013011",
    title: "Interlude",
    order: 13,
    url: "https://wanderinginn.com/2016/09/04/interlude/",
  },
  {
    id: "twiwnch0014011",
    title: "1.12",
    order: 14,
    url: "https://wanderinginn.com/2016/09/07/1-12/",
  },
  {
    id: "twiwnch0015011",
    title: "1.13",
    order: 15,
    url: "https://wanderinginn.com/2016/09/11/1-13/",
  },
  {
    id: "twiwnch0016011",
    title: "1.14",
    order: 16,
    url: "https://wanderinginn.com/2016/09/14/1-14/",
  },
  {
    id: "twiwnch0017011",
    title: "1.15",
    order: 17,
    url: "https://wanderinginn.com/2016/09/18/1-15/",
  },
  {
    id: "twiwnch0018011",
    title: "1.16",
    order: 18,
    url: "https://wanderinginn.com/2016/09/21/1-16/",
  },
  {
    id: "twiwnch0019011",
    title: "1.17",
    order: 19,
    url: "https://wanderinginn.com/2016/09/25/1-17/",
  },
  {
    id: "twiwnch0020011",
    title: "1.18",
    order: 20,
    url: "https://wanderinginn.com/2016/09/28/1-18/",
  },
  {
    id: "twiwnch0021011",
    title: "1.19",
    order: 21,
    url: "https://wanderinginn.com/2016/10/02/1-19/",
  },
  {
    id: "twiwnch0022011",
    title: "1.20",
    order: 22,
    url: "https://wanderinginn.com/2016/10/05/1-20/",
  },
  {
    id: "twiwnch0023011",
    title: "Interlude – 1.00 R",
    order: 23,
    url: "https://wanderinginn.com/2016/10/06/interlude-1-00-r/",
  },
  {
    id: "twiwnch0024011",
    title: "1.01 R",
    order: 24,
    url: "https://wanderinginn.com/2016/10/12/1-01-r/",
  },
  {
    id: "twiwnch0025011",
    title: "1.21",
    order: 25,
    url: "https://wanderinginn.com/2016/10/16/1-21/",
  },
  {
    id: "twiwnch0026011",
    title: "1.22",
    order: 26,
    url: "https://wanderinginn.com/2016/10/19/1-22/",
  },
  {
    id: "oldBlank01",
    order: -1,
    blank: true,
  },
  {
    id: "twiwnch0027011",
    title: "1.23",
    order: 27,
    url: "https://wanderinginn.com/2016/10/23/1-23/",
  },
  {
    id: "twiwnch0028011",
    title: "Interlude – King Edition",
    order: 28,
    url: "https://wanderinginn.com/2016/10/26/interlude-king-edition/",
  },
  {
    id: "twiwnch0029011",
    title: "1.24",
    order: 29,
    url: "https://wanderinginn.com/2016/10/30/1-24/",
  },
  {
    id: "twiwnch0030011",
    title: "1.02 R",
    order: 30,
    url: "https://wanderinginn.com/2016/11/02/1-02-r/",
  },
  {
    id: "twiwnch0031011",
    title: "1.03 R",
    order: 31,
    url: "https://wanderinginn.com/2016/11/06/1-03-r/",
  },
  {
    id: "oldBlank02",
    order: -1,
    blank: true,
  },
  {
    id: "twiwnch0032011",
    title: "1.25",
    order: 32,
    url: "https://wanderinginn.com/2016/11/09/1-25/",
  },
  {
    id: "twiwnch0033011",
    title: "1.26",
    order: 33,
    url: "https://wanderinginn.com/2016/11/13/1-26/",
  },
  {
    id: "twiwnch0034011",
    title: "1.27",
    order: 34,
    url: "https://wanderinginn.com/2016/11/16/1-27/",
  },
  {
    id: "twiwnch0035011",
    title: "1.04 R",
    order: 35,
    url: "https://wanderinginn.com/2016/11/20/1-04-r/",
  },
  {
    id: "twiwnch0036011",
    title: "1.05 R",
    order: 36,
    url: "https://wanderinginn.com/2016/11/23/1-05-r/",
  },
  {
    id: "twiwnch0037011",
    title: "1.28",
    order: 37,
    url: "https://wanderinginn.com/2016/11/27/1-28/",
  },
  {
    id: "twiwnch0038011",
    title: "1.06 R",
    order: 38,
    url: "https://wanderinginn.com/2016/11/30/1-06-r/",
  },
  {
    id: "twiwnch0039011",
    title: "1.29",
    order: 39,
    url: "https://wanderinginn.com/2016/12/04/1-29/",
  },
  {
    id: "twiwnch0040011",
    title: "1.30",
    order: 40,
    url: "https://wanderinginn.com/2016/12/07/1-30/",
  },
  {
    id: "twiwnch0041011",
    title: "1.31",
    order: 41,
    url: "https://wanderinginn.com/2016/12/11/1-31/",
  },
  {
    id: "twiwnch0042011",
    title: "1.07 R",
    order: 42,
    url: "https://wanderinginn.com/2016/12/14/1-07-r/",
  },
  {
    id: "twiwnch0043011",
    title: "1.08 R",
    order: 43,
    url: "https://wanderinginn.com/2016/12/18/1-08-r/",
  },
  {
    id: "twiwnch0044011",
    title: "1.32",
    order: 44,
    url: "https://wanderinginn.com/2016/12/21/1-32/",
  },
  {
    id: "twiwnch0045011",
    title: "1.33",
    order: 45,
    url: "https://wanderinginn.com/2016/12/25/1-33/",
  },
  {
    id: "twiwnch0046011",
    title: "1.09 R",
    order: 46,
    url: "https://wanderinginn.com/2016/12/28/1-09-r/",
  },
  {
    id: "twiwnch0047011",
    title: "1.10 R",
    order: 47,
    url: "https://wanderinginn.com/2017/01/01/1-10-r/",
  },
  {
    id: "twiwnch0048011",
    title: "1.34",
    order: 48,
    url: "https://wanderinginn.com/2017/01/04/1-34/",
  },
  {
    id: "twiwnch0049011",
    title: "1.35",
    order: 49,
    url: "https://wanderinginn.com/2017/01/08/1-35/",
  },
  {
    id: "twiwnch0050011",
    title: "1.11 R",
    order: 50,
    url: "https://wanderinginn.com/2017/01/11/1-11-r/",
  },
  {
    id: "twiwnch0051011",
    title: "1.12 R",
    order: 51,
    url: "https://wanderinginn.com/2017/01/15/1-12-r/",
  },
  {
    id: "twiwnch0052011",
    title: "1.36",
    order: 52,
    url: "https://wanderinginn.com/2017/01/18/1-36/",
  },
  {
    id: "twiwnch0053011",
    title: "1.37",
    order: 53,
    url: "https://wanderinginn.com/2017/01/22/1-37/",
  },
  {
    id: "twiwnch0054011",
    title: "1.38",
    order: 54,
    url: "https://wanderinginn.com/2017/01/25/1-38/",
  },
  {
    id: "oldBlank03",
    order: -1,
    blank: true,
  },
  {
    id: "twiwnch0055011",
    title: "1.39",
    order: 55,
    url: "https://wanderinginn.com/2017/01/29/1-39/",
  },
  {
    id: "twiwnch0056011",
    title: "1.40",
    order: 56,
    url: "https://wanderinginn.com/2017/01/31/1-40/",
  },
  {
    id: "twiwnch0057011",
    title: "1.13 R",
    order: 57,
    url: "https://wanderinginn.com/2017/02/05/1-13-r/",
  },
  {
    id: "oldBlank04",
    order: -1,
    blank: true,
  },
  {
    id: "twiwnch0058011",
    title: "1.41",
    order: 58,
    url: "https://wanderinginn.com/2017/02/07/1-41/",
  },
  {
    id: "twiwnch0059011",
    title: "1.00 H",
    order: 59,
    url: "https://wanderinginn.com/2017/02/12/1-00-h/",
  },
  {
    id: "twiwnch0060011",
    title: "1.01 H",
    order: 60,
    url: "https://wanderinginn.com/2017/02/15/1-01-h/",
  },
  {
    id: "twiwnch0061011",
    title: "1.02 H",
    order: 61,
    url: "https://wanderinginn.com/2017/02/19/1-02-h/",
  },
  {
    id: "twiwnch0062011",
    title: "1.42",
    order: 62,
    url: "https://wanderinginn.com/2017/02/22/1-42/",
  },
  {
    id: "twiwnch0063011",
    title: "1.43",
    order: 63,
    url: "https://wanderinginn.com/2017/02/25/1-43/",
  },
  {
    id: "twiwnch0064011",
    title: "1.44",
    order: 64,
    url: "https://wanderinginn.com/2017/03/01/1-44/",
  },
  {
    id: "twiwnch0065011",
    title: "1.45",
    order: 65,
    url: "https://wanderinginn.com/2017/03/04/1-45/",
  },
];

const newChapters: GraphNode[] = [
  {
    id: "twiwnch10001011",
    title: "1.00",
    order: 1,
    url: "https://wanderinginn.com/2023/03/03/rw1-00/",
  },
  {
    id: "newBlank01",
    order: -1,
    blank: true,
  },
  {
    id: "twiwnch10002011",
    title: "1.01",
    order: 2,
    url: "https://wanderinginn.com/2023/03/03/rw1-01/",
  },
  {
    id: "twiwnch10003011",
    title: "1.02",
    order: 3,
    url: "https://wanderinginn.com/2023/03/03/rw1-02/",
  },
  {
    id: "twiwnch10004011",
    title: "1.03",
    order: 4,
    url: "https://wanderinginn.com/2023/03/03/rw1-03/",
  },
  {
    id: "twiwnch10005011",
    title: "1.04",
    order: 5,
    url: "https://wanderinginn.com/2023/03/03/rw1-04/",
  },
  {
    id: "twiwnch10006011",
    title: "1.05",
    order: 6,
    url: "https://wanderinginn.com/2023/03/03/rw1-05/",
  },
  {
    id: "twiwnch10007011",
    title: "1.06",
    order: 7,
    url: "https://wanderinginn.com/2023/03/03/rw1-06/",
  },
  {
    id: "twiwnch10008011",
    title: "1.07",
    order: 8,
    url: "https://wanderinginn.com/2023/03/03/rw1-07/",
  },
  {
    id: "twiwnch10009011",
    title: "1.08",
    order: 9,
    url: "https://wanderinginn.com/2023/03/03/rw1-08/",
  },
  {
    id: "twiwnch10010011",
    title: "1.09",
    order: 10,
    url: "https://wanderinginn.com/2023/03/03/rw1-09/",
  },
  {
    id: "twiwnch10011011",
    title: "1.10",
    order: 11,
    url: "https://wanderinginn.com/2023/03/03/rw1-10/",
  },
  {
    id: "twiwnch10012011",
    title: "Interlude — The Great Ritual",
    order: 12,
    url: "https://wanderinginn.com/2023/03/03/rwinterlude-the-great-ritual/",
  },
  {
    id: "twiwnch10013011",
    title: "1.11",
    order: 13,
    url: "https://wanderinginn.com/2023/03/03/rw1-11/",
  },
  {
    id: "newBlank02",
    order: -1,
    blank: true,
  },
  {
    id: "twiwnch10014011",
    title: "1.12",
    order: 14,
    url: "https://wanderinginn.com/2023/03/03/rw1-12/",
  },
  {
    id: "twiwnch10015011",
    title: "1.13",
    order: 15,
    url: "https://wanderinginn.com/2023/03/03/rw1-13/",
  },
  {
    id: "twiwnch10016011",
    title: "1.14",
    order: 16,
    url: "https://wanderinginn.com/2023/03/03/rw1-14/",
  },
  {
    id: "twiwnch10017011",
    title: "1.15",
    order: 17,
    url: "https://wanderinginn.com/2023/03/03/rw1-15/",
  },
  {
    id: "twiwnch10018011",
    title: "1.16",
    order: 18,
    url: "https://wanderinginn.com/2023/03/03/rw1-16/",
  },
  {
    id: "twiwnch10019011",
    title: "1.17",
    order: 19,
    url: "https://wanderinginn.com/2023/03/03/rw1-17/",
  },
  {
    id: "twiwnch10020011",
    title: "1.18",
    order: 20,
    url: "https://wanderinginn.com/2023/03/03/rw1-18/",
  },
  {
    id: "twiwnch10021011",
    title: "1.19 R",
    order: 21,
    url: "https://wanderinginn.com/2023/03/03/rw1-19-r/",
  },
  {
    id: "twiwnch10022011",
    title: "1.20 R",
    order: 22,
    url: "https://wanderinginn.com/2023/03/03/rw1-20-r/",
  },
  {
    id: "twiwnch10023011",
    title: "1.21",
    order: 23,
    url: "https://wanderinginn.com/2023/03/03/rw1-21/",
  },
  {
    id: "twiwnch10024011",
    title: "1.22",
    order: 24,
    url: "https://wanderinginn.com/2023/03/03/rw1-22/",
  },
  {
    id: "twiwnch10025011",
    title: "1.23 A",
    order: 25,
    url: "https://wanderinginn.com/2023/03/03/rw1-23-a/",
    brandNew: true,
  },
  {
    id: "twiwnch10026011",
    title: "1.24",
    order: 26,
    url: "https://wanderinginn.com/2023/03/04/rw1-24/",
  },
  {
    id: "twiwnch10027011",
    title: "Interlude — King Edition",
    order: 27,
    url: "https://wanderinginn.com/2023/03/04/rwinterlude-king-edition/",
  },
  {
    id: "twiwnch10028011",
    title: "1.25",
    order: 28,
    url: "https://wanderinginn.com/2023/03/04/rw1-25/",
  },
  {
    id: "twiwnch10029011",
    title: "1.26 R",
    order: 29,
    url: "https://wanderinginn.com/2023/03/04/rw1-26-r/",
  },
  {
    id: "twiwnch10030011",
    title: "1.27 R",
    order: 30,
    url: "https://wanderinginn.com/2023/03/04/rw1-27-r/",
  },
  {
    id: "twiwnch10031011",
    title: "1.28 A",
    order: 31,
    url: "https://wanderinginn.com/2023/03/04/rw1-28-a/",
    brandNew: true,
  },
  {
    id: "twiwnch10032011",
    title: "1.29",
    order: 32,
    url: "https://wanderinginn.com/2023/03/04/rw1-29/",
  },
  {
    id: "twiwnch10033011",
    title: "1.30",
    order: 33,
    url: "https://wanderinginn.com/2023/03/04/rw1-30/",
  },
  {
    id: "twiwnch10034011",
    title: "1.31",
    order: 34,
    url: "https://wanderinginn.com/2023/03/04/rw1-31/",
  },
  {
    id: "twiwnch10035011",
    title: "1.32 R",
    order: 35,
    url: "https://wanderinginn.com/2023/03/04/rw1-32-r/",
  },
  {
    id: "twiwnch10036011",
    title: "1.33 R",
    order: 36,
    url: "https://wanderinginn.com/2023/03/04/rw1-33-r/",
  },
  {
    id: "twiwnch10037011",
    title: "1.34",
    order: 37,
    url: "https://wanderinginn.com/2023/03/04/rw1-34/",
  },
  {
    id: "twiwnch10038011",
    title: "1.35 R",
    order: 38,
    url: "https://wanderinginn.com/2023/03/04/rw1-35-r/",
  },
  {
    id: "twiwnch10039011",
    title: "1.36",
    order: 39,
    url: "https://wanderinginn.com/2023/03/04/rw1-36/",
  },
  {
    id: "twiwnch10040011",
    title: "1.37",
    order: 40,
    url: "https://wanderinginn.com/2023/03/04/rw1-37/",
  },
  {
    id: "twiwnch10041011",
    title: "1.38",
    order: 41,
    url: "https://wanderinginn.com/2023/03/04/rw1-38/",
  },
  {
    id: "twiwnch10042011",
    title: "1.39 R",
    order: 42,
    url: "https://wanderinginn.com/2023/03/04/rw1-39-r/",
  },
  {
    id: "twiwnch10043011",
    title: "1.40 R",
    order: 43,
    url: "https://wanderinginn.com/2023/03/04/rw1-40-r/",
  },
  {
    id: "twiwnch10044011",
    title: "1.41",
    order: 44,
    url: "https://wanderinginn.com/2023/03/04/rw1-41/",
  },
  {
    id: "twiwnch10045011",
    title: "1.42",
    order: 45,
    url: "https://wanderinginn.com/2023/03/04/rw1-42/",
  },
  {
    id: "twiwnch10046011",
    title: "1.43 R",
    order: 46,
    url: "https://wanderinginn.com/2023/03/04/rw1-43-r/",
  },
  {
    id: "twiwnch10047011",
    title: "1.44 R",
    order: 47,
    url: "https://wanderinginn.com/2023/03/04/rw1-44-r/",
  },
  {
    id: "twiwnch10048011",
    title: "1.45",
    order: 48,
    url: "https://wanderinginn.com/2023/03/04/rw1-45/",
  },
  {
    id: "twiwnch10049011",
    title: "1.46",
    order: 49,
    url: "https://wanderinginn.com/2023/03/04/rw1-46/",
  },
  {
    id: "twiwnch10050011",
    title: "1.47 R",
    order: 50,
    url: "https://wanderinginn.com/2023/03/04/rw1-47-r/",
  },
  {
    id: "twiwnch10051011",
    title: "1.48 R",
    order: 51,
    url: "https://wanderinginn.com/2023/03/04/rw1-48-r/",
  },
  {
    id: "twiwnch10052011",
    title: "1.49",
    order: 52,
    url: "https://wanderinginn.com/2023/03/04/rw1-49/",
  },
  {
    id: "twiwnch10053011",
    title: "1.50",
    order: 53,
    url: "https://wanderinginn.com/2023/03/04/rw1-50/",
  },
  {
    id: "twiwnch10054011",
    title: "1.51",
    order: 54,
    url: "https://wanderinginn.com/2023/03/04/rw1-51/",
  },
  {
    id: "twiwnch10055011",
    title: "1.52 R",
    order: 55,
    url: "https://wanderinginn.com/2023/03/04/rw1-52-r/",
  },
  {
    id: "twiwnch10056011",
    title: "1.53",
    order: 56,
    url: "https://wanderinginn.com/2023/03/04/rw1-53/",
  },
  {
    id: "twiwnch10057011",
    title: "1.54",
    order: 57,
    url: "https://wanderinginn.com/2023/03/04/rw1-54/",
  },
  {
    id: "newBlank03",
    order: -1,
    blank: true,
  },
  {
    id: "twiwnch10058011",
    title: "1.55 R",
    order: 58,
    url: "https://wanderinginn.com/2023/03/04/rw1-55-r/",
    brandNew: true,
  },
  {
    id: "twiwnch10059011",
    title: "1.56",
    order: 59,
    url: "https://wanderinginn.com/2023/03/04/rw1-56/",
  },
  {
    id: "twiwnch10060011",
    title: "1.57 H",
    order: 60,
    url: "https://wanderinginn.com/2023/03/04/rw1-57-h/",
  },
  {
    id: "twiwnch10061011",
    title: "1.58 H",
    order: 61,
    url: "https://wanderinginn.com/2023/03/04/rw1-58-h/",
  },
  {
    id: "twiwnch10062011",
    title: "1.59 H",
    order: 62,
    url: "https://wanderinginn.com/2023/03/04/rw1-59-h/",
  },
  {
    id: "twiwnch10063011",
    title: "1.60",
    order: 63,
    url: "https://wanderinginn.com/2023/03/04/rw1-60/",
  },
  {
    id: "twiwnch10064011",
    title: "1.61",
    order: 64,
    url: "https://wanderinginn.com/2023/03/04/rw1-61/",
  },
  {
    id: "twiwnch10065011",
    title: "1.62",
    order: 65,
    url: "https://wanderinginn.com/2023/03/04/rw1-62/",
  },
  {
    id: "twiwnch10066011",
    title: "1.63",
    order: 66,
    url: "https://wanderinginn.com/2023/03/04/rw1-63/",
  },
];

const edges: GraphEdge[] = [
  { from: "twiwnch0001011", to: "twiwnch10001011" },
  { from: "twiwnch0002011", to: "twiwnch10001011" },
  { from: "twiwnch0003011", to: "twiwnch10002011" },
  { from: "twiwnch0004011", to: "twiwnch10003011" },
  { from: "twiwnch0005011", to: "twiwnch10004011" },
  { from: "twiwnch0006011", to: "twiwnch10005011" },
  { from: "twiwnch0007011", to: "twiwnch10006011" },
  { from: "twiwnch0008011", to: "twiwnch10007011" },
  { from: "twiwnch0009011", to: "twiwnch10008011" },
  { from: "twiwnch0010011", to: "twiwnch10009011" },
  { from: "twiwnch0011011", to: "twiwnch10010011" },
  { from: "twiwnch0012011", to: "twiwnch10011011" },
  { from: "twiwnch0013011", to: "twiwnch10012011" },
  { from: "twiwnch0014011", to: "twiwnch10013011" },
  { from: "twiwnch0015011", to: "twiwnch10013011" },
  { from: "twiwnch0016011", to: "twiwnch10014011" },
  { from: "twiwnch0017011", to: "twiwnch10015011" },
  { from: "twiwnch0018011", to: "twiwnch10016011" },
  { from: "twiwnch0019011", to: "twiwnch10017011" },
  { from: "twiwnch0020011", to: "twiwnch10018011" },
  { from: "twiwnch0021011", to: "twiwnch10019011" },
  { from: "twiwnch0022011", to: "twiwnch10020011" },
  { from: "twiwnch0023011", to: "twiwnch10021011" },
  { from: "twiwnch0024011", to: "twiwnch10022011" },
  { from: "twiwnch0025011", to: "twiwnch10023011" },
  { from: "twiwnch0026011", to: "twiwnch10024011" },
  { from: "twiwnch0027011", to: "twiwnch10026011" },
  { from: "twiwnch0028011", to: "twiwnch10027011" },
  { from: "twiwnch0029011", to: "twiwnch10028011" },
  { from: "twiwnch0030011", to: "twiwnch10029011" },
  { from: "twiwnch0031011", to: "twiwnch10030011" },
  { from: "twiwnch0032011", to: "twiwnch10032011" },
  { from: "twiwnch0033011", to: "twiwnch10033011" },
  { from: "twiwnch0034011", to: "twiwnch10034011" },
  { from: "twiwnch0035011", to: "twiwnch10035011" },
  { from: "twiwnch0036011", to: "twiwnch10036011" },
  { from: "twiwnch0037011", to: "twiwnch10037011" },
  { from: "twiwnch0038011", to: "twiwnch10038011" },
  { from: "twiwnch0039011", to: "twiwnch10039011" },
  { from: "twiwnch0040011", to: "twiwnch10040011" },
  { from: "twiwnch0041011", to: "twiwnch10041011" },
  { from: "twiwnch0042011", to: "twiwnch10042011" },
  { from: "twiwnch0043011", to: "twiwnch10043011" },
  { from: "twiwnch0044011", to: "twiwnch10044011" },
  { from: "twiwnch0045011", to: "twiwnch10045011" },
  { from: "twiwnch0046011", to: "twiwnch10046011" },
  { from: "twiwnch0047011", to: "twiwnch10047011" },
  { from: "twiwnch0048011", to: "twiwnch10048011" },
  { from: "twiwnch0049011", to: "twiwnch10049011" },
  { from: "twiwnch0050011", to: "twiwnch10050011" },
  { from: "twiwnch0051011", to: "twiwnch10051011" },
  { from: "twiwnch0052011", to: "twiwnch10052011" },
  { from: "twiwnch0053011", to: "twiwnch10053011" },
  { from: "twiwnch0054011", to: "twiwnch10054011" },
  { from: "twiwnch0055011", to: "twiwnch10056011" },
  { from: "twiwnch0056011", to: "twiwnch10057011" },
  { from: "twiwnch0057011", to: "twiwnch10055011" },
  { from: "twiwnch0058011", to: "twiwnch10059011" },
  { from: "twiwnch0059011", to: "twiwnch10060011" },
  { from: "twiwnch0060011", to: "twiwnch10061011" },
  { from: "twiwnch0061011", to: "twiwnch10062011" },
  { from: "twiwnch0062011", to: "twiwnch10063011" },
  { from: "twiwnch0063011", to: "twiwnch10064011" },
  { from: "twiwnch0064011", to: "twiwnch10065011" },
  { from: "twiwnch0065011", to: "twiwnch10066011" },
];

export default function Page() {
  return (
    <>
      <DocumentHead />

      <Head>
        <title>Mapping of Rewrite Chapters | {DEFAULT_SITE_NAME}</title>

        <meta
          property="description"
          content={DEFAULT_SITE_DESCRIPTION}
        />
      </Head>

      <div class="min-h-screen justify-between flex flex-col">
        <div class="p-4 mx-auto text-sm text-gray-900">
          <SiteHeader />

          <RewriteMapping
            oldChapters={oldChapters}
            newChapters={newChapters}
            edges={edges}
          />
        </div>

        <div>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
