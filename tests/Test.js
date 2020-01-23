let baseClass = require('../pages/BaseClass');
let homePage = require('../pages/HomePage');
let hotelSelectionPage = require('../pages/HotelSelection');
let hotelDetailsPage = require('../pages/HotelDetails');
let ticketingPage = require('../pages/Ticketing');


describe('Script for search the top rated hotels', function () {

    var hotelnameondetailspage = '';
    var hotelnameonticketgpage = '';

    it('Launching the website', function () {

        baseClass.get('https://www.ab-in-den-urlaub.de')
        homePage.closeCookiesbar();
        homePage.enterTravelDestination();
        homePage.enterTravelDestination1('Sizilien');
        baseClass.pause(5000);
        homePage.travelPlace();

        homePage.travelStartDate('6', '6', '2020');
        homePage.travelEndDate('13', '6', '2020');
        homePage.submitButton();

        hotelSelectionPage.startDate('13', '6', '2020');
        hotelSelectionPage.endDate('20', '6', '2020');
        hotelSelectionPage.submitButton();

        hotelSelectionPage.fourStartRadioButton();
        hotelSelectionPage.bestReviewRating();
        hotelSelectionPage.waitForHotelsDealLoadCompletly();

        hotelSelectionPage.selectDropdownbyIndex('2');
        baseClass.pause(2000);
        hotelSelectionPage.mostExpensiveHotelOffer();

        /*
        For moving to the specific table Please provide the input as mentioned below:
        for DetailsTab pass 2.
        for TicketingTab pass 3.
        */
        baseClass.SwitchtoSpecifiedTab(2);
        hotelDetailsPage.waitForTimeRangeSliderVisible();
        hotelDetailsPage.SelectDepartureTimeArrival();
        hotelDetailsPage.SelectDepartureTimeReturnJourney();
        hotelDetailsPage.waitForDealsVisibleAfterFilter();
        hotelDetailsPage.directFlightOptions();
        hotelDetailsPage.VerifiedFlightTimeinRange();

        hotelDetailsPage.ClickForBookingButton();
        baseClass.SwitchtoSpecifiedTab(3);
        ticketingPage.ValidateHotelName();
    });

});
