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

## Identity Management

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

#### Chat

##### Crisp.chat.show()

`Crisp.chat.show()` will show the Crisp chat widget.

##### Crisp.chat.hide()

`Crisp.chat.hide()` will hide the Crisp chat widget.

##### Crisp.chat.open()

`Crisp.chat.open()` will open the Crisp chat widget.

##### Crisp.chat.close()

`Crisp.chat.close()` will close the Crisp chat widget.

##### Crisp.chat.unreadCount()

`var count = Crisp.chat.unreadCount()` will fetch unread the message count

##### Crisp.chat.isChatOpened()

`var isOpened = Crisp.chat.isChatOpened()` will return is the chat is opened.

##### Crisp.chat.isVisible()

`var isVisibleOpened = Crisp.chat.isVisible()` will return is the chat is visible.

##### Crisp.chat.onChatInitiated(callback)

```javascript
Crisp.chat.onChatInitiated(() => {
  // Executed once the chat was initiated from the user
})
```

##### Crisp.chat.onChatOpened(callback)

```javascript
Crisp.chat.onChatOpened(() => {
  // Executed once the chat was opened
})
```

##### Crisp.chat.onChatClose(callback)

```javascript
Crisp.chat.onChatOpened(() => {
  // Executed once the chat was opened
})
```

#### Message

##### Crisp.message.send(type, content)

Sends a message as visitor to conversation.

```javascript
// Example 1: send a text message
Crisp.message.send("text", "Hello there!");

// Example 2: send a file message
Crisp.message.send("file", { name: "Europa.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Europa-moon.jpg/600px-Europa-moon.jpg", type: "image/jpg" });

// Example 3: send an animation message
Crisp.message.send("animation", { url: "https://media.giphy.com/media/3oz8xPjPPvOwrGjip2/giphy.gif", type: "image/gif" });

// Example 4: send an audio message
Crisp.message.send("audio", { duration: 40, url: "https://storage.crisp.chat/users/upload/operator/aa0b64dd-9fb4-4db9-80d6-5a49eb84087b/d70935e1-c79e-4199-9568-944541657b78.webm", type: "audio/webm" });
```

##### Crisp.message.sendText(content)

Sends a text message as visitor to conversation.

```javascript
Crisp.message.sendText("Hello there!");
````

##### Crisp.message.sendFile(content)

Sends a file message as visitor to conversation.

```javascript
Crisp.message.sendFile("Hello there!", { name: "Europa.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Europa-moon.jpg/600px-Europa-moon.jpg", type: "image/jpg" });
````

##### Crisp.message.sendAnimation(content)

Sends a animation message as visitor to conversation.

```javascript
Crisp.message.sendAnimation("Hello there!", { url: "https://media.giphy.com/media/3oz8xPjPPvOwrGjip2/giphy.gif", type: "image/gif" });
````

##### Crisp.message.sendAudio(content)

Sends a audio message as visitor to conversation.

```javascript
Crisp.message.sendAudio("Hello there!", { duration: 40, url: "https://storage.crisp.chat/users/upload/operator/aa0b64dd-9fb4-4db9-80d6-5a49eb84087b/d70935e1-c79e-4199-9568-944541657b78.webm", type: "audio/webm" });
````

##### Crisp.message.show(type, content)

Shows a message as operator in local chatbox.

```javascript
// Example 1: show a text message
Crisp.message.show("text", "Can I help?!");

// Example 2: show a file message
Crisp.message.show("file", { name: "Europa.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Europa-moon.jpg/600px-Europa-moon.jpg", type: "image/jpg" });

// Example 3: show a picker message
Crisp.message.show("picker", { "id": "call-date", "text": "Pick your date!", "choices": [{ "value": "1", "label": "Today, 1:00PM.", "selected": false }, { "value": "2", "label": "Tomorrow, 3:45PM.", "selected": false }]});

// Example 4: show a field message
Crisp.message.show("field", { "id": "name-field", "text": "What is your name?", "explain": "Enter your name..." });
```

##### Crisp.message.showText(content)

Shows a text message as operator in local chatbox.

```javascript
Crisp.message.showText("Can I help?!");
```

##### Crisp.message.showText(content)

Shows a text message as operator in local chatbox.

```javascript
Crisp.message.showFile({ name: "Europa.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Europa-moon.jpg/600px-Europa-moon.jpg", type: "image/jpg" });
```

##### Crisp.message.showPicker(content)

Shows a text message as operator in local chatbox.

```javascript
Crisp.message.showPicker({ "id": "call-date", "text": "Pick your date!", "choices": [{ "value": "1", "label": "Today, 1:00PM.", "selected": false }, { "value": "2", "label": "Tomorrow, 3:45PM.", "selected": false }]});
```

##### Crisp.message.showField(content)

Shows a text message as operator in local chatbox.

```javascript
Crisp.message.showField({ "id": "call-date", "text": "Pick your date!", "choices": [{ "value": "1", "label": "Today, 1:00PM.", "selected": false }, { "value": "2", "label": "Tomorrow, 3:45PM.", "selected": false }]});
```

