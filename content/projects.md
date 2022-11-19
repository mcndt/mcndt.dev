---
url: "/projects/"
hidemeta: true
hideAboutAuthor: true
comments: false
---

# Personal Projects

Overview:

- [📝 Noteshare.space / Obsidian Note Sharing (2022-today)](#notesharespacehttpsnotesharespace-2022-today)
- [⏲ Toggl Track integration for Obsidian (2021-today)](#toggl-track-integration-for-obsidianhttpsgithubcommcndtobsidian-toggl-integration-2021-today)
- [🎨 Blockcolors.app (2021, inactive)](#blockcolorsapphttpsblockcolorsapp-2021-inactive)

## [Noteshare.space](https://noteshare.space) (2022-today)

<div style="display: flex">
  <img src="https://img.shields.io/github/v/tag/mcndt/obsidian-note-sharing">
  <img style="margin-left: 0.5em" src="https://img.shields.io/github/downloads/mcndt/obsidian-note-sharing/total">
  <a href="https://github.com/mcndt/obsidian-note-sharing/stargazers" style="box-shadow: 0 0">
    <img style="margin-left: .5em" src="https://img.shields.io/github/stars/mcndt/obsidian-note-sharing.svg?style=social&label=Star&maxAge=2592000">
  </a>
  <span style="display: block; margin: 0.8em 0.5em 0 0.5em"><strong>(Plugin)</strong></span>
  <a href="https://github.com/mcndt/noteshare.space/stargazers" style="box-shadow: 0 0">
    <img style="margin-left: 0" src="https://img.shields.io/github/stars/mcndt/noteshare.space.svg?style=social&label=Star&maxAge=2592000">
  </a>
  <span style="display: block; margin: 0.8em 0 0 .5em"><strong>(Webapp)</strong></span>
</div>

Noteshare.space is a service for sharing end-to-end encrypted Markdown notes from Obsidian. (meaning you can securely share e.g. work-related notes!) I created this service for my own use, as I was tired of relying on third-party services like GitHub Gist to host my Obsidian notes to share with others.

Since then, I have operated Noteshare.space publicly as a way to give back to the Obsidian community.

You can read more about how I designed this software on [this blog post](/posts/how-to-e2e-encryption/). 

![preview](/media/noteshare/preview-frame.png)

Features include:
- No account or API keys required
- AES-256-CBC encryption
- Free hosting on Noteshare.space (fair use rate limiting applies)
- Self-host your encrypted notes for full control (noteshare is 100% open-source)
- Most markdown is supported (currently no image or note embeddings)


## [Toggl Track for Obsidian](https://github.com/mcndt/obsidian-toggl-integration) (2021-today)

<div style="display: flex">
  <img src="https://img.shields.io/github/v/tag/mcndt/obsidian-toggl-integration">
  <img style="margin-left: 0.5em" src="https://img.shields.io/github/downloads/mcndt/obsidian-toggl-integration/total">
  <a href="https://github.com/mcndt/obsidian-toggl-integration/stargazers" style="box-shadow: 0 0">
    <img style="margin-left: .5em" src="https://img.shields.io/github/stars/mcndt/obsidian-toggl-integration.svg?style=social&label=Star&maxAge=2592000">
  </a>
</div>

[GitHub](https://github.com/mcndt/obsidian-toggl-integration) 

As an avid user of both the Obsidian notes app and the Toggl time tracking service, I develop and maintain an open-source plugin integration Toggl into Obsidian, downloaded by over 6,500 users to date.

The plugin is self-documented using TypeScript and makes use of the official [Obsidian API](https://github.com/obsidianmd/obsidian-api) and The [Toggl and Toggl Reports API](https://github.com/toggl/toggl_api_docs). Custom views are written in the Svelte 3 framework.

![Demo](/media/obsidian-toggl-demo.gif)

Click [here](obsidian://show-plugin?id=obsidian-toggl-integration) to open the plugin in your Obsidian client.

## [blockcolors.app](https://blockcolors.app) (2021, inactive)

I started [blockcolors.app](https://blockcolors.app) as a creative outlet during my thesis year in university. The app lets users discover new combinations of building blocks in Minecraft, save their favorite palettes, and share palettes with friends using share links. 

The representative colors of each Minecraft texture were extracted in Python using the PIL and skimages libraries and an algorithm I wrote based on the [median cut algorithm](https://en.wikipedia.org/wiki/Median_cut) used in the GIF image standard.

The web app is built using SvelteKit and Tailwind, and is deployed with [Cloudflare](https://pages.cloudflare.com/) for fast worldwide access at the edge As a Jamstack app, all logic runs either client side or is deployed as a Coudflare Worker.

![Palette builder](/media/blockcolorsapp/blockcolors1.png)
![Palette viewer](/media/blockcolorsapp/blockcolors2.png)
![Palette gallery](/media/blockcolorsapp/blockcolors3.png)