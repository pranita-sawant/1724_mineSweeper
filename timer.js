var min, sec, ms, timer_count, malt, salt, msalt;

var timer = {
    start: function () {
        ms = 0;
        sec = 0;
        min = 0;
        timer_count = setInterval(function () {
            if (ms == 100) {
                ms = 0;
                if (sec == 60) {
                    sec = 0;
                    min++;
                } else {
                    sec++;
                }
            } else {
                ms++;
            }

            malt = timer.pad(min);
            salt = timer.pad(sec);
            msalt = timer.pad(ms);

            timer.update(malt + ":" + salt);
        }, 10);
    },

    stop: function () {
        clearInterval(timer_count);
    },

    update: function (txt) {
        //console.log(txt)
        if (playing == true) {
            var temp = document.getElementById("dispTimer");
            temp.firstElementChild.textContent = txt;
        } else {
            timer.stop();
        }
        //console.log(temp);
    },

    pad: function (time) {
        var temp;
        if (time < 10) {
            temp = "0" + time;
        } else {
            temp = time;
        }
        return temp;
    }
}