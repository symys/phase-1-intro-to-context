// Your code here
function createEmployeeRecord(arr){
    let employee = {
        firstName:  arr[0],
        familyName: arr[1],
        title:      arr[2],
        payPerHour: arr[3],
        timeInEvents:   [], 
        timeOutEvents:  [], 
    };
    return employee;
}

function createEmployeeRecords(arrOfArr){
    let employeeRecords = []

    for (let i=0; i < arrOfArr.length; i++){
        employeeRecords.push(createEmployeeRecord(arrOfArr[i]))
    }
    
    return employeeRecords
}

function createTimeInEvent(employeeObj, dateStamp){
    //given data YYYY-MM-DD HHMM so we need to split this
    let obj = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.split(' ')[1]),  
        date: dateStamp.split(' ')[0],
    }

    employeeObj.timeInEvents.push(obj)
    return employeeObj

}

function createTimeOutEvent(employeeObj, dateStamp){
    let obj = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.split(' ')[1]),  
        date: dateStamp.split(' ')[0],
    }

    employeeObj.timeOutEvents.push(obj)
    return employeeObj
}

function hoursWorkedOnDate(employeeObj, date){
    let hours; 

    for (let i=0; i<employeeObj.timeInEvents.length; i++){
        if (employeeObj.timeInEvents[i].date === date){
            if (employeeObj.timeOutEvents[i].date === date){
                hours = employeeObj.timeOutEvents[i].hour - employeeObj.timeInEvents[i].hour
            }
        }
    }
    //console.log(hours)
    //hours should be divided to 100 because given date like that 0900 or 1700. 
    //there is no ":" between hours and minutes
    return hours/100
}

function wagesEarnedOnDate(employeeObj, date){
    return(hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour)
}

function allWagesFor(employeeObj){
    let allPayArr = [];
    let allDateArr = [];
    let totalPay = 0;

    //this gives us all worked date
    for (let i = 0; i < employeeObj.timeInEvents.length; i++){
        allDateArr.push(employeeObj.timeInEvents[i].date)
    }

    allDateArr.map((date) => {
        //this gives us all pay for each worked date
        allPayArr.push(wagesEarnedOnDate(employeeObj, date))
    })

    //this provides us find total pay
    //return allPayArr.reduce((prev, nextValue) => prev + nextValue)
    allPayArr.forEach((pay) => totalPay += pay)
    return totalPay

}

function calculatePayroll(employeesArr){
    let totalPayArr = [];
    let totalPay = 0;

    employeesArr.forEach((employee) => totalPayArr.push(allWagesFor(employee)))

    totalPayArr.forEach((pay) => totalPay += pay);

    return totalPay;
}