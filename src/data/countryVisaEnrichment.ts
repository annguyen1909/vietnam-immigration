import type { CountryVisaContentEntry } from './countryVisaContent';

type Enrichment = Partial<
  Pick<
    CountryVisaContentEntry,
    | 'eligibilityIntro'
    | 'travelInsight'
    | 'requirements'
    | 'faqs'
    | 'fees'
    | 'customApplicationGuide'
    | 'customPaymentNotes'
    | 'entryTransitGuide'
    | 'passportRegulations'
    | 'embassyInfo'
  >
>;

/** Unique SEO copy for high-traffic nationality pages (merged after auto-generation). */
export const countryVisaEnrichment: Record<string, Enrichment> = {
  'united-states': {
    eligibilityIntro:
      'American passport holders typically apply for a Vietnam eVisa online before departure—no embassy visit is required for standard tourism or business trips. U.S. travelers often choose 90-day options for north–south itineraries (Hanoi, Da Nang, Ho Chi Minh City). Apply at least several days before flying; airlines may ask to see approval at check-in.',
    travelInsight:
      'U.S. citizens should ensure passport validity covers the full stay plus six months. If you hold a second nationality, apply using the passport you will present at the Vietnam border.',
    fees: [
      'Single-entry tourist or business eVisa (valid for up to 90 days): $55 USD official government fee.',
      'Multiple-entry tourist or business eVisa (valid for up to 90 days): $80 USD official government fee.',
      'Assisted service fee: Calculated based on processing speed (Normal, Urgent 3-day, or Super Urgent 1-day). Clearly itemized at checkout with zero hidden costs.',
      'Payment methods: All major U.S. credit and debit cards (Visa, Mastercard, American Express, Discover) are accepted securely.',
    ],
    entryTransitGuide:
      '**Entry & Transit Guide for U.S. Citizens:** Flight itineraries from the United States to Vietnam typically involve direct flights (e.g., San Francisco to Ho Chi Minh City via Vietnam Airlines) or connecting transit routes through major East Asian hubs such as Seoul Incheon (ICN), Tokyo Narita/Haneda (NRT/HND), or Taipei Taoyuan (TPE). If you are transiting without leaving the international terminal, you do not need a visa for the transit country, but airlines will verify your valid Vietnam eVisa before boarding your first flight in the U.S. Ensure the port of entry on your eVisa exactly matches your first point of immigration clearance in Vietnam.',
    passportRegulations:
      '**U.S. Passport Validity Regulations:** The Government of Vietnam strictly enforces the rule that your U.S. passport must be valid for at least 6 months beyond your planned arrival date in Vietnam. Additionally, your passport must contain at least one blank page for immigration entry and exit stamps. Emergency passports or passport cards are not accepted for eVisa entry; you must travel with a full validity blue tourist booklet.',
    embassyInfo: [
      {
        name: 'Embassy of the Socialist Republic of Vietnam in Washington D.C.',
        address: '1233 20th St NW, Suite 400, Washington, DC 20036, United States',
        phone: '+1 (202) 861-0737 / +1 (202) 861-0738',
        email: 'vnembassy.us@gmail.com / consular@vietnamembassy.us',
        website: 'https://vnembassy-washington.mofa.gov.vn/',
      },
    ],
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
    fees: [
      'Single-entry tourist/business eVisa: $55 USD government fee (approximately ~4,600 INR depending on daily bank conversion rates).',
      'Multiple-entry tourist/business eVisa: $80 USD government fee (approximately ~6,700 INR depending on daily bank conversion rates).',
      'Service fee: Varies depending on selected processing tier (Normal, Urgent 3-day, or Super Urgent 1-day). All fees are transparently displayed before payment.',
      'Note: Transactions are processed in USD. Your Indian bank or credit card issuer may apply a nominal foreign exchange markup.',
    ],
    customApplicationGuide:
      '**Form Filling Guide for Indian Passport Holders:** When completing the official eVisa application, ensure your full name matches the Machine Readable Zone (MRZ) at the bottom of your passport biographical page exactly. Indian passports often list given names and surnames separately; do not invert them. Ensure your uploaded passport photo has a solid white background, without glasses or shadows. Do not upload the scanned photo from the passport page itself as your headshot.',
    customPaymentNotes:
      '**International Payment & 3D Secure Notice:** Indian debit and credit cards (Visa, Mastercard, RuPay, Visa CheckOut) frequently encounter 3D Secure (OTP) authorization timeouts or rejections on international payment gateways. Before paying, verify with your bank (HDFC, SBI, ICICI, Axis, etc.) that international e-commerce transactions are fully enabled on your card. If a transaction fails or times out, do not make repeated attempts immediately to avoid duplicate holds; reach out to our 24/7 support team or try an alternative card with stable OTP delivery.',
    embassyInfo: [
      {
        name: 'Embassy of the Socialist Republic of Vietnam in New Delhi',
        address: '20 Kautilya Marg, Chanakyapuri, New Delhi – 110 021, India',
        phone: '+91 11 2687 9868 / +91 11 2687 9852',
        email: 'vnemb.in@gmail.com / vnconsul.indelhi@yahoo.in',
        website: 'https://vnembassy-newdelhi.mofa.gov.vn/',
      },
      {
        name: 'Consulate General of Vietnam in Mumbai',
        address:
          'Unit 805, 8th Floor, Sharma Towers, B wing, Bandra Kurla Complex, Bandra (East), Mumbai – 400 051, India',
        phone: '+91 22 2652 9274 / +91 22 2652 9273',
        email: 'tlsq.mumbai@mofa.gov.vn',
        website: 'https://vnconsulate-mumbai.mofa.gov.vn/',
      },
    ],
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
    faqs: [
      {
        q: 'Can Thai travelers enter Vietnam overland with an eVisa?',
        a: 'Yes, but only at approved land border gates such as Moc Bai or Lao Bao. Not every crossing accepts eVisa holders, so confirm your specific gate before booking buses and carry a printed approval.',
      },
      {
        q: 'Do Thai nationals get visa-free entry instead of an eVisa?',
        a: 'Some ASEAN nationals have short visa-free allowances, but durations and rules change. If your stay exceeds any visa-free limit or you want certainty at check-in, an eVisa is the safer option.',
      },
    ],
  },
  russia: {
    eligibilityIntro:
      'Russian citizens typically apply for a Vietnam eVisa online for tourism or business. Enter Cyrillic names using the Latin spelling shown on your passport bio page.',
    travelInsight:
      'Winter departures from Russia often connect via the Middle East or Southeast Asia hubs—allow buffer days for approval email delivery.',
    faqs: [
      {
        q: 'How do Russian applicants enter Cyrillic names on the Vietnam eVisa form?',
        a: 'Type your name using the Latin transliteration printed in the machine-readable zone of your passport, not the Cyrillic spelling. A mismatch between the form and the passport is a common cause of delays or rejection.',
      },
      {
        q: 'What if a Russian traveler\u2019s international card is declined?',
        a: 'Payment needs a working international card. If it is declined, do not resubmit repeatedly\u2014contact support first to avoid duplicate charges, then retry with an alternative card.',
      },
    ],
  },
  poland: {
    eligibilityIntro:
      'Polish passport holders can usually obtain a Vietnam eVisa online before tourism or business trips. Schengen travel before or after Vietnam still requires a separate Vietnamese entry authorization.',
    travelInsight:
      'Budget carriers from Warsaw and Kraków often land in Ho Chi Minh City—confirm the entry port on your approval PDF matches your ticket.',
    faqs: [
      {
        q: 'Does Schengen travel cover a Polish traveler in Vietnam?',
        a: 'No. Schengen rights do not extend to Vietnam—you still need a valid Vietnam eVisa or other authorization for the Vietnamese portion of any trip.',
      },
      {
        q: 'Which Vietnamese airport do flights from Poland usually use?',
        a: 'Many one-stop routes from Warsaw or Kraków arrive in Ho Chi Minh City (Tan Son Nhat). Because the eVisa is tied to the port you select, confirm it matches your ticket before you fly.',
      },
    ],
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
    faqs: [
      {
        q: 'Can Cambodians cross into Vietnam by land with an eVisa?',
        a: 'Yes, at approved land gates such as Moc Bai on the Phnom Penh–Ho Chi Minh City route. Verify your exact crossing accepts eVisa entries before buying bus tickets.',
      },
      {
        q: 'How much passport validity do Cambodian travelers need?',
        a: 'Your passport should be valid for at least six months beyond your arrival date and have blank pages for entry stamps.',
      },
    ],
  },
  'hong-kong': {
    eligibilityIntro:
      'Hong Kong passport holders should verify eVisa eligibility and apply online before departure. Use the travel document you will present at Vietnamese immigration.',
    travelInsight:
      'Weekend trips are common—single-entry visas suit one return unless you plan a side trip outside Vietnam.',
    faqs: [
      {
        q: 'Which travel document should Hong Kong residents apply with?',
        a: 'Apply with the passport you will actually present at Vietnamese immigration (HKSAR passport or your nationality\u2019s passport). The document number on the eVisa must match the one you travel on.',
      },
      {
        q: 'Is a single-entry eVisa enough for a weekend trip from Hong Kong?',
        a: 'Single entry covers one arrival and departure. Choose multiple entry only if you plan to leave Vietnam and return within the same trip.',
      },
    ],
  },
  'united-arab-emirates': {
    eligibilityIntro:
      'UAE passport holders can typically apply for a Vietnam eVisa online for tourism or business. Residents of the UAE who are not citizens must apply with their nationality’s passport.',
    travelInsight:
      'Direct flights from Dubai or Abu Dhabi to Hanoi or Ho Chi Minh City are frequent—align entry port with your ticket.',
    faqs: [
      {
        q: 'Can UAE residents who are not Emirati citizens use this eVisa?',
        a: 'You must apply with the passport of your nationality, not your UAE residence visa. Residency does not change which entry authorization Vietnam requires.',
      },
      {
        q: 'Do UAE travelers need to match the entry port on direct flights?',
        a: 'Yes. Direct services from Dubai and Abu Dhabi reach both Hanoi and Ho Chi Minh City, so confirm the entry port on your approval matches your booked arrival airport.',
      },
    ],
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
    faqs: [
      {
        q: 'How far ahead should Swedish travelers apply?',
        a: 'Apply at least 3–5 business days before departure. Standard processing is usually quick, but summer (June–August) Asia travel peaks can lengthen review.',
      },
      {
        q: 'Does a Swedish traveler need a printed eVisa?',
        a: 'Carry a printed copy alongside your passport. Some carriers and border officers still request paper even when you have a digital file.',
      },
    ],
  },
  norway: {
    eligibilityIntro:
      'Norwegian passport holders are typically eligible for Vietnam eVisas online. Enter your name exactly as on the passport and keep a PDF copy offline.',
    travelInsight:
      'Long routes via Oslo hubs mean you should not rely on same-day approval at the airport.',
    faqs: [
      {
        q: 'Can Norwegian travelers rely on same-day airport approval?',
        a: 'No. Apply ahead of time; eVisa approval is delivered by email and should be in hand before you reach the airport.',
      },
      {
        q: 'How should Norwegian applicants store the approval?',
        a: 'Keep an offline PDF and a printed copy, especially for multi-leg routes via European hubs where connectivity may vary.',
      },
    ],
  },
  denmark: {
    eligibilityIntro:
      'Danish citizens can usually obtain a Vietnam eVisa online for tourism or business. Double-check entry port if you fly into Da Nang versus Hanoi.',
    travelInsight:
      'Copenhagen–Asia flights often arrive in Ho Chi Minh City—verify the entry port on your approval PDF before departure.',
    faqs: [
      {
        q: 'Does the entry airport matter for Danish travelers?',
        a: 'Yes. If you fly into Da Nang rather than Hanoi or Ho Chi Minh City, confirm that exact port is shown on your approval before departure.',
      },
      {
        q: 'How early should Danish travelers apply?',
        a: 'Apply several days before departure to allow for standard processing and email delivery of your approval.',
      },
    ],
  },
  switzerland: {
    eligibilityIntro:
      'Swiss passport holders are generally eligible for Vietnam eVisas for short visits. Business and tourism use different purpose codes—answer honestly on the form.',
    travelInsight:
      'Multilingual Swiss passports still use Latin characters on the bio page for the application.',
    faqs: [
      {
        q: 'Tourism or business—which purpose should Swiss applicants choose?',
        a: 'Select the purpose that matches your trip. Tourist eVisas are not for paid work in Vietnam; choose business if attending meetings or trade events.',
      },
      {
        q: 'Do multilingual Swiss passports cause form problems?',
        a: 'No. Enter the Latin-character data from your passport\u2019s machine-readable zone regardless of the German, French, or Italian fields.',
      },
    ],
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
    faqs: [
      {
        q: 'Do post-Brexit UK rules cover Irish travelers to Vietnam?',
        a: 'No. Irish citizens need their own Vietnam authorization; UK or EU arrangements do not substitute for a Vietnam eVisa.',
      },
      {
        q: 'Should Irish travelers with long layovers apply early?',
        a: 'Yes. Dublin–Asia routes often involve overnight layovers, so secure approval before check-in rather than relying on airport processing.',
      },
    ],
  },
  portugal: {
    eligibilityIntro:
      'Portuguese passport holders are typically eligible for Vietnam eVisas for short stays. Peak winter sun departures to Asia fill quickly—apply early.',
    travelInsight:
      'Lisbon–Ho Chi Minh City routes may include one-stop connections—carry printed approval at transfer desks.',
    faqs: [
      {
        q: 'When should Portuguese travelers apply for winter trips?',
        a: 'Apply early for November–February departures, as winter-sun demand to Asia is high and last-minute processing during holidays can be slower.',
      },
      {
        q: 'Do Portuguese travelers need approval at transfer desks?',
        a: 'Yes. On one-stop Lisbon–Ho Chi Minh City routings, keep a printed eVisa for airline checks at the transfer airport.',
      },
    ],
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
    faqs: [
      {
        q: 'What passport condition do South African travelers need?',
        a: 'Carry a passport valid at least six months beyond arrival with blank pages for entry stamps; worn or damaged passports can cause boarding issues.',
      },
      {
        q: 'Should South Africans avoid tight layovers?',
        a: 'Yes. Johannesburg–Asia routings are long, so secure your approval before departure and avoid booking very short connecting times.',
      },
    ],
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
    faqs: [
      {
        q: 'Should Israeli travelers save the approval offline?',
        a: 'Yes. Save the approval PDF to your device and print a copy, since long-haul connections via Europe or the Gulf may have limited connectivity.',
      },
      {
        q: 'Does the entry port matter for Israeli applicants?',
        a: 'Yes. Your eVisa is valid for the specific port you choose, so confirm it matches your booked arrival airport or land gate.',
      },
    ],
  },
  turkey: {
    eligibilityIntro:
      'Turkish citizens are usually eligible for Vietnam eVisas online. Enter given and family names as shown on the passport Latin line.',
    travelInsight:
      'Istanbul is a major hub—approval is still mandatory before the Vietnam-bound segment.',
    faqs: [
      {
        q: 'How should Turkish applicants enter names with Turkish characters?',
        a: 'Use the Latin spelling from your passport\u2019s machine-readable zone (for example, characters like \u00e7, \u015f, and \u0131 as printed there). Match the form to the passport exactly.',
      },
      {
        q: 'Is an eVisa required when transiting Istanbul?',
        a: 'Transiting Istanbul does not exempt you—your approval must be valid before you board the Vietnam-bound segment.',
      },
    ],
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
    if (patch.fees?.length) {
      existing.fees = patch.fees;
    }
    if (patch.faqs?.length) {
      existing.faqs = [...patch.faqs, ...existing.faqs];
    }
    if (patch.customApplicationGuide)
      existing.customApplicationGuide = patch.customApplicationGuide;
    if (patch.customPaymentNotes) existing.customPaymentNotes = patch.customPaymentNotes;
    if (patch.entryTransitGuide) existing.entryTransitGuide = patch.entryTransitGuide;
    if (patch.passportRegulations) existing.passportRegulations = patch.passportRegulations;
    if (patch.embassyInfo) existing.embassyInfo = patch.embassyInfo;
  }
}
