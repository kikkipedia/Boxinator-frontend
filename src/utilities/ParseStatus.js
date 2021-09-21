//Parse the shipments status code from the API link received, then returns the string equivalent to that code
const parseStatus = (stausAPILink) => {
    const statusString = JSON.stringify(stausAPILink)
    if (statusString === undefined) {
        console.log("Link empty")
        return 'EMPTY'
    } else if (statusString.charAt(statusString.length - 2) === 1) {
        return 'Created'
    }

    else {
        let sts = statusString.charAt(statusString.length - 2)
        let statusCode = parseInt(sts);
        switch (statusCode) {
            case 1:
                return 'Created'
                break;
            case 2:
                return 'Intransit'
                break;
            case 3:
                return 'Received'
                break;
            case 4:
                return 'Completed'
                break;
            case 5:
                return 'Cancelled'
                break;
            default:
                return 'Error'

        }
    }

}
export default parseStatus;