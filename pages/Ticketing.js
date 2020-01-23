let baseClass = require('./BaseClass');
let hotelDetailsPage = require('./HotelDetails');



let ticketingPage = function () {


    var hotelnameondetailspage = '';
    var hotelnameonticketgpage = '';

    let hotelname = element(by.xpath("//section[@id='vacationSummary']/ul"));

    this.ValidateHotelName = function () {
        hotelname.getAttribute('data-hotelname').then(function(text){
            hotelnameonticketgpage = text;
            console.log("Hotel Name appearing on Ticketing page is:-- " + hotelnameonticketgpage);
                baseClass.SwitchtoSpecifiedTab(2);
                hotelDetailsPage.HotelNameonHotealDetailsPage().then(function(text1){
                    hotelnameondetailspage = text1;
                    console.log("Hotel Name appearing on HotelDetails page is:-- " + hotelnameondetailspage);
                    if (hotelnameondetailspage === hotelnameonticketgpage) {

                        console.log("=======: Hotel Name on both the pages appeaing same :======");
                    }
                    else {
                        console.log("=======: Hotel Name on both the pages are not appeaing same :======");
                    }
                })
            
        })
        baseClass.pause(3000);

    }


};

module.exports = new ticketingPage();
