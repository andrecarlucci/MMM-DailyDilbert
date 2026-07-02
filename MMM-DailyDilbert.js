Module.register("MMM-DailyDilbert", {

    // Default module config.
    defaults: {
        updateInterval : 10000 * 60 * 60, // 10 hours
    },

    start: function() {
        Log.info(this.config);
        Log.info("Starting module: " + this.name);

        this.dailyComic = "";
        this.getComic();
        
        self = this;
        if(self.config.updateInterval < 60000) {
			self.config.updateInterval = 60000;
		}			
		
        setInterval(function() {
            self.getComic();
        }, self.config.updateInterval);
    },

    // Define required scripts.
    getScripts: function() {
        return [];
    },

    getStyles: function() {
        return ["dilbert.css"];
    },

    getComic: function() {
        Log.info("Dilbert: Getting comic.");
        this.sendSocketNotification("GET_COMIC", {
            config: this.config
        });
    },

    socketNotificationReceived: function(notification, payload) {
        Log.info("Dilbert: socketNotificationReceived -> " + notification);
        if (notification === "COMIC") {
            Log.info("Dilbert: COMIC payload -> " + JSON.stringify(payload));
            if (!payload || !payload.img) {
                Log.error("Dilbert: COMIC notification had no img; nothing to show.");
                return;
            }
            this.dailyComic = payload.img;
            this.updateDom(1000);
        }
    },

    notificationReceived: function(notification, payload, sender) {
    },

    // Override dom generator.
    getDom: function() {
        Log.info("Dilbert: getDom -> dailyComic = '" + this.dailyComic + "'");
        var wrapper = document.createElement("div");

        if (!this.dailyComic) {
            Log.info("Dilbert: no comic loaded yet, rendering placeholder text.");
            wrapper.innerHTML = "Loading Dilbert...";
            return wrapper;
        }

        var comicWrapper = document.createElement("div");
        comicWrapper.className = "dilbert-container";

        var img = document.createElement("img");
        img.id = "dilbert-content";
        img.src = this.dailyComic;
		img.classList.add('dilbert-image');
        img.onload = function() {
            Log.info("Dilbert: image loaded OK -> " + img.src);
        };
        img.onerror = function() {
            Log.error("Dilbert: image FAILED to load -> " + img.src);
        };
		comicWrapper.appendChild(img);
        wrapper.appendChild(comicWrapper);
        return wrapper;
    }
});