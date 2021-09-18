function reverseString(str) {

    // var listOfChars = str.split(''); //['h','e','l','l','o']
    // var reverListOfChars = listOfChars.reverse();
    // var reversedStr = reverListOfChars.join();
    return str.split('').reverse().join('');
}

function isPalindrome(str) {
    var reversed = reverseString(str);
    return (str === reversed);
}

function convertDateToString(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };

    //convert date to string, adding '0' will convert the day to string automatically
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    //convert month to string
    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}



function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);
    // console.log(dateStr)

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);
    var PalindromeHai = false;

    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            PalindromeHai = true;
            break;
        }
    }
    return PalindromeHai;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        //check for leap year
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) { //agar 31 day dia or month 04(4-1 =3 array mai) ,to day=1 ho jyega ot month change hokar next i.e 05(5-1 in array)
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
        ctr++;
        var PalindromeHaiKya = checkPalindromeForAllDateFormats(nextDate);
        if (PalindromeHaiKya) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];
}

function getPreviousDate(date) {
    day = date.day - 1;
    month = date.month;
    year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
        month--;
    }

    if (month === 0) {
        month = 12;
        year--;
        day = 31;
    } else if (month === 2) {
        if (isLeapYear) {
            day = 29;
        } else {
            day = 28;
        }
    } else {
        day = daysInMonth[month - 1];
    }

    return {
        day: day,
        month: month,
        year: year
    }

}

function getPreviousPalindromeDate(date) {
    ctr = 0;
    getPrevDate = getPreviousDate(date);

    while (1) {
        ctr++;
        var PalindromeHaiKya = checkPalindromeForAllDateFormats(getPrevDate);
        if (PalindromeHaiKya) {
            break;
        } else {
            getPrevDate = getPreviousDate(getPrevDate);
        }

        return [ctr, getPrevDate];
    }
}

var dateInput = document.querySelector("#input-date");
var showBtn = document.querySelector("#btn-show");
var result = document.querySelector("#result");


function clickHandler(e) {
    var bdayStr = dateInput.value;
    if (bdayStr != '') {
        var listOfDate = bdayStr.split('-'); //return array
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if (isPalindrome) {
            result.innerText = 'Yay! your birthday is a palindrome!🥳🥳'
        } else {
            var [ctr, nextDate] = getNextPalindromeDate(date);
            result.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} ,you missed it by ${ctr} days 😐!`
        }
    }
}

showBtn.addEventListener('click', clickHandler);