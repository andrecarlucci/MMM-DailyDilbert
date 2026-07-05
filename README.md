# MMM-DailyDilbert
A module for MagicMirror<sup>2</sup> that displays a random Dilbert strip.

<img src="dilbert.png"></img>

> **Note:** Dilbert ended on 2023-03-12 and the original `dilbert.com` is gone,
> so there is no longer a "daily" strip to fetch. This module now pulls a
> **random** strip from the public [Dilbert archive](https://github.com/jvarn/dilbert-archive)
> (1989–2023), which links to copies preserved on the Internet Archive's
> Wayback Machine.

## Dependencies
  * A [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror) installation (Node 18+, which provides a global `fetch`)

## Installation
  1. Clone this repo into your `modules` directory.
  2. Create an entry in your `config.js` file to tell this module where to display on screen.
  
 **Example:**
```
 {
    module: 'MMM-DailyDilbert',
	position: 'bottom_bar',
	config: {
		updateInterval : 36000000,
		scale : 100
	}
 },
```

## Config
| **Option** | **Description** |
| --- | --- |
| `updateInterval` | How often to rotate to a new random strip (in ms). Default is `36000000` (10 hours). Minimum enforced value is `60000` (1 minute). |
| `scale` | Size of the comic image as a percentage. Default is `100`. Use values above `100` to make it bigger or below to make it smaller (e.g. `150` or `75`). |

Heavily inspired by the awesome MagicMirror plugin [DailyXKCD](https://github.com/Blastitt/DailyXKCD).
