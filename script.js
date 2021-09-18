function reverseString(str){

    // var listOfChars = str.split(''); //['h','e','l','l','o']
    // var reverListOfChars = listOfChars.reverse();
    // var reversedStr = reverListOfChars.join();
    return str.split('').reverse().join('') ;
}

function isPalindrome(str)
{
    var reversed = reverseString(str);
    return(str === reversed);
}

function convertDateToString(date){
    var dateStr = {day:'',month:'',year:''};

    //convert date to string, adding '0' will convert the day to string automatically
    if(date.day<10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
//convert month to string
    if(date.month<10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

var date = {
    day:2,
    month:11,
    year:2020
};

function getAllDateFormats(date){
    var dateStr = convertDateToString(date);
    // console.log(dateStr)

    var ddmmyyyy = dateStr.day+dateStr.month+dateStr.year;
    var mmddyyyy = dateStr.month+dateStr.day+dateStr.year;
    var yyyymmdd = dateStr.year+dateStr.month+dateStr.day;
    var ddmmyy = dateStr.day+dateStr.month+dateStr.year.slice(-2);
    var mmddyy = dateStr.month+dateStr.day+dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2)+dateStr.month+dateStr.day;

    return[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);
    var PalindromeHai =  false;

    for(var i=0;i<listOfPalindromes.length;i++){
        if(isPalindrome(listOfPalindromes[i])){
            PalindromeHai=true;
            break;
        }
    }
    return PalindromeHai;
}

console.log(checkPalindromeForAllDateFormats(date));