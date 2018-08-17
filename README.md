# About

This is a little program I wrote when first testing out Google's new tool [Puppeteer](https://developers.google.com/web/tools/puppeteer/).
It takes a URL, runs it through a list of devices and saves the result as a screenshot, one for each device.

## Install

```sh
$ npm install
```

## Run program

```sh
$ URL=https://www.google.com/ node index.js
```

## Requirements

Expects a folder named **screenshots** in root.
