import Consent from './models/consent.js';
import Header, { NegotiationStatus } from './models/header.js';
import ScoredPreferences, { Issue } from './models/scored_preferences.js';

/**
 * An object with different rendering options. 
 * These variables will be used in index.pug.
 */
class RenderConfig {
    constructor(genericAd, showPayments, contentPercentage, acceptedString, rejectedString, cost, score) {
        this.genericAd = genericAd
        this.showPayments = showPayments
        this.contentPercentage = contentPercentage,
        this.acceptedString = acceptedString,
        this.rejectedString = rejectedString,
        this.cost = cost,
        this.score =score
    }
    
}

/**
 * Each config determines the content rendered in index.pug.
 */
const uiConfigs = [
    new RenderConfig(true, false, 80, '-', 'analytics, personalized ads, identification, personalized content, marketing, external content',0, 3008),
    new RenderConfig(true, false, 80,'-', 'analytics, personalized ads, identification, personalized content, marketing, external content',0, 3008),
    new RenderConfig(true, false, 80,'-', 'analytics, personalized ads, identification, personalized content, marketing, external content',0, 3008),
    new RenderConfig(false, false, 100, 'analytics, personalized ads', 'identification, personalized content, marketing, external content',0, 6392),
    new RenderConfig(false, false, 100, 'analytics, personalized ads', 'identification, personalized content, marketing, external content',0, 6392),
    new RenderConfig(false, true, 100, 'personalized ads', 'analytics, identification, personalized content, marketing, external content',2, 5120),
    new RenderConfig(false, true, 100, 'personalized ads', 'analytics, identification, personalized content, marketing, external content',2, 5120),

]

/**
 * The mock headers to be returned to the calling agent.
 */
const responseHeaders = [
    // 1) just confirm opening offer. share content option. share preferences
    new Header().setStatus(NegotiationStatus.EXCHANGE)
        .setPreferences(
            [
                //2C
                new ScoredPreferences()
                    .setCost(null)
                    .setConsent(new Issue().setRelevance(0.6).setResolutions({ analytics: 0.3, marketing: 0.1, personalizedAds: 0.6 }))
                    .setContent(new Issue().setRelevance(0.4).setResolutions({ 100: 1, 80: 0.8, 50: 0.4 })),
                //3C including cost and maybe modified other resolutions
                new ScoredPreferences()
                    .setCost(new Issue().setRelevance(0.4).setResolutions({ 0: 0.2, 2: 0.7, 4: 0.9, 9: 1 }))
                    .setConsent(new Issue().setRelevance(0.2).setResolutions({ analytics: 0.3, marketing: 0.1, personalizedAds: 0.6 }))
                    .setContent(new Issue().setRelevance(0.4).setResolutions({ 100: 1, 80: 0.8, 50: 0.4 })),
            ]
        )
        .setCost(0)
        .setConsent(new Consent())
        .setContent(80),
    // 2) Send unattractive counter offer (2C, != Nash optimal contract)
    new Header().setStatus(NegotiationStatus.NEGOTIATION).setConsent(new Consent().setAnalytics(true).setPersonalizedAds(true)).setContent(50),
    // 3) Send attractive counteroffer (Nash optimal contract)
    new Header().setStatus(NegotiationStatus.NEGOTIATION).setConsent(new Consent().setAnalytics(true).setPersonalizedAds(true)).setContent(100),
    // 4) Send Accepted Contract (and refresh page!!!)
    new Header().setStatus(NegotiationStatus.ACCEPTED).setConsent(new Consent().setAnalytics(true).setPersonalizedAds(true)).setContent(100).setCost(0),
    // 5) Send perfectly attractive 3 C offer
    new Header().setStatus(NegotiationStatus.NEGOTIATION).setConsent(new Consent().setPersonalizedAds(true)).setContent(100).setCost(2),
    // 6) Accept
    new Header().setStatus(NegotiationStatus.ACCEPTED).setConsent(new Consent().setPersonalizedAds(true)).setContent(100).setCost(2),

]

/**
 * Integration testing. Expected headers at each state of the negotiation. 
 */
const expectedHeaders = [
    'status=exchange',
    'status=negotiation preferences=eyJjb25zZW50Ijp7InJlbGV2YW5jZSI6MC40LCJyZXNvbHV0aW9ucyI6eyJhbmFseXRpY3MiOjAuMywibWFya2V0aW5nIjowLjIsInBlcnNvbmFsaXplZEFkcyI6MC41fX0sImNvbnRlbnQiOnsicmVsZXZhbmNlIjowLjYsInJlc29sdXRpb25zIjp7IjUwIjowLjUsIjgwIjowLjksIjEwMCI6MX19fQ== cost=0 consent=analytics personalizedAds content=100',
    'status=negotiation cost=0 consent=analytics personalizedAds content=100',
    'status=accepted cost=0 consent=analytics personalizedAds content=100',
    'status=exchange preferences=eyJjb3N0Ijp7InJlbGV2YW5jZSI6MC40LCJyZXNvbHV0aW9ucyI6eyIwIjowLjQyODU3MTQyODU3MTQyODU1LCIyIjowLjM1NzE0Mjg1NzE0Mjg1NzE1LCI0IjowLjE0Mjg1NzE0Mjg1NzE0Mjg1LCI5IjowLjA3MTQyODU3MTQyODU3MTQyfX0sImNvbnNlbnQiOnsicmVsZXZhbmNlIjowLjIsInJlc29sdXRpb25zIjp7ImFuYWx5dGljcyI6MC4zLCJtYXJrZXRpbmciOjAuMiwicGVyc29uYWxpemVkQWRzIjowLjV9fSwiY29udGVudCI6eyJyZWxldmFuY2UiOjAuNCwicmVzb2x1dGlvbnMiOnsiNTAiOjAuNSwiODAiOjAuOSwiMTAwIjoxfX19',
    'status=accepted cost=2 consent=personalizedAds content=100',
]

export { responseHeaders, uiConfigs, expectedHeaders }