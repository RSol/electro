/* global fetch */

import 'whatwg-fetch'

let _streets = []
let _groups = []
let _houses = []

let delay = function (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

export default {
  delay,
  street: {
    getStreets (cb) {
      if (_streets.length > 0) {
        return cb(_streets)
      }
      fetch('/static/streets.json')
        .then((response) => response.json())
        .then((json) => {
          _streets = json
          cb(json)
        })
        .catch((ex) => console.log('street parsing failed', ex))
    },
    addStreet (title, cb) {
      delay(1000)
        .then(() => cb({
          id: 20,
          title: title
        }))
        .catch((ex) => console.log('street adding failed', ex))
    },
    editStreet (street, title, cb) {
      delay(1000)
        .then(() => cb({
          id: street.id,
          title: title
        }))
        .catch((ex) => console.log('street edit failed', ex))
    },
    filterHouses (json, street, cb) {
      var houses = json.filter((house) => house.street_id === street.id)
      return cb(houses)
    },
    getHouses (street, cb) {
      if (_houses.length > 0) {
        return this.filterHouses(_houses, street, cb)
      }
      fetch('/static/houses.json')
        .then((response) => response.json())
        .then((json) => {
          _houses = json
          return this.filterHouses(json, street, cb)
        }).catch((ex) => console.log('houses parsing failed', ex))
    },
    deleteStreet (street, cb) {
      // _streets.indexOf(street)
      // new list of streets
      delay(1000)
        .then(() => cb(true))
        .catch((ex) => console.log('street delete failed', ex))
    }
  },
  group: {
    getGroups (cb) {
      if (_groups.length > 0) {
        return cb(_groups)
      }
      fetch('/static/groups.json')
        .then((response) => response.json())
        .then((json) => {
          _groups = json
          cb(json)
        })
        .catch((ex) => console.log('groups parsing failed', ex))
    },
    addGroup (title, cb) {
      delay(1000)
        .then(() => cb({
          id: 20,
          title: title
        }))
        .catch((ex) => console.log('street adding failed', ex))
    },
    editGroup (street, title, cb) {
      delay(1000)
        .then(() => cb({
          id: street.id,
          title: title
        }))
        .catch((ex) => console.log('street edit failed', ex))
    },
    filterHouses (json, group, cb) {
      var houses = json.filter((house) => house.group_id === group.id)
      return cb(houses)
    },
    getHouses (street, cb) {
      if (_houses.length > 0) {
        return this.filterHouses(_houses, street, cb)
      }
      fetch('/static/houses.json')
        .then((response) => response.json())
        .then((json) => {
          _houses = json
          return this.filterHouses(json, street, cb)
        }).catch((ex) => console.log('group parsing failed', ex))
    },
    deleteGroup (group, cb) {
      // _streets.indexOf(street)
      // new list of streets
      delay(1000)
        .then(() => cb(true))
        .catch((ex) => console.log('group delete failed', ex))
    }
  },
  house: {
    addHouse (title, cb) {
      delay(1000)
        .then(() => cb({
          id: 25,
          title: title
        }))
        .catch((ex) => console.log('house adding failed', ex))
    }
  },
  getStreetById (id) {
    let street = _streets.find((element) => {
      return element.id === id
    })
    if (street !== undefined) {
      return street
    }
    return {
      title: ''
    }
  },
  getGroupById (id) {
    let group = _groups.find((element) => {
      return element.id === id
    })
    if (group !== undefined) {
      return group
    }
    return {
      title: ''
    }
  }
  //   getHouseById (id) {
  //   let house = _houses.find((element) => {
  //     return element.id === id
  //   })
  //   if (house !== undefined) {
  //     return house
  //   }
  //   return {
  //     title: ''
  //   }
  // }
}
