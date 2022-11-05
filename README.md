# The Wandering Inndex

![Deno Version](https://img.shields.io/badge/deno-v1.26.2-black)
![License](https://img.shields.io/badge/license-MIT-blue)

![The Wandering Inndex Logo](./static/banner.png)

> **IMPORTANT NOTICE**: Copyright for almost all the text in this repository goes to the author, **pirateaba**. Please support the author through their official channels:
>
> - https://wanderinginn.com
> - https://store.wanderinginn.com/
> - https://reddit.com/r/WanderingInn
> - https://patreon.com/pirateaba
> - https://twitch.tv/pirateaba
> - https://youtube.com/user/pirateaba
> - https://twitter.com/pirateaba

## Usage

```shell
deno task start
```

This will watch the project directory and restart as necessary.

## Initial Graph Data Model

```mermaid
flowchart LR
  chapter([Chapter])
  webVolume([Web Volume])
  audibleAudioBook([Audible Audiobook])
  kindleBook([Kindle Book])
  character([Character])
  name([Name])
  species([Species])
  group([Group])
  location([Location])
  skill([Skill])
  systemClass([Class])
  item([Item])

  character-- OF_SPECIES -->species
  character-- ALSO_KNOWN_AS ---name
  character-- PART_OF_GROUP -->group
  character-- RESIDES_IN -->location
  character-- INTRODUCED_IN -->chapter
  character-- APPEARS_IN -->chapter
  character-- HAS_SKILL -->skill
  character-- HAS_CLASS -->systemClass
  character-- OWNS_ITEM -->item

  location-- LOCATED_IN -->location
  chapter-- PART_OF_VOLUME --> webVolume
  chapter-- PART_OF_AUDIOBOOK --> audibleAudioBook
  chapter-- PART_OF_EBOOK --> kindleBook
```

## Contributing

**Imposter syndrome disclaimer**: We want your help. No, really.

There may be a little voice inside your head that is telling you that you're not ready to be an open source contributor; that your skills aren't nearly good enough to contribute. What could you possibly offer a project like this one?

We assure you - the little voice in your head is wrong. If you can write code at all, you can contribute code to open source. Contributing to open source projects is a fantastic way to advance one's coding skills. Writing perfect code isn't the measure of a good developer (that would disqualify all of us!); it's trying to create something, making mistakes, and learning from those mistakes. That's how we all improve, and we are happy to help others learn.

Being an open source contributor doesn't just mean writing code, either. You can help out by writing documentation, tests, or even giving feedback about the project (and yes - that includes giving feedback about the contribution process). Some of these contributions may be the most valuable to the project as a whole, because you're coming to the project with fresh eyes, so you can see the errors and assumptions that seasoned contributors have glossed over.

## License

Licensed under **MIT**. Please see bundled [LICENSE file](./LICENSE.md) for more details.
