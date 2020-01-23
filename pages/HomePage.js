let baseClass = require('./BaseClass');
let homePage = function () {

  let cookiesbarOK_button=element(by.xpath("//*[@id='CybotCookiebotDialogBodyButtonAccept']"));
  let traveldestination_inputbox = element(by.xpath('(//input[@id="idestflat"])[1]'));
  let traveldestination_inputbox1 = element(by.xpath('(//input[@id="idestflat"])[2]'));
  let travelplacelink = element(by.xpath("//div[@class='aiduac-wrapper destinations aiduac-open']//ul[@class='aiduac-group area']//ul//a[@class='aiduac-response-element']"));

  let traveldestination_region = element(by.css(".datepicker-trigger"));
  let travelenddate = element(by.xpath("//div[@class='datepicker-input-wrapper datepicker-input-wrapper-end']//div[@class='datepicker-trigger']"));
  let submitbutton = element(by.xpath("//input[@id='submit']"));
  let DatepickerNextButton = element(By.xpath("//span[@class='month-button month-button-next icon-arrow-right-bold']"));


  this.closeCookiesbar = function () {
    cookiesbarOK_button.click();
  };


  this.enterTravelDestination = function () {
    traveldestination_inputbox.click();
  };

  this.enterTravelDestination1 = function (travelDestination) {
    traveldestination_inputbox1.sendKeys(travelDestination);
  };


  this.travelPlace = function () {
    travelplacelink.click();
  };

  this.selectRegion = function (datefrom) {
    traveldestination_region.sendKeys(datefrom)
  };

  this.end = function (dateend) {

    traveldestination_end.sendKeys(dateend)
  };

  this.Searchoptions = function () {
    submitbutton.click();
  }

  this.travelStartDate = function (dDay, dMonth, dYear) {
    let monthdiff = 0;  // Variable to store month difference
    let today = new Date(); // Variable to store today's date
    let cMonth = parseInt(today.getMonth()); // Variable to store current month
    console.log("Value in cMonth Variable :"+cMonth)
    
    if(cMonth === 0)
    {
      cMonth = cMonth +1;
      console.log("Value for cMonth is Zero Hence adding 1 into values:" +cMonth);
    }

    if (cMonth > dMonth) {   // if departure date is in next year than add 11 to the departure month
      monthdiff = parseInt(dMonth) + 11 - cMonth;
    }
    else {
      monthdiff = dMonth - cMonth;
    }
    console.log("Value in Today variable: "+today);
    console.log("Current Month is: " + cMonth);
    console.log("Request month is: " + dMonth);
    console.log("Difference is: " + monthdiff);

    traveldestination_region.click();
    while (monthdiff > 0) {
      DatepickerNextButton.click();
      baseClass.pause(1000);
      monthdiff = monthdiff - 1;
    }
    console.log("Now the value in Difference is: " + monthdiff);
    let DepartDate = element(By.xpath("//div[@class='month month-" + (dMonth - 1) + " year-" + dYear + "']//td[contains(@class,'day day-" + dDay + "')][contains(text(),'" + dDay + "')]"));


    DepartDate.click();
    baseClass.pause(2000);
  }



  this.travelEndDate = function (dDay, dMonth, dYear) {

    baseClass.pause(2000);
    let DepartDate = element(By.xpath("//div[@class='month month-" + (dMonth - 1) + " year-" + dYear + "']//td[contains(@class,'day day-" + dDay + "')][contains(text(),'" + dDay + "')]"));
    DepartDate.click();
    baseClass.pause(2000);
  }

  this.submitButton = function () {
    submitbutton.click();
  }




};
module.exports = new homePage();