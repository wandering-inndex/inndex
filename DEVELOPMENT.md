# Development

This documents how to start the development process.

## Chrome Extensions

Here are some chrome extensions that will improve your development experience:

- [Octotree - GitHub code tree](https://chrome.google.com/webstore/detail/octotree-github-code-tree/bkhaagjahfmjljalopjnoealnfndnagc)
- [Refined GitHub](https://chrome.google.com/webstore/detail/refined-github/hlepfoohegkhhmjieoechaddaejaokhf)
- [Gitpod - Always ready to code](https://chrome.google.com/webstore/detail/gitpod-always-ready-to-co/dodmmooeoklaejobgleioelladacbeki)
- [JSONVue](https://chrome.google.com/webstore/detail/jsonvue/chklaanhfefbnpoihckbnefhakgolnmc)

## Code Editors

We recommend using [Visual Studio Code](https://code.visualstudio.com/), with the following extensions:

- [`bierner.markdown-mermaid`](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid)
- [`denoland.vscode-deno`](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
- [`esbenp.prettier-vscode`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [`jakeboone02.cypher-query-language`](https://marketplace.visualstudio.com/items?itemName=jakeboone02.cypher-query-language)
- [`mathe42.surrealql`](https://marketplace.visualstudio.com/items?itemName=mathe42.surrealql)

If you do not have access to a development machine, you can create a new [Gitpod](https://gitpod.io/) workspace by clicking the button below:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/wandering-inndex/inndex)

## Seed Data

This application requires access to a [SurrealDB](https://surrealdb.com/) and a [Neo4j](https://neo4j.com/) database instance. Please clone and follow the instructions at [wandering-inndex/seed-data](https://github.com/wandering-inndex/seed-data/blob/main/DEVELOPMENT.md) for setting up the dependencies.

## Deno

This project uses the [Deno](https://deno.land) JavaScript runtime to run the scripts. You can check the manual at https://deno.land/manual/introduction.

- Create a `.env` file from the `.env.template`.
- Fill in the required values.
- Watch the project directory and start the development server:
  - `deno task start`
