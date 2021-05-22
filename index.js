// Your code here

let createEmployeeRecord = function(element) {
    return {
        firstName: element[0],
        familyName: element[1],
        title: element[2],
        payPerHour: element[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arrays) {
    return arrays.map(function(array){
        return createEmployeeRecord(array)
    })
}

let createTimeInEvent = function(employee, timeStamp) {
    let [date, hour] = timeStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })

    return employee
}

let createTimeOutEvent = function(employee, timeStamp) {
    let [date, hour] = timeStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })

    return employee
}

let hoursWorkedOnDate = function(employee, date) {
    let timeIn = employee.timeInEvents.find( function(e){
        return e.date === date
    })

    let timeOut = employee.timeOutEvents.find( function(e){
        return e.date === date
    })

    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date)
    let hourlyPay = employee.payPerHour
    return hoursWorked * hourlyPay
}

let allWagesFor = function(employee) {
    let dates = employee.timeInEvents.map( function(e) {
        return e.date
    })

    let wageTotal = dates.reduce(function(total, date){
        return total + wagesEarnedOnDate(employee, date)
    }, 0)

    return wageTotal
}

let findEmployeeByFirstName = function(array, firstName) {
    return array.find(function(employee){
        return employee.firstName === firstName
    })
}

let calculatePayroll = function(array) {
    return array.reduce(function(total, employee){
        return total + allWagesFor(employee)
    }, 0)
}

