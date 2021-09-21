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

            case 2:
                return 'Intransit'

            case 3:
                return 'Received'

            case 4:
                return 'Completed'

            case 5:
                return 'Cancelled'

            default:
                return 'Error'

        }
    }

}
export default parseStatus;