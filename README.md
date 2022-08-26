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

Deferring Crisp loading is ossible, for instance, to display the chat after a login screen or custom button.

```javascript
import { Crisp } from "crisp-sdk-web";

Crisp.configure(WEBSITE_ID, {
  autoload: false
});

// Crisp.load()
```

Then, you can include Crisp using `Crisp.load()`. Note that Methods such as `Crisp.chat.open()` or  `Crisp.chat.show()` are implicitly calling the loading method.

## Identity Managemnet

You may attach user information so your customers don't need to manually fill their email address. Providing custom data is possible as well.

```javascript

Crisp.user.setEmail("john.doe@gmail.com");
Crisp.user.setNickname("John Doe");

Crisp.session.setData({
  user_id : "123456",
  plan : "free"
});
```

## Pushing Events

Crisp allows pushing custom events. Those events can then be used in order to trigger automated campaigns or bot scenarios.

```javascript

Crisp.session.pushEvent("signup");

// Or with custom parameters
Crisp.session.pushEvent("purchase", {
  price: 66.66,
  item: "XXXX_XXXX"
});
```

## Session Continuity

Crisp sessions are relying on Cookies. If you want Crisp sessions to be persisted on a user basis, you can use the tokenId feature. We are strongly recommending having a look to our documentation before enforcing session continuity.

```javascript
import { Crisp } from "crisp-sdk-web";

Crisp.configure(WEBSITE_ID, {
  autoload: false
});

// await login();

Crisp.setTokenId("A_VERY_UNIQUE_AND_SECURE_TOKEN");
Crisp.user.setEmail("john.doe@gmail.com");
Crisp.user.setNickname("John Doe");

```

## Available Methods

#### Configuration

##### Crisp.configure(WEBSITE_ID, options)

Different options are available for `Crisp.configure(WEBSITE_ID, options)`:

- autoload: Autoload Crisp once Crisp is configured. Default: `true`
- tokenId: Session continuty token. Default: `null`
- sessionMerge: Enables session merge. Default: `false`
- cookieDomain: Enforce a custom domain for Cookie storage. Default: `null`
- cookieExpire: Enforce a custom expire time for Cookie storage. Default: `null`
- lockMaximized: Prevents chatbox from being closed. Default: `false`
- lockFullview: Enforces chatbox fullscreen mode. Default: `false`

For instance, the following code will open Crisp in fullscreen and will prevent it from being closed:

```javascript
Crisp.configure(WEBSITE_ID, {
  lockMaximized: true,
  lockFullview: true
});
```

##### Crisp.load()

`Crisp.load()` will include the Chatbox manually. This methods needs to be used if autoload is disabled.

##### Crisp.setTokenId(tokenID)

You will need to call `Crisp.setTokenId(tokenID)` to enable session continity.

##### Crisp.setZIndex(zIndex)

For instance `Crisp.zIndex(99999)` will update the chatbox windows Z-index.

##### Crisp.setColorTheme(color)

`Crisp.setColorTheme("green")` will set the chatbox color to green. The following colors are available

`default`, `amber`, `black`, `blue`, `blue_grey`, `light_blue`, `brown`, `cyan`, `green`, `light_green`, `grey`, `indigo`, `orange`, `deep_orange`, `pink`, `purple`, `deep_purple`, `red`, `teal`

##### Crisp.setHideOnAway(enabled)

`Crisp.setHideOnAway(true)` will hide the Crisp chatbox when no one is available to answer.

##### Crisp.setHideOnMobile(enabled)

`Crisp.setHideOnMobile(true)` will hide the Crisp chatbox on mobile.

##### Crisp.setPosition(position)

`Crisp.setPosition("left")` will switch the Crisp chatbox position to the left.

##### Crisp.setAvailabilityTooltip(enabled)

`Crisp.setAvailabilityTooltip(false)` will hide the Crisp chatbox availability tooltip.

##### Crisp.setVacationMode(enabled)

`Crisp.setVacationMode(true)` will hide completely hide the Crisp chatbox.

##### Crisp.muteSound(enabled)

`Crisp.muteSound(true)` will hide mute notification sounds.

##### Crisp.toggleOperatorCount(enabled)

`Crisp.toggleOperatorCount(true)` will stop displaying the operator count.