var request = require('request');
var NodeHelper = require("node_helper");
var cheerio = require("cheerio");

module.exports = NodeHelper.create({
	
	start: function() {
		console.log("Starting node helper: " + this.name);
	},
	
	socketNotificationReceived: function(notification, payload) {
		var self = this;
		console.log("Dilbert -> Notification: " + notification + " Payload: " + payload);
		
		if(notification === "GET_COMIC") {
			
			var url = "http://dilbert.com";
			
			console.log('-> Dibert request');
			request(url, function (error, response, body) {
				var $ = cheerio.load(body);
				var src = $(".img-comic").attr('src');
				console.log('Dibert -> ' + src);
				self.sendSocketNotification("COMIC", {
					img : src
				});
			});
			return;
		}
	},
});