Changelog
=========

## v1.1.2

### Bug Fixes

* Fixed broken named imports in SSR environments (Next.js, Remix, Vite/React Router) caused by `"type": "module"` making Node parse the UMD bundle as ESM. The UMD bundle is now emitted as `dist/crisp.umd.cjs` and an `exports` field routes ESM and CJS consumers to the correct build.

## v1.1.1

### New Features

* `Crisp.scenario.run` now accepts an optional second argument with custom variables (string, number or boolean values) forwarded to the workflow and available inside scenario blocks as `{{ key }}` templates.

## v1.1.0

### New Features

* Improved type descriptions across all SDK methods.
* Added JSDoc documentation to all classes and methods.

### Changes

* Migrated to ESLint 9 with `eslint-plugin-crisp`.
* Removed Prettier in favor of ESLint formatting rules.
* Updated TypeScript to 5.9.

## v1.0.29

### Changes

* Bumped package version.

## v1.0.28

### New Features

* Added the new `Crisp.chat.setOverlayView` method.
* Added the new `Crisp.scenario.run` method.

### Changes

* Renamed "Workflow" to "Scenario".
* Fixed company geolocation support and type reinforcements.

## v1.0.27

### Bug Fixes

* Fixed data validation check in `setData` method.

## v1.0.26

### Changes

* Added LICENCE file.

## v1.0.25

### Changes

* Code cleanup and style improvements.

## v1.0.24

### New Features

* Added the new `Crisp.message.setMessageText` method.

## v1.0.23

### Changes

* Method updates and fixes.

## v1.0.22

### Bug Fixes

* Fixed `setTokenId` typing (tokenId is now optional).

## v1.0.21

### Changes

* Added NPM publish provenance.
* Bumped Node versions.

## v1.0.20

### Bug Fixes

* Fixed cookie expiration issue.

## v1.0.19

### Changes

* Code cleanup.

## v1.0.18

### Changes

* Bumped package version.

## v1.0.17

### Changes

* Bumped package version.

## v1.0.16

### Changes

* Set `CarouselMessageTargets` as a string type.

## v1.0.15

### Changes

* Added missing exports.

## v1.0.14

### Bug Fixes

* Fixed bug where injected tokenId was not refreshed if Crisp was injected.

### Changes

* TypeScript style conformance.
* Export at definition and export for enums.

## v1.0.13

### New Features

* Added ability to customize Crisp client URL.

## v1.0.12

### New Features

* Added deferred loading support.

## v1.0.11

### New Features

* Added support for carousel messages.

## v1.0.10

### Changes

* Build script improvements.

## v1.0.9

### Changes

* Added build step to publish flow.

## v1.0.8

### Changes

* Improved NPM publish security as per recommendations.

## v1.0.7

### Bug Fixes

* Fixed autoload issues.

## v1.0.6

### Changes

* Added base GitHub Action workflows.

## v1.0.5

### Changes

* Documentation updates.

## v1.0.4

### Changes

* Bumped package version.

## v1.0.3

### Bug Fixes

* Fixed `setData` function was not sending payload.

### New Features

* Added the new `Crisp.setSafeMode` method.

## v1.0.2

### New Features

* Added `window.$crisp.get` for unread count.

## v1.0.1

### Bug Fixes

* Fixed `data.url` when data is unset.

## v1.0.0

### New Features

* Initial release of the Crisp Web SDK.
* Support for chat management (`Crisp.chat`).
* Support for user management (`Crisp.user`).
* Support for session management (`Crisp.session`).
* Support for message management (`Crisp.message`).
* Support for trigger management (`Crisp.trigger`).
