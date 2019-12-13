var Orginization = class {
  constructor(orgobj) {
    this.address = orgobj.address
    this._asexamboard = orgobj.asexamboard
    this._aslevel = orgobj.aslevel
    this._aslevel_old = orgobj.aslevl_old
    this.contacts = {
      billing: {
        email: orgobj.billing_contact,
        phone: orgobj.billing_phone
      },
      primary: {
        email: orgobj.primary_contact,
        phone: orgobj.primary_phone
      }
    }
    this.centerId = orgobj.centere_id
    this.creationDate = new Date(orgobj.created_at)
    this.defaultPassword = orgobj.defaultpass
    this.description = orgobj.description
    this.gcse = orgobj.gcse
    this.id = orgobj.id
    this.ips = orgobj.ip.split(" ")
    this.ks3 = orgobj.ks3
    this.legacy = orgobj.legacy
    this.name = orgobj.name
    this.postcode = orgobj.postcode
    this.subscription = {
      start: new Date(orgobj.subscription_start),
      end: new Date(orgobj.subscription_end)
    }
    this.suspended = orgobj.suspend
    this.updatedDate = new Date(orgobj.updated_at)
    this.userFormat = orgobj.userformat
    this.userLimit = orgobj.userlimit
    this.wjec = orgobj.wjec
    try {
      this.yearGroups = orgobj.wonde_years.split(",")
    } catch(err) {
      this.yearGroups = err
    }
  }
}

module.exports = Orginization