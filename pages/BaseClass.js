let baseClass = function () {

    let parentwindow;

    this.get = function (URL) {
        browser.get(URL);
    };


    this.pause = function (sleepTime) {
        browser.sleep(sleepTime);
    };

    this.SwitchtoSpecifiedTab = function(tabname){
        let windowHandles = browser.getAllWindowHandles();
        windowHandles.then(function(handles){
            if(tabname === 1)
            {
                parentwindow = handles[0];
                browser.switchTo().window(parentwindow).then(function(){
                    console.log("========: Cursor Focus Now On HomePage :=======");
                });
            }
            else if(tabname === 2)
            {
                hoteldetailtab = handles[1];
                browser.switchTo().window(hoteldetailtab).then(function(){
                    console.log("========: Cursor Focus Now On HotelDetails Page :=======");
                });
            }
            
            else if(tabname === 3)
            {
                ticketingtab = handles[2];
                browser.switchTo().window(ticketingtab).then(function(){
                    console.log("========: Cursor Focus Now On Ticketing Page :=======");
                });
            }

        });

    }

    







};


module.exports = new baseClass();   