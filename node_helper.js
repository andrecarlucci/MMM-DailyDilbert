// Node 18+ ships a global fetch, so no external dependency is needed.
var NodeHelper = require("node_helper");

// Dilbert ended on 2023-03-12 and dilbert.com is gone, so we pull a random
// strip from the public archive maintained at github.com/jvarn/dilbert-archive.
// Each year has a JSON file keyed by date; every entry carries an
// "originalimageurl" that points to a copy of the strip on the Wayback Machine.
const ARCHIVE_BASE = "https://raw.githubusercontent.com/jvarn/dilbert-archive/main/public/comics-data";
const FIRST_YEAR = 1989;
const LAST_YEAR = 2023;

module.exports = NodeHelper.create({

	start: function() {
		console.log("Starting node helper: " + this.name);
	},

	socketNotificationReceived: function(notification, payload) {
		var self = this;

		if(notification === "GET_COMIC") {
			self.getRandomComic();
			return;
		}
	},

	getRandomComic: function() {
		var self = this;

		var year = FIRST_YEAR + Math.floor(Math.random() * (LAST_YEAR - FIRST_YEAR + 1));
		var url = ARCHIVE_BASE + "/" + year + ".json";

		console.log("Dilbert -> fetching archive for " + year + ": " + url);

		fetch(url)
			.then(response => response.json())
			.then(comics => {
				var dates = Object.keys(comics);
				if (dates.length === 0) {
					throw new Error("No comics found for " + year);
				}

				var date = dates[Math.floor(Math.random() * dates.length)];
				var comic = comics[date];
				var img = comic.originalimageurl;

				console.log("Dilbert -> " + date + " -> " + img);

				self.sendSocketNotification("COMIC", {
					img: img,
					date: date,
					title: comic.title || ""
				});
			})
			.catch((error) => {
				console.log("Dilbert Fetch Error -> " + error);
			});
	},
});
