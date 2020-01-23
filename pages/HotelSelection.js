let baseClass = require('./BaseClass');

let hotelSelectionPage = function () {

    let traveldestination_region = element(by.css(".datepicker-trigger"));
    let submitbutton = element(by.xpath("//input[@id='submit']"));
    let fourstartradiobutton = element(by.xpath("//input[@id='optCategory2']"));
    let hotelSortingDropdownButton = element(by.css("#hotelsorting"));
    let traveldestination = element(by.xpath('//div[@class="ac-item location standard-version show-layer-on"]//input[@id="idestflat"]'));
    let bestreviewrating = element(by.xpath("//div[@class='filter filter-kundenbewertung']//label[5]"));
    let offerbutton_mostexpensivehotel = element(by.xpath("//section[@id='hotelList']//article[1]//div[2]//div[3]/a"));
    let hoteldealdisplayarea = by.xpath("//section[@id='hotelList']");


    this.startDate = function (dDay, dMonth, dYear) {
        traveldestination_region.click();
        baseClass.pause(2000);
        let DepartDate = element(By.xpath("//div[@class='month month-" + (dMonth - 1) + " year-" + dYear + "']//td[contains(@class,'day day-" + dDay + "')][contains(text(),'" + dDay + "')]"));
        DepartDate.click();
        baseClass.pause(2000);
    }

    this.endDate = function (dDay, dMonth, dYear) {
        baseClass.pause(2000);
        let DepartDate = element(By.xpath("//div[@class='month month-" + (dMonth - 1) + " year-" + dYear + "']//td[contains(@class,'day day-" + dDay + "')][contains(text(),'" + dDay + "')]"));
        DepartDate.click();
        baseClass.pause(2000);
    }
    this.submitButton = function () {
        submitbutton.click();
    }
    this.fourStartRadioButton = function () {
        fourstartradiobutton.click();
    }

    this.travelDestination = function (text) {
        traveldestination.sendKeys(text)
    }

    this.bestReviewRating = function () {
        bestreviewrating.click();
    };

    this.waitForHotelsDealLoadCompletly = function () {
        let EC = ExpectedConditions;
		let condition = EC.elementToBeClickable(offerbutton_mostexpensivehotel)
		browser.wait(condition, 30000)
    };

   



    this.selectDropdownbyIndex = function (optionNum) {

        if (optionNum) {
            var options = hotelSortingDropdownButton.all(by.tagName('option'))
                .then(function (options) {
                    options[optionNum].click();
                });
        }

    };

    this.mostExpensiveHotelOffer = function () {
        offerbutton_mostexpensivehotel.click();
    }
};

module.exports = new hotelSelectionPage();