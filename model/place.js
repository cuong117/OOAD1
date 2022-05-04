class Place {
    #addressLine
    #locality
    #adminDistrict2
    #adminDistrict
    #fomattedAddress
    #name
    #havename

    constructor(addressLine, locality, adminDistrict2, adminDistrict, fomattedAddress, name) {
        this.#addressLine = addressLine ? addressLine : ""
        this.#locality = locality ? locality : "" 
        this.#adminDistrict = adminDistrict ? adminDistrict : ""
        this.#adminDistrict2 = adminDistrict2 ? adminDistrict2 : ""
        this.#fomattedAddress = fomattedAddress
        this.#havename = false
        if (name) {
            this.#name = name
            this.#havename = true
        }
        else if (addressLine) {
            this.#name = addressLine
        } else if (locality) {
            this.#name = locality
        } else if (adminDistrict2) {
            this.#name = adminDistrict2
        } else if (adminDistrict)
            this.#name = adminDistrict
        else
            this.#name = ""
    }

    getFullName() {
        return this.#getAddressLine() + this.#getLocality()
            + this.#getAdminDistrict2() + this.#adminDistrict
    }

    getAddressName() {
        return this.#name
    }

    #getAddressLine() {
        if (this.#addressLine)
            return this.#addressLine + ", "
        else
            return ""
    }

    #getLocality() {
        if (this.#locality)
            return this.#locality + ', '
        else
            return ""
    }

    #getAdminDistrict2() {
        if (this.#adminDistrict2)
            return this.#adminDistrict2 + ", "
        else
            return ""
    }

    getQuery() {
        if (this.#havename)
            return this.#name
        else
            return this.#fomattedAddress
    }
}