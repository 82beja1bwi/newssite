import ScoredPreferences from './scored_preferences.js'
import Consent from './consent.js'

export const NegotiationStatus = {
  EXCHANGE: 'exchange',
  NEGOTIATION: 'negotiation',
  ACCEPTED: 'accepted'
}

export default class Header {
  /**
   * Create a new Header instance.
   * @constructor
   * @param {NegotiationStatus} status
   * @param {ScoredPreferences} preferences
   * @param {Consent} consent
   * @param {number} cost
   * @param {number} content
   */
  constructor (status, preferences, consent, cost, content) {
    this.status = status // domain of website
    this.preferences = preferences
    this.consent = consent // [analytics, marketing...] a list!
    this.cost = cost
    this.content = content
  }

  setStatus (status) {
    this.status = status

    return this
  }

  setPreferences (preferences) {
    this.preferences = preferences

    return this
  }

  setCost (cost) {
    this.cost = cost

    return this
  }

  setConsent (consent) {
    this.consent = consent

    return this
  }

  setContent (content) {
    this.content = content

    return this
  }

  // Deserialization
  toString () {
    let header = 'status=' + this.status.toString() + ' '

    if (this.preferences) {
      // TODO: toBase64EncodedJSON for preferences
      // MODIFIED
      header += 'preferences=' + btoa(JSON.stringify(this.preferences)) + ' '
    }

    if (this.cost) {
      header += 'cost=' + this.cost + ' '
    }

    if (this.consent && this.consent instanceof Consent) {
      // TODO: toString for consent
      const concat = this.consent.toString()
      if (concat.length > 0) {
        header += 'consent=' + concat + ' '
      }
    }

    if (this.content) {
      header += 'content=' + this.content
    }

    return header.trimEnd()
  }

  // Serialization
  // status=... (optional) preferences=base64encondedString (optional) consent=analytics marketing ...
  //       (optional) cost=2 (optional) content=50
  static fromString (header) {
    const patterns = [
      /status=[^ ]+/,
      /preferences=[^ ]+/,
      /consent=.*?(?= content=|$)/,
      /cost=[^ ]+/,
      /content=[^ ]+/
    ]
    const matches = patterns.map((p) => {
      const match = p.exec(header)
      return match ? match[0].split('=')[1] : null
    })

    if (matches[1]) {
      matches[1] = ScoredPreferences.fromBase64EncodedJSON(matches[1])
    }

    if (matches[2]) {
      matches[2] = Consent.fromString(matches[2])
    }

    return new Header()
      .setStatus(matches[0])
      .setPreferences(matches[1])
      .setConsent(matches[2])
      .setCost(parseFloat(matches[3]))
      .setContent(parseFloat(matches[4]))
  }
}
