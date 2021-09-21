//Parse the shipments status code from the API link received, then returns the string equivalent to that code
const parsePackage = (APILink) => {
    const statusString = JSON.stringify(APILink)
    if (statusString === undefined) {
        return 'EMPTY'
    } else if (statusString.charAt(statusString.length - 2) === 1) {
        return 'Created'
    }

    else {
        let sts = statusString.charAt(statusString.length - 2)
        let packageCode = parseInt(sts);
        switch (packageCode) {
            case 1:
                return 'Basic'

            case 2:
                return 'Humble'

            case 3:
                return 'Deluxe'

            case 4:
                return 'Premium'

            default:
                return 'Error'

        }
    }

}
export default parsePackage;