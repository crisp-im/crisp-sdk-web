# Crisp SDK Web

[![NPM](https://img.shields.io/npm/v/crisp-api.svg)](https://www.npmjs.com/package/crisp-sdk-web) [![Downloads](https://img.shields.io/npm/dt/crisp-sdk-web.svg)](https://www.npmjs.com/package/crisp-sdk-web)

The Crisp SDK Web allows embedding Crisp chat widget using web frameworks such as React, Vue, or Angular. This SDK wraps the [$crisp](https://docs.crisp.chat/guides/chatbox-sdks/web-sdk/dollar-crisp/) methods and provides Typescript definitions.	 

Copyright 2022 Crisp IM SAS. See LICENSE for copying information.

* **😘 Maintainers**: [@baptistejamin](https://github.com/baptistejamin)

## Installation

`npm install --save crisp-sdk-web`

## Basic Implementation

To add Crisp on your website, you will first need to create an account from the [Crisp App](https://app.crisp.chat/initiate/signup/). 

Once you have your Crisp **Website ID**, you can then embbed Crisp in your app.

```javascript
import { Crisp } from "crisp-sdk-web";

Crisp.configure(WEBSITE_ID);

// Crisp will be displayed
```

## Manual loading

It is possible deferring Crisp loading, for instance, to display the chat after a login screen or custom button.

```javascript
import { Crisp } from "crisp-sdk-web";

Crisp.configure(WEBSITE_ID, {
  autoload: false
});

// Crisp.load()
```

Then, you can include Crisp using `Crisp.load()`. Note that Methods such as `Crisp.chat.open()` or  `Crisp.chat.show()` are implicitly calling the loading method. 
