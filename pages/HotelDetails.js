let baseClass = require('./BaseClass');


let hotelDetailsPage = function () {


    var filterMinValue;
    var filterMaxValue;
    var flightDepartureStartLimit;
    var flightDepaurtureEndLimit;
   


    let departuretimearrival_lower = element(by.xpath("//div[@id='departureTimeRange']//div[@class='noUi-handle noUi-handle-lower']"));
    let departuretimearrival_upper = element(by.xpath("//div[@id='departureTimeRange']//div[@class='noUi-handle noUi-handle-upper']"));

    let departuretimereturn_upper = element(by.xpath("//div[@id='returnTimeRange']//div[@class='noUi-handle noUi-handle-upper']"));
    let departuredirectfly = element(by.xpath("//section[@id='skeletonOffers']/section[@class='skeleton-offers']/article/div//div[@class='duration-departure']/div/span[2]"))
    let arrivaldirectfly = element(by.xpath("//section[@id='skeletonOffers']/section[@class='skeleton-offers']/article/div//div[@class='duration-return']/div/span[2]"))
    let departuremintime = element(by.css("#departureTimeFilterSkeleton div span[class='time-min']"));
    let departuremaxtime = element(by.css("#departureTimeFilterSkeleton div span[class='time-max']"));
    let firstresultdepaturetime = element(by.xpath("//section[@id='skeletonOffers']/section[@class='skeleton-offers']/article[1]/div//div[@class='duration-departure']/div/span[1]"));

    let gotobookingbutton = element(by.xpath("//section[@id='skeletonOffers']/section[@class='skeleton-offers']/article[1]/div//a[@class='button-next link']"));
    let bookingbuttontext = element(by.xpath("//section[@class='skeleton-offers']/article[1]"));
    let hoteldealdisplayarea = element(by.xpath("//section[@class='section_skeletonOffers']"));
    let footer = element(by.xpath("//div[@id='departureTimeFilterSkeleton']/div[@class='time-footer']"));

    let checkavailabilitybutton = element(by.xpath("//section[@id='skeletonOffers']/section[@class='skeleton-offers']/article[1]//div/button"));
    let offerstillavailablearea = element(by.xpath("//section[@id='skeletonOffers']/section[@class='skeleton-offers']/article[@class='success  special-organizer']"));
    let hotenameondetailspage = element(by.xpath("//div[@class='hotel-name-wrapper']//div/div"));

    this.waitForTimeRangeSliderVisible = function () {
        let EC = ExpectedConditions;
        let condition = EC.elementToBeClickable(departuretimearrival_lower);
        browser.wait(condition, 60000);
    };

    this.waitForDealsVisibleAfterFilter = function () {
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf(hoteldealdisplayarea, 60000));
    };



    this.SelectDepartureTimeArrival = function () {
        browser.actions()
            .mouseDown(departuretimearrival_lower)
            .mouseMove({ x: 40, y: 0 }) 
            .mouseUp()
            .perform();

        browser.actions()
            .mouseDown(departuretimearrival_upper)
            .mouseMove({ x: -30, y: 0 })
            .mouseUp()
            .perform();
        browser.sleep(1000);

    };

    this.SelectDepartureTimeReturnJourney = function () {

        browser.actions()
            .mouseDown(departuretimereturn_upper)
            .mouseMove({ x: -120, y: 0 }) 
            .mouseUp()
            .perform();
        // browser.sleep(30000);
    };

    this.directFlightOptions = function () {
        var departure = 0;
        var arrival = 0;
        element.all(by.xpath("//section[@id='skeletonOffers']/section[@class='skeleton-offers']/article")).count().then(function (size) {
            console.log("--------: Total results display on page :-------- " + size);

            for (var i = 1; i <= size; i++) {
                element(by.xpath("//section[@class='skeleton-offers']/article[" + i + "]/div//div[@class='duration-departure']/div/span[2]")).getText().then(function (dirdeptflug) {
                    console.log("----: Checking Directflug is Available in Departure Journey :-------- " + dirdeptflug);
                    browser.sleep(1000);
                    if (dirdeptflug.endsWith('Direktflug')) {
                        departure = departure + 1;
                        //console.log("value in departure: " + departure);
                    }
                });
            }
        }).then(function () {
            console.log("-----: Total Count of Direct Fly Option Available in Depature Journey :------ " + departure);
        });


        element.all(by.xpath("//section[@id='skeletonOffers']/section[@class='skeleton-offers']/article")).count().then(function (size) {
            for (var i = 1; i <= size; i++) {
                element(by.xpath("//section[@class='skeleton-offers']/article[" + i + "]/div//div[@class='duration-return']/div/span[2]")).getText().then(function (dirarrflug) {
                    console.log("----: Checking Directflug is Available in Arrival Journey  :-------- " + dirarrflug);
                    browser.sleep(1000);
                    if (dirarrflug.endsWith('Direktflug')) {
                        arrival = arrival + 1;
                        // console.log("value in arrival: " + arrival);
                    }

                });
            }
        }).then(function () {
            console.log("-----: Total Count of Direct Fly Option Available in Return Journey :------ " + arrival);
        });
        browser.sleep(1000);
    };

    this.VerifiedFlightTimeinRange = () => {
        var firstFlightDepartureTime = element.all(by.xpath("//div[@class='duration-departure']//div//span[1]")).get(0);
        footer.getText().then(function (text) {
            var requiredValues = text.split("\n");
            filterMinValue = requiredValues[0];
            filterMaxValue = requiredValues[1];
        })

        firstFlightDepartureTime.getText().then(function (text) {
            var afterSplit = text.split('U');
            var requiredString = afterSplit[0].split('-');
            flightDepartureStartLimit = requiredString[0].trim();
            flightDepaurtureEndLimit = requiredString[1].trim();

            console.log("filterMinValue: " + filterMinValue);
            console.log("filterMaxValue: " + filterMaxValue);
            console.log("flightDepartureStartLimit: " + flightDepartureStartLimit);
            console.log("flightDepaurtureEndLimit: " + flightDepaurtureEndLimit);

            if ((flightDepartureStartLimit > filterMinValue) && (flightDepaurtureEndLimit < filterMaxValue)) {
                console.log("===========Flight timings lies between applied filter============");
            }
            else {
                console.log("===========Flight timings doesn't lie between applied filter===========");
            }
        })
    };

    this.ClickForBookingButton = () => {

        bookingbuttontext.getAttribute('class').then(function (text) {
            console.log("Value appearing for class attribute inside ClickForBookingButton function is: " + text);
            if (text.startsWith('offer')) {
                checkavailabilitybutton.click().then(function () {
                    var EC = protractor.ExpectedConditions;
                    browser.wait(EC.presenceOf(offerstilllavailablearea, 60000));

                }).then(function () {

                    var EC = protractor.ExpectedConditions;
                    browser.wait(EC.presenceOf(gotobookingbutton, 60000)).then(function () {
                        gotobookingbutton.click();
                    });

                })
            }
            else if (text.startsWith('success')) {
                gotobookingbutton.click();
            }
        })
    };

    this.HotelNameonHotealDetailsPage = function () {       
          return hotenameondetailspage.getText();
      
    };




};

module.exports = new hotelDetailsPage();