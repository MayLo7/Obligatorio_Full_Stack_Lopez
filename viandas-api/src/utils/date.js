
const getISODate = () => {
    const date = new Date().toISOString(); //string 2025-09-02T23:27:11.235Z
    //console.log(date.split("T")[0]);
    return date.split("T")[0]; //2025-09-20
}

const getLoggerDate = () => {
    const now = new Date().toISOString();
    const splittedDate = now.split("T"); //[2025-09-20, 21:30:10.235Z]
    const date = splittedDate[0] //2025-09-20
    const time = splittedDate[1].split(".")[0] //[21:30:10, 235Z] --> 21:30:10
    return `${date} ${time}`; //2025-09-20 21:30:10         
}

module.exports = { getISODate, getLoggerDate }