##### Crisp.message.markAsRead()

Marks all messages as read

```javascript
Crisp.chat.markAsRead();
```

##### Crisp.message.onMessageSent(callback)

```javascript
Crisp.chat.onMessageSent(() => {
  // Executed once a message is submitted by the visitor
})
```

##### Crisp.message.onMessageReceived(callback)

```javascript
Crisp.chat.onMessageReceived(() => {
  // Executed once a message is received by the visitor
})
```

##### Crisp.message.onMessageComposeSent(callback)

```javascript
Crisp.chat.onMessageComposeSent(() => {
  // Executed once a message compose event is submitted by the visitor
})
```

##### Crisp.message.onMessageComposeReceive(callback)

```javascript
Crisp.chat.onMessageComposeReceive(() => {
  // Executed once a message compose event is received by the visitor
})
```

#### User

##### Crisp.user.setNickname(nickname)

`Crisp.user.setNickname("John Doe")` will update user's name.

##### Crisp.user.setEmail(email, hmac)

`Crisp.user.setEmail("john.doe@gmail.com")` will update user's email.


`Crisp.user.setEmail("john.doe@gmail.com", HMAC)` will update user's email and mark the user as verified. 
Please check our documentation here if you want to use the session verification: https://docs.crisp.chat/guides/chatbox-sdks/web-sdk/identity-verification/

##### Crisp.user.setPhone(phone)

`Crisp.user.setPhone("0044346354635")` will update user's phone number.

##### Crisp.user.setAvatar(avatar)

`Crisp.user.setAvatar("https://pbs.twimg.com/profile_images/834424630630817795/TfyS4uXb_400x400.jpg")` will update user's avatar.

##### Crisp.user.setCompany(name, companyInformation)

Example 1: set user company name only:
```javascript
Crisp.user.setCompany("Stripe");
```

Example 2: set user company name and location:
```javascript
Crisp.user.setCompany("Stripe", {
  geolocation: {
    city: "San Fransisco",
    country: "US"
  }
});
```

Example 3: set all user company details:
```javascript
Crisp.user.setCompany("Stripe", {
  url: "https://stripe.com",
  description: "Payments infrastructure for the internet",
  employment: {
    title: "Product Manager"
  },
  geolocation: {
    city: "San Fransisco",
    country: "US"
  }
});
```

##### Crisp.user.getNickame()

`var nickname = Crisp.user.getNickname()` gets user's name.

##### Crisp.user.getEmail()

`var email = Crisp.user.getEmail()` gets user's email.

##### Crisp.user.getPhone()

`var phone = Crisp.user.getPhone()` gets user's phone.

##### Crisp.user.getAvatar()

`var avatar = Crisp.user.getAvatar()` gets user's avatar.

##### Crisp.user.getCompany()

`var company = Crisp.user.getCompany()` gets user's company.

##### Crisp.user.onNicknameChanged(callback)

```javascript
Crisp.user.onNicknameChanged(() => {
  // Executed once user's nickname is changed
})
```

##### Crisp.user.onEmailChanged(callback)

```javascript
Crisp.user.onEmailChanged(() => {
  // Executed once user's email is changed
})
```

##### Crisp.user.onPhoneChanged(callback)

```javascript
Crisp.user.onPhoneChanged(() => {
  // Executed once user's phone is changed
})
```

##### Crisp.user.onAvatarChanged(callback)

```javascript
Crisp.user.onAvatarChanged(() => {
  // Executed once user's avatar is changed
})
```

#### Session

##### Crisp.session.reset()

`Crisp.session.reset()` will reset the user's session.

##### Crisp.session.setSegments(segments, overwrite = false)

`Crisp.session.setSegments(["bug", "ios"])` will append `bug` and `ios` segments.

`Crisp.session.setSegments(["bug", "ios"], true)` will overwrite existing segments.

##### Crisp.session.setData(data)

Will add custom data to the current session.

```javascript
Crisp.session.setData({
  user_id : "123456",
  plan : "free"
});
```

##### Crisp.session.pushEvent(name, data)

Crisp allows pushing custom events. Those events can then be used in order to trigger automated campaigns or bot scenarios.

```javascript

Crisp.session.pushEvent("signup");

// Or with custom parameters
Crisp.session.pushEvent("purchase", {
  price: 66.66,
  item: "XXXX_XXXX"
});
```

##### Crisp.session.getData()

Will get custom data key

```javascript
var key = Crisp.session.getData("user_id");
```

##### Crisp.session.getIdentifier()

Will get current session identifier (session_id)

```javascript
var sessionId = Crisp.session.getIdentifier();
```

##### Crisp.session.onLoaded(callback)

```javascript
Crisp.session.onLoaded((sessionId) => {
  // Executed once the Crisp session is loaded

  console.log(sessionId);
})
```

#### Trigger

##### Crisp.trigger.run(name)

`Crisp.trigger.name("growth_hack")` will run the `growth_hack` trigger.
