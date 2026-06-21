import type { CountryVisaContentEntry } from './countryVisaContent';

type Enrichment = Partial<
  Pick<CountryVisaContentEntry, 'eligibilityIntro' | 'travelInsight' | 'requirements' | 'faqs'>
>;

/** Unique SEO copy for high-traffic nationality pages (merged after auto-generation). */
export const countryVisaEnrichment: Record<string, Enrichment> = {
  'united-states': {
    eligibilityIntro:
      'American passport holders typically apply for a Vietnam eVisa online before departure—no embassy visit is required for standard tourism or business trips. U.S. travelers often choose 90-day options for north–south itineraries (Hanoi, Da Nang, Ho Chi Minh City). Apply at least several days before flying; airlines may ask to see approval at check-in.',
    travelInsight:
      'U.S. citizens should ensure passport validity covers the full stay plus six months. If you hold a second nationality, apply using the passport you will present at the Vietnam border.',
    faqs: [
      {
        q: 'Do U.S. green card holders need a Vietnam eVisa?',
        a: 'Green card status does not replace a passport. You need a valid passport from your country of citizenship and, for most nationalities, an appropriate Vietnam entry authorization before travel.',
      },
    ],
  },
  'united-kingdom': {
    eligibilityIntro:
      'British citizens (United Kingdom passport holders) are generally eligible for the Vietnam eVisa for tourism and business. The online process suits direct flights from London or one-stop routes via hubs in the Middle East and Asia. Double-check name spelling against your passport MRZ line.',
    travelInsight:
      'Post-Brexit travel rules for other destinations do not change Vietnam eVisa requirements for UK passports—still apply online with a passport valid six months beyond arrival.',
    faqs: [
      {
        q: 'Can UK travelers get a multiple-entry Vietnam eVisa?',
        a: 'Multiple-entry eVisas may be available depending on current government options. Select multiple entry only if you will leave and re-enter Vietnam during the same trip or within the visa validity period.',
      },
    ],
  },
  australia: {
    eligibilityIntro:
      'Australian passport holders can usually obtain a Vietnam eVisa online for tourism or business without visiting an embassy. Many Australians pair Vietnam with Cambodia or Thailand—confirm your eVisa entry type (single vs multiple) matches your routing.',
    travelInsight:
      'Flights from Sydney, Melbourne, or Brisbane often arrive at Tan Son Nhat (Ho Chi Minh City) or Noi Bai (Hanoi). Know your landing airport and verify it on your approval PDF before you fly.',
    faqs: [
      {
        q: 'How early should Australians apply for a Vietnam eVisa?',
        a: 'Apply at least 3–5 days before departure when possible. Processing is often faster, but last-minute travel during holidays can take longer.',
      },
    ],
  },
  canada: {
    eligibilityIntro:
      'Canadian citizens are typically eligible for Vietnam’s eVisa program for tourism and business travel. Winter sun seekers and backpackers alike use the online form—ensure your passport biographical page scan is sharp and well lit.',
    travelInsight:
      'French-language passport fields are accepted, but enter data in the form exactly as shown in the Latin-character section of your passport.',
    faqs: [
      {
        q: 'Do Canadian permanent residents apply with a Canadian passport?',
        a: 'You must apply with the passport you will use to enter Vietnam. PR cards alone are not travel documents.',
      },
    ],
  },
  germany: {
    eligibilityIntro:
      'German passport holders (Bundesrepublik Deutschland) can generally apply for a Vietnam eVisa online. Schengen-area trips before or after Vietnam still require a valid eVisa or other authorization for the Vietnamese segment.',
    travelInsight:
      'Business travelers from Germany should choose the business purpose on the form if attending meetings or trade fairs—tourism visas are not intended for paid employment in Vietnam.',
    faqs: [
      {
        q: 'Is a printed eVisa required for German travelers?',
        a: 'Carry a printed copy plus your passport. Some airlines and border officers request a paper copy even when a digital file is stored on your phone.',
      },
    ],
  },
  france: {
    eligibilityIntro:
      'French citizens are usually eligible for the Vietnam eVisa for tourism and short business visits. Apply before purchasing non-refundable trains or domestic flights within Vietnam during peak holiday periods (Tet, July–August).',
    travelInsight:
      'Travelers from France often enter via Ho Chi Minh City or Hanoi; cruise passengers must verify seaport eligibility separately.',
    faqs: [
      {
        q: 'Can French minors travel on a parent’s Vietnam eVisa?',
        a: 'Each traveler typically needs their own authorization. Family applications can include multiple passengers—see our children visa FAQ for details.',
      },
    ],
  },
  india: {
    eligibilityIntro:
      'Indian passport holders are generally eligible for Vietnam eVisas for tourism and business, subject to current government lists. Direct and one-stop routes from Delhi, Mumbai, Bengaluru, and Hyderabad (via Vietjet, IndiGo, and regional hubs) make Vietnam a popular short-haul destination—apply at least 7–10 days before departure because Indian application volume is high and photo or name mismatches trigger extra review.',
    travelInsight:
      'Indians connecting through Bangkok or Singapore must hold a valid Vietnam eVisa before boarding the Vietnam-bound segment—even on a single PNR. Enter your name exactly as printed on your passport MRZ, including middle names. Vietjet and IndiGo may ask to see a printed eVisa PDF at check-in.',
    faqs: [
      {
        q: 'What photo standards do Indian applicants need for Vietnam eVisa?',
        a: 'Use a recent passport-style photo with plain white background, no glasses glare, and full face visible. Rejections often come from cropped selfies, patterned backgrounds, or uploading the small photo printed inside the passport instead of a separate headshot. See our photo rejected troubleshooting guide if uploads fail.',
      },
      {
        q: 'How long does Vietnam eVisa take for Indian passport holders?',
        a: 'Normal tier targets within 5 business days after payment; weekends and Indian holiday peaks do not speed review. Urgent (3 days) and Super Urgent (1 day) tiers are available when your arrival date allows. High volume during December–January and Tet can add delay—apply early.',
      },
      {
        q: 'Can Indians get a Vietnam eVisa for Phu Quoc or Da Nang?',
        a: 'Yes—Indian tourists commonly fly to Da Nang (DAD), Nha Trang (CXR), and Phu Quoc (PQC) on package and direct routes. Your approved eVisa PDF must list an authorized entry port matching your first international landing in Vietnam.',
      },
    ],
  },
  japan: {
    eligibilityIntro:
      'Japanese passport holders are typically eligible for Vietnam eVisas for tourism and business. Short holiday trips from Tokyo or Osaka are common—single-entry visas suit one-time visits, while multiple-entry options help frequent flyers.',
    travelInsight:
      'Enter your name in the order shown on your Japanese passport romanization; do not invert family and given names.',
    faqs: [
      {
        q: 'Do Japanese citizens need onward tickets for Vietnam?',
        a: 'Immigration may ask for proof of onward travel or accommodation. Keep hotel bookings or return flight evidence available on arrival.',
      },
    ],
  },
  'south-korea': {
    eligibilityIntro:
      'Republic of Korea (South Korean) passport holders can usually apply online for a Vietnam eVisa before leisure or business travel. Weekend trips from Seoul to Da Nang are popular—apply early before holiday peaks.',
    travelInsight:
      'Korean travelers should verify the passport number on the approval letter matches the booklet they carry, especially if renewing passports close to departure.',
    faqs: [
      {
        q: 'Can Koreans extend a Vietnam eVisa inside the country?',
        a: 'Extensions may be possible at immigration offices before expiry but are not guaranteed. Plan your stay within the approved duration when possible.',
      },
    ],
  },
  china: {
    eligibilityIntro:
      'Chinese passport holders should confirm current Vietnam eVisa eligibility and required documents on this page before applying. Use exact passport characters (including Pinyin name format) as printed on your bio page.',
    travelInsight:
      'Travelers visiting border regions or crossing by land should confirm the port of entry is authorized for eVisa holders.',
    faqs: [
      {
        q: 'Do Chinese citizens need different documents for business eVisas?',
        a: 'Business purpose may require supporting invitation details. Answer the application honestly and prepare documents if requested.',
      },
    ],
  },
  singapore: {
    eligibilityIntro:
      'Singapore passport holders are often eligible for Vietnam eVisas for short tourism and business trips. Weekend getaways to Ho Chi Minh City or Phu Quoc are common—check whether single or multiple entry fits your itinerary.',
    travelInsight:
      'Singapore residents who are not citizens must apply with their nationality’s passport, not the Singapore entry permit alone.',
    faqs: [
      {
        q: 'How long can Singaporeans stay on a Vietnam tourist eVisa?',
        a: 'Stay length depends on the visa type approved—commonly 30 or 90 days. The approval letter states the permitted duration and entry count.',
      },
    ],
  },
  malaysia: {
    eligibilityIntro:
      'Malaysian citizens typically use the Vietnam eVisa for fly-in holidays to Ho Chi Minh City, Hanoi, or beach hubs. Apply online before departure; visa-on-arrival is not a substitute for checking your eligibility.',
    travelInsight:
      'Malaysians driving or flying via neighbouring countries should still hold a valid eVisa for the Vietnamese leg.',
    faqs: [
      {
        q: 'Can Malaysians apply for family eVisas together?',
        a: 'Yes—group applications can include multiple family members in one submission when the form allows combined passenger details.',
      },
    ],
  },
  philippines: {
    eligibilityIntro:
      'Philippine passport holders are generally eligible for Vietnam eVisas for tourism and business, subject to official lists. OFWs transiting for vacation should still obtain an eVisa before tourist travel.',
    travelInsight:
      'Manila–Ho Chi Minh City routes are busy; apply several days ahead during Christmas and summer peaks.',
    faqs: [
      {
        q: 'What if my Philippines passport is expiring soon?',
        a: 'Renew your passport before applying if validity is under six months from your Vietnam arrival date.',
      },
    ],
  },
  indonesia: {
    eligibilityIntro:
      'Indonesian passport holders can usually apply for a Vietnam eVisa online for tourism or business. Bali–Vietnam combo trips are popular—ensure your entry date matches your first flight landing in Vietnam.',
    travelInsight:
      'Indonesian names with single-word surnames should be entered exactly as on the passport, not split artificially across form fields.',
    faqs: [
      {
        q: 'Do Indonesians need bank balance proof for Vietnam eVisa?',
        a: 'The online form may not require financial proof, but immigration on arrival can ask about funds—carry card or cash evidence if asked.',
      },
    ],
  },
  taiwan: {
    eligibilityIntro:
      'Taiwan passport holders are typically eligible for Vietnam eVisas for tourism and business travel. Enter your name as shown on your Taiwan passport’s romanized spelling.',
    travelInsight:
      'Travelers holding other travel documents should apply with the passport they will present at Vietnamese immigration.',
    faqs: [
      {
        q: 'Which entry airports can Taiwan passport eVisa holders use?',
        a: 'Use only airports and borders listed for eVisa entry on your approval. Major hubs include Tan Son Nhat, Noi Bai, and Da Nang.',
      },
    ],
  },
  netherlands: {
    eligibilityIntro:
      'Dutch passport holders can generally obtain a Vietnam eVisa online for tourism or business without visiting The Hague for a sticker visa. Backpackers on long Asia routes should watch single vs multiple entry needs.',
    travelInsight:
      'Netherlands citizens traveling with EU friends still need their own Vietnam authorization—Schengen rules do not apply in Vietnam.',
    faqs: [
      {
        q: 'Can Dutch cyclists enter Vietnam with sports equipment?',
        a: 'Bicycles and gear are allowed with standard customs rules; your eVisa covers entry authorization, not import duties on equipment.',
      },
    ],
  },
  italy: {
    eligibilityIntro:
      'Italian citizens are usually eligible for Vietnam eVisas for tourism and short business visits. Honeymooners and food tours should apply before booking non-refundable resort stays in Phu Quoc or Hoi An.',
    travelInsight:
      'Italians with accented characters in names should still type passport data using standard Latin letters as printed in the MRZ.',
    faqs: [
      {
        q: 'Do Italians need travel insurance for Vietnam eVisa approval?',
        a: 'Insurance is not always required for approval but is strongly recommended for medical coverage during your trip.',
      },
    ],
  },
  spain: {
    eligibilityIntro:
      'Spanish passport holders can typically apply for a Vietnam eVisa online for tourism or business. Winter escape routes from Madrid and Barcelona often land in Ho Chi Minh City—confirm the entry port on your approval PDF matches your ticket.',
    travelInsight:
      'Spanish minors need their own eVisa even when traveling with parents; include all passengers in a group application.',
    faqs: [
      {
        q: 'Can Spanish residents in other EU countries apply with a Spanish passport?',
        a: 'Yes—use the passport you will travel on, regardless of your country of residence.',
      },
    ],
  },
  brazil: {
    eligibilityIntro:
      'Brazilian passport holders are generally eligible for Vietnam eVisas for tourism and business. Long-haul flights via Europe or the Middle East require a valid eVisa before boarding the final segment to Vietnam.',
    travelInsight:
      'Brazilian Portuguese names with multiple surnames should be entered completely as on the passport bio page.',
    faqs: [
      {
        q: 'How do Brazilians pay Vietnam eVisa fees online?',
        a: 'International credit or debit cards are commonly accepted. Confirm your bank allows foreign transactions before paying.',
      },
    ],
  },
  'new-zealand': {
    eligibilityIntro:
      'New Zealand passport holders can usually obtain a Vietnam eVisa online before tourism or business travel. Gap-year routes through Southeast Asia still require a valid authorization for the Vietnam portion.',
    travelInsight:
      'NZ travelers combining Australia and Vietnam need separate planning—Australian visa rules do not cover Vietnam entry.',
    faqs: [
      {
        q: 'Should New Zealanders print their Vietnam eVisa?',
        a: 'Yes—print a copy and save a PDF offline. Remote island or bus trips may have limited connectivity at check-in desks.',
      },
    ],
  },
  thailand: {
    eligibilityIntro:
      'Thai passport holders should confirm current Vietnam eVisa eligibility before travel. Many regional visitors use short online approvals for tourism—apply with the passport you will present at the border and verify the entry port on your approval PDF.',
    travelInsight:
      'Overland routes from Thailand are common; verify your border crossing accepts eVisa holders before booking buses.',
  },
  russia: {
    eligibilityIntro:
      'Russian citizens typically apply for a Vietnam eVisa online for tourism or business. Enter Cyrillic names using the Latin spelling shown on your passport bio page.',
    travelInsight:
      'Winter departures from Russia often connect via the Middle East or Southeast Asia hubs—allow buffer days for approval email delivery.',
  },
  poland: {
    eligibilityIntro:
      'Polish passport holders can usually obtain a Vietnam eVisa online before tourism or business trips. Schengen travel before or after Vietnam still requires a separate Vietnamese entry authorization.',
    travelInsight:
      'Budget carriers from Warsaw and Kraków often land in Ho Chi Minh City—confirm the entry port on your approval PDF matches your ticket.',
  },
  mexico: {
    eligibilityIntro:
      'Mexican passport holders are generally eligible for Vietnam eVisas for short tourism and business visits. Long-haul itineraries should include approval in hand before non-refundable hotel purchases.',
    travelInsight:
      'Mexican names with two surnames should be entered fully as printed in the passport MRZ.',
  },
  cambodia: {
    eligibilityIntro:
      'Cambodian travelers often visit Vietnam by air or land. Confirm your planned border gate accepts eVisa entries and that your passport has six months validity.',
    travelInsight:
      'Phnom Penh–Ho Chi Minh City routes are popular—keep a printed eVisa for airline and immigration checks.',
  },
  'hong-kong': {
    eligibilityIntro:
      'Hong Kong passport holders should verify eVisa eligibility and apply online before departure. Use the travel document you will present at Vietnamese immigration.',
    travelInsight:
      'Weekend trips are common—single-entry visas suit one return unless you plan a side trip outside Vietnam.',
  },
  'united-arab-emirates': {
    eligibilityIntro:
      'UAE passport holders can typically apply for a Vietnam eVisa online for tourism or business. Residents of the UAE who are not citizens must apply with their nationality’s passport.',
    travelInsight:
      'Direct flights from Dubai or Abu Dhabi to Hanoi or Ho Chi Minh City are frequent—align entry port with your ticket.',
  },
  'czech-republic': {
    eligibilityIntro:
      'Czech passport holders are usually eligible for Vietnam eVisas for short stays. Apply several days before departure during peak European holiday seasons.',
    travelInsight:
      'Prague–Asia connections may route through one hub—approval is still required before boarding the Vietnam segment.',
  },
  sweden: {
    eligibilityIntro:
      'Swedish citizens can generally apply online for a Vietnam eVisa before tourism or business travel. Passport must be valid at least six months beyond arrival.',
    travelInsight:
      'Midnight sun season departures still follow Vietnamese immigration rules—check approval before June–August Asia trips.',
  },
  norway: {
    eligibilityIntro:
      'Norwegian passport holders are typically eligible for Vietnam eVisas online. Enter your name exactly as on the passport and keep a PDF copy offline.',
    travelInsight:
      'Long routes via Oslo hubs mean you should not rely on same-day approval at the airport.',
  },
  denmark: {
    eligibilityIntro:
      'Danish citizens can usually obtain a Vietnam eVisa online for tourism or business. Double-check entry port if you fly into Da Nang versus Hanoi.',
    travelInsight:
      'Copenhagen–Asia flights often arrive in Ho Chi Minh City—verify the entry port on your approval PDF before departure.',
  },
  switzerland: {
    eligibilityIntro:
      'Swiss passport holders are generally eligible for Vietnam eVisas for short visits. Business and tourism use different purpose codes—answer honestly on the form.',
    travelInsight:
      'Multilingual Swiss passports still use Latin characters on the bio page for the application.',
  },
  austria: {
    eligibilityIntro:
      'Austrian citizens can typically apply for a Vietnam eVisa online before travel. Allow time for email delivery of approval before package tours depart.',
    travelInsight: 'Vienna–Bangkok–Vietnam routings are common—hold approval before the final leg.',
  },
  belgium: {
    eligibilityIntro:
      'Belgian passport holders are usually eligible for Vietnam eVisas online. Family names with particles (de, van) should match passport spelling.',
    travelInsight:
      'Brussels departures may use French or Dutch ticket names—stay consistent with passport Latin line.',
  },
  ireland: {
    eligibilityIntro:
      'Irish citizens can generally apply for a Vietnam eVisa online for tourism or business. Post-Brexit UK rules do not replace the need for your own Vietnamese authorization.',
    travelInsight:
      'Dublin–Asia connections often require overnight layovers—approval should be secured before check-in.',
  },
  portugal: {
    eligibilityIntro:
      'Portuguese passport holders are typically eligible for Vietnam eVisas for short stays. Peak winter sun departures to Asia fill quickly—apply early.',
    travelInsight:
      'Lisbon–Ho Chi Minh City routes may include one-stop connections—carry printed approval at transfer desks.',
  },
  greece: {
    eligibilityIntro:
      'Greek citizens can usually apply online for a Vietnam eVisa before tourism or business trips. Ensure passport validity covers your full itinerary including island hops after Vietnam.',
    travelInsight:
      'Athens–Asia flights often land in one Vietnamese hub only—do not assume multi-city entry without the right visa type.',
  },
  hungary: {
    eligibilityIntro:
      'Hungarian passport holders are generally eligible for Vietnam eVisas online. Accented characters on passports should still be typed using standard Latin MRZ spelling.',
    travelInsight:
      'Budapest–Asia itineraries should budget 3+ days for standard processing before departure.',
  },
  romania: {
    eligibilityIntro:
      'Romanian citizens can typically apply for a Vietnam eVisa online for short tourism or business visits. Keep payment confirmation with your travel documents.',
    travelInsight:
      'Bucharest connections may route through Gulf hubs—approval is required before the Vietnam-bound flight.',
  },
  ukraine: {
    eligibilityIntro:
      'Ukrainian passport holders should confirm current eVisa eligibility and apply online before travel. Use exact passport data from the machine-readable zone.',
    travelInsight:
      'Check airline policies for document checks at departure—printed eVisa copies reduce disputes at gates.',
  },
  argentina: {
    eligibilityIntro:
      'Argentine passport holders are usually eligible for Vietnam eVisas for tourism or business. Long flights via Europe or the US require approval before the final segment to Vietnam.',
    travelInsight:
      'Spanish double surnames must appear fully on the application as in the passport.',
  },
  chile: {
    eligibilityIntro:
      'Chilean citizens can generally apply online for a Vietnam eVisa before travel. Allow processing time before buying non-refundable Galápagos-style add-ons that depend on tight dates.',
    travelInsight: 'Santiago–Asia routes are long—email access for approval delivery is essential.',
  },
  colombia: {
    eligibilityIntro:
      'Colombian passport holders are typically eligible for Vietnam eVisas online. Verify entry port matches Bogotá–Asia flight routings, often through one hub city.',
    travelInsight:
      'Carry USD or VND cash plans separately—visa approval does not guarantee airline boarding without document checks.',
  },
  'south-africa': {
    eligibilityIntro:
      'South African passport holders can usually apply for a Vietnam eVisa online for tourism or business. Passports must have blank pages and six months validity.',
    travelInsight:
      'Johannesburg–Asia connections are long—do not book tight layovers without approval in hand.',
  },
  egypt: {
    eligibilityIntro:
      'Egyptian citizens should verify Vietnam eVisa eligibility and apply online before departure. Business travelers should select the correct purpose on the form.',
    travelInsight: 'Cairo–Asia routings may stop in the Gulf—hold approval before the Vietnam leg.',
  },
  'saudi-arabia': {
    eligibilityIntro:
      'Saudi passport holders are generally eligible for Vietnam eVisas for short visits. Residents in KSA who are not citizens must apply with their nationality passport.',
    travelInsight:
      'Direct and one-stop flights to Hanoi or Ho Chi Minh City are common—check the entry port on your approval PDF matches your itinerary.',
  },
  israel: {
    eligibilityIntro:
      'Israeli passport holders can typically apply online for a Vietnam eVisa before tourism or business travel. Approval email should be saved offline for long-haul connections.',
    travelInsight:
      'Tel Aviv–Asia flights often route via Europe or the Gulf—secure visa before the final boarding pass.',
  },
  turkey: {
    eligibilityIntro:
      'Turkish citizens are usually eligible for Vietnam eVisas online. Enter given and family names as shown on the passport Latin line.',
    travelInsight:
      'Istanbul is a major hub—approval is still mandatory before the Vietnam-bound segment.',
  },
  luxembourg: {
    eligibilityIntro:
      'Luxembourg passport holders can generally apply for a Vietnam eVisa online for short tourism or business trips. Small-country passports follow the same photo and scan rules as EU neighbors.',
    travelInsight:
      'Many departures use Brussels or Frankfurt hubs—approval must be valid before international check-in.',
  },
  finland: {
    eligibilityIntro:
      'Finnish citizens can typically obtain a Vietnam eVisa online before travel. Winter Asia escapes are popular—apply before peak December booking spikes.',
    travelInsight:
      'Helsinki–Asia routes may include one stop—printed eVisa helps at transfer counters.',
  },
};

export function applyCountryVisaEnrichment(
  content: Record<string, CountryVisaContentEntry & { demonym?: string }>
): void {
  for (const [slug, patch] of Object.entries(countryVisaEnrichment)) {
    const existing = content[slug];
    if (!existing) continue;

    if (patch.eligibilityIntro) existing.eligibilityIntro = patch.eligibilityIntro;
    if (patch.travelInsight) existing.travelInsight = patch.travelInsight;
    if (patch.requirements?.length) {
      existing.requirements = [...patch.requirements, ...existing.requirements.slice(0, 4)];
    }
    if (patch.faqs?.length) {
      existing.faqs = [...patch.faqs, ...existing.faqs];
    }
  }
}
