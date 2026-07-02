# MMM-DailyDilbert
A module for MagicMirror<sup>2</sup> that displays a random Dilbert strip.

<img src="dilbert.png"></img>

> **Note:** Dilbert ended on 2023-03-12 and the original `dilbert.com` is gone,
> so there is no longer a "daily" strip to fetch. This module now pulls a
> **random** strip from the public [Dilbert archive](https://github.com/jvarn/dilbert-archive)
> (1989–2023), which links to copies preserved on the Internet Archive's
> Wayback Machine.

## Dependencies
  * A [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror) installation
  * [node-fetch](https://github.com/node-fetch/node-fetch) npm package

## Installation
  1. Clone this repo into your `modules` directory.
  2. Create an entry in your `config.js` file to tell this module where to display on screen.
  3. Run `npm install node-fetch@2` inside the module directory.
  
 **Example:**
```
 {
    module: 'MMM-DailyDilbert',
	position: 'bottom_bar',
	config: {
		updateInterval : 36000000
	}
 },
```

## Config
| **Option** | **Description** |
| --- | --- |
| `updateInterval` | How often to rotate to a new random strip (in ms). Default is `36000000` (10 hours). Minimum enforced value is `60000` (1 minute). |

Heavily inspired by the awesome MagicMirror plugin [DailyXKCD](https://github.com/Blastitt/DailyXKCD).
