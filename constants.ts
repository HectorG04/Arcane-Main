

import type { CardType, ColumnType, GoLoginProfileType, ProjectType, SubscriptionPaymentType, WithdrawalDraftType, WithdrawalSummaryDataType, PaymentMerchantType } from './types';

export const SALES_REPS = ['Hasnain', 'Ali Hasan', 'Raheel', 'Haseeb', 'Aryan', 'Riyan', 'Talha', 'Hamza', 'Dawood', 'Kabeer', 'Hassan'];
export const ARTISTS = ['Artist 1', 'Artist 2', 'Artist 3'];
export const PAYMENT_MERCHANTS: PaymentMerchantType[] = ['Paypal (Huzaifa)', 'Paypal (Vortex)', 'Paypal (Design Vortex)', 'Zelle (847-609-9117)', 'Stripe', 'Venmo', 'Other'];

const INITIAL_CARDS: CardType[] = [
    {
        id: "6917a32895437aa394bf71b1",
        title: "Classywolf - FullBody (1) - $600 - Hasnain",
        comments: [],
        payments: [],
    },
    {
        id: "6917a33404798463ec501d56",
        title: "Ali Hasan - $30",
        comments: [
            { id: "6917ae46c6a47cf1b27aa5da", author: "alihassan337", content: "need in this artstyle, ye purple walay mein", timestamp: "2025-11-14T22:33:42.716Z", attachments: [] }
        ],
        coverImageUrl: "https://trello.com/1/cards/6917a33404798463ec501d56/attachments/6917ae2b8679e7c19ed29f9f/previews/preview2x/download/Demon_character_Bustup_Z_with_BG.webp",
        payments: [],
    },
    {
        id: "6917a3672f599bfb34b06fb7",
        title: "Ebag (slot book) - Animation(21) - $100 - Raheel",
        comments: [],
        payments: [],
    },
    {
        id: "690d0665a5ecdc2cd85afa38",
        title: "Supreme - Full Body (14) - Haseeb - $500 (Slot Booking)",
        comments: [
            { id: "691065fe0cca695f6706ec73", author: "muhammadhassan5", content: "$400 More recieved", timestamp: "2025-11-09T09:59:26.332Z", attachments: [] }
        ],
        coverImageUrl: "https://trello.com/1/cards/690d0665a5ecdc2cd85afa38/attachments/691065ebc53a5b4e6336cc46/previews/preview2x/download/photo.webp",
        payments: [],
    },
    {
        id: "6914d4f687dcd02b377df618",
        title: "Owerlord- Full body(2) $200- Hasnain",
        coverImageUrl: "https://trello.com/1/cards/6914d4f687dcd02b377df618/attachments/6914d5292d7f689c0b4e5a05/previews/preview2x/download/Kepernyokep_2025-11-12_182054.webp",
        comments: [],
        payments: [],
    },
    {
        id: "6914b2f0f36f02ebd14381c2",
        title: "Tigger - Group ART-(2) $700 Hasnain",
        coverImageUrl: "https://trello.com/1/cards/6914b2f0f36f02ebd14381c2/attachments/6914b366b560a34afdb8b7f8/previews/preview2x/download/image.webp",
        comments: [],
        payments: [],
    },
    {
        id: "6913f1d209d63e892cae47c9",
        title: "Mule_sig- Full body(12) $180-Haseeb",
        comments: [
            { id: "6916eb4f139917ccc11f3a99", author: "muhammadhassan5", content: "@haseebhassan11 updated line art! Have a feedback from client and try to lock this", timestamp: "2025-11-14T08:41:51.315Z", attachments: [] }
        ],
        coverImageUrl: "https://trello.com/1/cards/6913f1d209d63e892cae47c9/attachments/6916eb35026a700325f0f10a/previews/preview2x/download/photo.webp",
        payments: [],
    },
    {
        id: "690bce265c6c17b1485acdf4",
        title: "AchtungKitten - Half-body - Ali Hasan(26) - $130",
        comments: [
            { id: "69164c96518634be909ee128", author: "alihassan337", content: "approved \\@muhammadhassan5", timestamp: "2025-11-13T21:24:38.223Z", attachments: [] }
        ],
        coverImageUrl: "https://trello.com/1/cards/690bce265c6c17b1485acdf4/attachments/6916480df0768028ec513ef7/previews/preview2x/download/AchtungKitten_HalfBody_Lineart.webp",
        payments: [],
    },
    {
        id: "6902901dc913af497f601a57",
        title: "DrZalmat - Full Body (26) - $180 - Ali Hasan",
        comments: [
            { id: "6917671231d60a14bf85af67", author: "muhammadhassan5", content: "@alihassan337 have it review from client", timestamp: "2025-11-14T17:29:54.406Z", attachments: [] }
        ],
        coverImageUrl: "https://trello.com/1/cards/6902901dc913af497f601a57/attachments/691766fb51c6301fd195c4e3/previews/preview2x/download/photo.webp",
        payments: [],
    },
    {
        id: "68bb1acde77a220a78bdddde",
        title: "Almerz Full Body + BG (14) - Haseeb $110",
        coverImageUrl: "https://trello.com/1/cards/68bb1acde77a220a78bdddde/attachments/68def4249d90a63bceda04df/previews/preview2x/download/wmremove-transformed.webp",
        comments: [],
        payments: [],
    },
];

export const INITIAL_COLUMNS: ColumnType[] = [
    { id: "68a5bd16949ef23b2631f443", title: "🟢 Projects", cards: INITIAL_CARDS.slice(0, 3) },
    { id: "68a5bd1eb05dfff4e06a6c39", title: "📑 Requirements Submitted", cards: INITIAL_CARDS.slice(3, 6) },
    { id: "68a5bd240e3c79fa9c710f2b", title: "✏️ In Production (Line Art)", cards: INITIAL_CARDS.slice(6, 7) },
    { id: "68a5bd337e9ba74458b9bb87", title: "🎨 In Production (Color / Rendereing)", cards: INITIAL_CARDS.slice(7, 8) },
    { id: "68a5bdff56b7fdbdd0fe23e7", title: "👀 Waiting Client Review", cards: INITIAL_CARDS.slice(8, 9) },
    { id: "68a5be05a4fe3aee8910b137", title: "✅ Completed & Delivered", cards: INITIAL_CARDS.slice(9, 10) },
    { id: "68f081d72d74e3efa586b02c", title: "Request Client Testimonial ⭐", cards: [] },
    { id: "68e6a884c1353f7b726cf813", title: "Other Platforms (Fõr research only)", cards: [] },
    { id: "69124fbc6ab6cd201281335b", title: "Refunded/Cancelled", cards: [] }
];

const projects: ProjectType[] = [
    { id: "proj-1", clientName: "Ebag(Pixel Art)", projectType: "", profileNoId: "", projectAmount: 50, amountReceived: 50, afterDeduction: 47.75, amountRemaining: 0, salesRepName: "Raheel", date: "2025-09-01", projectStatus: "Completed", artistCost: 3500, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-2", clientName: "Almerz(half-body)", projectType: "", profileNoId: "", projectAmount: 70, amountReceived: 70, afterDeduction: 66.62, amountRemaining: 0, salesRepName: "Haseeb", date: "2025-09-03", projectStatus: "Completed", artistCost: 4000, paymentMerchant: "Stripe", isWithdrawn: false },
    { id: "proj-3", clientName: "Almerz(Background)", projectType: "", profileNoId: "", projectAmount: 40, amountReceived: 40, afterDeduction: 37.94, amountRemaining: 0, salesRepName: "Haseeb", date: "2025-09-05", projectStatus: "Completed", artistCost: 2500, paymentMerchant: "Stripe", isWithdrawn: false },
    { id: "proj-4", clientName: "Ebag (Full Body)", projectType: "", profileNoId: "", projectAmount: 200, amountReceived: 200, afterDeduction: 194.02, amountRemaining: 0, salesRepName: "Raheel", date: "2025-09-05", projectStatus: "Completed", artistCost: 5000, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-5", clientName: "Chex (3 Bustup)", projectType: "", profileNoId: "", projectAmount: 50, amountReceived: 25, afterDeduction: 24, amountRemaining: 0, salesRepName: "Hasnain", date: "2025-09-09", projectStatus: "Cancelled", artistCost: 3000, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-6", clientName: "ECK (Full Body with Background)", projectType: "", profileNoId: "Profile 8 and garu_cane", projectAmount: 180, amountReceived: 40, afterDeduction: 38.2, amountRemaining: 0, salesRepName: "Riyan", date: "2025-09-14", projectStatus: "Completed", artistCost: 11000, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-7", clientName: "Logo Design", projectType: "", profileNoId: "", projectAmount: 130, amountReceived: 165, afterDeduction: 160.07, amountRemaining: 0, salesRepName: "Hasnain", date: "2025-09-18", projectStatus: "Completed", artistCost: 8500, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-8", clientName: "Ashlen Kunz - Radni", projectType: "", profileNoId: "", projectAmount: 100, amountReceived: 103, afterDeduction: 100, amountRemaining: 0, salesRepName: "Raheel", date: "2025-09-27", projectStatus: "Completed", artistCost: 3500, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-9", clientName: "Vulkan Wrath", projectType: "", profileNoId: "", projectAmount: 100, amountReceived: 50, afterDeduction: 47.75, amountRemaining: 50, salesRepName: "Aryan", date: "2025-09-27", projectStatus: "In Progress", artistCost: 7500, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-10", clientName: "Ebag", projectType: "", profileNoId: "", projectAmount: 100, amountReceived: 100, afterDeduction: 97.01, amountRemaining: 0, salesRepName: "Raheel", date: "2025-09-30", projectStatus: "Completed", artistCost: 0, paymentMerchant: "Paypal (Vortex)", isWithdrawn: false },
    { id: "proj-11", clientName: "Ashlen Kunz (background) - Radni", projectType: "", profileNoId: "", projectAmount: 40, amountReceived: 40, afterDeduction: 37.94, amountRemaining: 0, salesRepName: "Raheel", date: "2025-09-30", projectStatus: "Completed", artistCost: 1500, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-12", clientName: "ECK 2nd Installment", projectType: "", profileNoId: "Profile 8 and garu_cane", projectAmount: 0, amountReceived: 50, afterDeduction: 47.75, amountRemaining: 0, salesRepName: "Riyan", date: "2025-10-01", projectStatus: "Completed", artistCost: 0, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-13", clientName: "Daniel Paulson 1/3", projectType: "", profileNoId: "", projectAmount: 230, amountReceived: 50, afterDeduction: 47.75, amountRemaining: 0, salesRepName: "Ali Hasan", date: "2025-10-02", projectStatus: "In Progress", artistCost: 10000, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-14", clientName: "Ebag", projectType: "", profileNoId: "Profile21 arrow_kib", projectAmount: 200, amountReceived: 194.02, afterDeduction: 194.02, amountRemaining: 0, salesRepName: "Raheel", date: "2025-10-02", projectStatus: "Completed", artistCost: 0, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-15", clientName: "ECK Final", projectType: "Full Body", profileNoId: "Profile 8 and garu_cane", projectAmount: 0, amountReceived: 90, afterDeduction: 85.96, amountRemaining: 0, salesRepName: "Riyan", date: "2025-10-07", projectStatus: "Completed", artistCost: 0, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-16", clientName: "Z 1/2", projectType: "Bustup", profileNoId: "", projectAmount: 140, amountReceived: 40, afterDeduction: 38.8, amountRemaining: 100, salesRepName: "Ali Hasan", date: "2025-10-07", projectStatus: "Completed", artistCost: 4500, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-17", clientName: "Ollie", projectType: "2 X Full Body", profileNoId: "", projectAmount: 350, amountReceived: 339.53, afterDeduction: 339.53, amountRemaining: 0, salesRepName: "Aryan", date: "2025-10-10", projectStatus: "Completed", artistCost: 13000, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-18", clientName: "Daniel Paulson 2/3", projectType: "Full Body", profileNoId: "", projectAmount: 0, amountReceived: 90, afterDeduction: 87.2, amountRemaining: 0, salesRepName: "Ali Hasan", date: "2025-10-11", projectStatus: "Completed", artistCost: 0, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-19", clientName: "Z 2/2", projectType: "Bustup + BG", profileNoId: "", projectAmount: 0, amountReceived: 120, afterDeduction: 116.41, amountRemaining: 0, salesRepName: "Ali Hasan", date: "2025-10-11", projectStatus: "Completed", artistCost: 0, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-20", clientName: "Grey Lynx Bustup 1/2", projectType: "Bustup", profileNoId: "", projectAmount: 150, amountReceived: 50, afterDeduction: 47.75, amountRemaining: 0, salesRepName: "Riyan", date: "2025-10-17", projectStatus: "Completed", artistCost: 7500, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-21", clientName: "Ebag", projectType: "FullBody w BG", profileNoId: "Profile21 arrow_kib", projectAmount: 280, amountReceived: 280, afterDeduction: 267, amountRemaining: 0, salesRepName: "Raheel", date: "2025-10-17", projectStatus: "Completed", artistCost: 8000, paymentMerchant: "Paypal (Vortex)", isWithdrawn: false },
    { id: "proj-22", clientName: "Owl God", projectType: "FullBody w BG", profileNoId: "", projectAmount: 150, amountReceived: 48.5, afterDeduction: 48.5, amountRemaining: 100, salesRepName: "Aryan", date: "2025-10-17", projectStatus: "In Progress", artistCost: 0, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-23", clientName: "Zipperon Disney", projectType: "Group Art", profileNoId: "", projectAmount: 250, amountReceived: 48.5, afterDeduction: 48.5, amountRemaining: 200, salesRepName: "Aryan", date: "2025-10-21", projectStatus: "In Progress", artistCost: 8000, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-24", clientName: "Grey Lynx Bustup 2/2", projectType: "BustUp", profileNoId: "Profile 8 and garu_cane", projectAmount: 0, amountReceived: 70, afterDeduction: 67.91, amountRemaining: 0, salesRepName: "Riyan", date: "2025-10-17", projectStatus: "Completed", artistCost: 9000, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-25", clientName: "DrZalmat", projectType: "Full Body", profileNoId: "", projectAmount: 180, amountReceived: 180, afterDeduction: 174.62, amountRemaining: 0, salesRepName: "Ali Hasan", date: "2025-10-30", projectStatus: "Completed", artistCost: 8500, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-26", clientName: "Elska", projectType: "Bustup 1/3", profileNoId: "profilr 25 zeno_arc", projectAmount: 100, amountReceived: 20, afterDeduction: 18.7, amountRemaining: 40, salesRepName: "Raheel", date: "2025-10-30", projectStatus: "In Progress", artistCost: 4500, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-27", clientName: "Mathew", projectType: "PFP", profileNoId: "Profile 9 and para cane", projectAmount: 50, amountReceived: 51.75, afterDeduction: 50, amountRemaining: 0, salesRepName: "Riyan", date: "2025-10-31", projectStatus: "In Progress", artistCost: 2500, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-28", clientName: "Chuttu", projectType: "Full Body", profileNoId: "Profile 2 and Jake_ARC", projectAmount: 180, amountReceived: 60, afterDeduction: 57.5, amountRemaining: 120, salesRepName: "Hasnain", date: "2025-10-31", projectStatus: "In Progress", artistCost: 9000, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-29", clientName: "Ebag", projectType: "Full Body", profileNoId: "Profile21 arrow kib", projectAmount: 200, amountReceived: 200, afterDeduction: 194.02, amountRemaining: 0, salesRepName: "Raheel", date: "2025-10-31", projectStatus: "In Progress", artistCost: 0, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-30", clientName: "ClassyWolf", projectType: "Half Body", profileNoId: "Profile 1 & xsoi", projectAmount: 150, amountReceived: 150, afterDeduction: 146, amountRemaining: 0, salesRepName: "Hasnain", date: "2025-11-03", projectStatus: "Completed", artistCost: 6000, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-31", clientName: "Orkie", projectType: "Half Body", profileNoId: "", projectAmount: 120, amountReceived: 120, afterDeduction: 117, amountRemaining: 0, salesRepName: "Aryan", date: "2025-11-04", projectStatus: "Completed", artistCost: 6500, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-32", clientName: "Jackbot", projectType: "Group Art", profileNoId: "", projectAmount: 700, amountReceived: 50, afterDeduction: 47.75, amountRemaining: 650, salesRepName: "Aryan", date: "2025-11-04", projectStatus: "In Progress", artistCost: 0, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-33", clientName: "DM", projectType: "Pokemon Scene", profileNoId: "", projectAmount: -250, amountReceived: -100, afterDeduction: -97.01, amountRemaining: -150, salesRepName: "Aryan", date: "2025-11-06", projectStatus: "Refunded", artistCost: 0, paymentMerchant: "Zelle (847-609-9117)", isWithdrawn: false },
    { id: "proj-34", clientName: "AchtungKitten", projectType: "Half Body", profileNoId: "Profile 26", projectAmount: 130, amountReceived: 130, afterDeduction: 124, amountRemaining: 0, salesRepName: "Ali Hasan", date: "2025-11-06", projectStatus: "In Progress", artistCost: 5000, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-35", clientName: "Supreme", projectType: "Slot Booking", profileNoId: "Profile 14", projectAmount: 100, amountReceived: 100, afterDeduction: 97.01, amountRemaining: 0, salesRepName: "Haseeb", date: "2025-11-07", projectStatus: "In Progress", artistCost: 0, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-36", clientName: "Supreme", projectType: "Slot Booking", profileNoId: "Profile 14", projectAmount: 400, amountReceived: 400, afterDeduction: 379.18, amountRemaining: 0, salesRepName: "Haseeb", date: "2025-11-09", projectStatus: "In Progress", artistCost: 0, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-37", clientName: "Hammock", projectType: "Full Body", profileNoId: "23", projectAmount: 200, amountReceived: 200, afterDeduction: 194.02, amountRemaining: 0, salesRepName: "Raheel", date: "2025-11-11", projectStatus: "In Progress", artistCost: 0, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-38", clientName: "Tigger", projectType: "Group Art (4 Full Bodies)", profileNoId: "Profile 2 & DM ARC", projectAmount: 700, amountReceived: 700, afterDeduction: 679.07, amountRemaining: 0, salesRepName: "Hasnain", date: "2025-11-12", projectStatus: "In Progress", artistCost: 33000, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-39", clientName: "Mule_Sig", projectType: "Full Body", profileNoId: "Profile 12 & Supreme", projectAmount: 180, amountReceived: 90, afterDeduction: 85.96, amountRemaining: 90, salesRepName: "Haseeb", date: "2025-11-12", projectStatus: "In Progress", artistCost: 7500, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-40", clientName: "OwerLord", projectType: "Full Body", profileNoId: "Profile 2 & DM ARC", projectAmount: 200, amountReceived: 200, afterDeduction: 194.02, amountRemaining: 0, salesRepName: "Hasnain", date: "2025-11-12", projectStatus: "In Progress", artistCost: 0, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-41", clientName: "Ebag (Total $450)", projectType: "Full Body", profileNoId: "Profile21 arrow_kib", projectAmount: 50, amountReceived: 50, afterDeduction: 48, amountRemaining: 0, salesRepName: "Raheel", date: "2025-11-12", projectStatus: "In Progress", artistCost: 0, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-42", clientName: "ClassyWolf", projectType: "?", profileNoId: "Profile 1 & xsoi", projectAmount: 600, amountReceived: 605, afterDeduction: 598, amountRemaining: 0, salesRepName: "Hasnain", date: "2025-11-15", projectStatus: "In Progress", artistCost: 0, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-43", clientName: "?", projectType: "?", profileNoId: "?", projectAmount: 30, amountReceived: 30, afterDeduction: 28, amountRemaining: 0, salesRepName: "Ali Hasan", date: "2025-11-15", projectStatus: "In Progress", artistCost: 0, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false },
    { id: "proj-44", clientName: "Ebag Animation (slot booking)", projectType: "Animation", profileNoId: "Profile21 arrow_kib", projectAmount: 100, amountReceived: 100, afterDeduction: 97.01, amountRemaining: 0, salesRepName: "Raheel", date: "2025-11-15", projectStatus: "In Progress", artistCost: 0, paymentMerchant: "Paypal (Vortex)", isWithdrawn: false },
    { id: "proj-45", clientName: "Elska", projectType: "Bustup 2/3", profileNoId: "profilr 25 zeno_arc", projectAmount: 0, amountReceived: 40, afterDeduction: 38, amountRemaining: 0, salesRepName: "Raheel", date: "2025-11-16", projectStatus: "In Progress", artistCost: 0, paymentMerchant: "Paypal (Huzaifa)", isWithdrawn: false }
];

const HISTORICAL_WITHDRAWN_PROJECT_IDS = [
    'proj-1', 'proj-2', 'proj-3', 'proj-4', 'proj-5', 'proj-6', 'proj-7', 'proj-8', 'proj-9', 'proj-10',
    'proj-11', 'proj-12', 'proj-13', 'proj-14', 'proj-15', 'proj-16', 'proj-17', 'proj-18', 'proj-19', 'proj-20',
    'proj-21', 'proj-29'
];

export const INITIAL_PROJECTS: ProjectType[] = projects.map(p => 
    HISTORICAL_WITHDRAWN_PROJECT_IDS.includes(p.id) ? { ...p, isWithdrawn: true } : p
);


export const INITIAL_GOLOGIN_PROFILES: GoLoginProfileType[] = [
    {
        "id": "gologin-1", "gologinProfileNumber": "1", "assignedRep": "Hasnain", "accounts": [
            { "id": "discord-1-1", "discordId": "peanutnmukwa", "discordEmail": "peanutnmukwa@hotmail.com", "discordPassword": "Nuan@3333", "emailPassword": "peanutnmukwa6563@smvmail.com", "creationYear": "2017", "twoFactorKey": "nllq 364m 76kd z46t c3dn exds syug gdd4", "status": "Working" },
            { "id": "discord-1-2", "discordId": "unereel", "discordEmail": "unereel@mail.com", "discordPassword": "Future1102k1@@!", "emailPassword": "Future1102k1@@!", "creationYear": "2018", "twoFactorKey": "tsey izk4 ntzh z4cp kwbf qmrk nk37 c2rd", "status": "Working" }
        ]
    },
    {
        "id": "gologin-2", "gologinProfileNumber": "2", "assignedRep": "Hasnain", "accounts": [
            { "id": "discord-2-1", "discordId": "alex-moreno36", "discordEmail": "alex-moreno36@hotmail.com", "discordPassword": "Nuan@3333", "emailPassword": "alex-moreno366563@smvmail.com", "creationYear": "2017", "twoFactorKey": "ouzb y4wb utam fpx6 5w5n 7kms fu5z 44pu", "status": "Working" },
            { "id": "discord-2-2", "discordId": "screwyou222", "discordEmail": "screwyou222@mail.com", "discordPassword": "Fuhalm123@!", "emailPassword": "Fuhalm123@!", "creationYear": "2018", "twoFactorKey": "76bm tbbn Ibuz asny h5e4 x4jt 5g13 ekz3", "status": "Working" }
        ]
    },
    {
        "id": "gologin-3", "gologinProfileNumber": "3", "assignedRep": "Hasnain", "accounts": [
            { "id": "discord-3-1", "discordId": "gustavin.g3", "discordEmail": "gustavin.g3@hotmail.com", "discordPassword": "Nuan@3333", "emailPassword": "gustavin.g36563@smvmail.com", "creationYear": "2017", "twoFactorKey": "zpxu dbmn bjur uvaz 3let p6iy mjkl tgmk", "status": "Working" },
            { "id": "discord-3-2", "discordId": "monogarova62", "discordEmail": "monogarova62@mail.com", "discordPassword": "UPmfW6!T3vFJzP2", "emailPassword": "UPmfW6!T3vFJzP3", "creationYear": "2018", "twoFactorKey": "fxkd 5qpb ulpn s6io vgnf knnf ydjs bjwg", "status": "Working" }
        ]
    },
    {
        "id": "gologin-4", "gologinProfileNumber": "4", "assignedRep": "Hasnain", "accounts": [
            { "id": "discord-4-1", "discordId": "dianehullminus 1989qei", "discordEmail": "dianehullminus 1989qei@hotmail.com", "discordPassword": "Mmcvat539m", "emailPassword": "dianehullminus 1989qeidnv@smvmail.com", "creationYear": "2017", "twoFactorKey": "t617 vi3x pv2k gcwk dzo5 yuvm tspo g4ru", "status": "Working" },
            { "id": "discord-4-2", "discordId": "reddinglee", "discordEmail": "reddinglee@mail.com", "discordPassword": "Mt$9!qdj&sl4", "emailPassword": "Mt$9!qdj&s15", "creationYear": "2018", "twoFactorKey": "rv54 cjrv wdcy 42td 4a5c fizc cfqm pamz", "status": "Working" }
        ]
    },
    {
        "id": "gologin-5", "gologinProfileNumber": "5", "assignedRep": "Hasnain", "accounts": [
            { "id": "discord-5-1", "discordId": "ying.aot11", "discordEmail": "ying.aot11@hotmail.com", "discordPassword": "Nuan@3333", "emailPassword": "ying.aot116563@smvmail.com", "creationYear": "2017", "twoFactorKey": "iavu dite 3uuu xd2t ooy7 axo2 gag7 wrta", "status": "Working" },
            { "id": "discord-5-2", "discordId": "tjrgus0908", "discordEmail": "tjrgus0908@mail.com", "discordPassword": "Cham12yY0@@!", "emailPassword": "Cham12yY0@@!", "creationYear": "2018", "twoFactorKey": "3oe7 6moo zgla fjog jxx7 6zwr f6e6 yfhp", "status": "Working" }
        ]
    },
    {
        "id": "gologin-6", "gologinProfileNumber": "6", "assignedRep": "Riyan", "accounts": [
            { "id": "discord-6-1", "discordId": "oliverriverspearman", "discordEmail": "oliverriverspearman@mail.com", "discordPassword": "jiucY1241Khe", "emailPassword": "RVJV9jau469F", "creationYear": "2018", "twoFactorKey": "wxcx bn5z mhtx fqcx f6pb wjlr v4r2 Iscl", "status": "Working" }
        ]
    },
    {
        "id": "gologin-7", "gologinProfileNumber": "7", "assignedRep": "Riyan", "accounts": [
            { "id": "discord-7-1", "discordId": "vhomyakin", "discordEmail": "vhomyakin@mail.com", "discordPassword": "Futurfg11FA@@!", "emailPassword": "Futurfg11FA@@!", "creationYear": "2018", "twoFactorKey": "tuwx asdu okiu 55dm v5mn g2cc ww5m fffl", "status": "Working" }
        ]
    },
    {
        "id": "gologin-8", "gologinProfileNumber": "8", "assignedRep": "Riyan", "accounts": [
            { "id": "discord-8-1", "discordId": "rayt195", "discordEmail": "rayt195@mail.com", "discordPassword": "Q7j!8wpKjyz90", "emailPassword": "Q7j!8wpKjyz91", "creationYear": "2018", "twoFactorKey": "wn2i i7wc f5mt otpw kk42 lvjx 3gmn 5wwu", "status": "Working" }
        ]
    },
    {
        "id": "gologin-9", "gologinProfileNumber": "9", "assignedRep": "Riyan", "accounts": [
            { "id": "discord-9-1", "discordId": "polchecaccasanova", "discordEmail": "polchecaccasanova@mail.com", "discordPassword": "Vkiu0211e@#!", "emailPassword": "Vkiu0211e@#!", "creationYear": "2018", "twoFactorKey": "i2i4 mgru kck6 vi7r blbx yawj ovu7 z3ar", "status": "Working" }
        ]
    },
    {
        "id": "gologin-10", "gologinProfileNumber": "10", "assignedRep": "Riyan", "accounts": [
            { "id": "discord-10-1", "discordId": "mayabxvjj5", "discordEmail": "mayabxvjj5@gmail.com", "discordPassword": "ahmad3027ii", "emailPassword": "Gmail@@1122", "creationYear": "2017", "twoFactorKey": "", "status": "Working" }
        ]
    },
    {
        "id": "gologin-11", "gologinProfileNumber": "11", "assignedRep": "Haseeb", "accounts": [
            { "id": "discord-11-1", "discordId": "ura.gagarin", "discordEmail": "ura.gagarin@mail.com", "discordPassword": "Vkiu0211e@#!", "emailPassword": "Vkiu0211e@#!", "creationYear": "2018", "twoFactorKey": "2t7p t4qb ytc4 wxll i4mf kqaw kncy Iqav", "status": "Working" },
            { "id": "discord-11-2", "discordId": "alexanderstuart85", "discordEmail": "alexanderstuart85@mail.com", "discordPassword": "KK6kr2v6Ms9r", "emailPassword": "4Ax1WXjH5Z6W", "creationYear": "2018", "twoFactorKey": "atsu 42te lws5 x2sh v344 2sga fvsw eu6m", "status": "Working" }
        ]
    },
    {
        "id": "gologin-12", "gologinProfileNumber": "12", "assignedRep": "Haseeb", "accounts": [
            { "id": "discord-12-1", "discordId": "elena_garutova", "discordEmail": "elena_garutova@mail.com", "discordPassword": "Futurfg11FA@@!", "emailPassword": "Futurfg11FA@@!", "creationYear": "2018", "twoFactorKey": "3mdr rwns oo6b 2rlm a6vc 75wn nlk7 qhr7", "status": "Working" },
            { "id": "discord-12-2", "discordId": "mikeywhyte", "discordEmail": "mikeywhyte@mail.com", "discordPassword": "s1fkC1BMK$!sD", "emailPassword": "s1fkC1BMK$!sD", "creationYear": "2018", "twoFactorKey": "c6sa dxx2 ddvw toqe zyi3 6161 a2zm r2wg", "status": "Working" }
        ]
    },
    {
        "id": "gologin-13", "gologinProfileNumber": "13", "assignedRep": "Haseeb", "accounts": [
            { "id": "discord-13-1", "discordId": "samsyng197", "discordEmail": "samsyng197@mail.com", "discordPassword": "Fut67con49@!", "emailPassword": "Fut67con49@!", "creationYear": "2018", "twoFactorKey": "ewak 2zm4 hz2y qtc5 gcy3 t3n4 zfmf p5ow", "status": "Working" },
            { "id": "discord-13-2", "discordId": "sb22sb", "discordEmail": "sb22sb@mail.com", "discordPassword": "Chanlam120@@!", "emailPassword": "Chanlam120@@!", "creationYear": "2018", "twoFactorKey": "xxc5 4jli 5f5o 3n2e z2mu mqmi icrh iezi", "status": "Working" }
        ]
    },
    {
        "id": "gologin-14", "gologinProfileNumber": "14", "assignedRep": "Haseeb", "accounts": [
            { "id": "discord-14-1", "discordId": "ratatik22", "discordEmail": "ratatik22@mail.com", "discordPassword": "Kk06T039nS7F", "emailPassword": "ae04MG1zpdqg", "creationYear": "2018", "twoFactorKey": "6xnh opbl xycd ojiy t2c7 z3oa dl6h nih6", "status": "Working" },
            { "id": "discord-14-2", "discordId": "silverlego", "discordEmail": "silverlego@mail.com", "discordPassword": "hBQnW93A889f", "emailPassword": "8eQsbfP890hz", "creationYear": "2018", "twoFactorKey": "i2vr 6k5r 2amm wv6z ikb6 yhor h33w cswn", "status": "Working" }
        ]
    },
    {
        "id": "gologin-15", "gologinProfileNumber": "15", "assignedRep": "Haseeb", "accounts": [
            { "id": "discord-15-1", "discordId": "skrtdog", "discordEmail": "skrtdog@mail.com", "discordPassword": "c7603JWJ1jMG", "emailPassword": "jliQe787R0t3", "creationYear": "2018", "twoFactorKey": "15fp aw5t qgoq tmoh 2ru7 u2sv ga3j odc2", "status": "Working" },
            { "id": "discord-15-2", "discordId": "wagnermatt", "discordEmail": "wagnermatt@mail.com", "discordPassword": "Vkiu0211e@#!", "emailPassword": "Vkiu0211e@#!", "creationYear": "2018", "twoFactorKey": "jcof azap z4tj mjtf tvyf 4nat vtc4 xtdd", "status": "Working" }
        ]
    },
    {
        "id": "gologin-16", "gologinProfileNumber": "16", "assignedRep": "Aryan", "accounts": [
            { "id": "discord-16-1", "discordId": "tavion12", "discordEmail": "tavion12@mail.com", "discordPassword": "Future11ko1@@!", "emailPassword": "Future11ko1@@!", "creationYear": "2018", "twoFactorKey": "koo2 vdrq 14vo zmf7 ak4g wbzp pltn mvul", "status": "Working" },
            { "id": "discord-16-2", "discordId": "markdjenkins", "discordEmail": "markdjenkins@mail.com", "discordPassword": "mzYmz6hME1W7t!", "emailPassword": "mzYmz6hME1W7t!", "creationYear": "2018", "twoFactorKey": "fphl fogk fqkn c42g yi2y pfvr Izta 5coy", "status": "Working" }
        ]
    },
    {
        "id": "gologin-17", "gologinProfileNumber": "17", "assignedRep": "Aryan", "accounts": [
            { "id": "discord-17-1", "discordId": "ongos460", "discordEmail": "ongos460@mail.com", "discordPassword": "!Tpr5zok7TU2zssz", "emailPassword": "!Tpr5zok7TU2zssz", "creationYear": "2018", "twoFactorKey": "q362 nvao be76 7amv inbg pqgb j4kr avrc", "status": "Working" },
            { "id": "discord-17-2", "discordId": "legoman4205", "discordEmail": "legoman4205@mail.com", "discordPassword": "IwQBW4$DN6MQ", "emailPassword": "IwQBW4$DN6MQ", "creationYear": "2018", "twoFactorKey": "tp3o 2h3q 3qg4 bhlm jl36 aczh lwz5 nzzo", "status": "Working" }
        ]
    },
    {
        "id": "gologin-18", "gologinProfileNumber": "18", "assignedRep": "Aryan", "accounts": [
            { "id": "discord-18-1", "discordId": "ususjsu", "discordEmail": "ususjsu@mail.com", "discordPassword": "Future11ko1@@!", "emailPassword": "Future11ko1@@!", "creationYear": "2018", "twoFactorKey": "v5t3 rr4x jvr5 wdyx g5oz e64z ppbp 7ijb", "status": "Working" },
            { "id": "discord-18-2", "discordId": "olzhas2002olzhas", "discordEmail": "olzhas2002olzhas@mail.com", "discordPassword": "Cham12yY0@@!", "emailPassword": "Cham12yY0@@!", "creationYear": "2018", "twoFactorKey": "rwh5 033b nso7 xkeu 57bj cx65 vslx vj4p", "status": "Working" }
        ]
    },
    {
        "id": "gologin-19", "gologinProfileNumber": "19", "assignedRep": "Aryan", "accounts": [
            { "id": "discord-19-1", "discordId": "redcodehq", "discordEmail": "redcodehq@mail.com", "discordPassword": "Future11Gil1@!", "emailPassword": "Future11Gil1@!", "creationYear": "2018", "twoFactorKey": "voxm 72iq umbp b67i xpqy qac3 orod 5vwr", "status": "Working" },
            { "id": "discord-19-2", "discordId": "achebykin56artem", "discordEmail": "achebykin56artem@mail.com", "discordPassword": "Future11ko1@@!", "emailPassword": "Future11ko1@@!", "creationYear": "2018", "twoFactorKey": "frqi Imx3 vvx6 tbtn 6ef6 4knp 6qsu ilyb", "status": "Working" }
        ]
    },
    {
        "id": "gologin-20", "gologinProfileNumber": "20", "assignedRep": "Aryan", "accounts": [
            { "id": "discord-20-1", "discordId": "vovaslepov", "discordEmail": "vovaslepov@mail.com", "discordPassword": "FutTaimk15@!", "emailPassword": "FutTaimk15@!", "creationYear": "2018", "twoFactorKey": "zydo dyyn e4zb 3zrh mdsb w7lx dh4f Iqga", "status": "Working" },
            { "id": "discord-20-2", "discordId": "tntfox", "discordEmail": "tntfox@mail.com", "discordPassword": "Vkiu42343@#!", "emailPassword": "Vkiu42343@#!", "creationYear": "2018", "twoFactorKey": "zjln 4x33 nuya mash cozi co7e hkyk fj7x", "status": "Working" }
        ]
    },
    {
        "id": "gologin-21", "gologinProfileNumber": "21", "assignedRep": "Raheel", "accounts": [
            { "id": "discord-21-1", "discordId": "luka_mindiashvili", "discordEmail": "luka_mindiashvili@mail.com", "discordPassword": "Fuhalm10a3@!", "emailPassword": "Fuhalm10a3@!", "creationYear": "2018", "twoFactorKey": "ntt6 cjte kndn 3y2i hecb ye7f easi 7gwg", "status": "Working" },
            { "id": "discord-21-2", "discordId": "katya-zdanova-1999", "discordEmail": "katya-zdanova-1999@mail.com", "discordPassword": "FTran Thanh2@@!", "emailPassword": "FTranThanh2@@!", "creationYear": "2018", "twoFactorKey": "2xib elz6 b4sd ab37 ou4t n7ik jvji xnl5", "status": "Working" }
        ]
    },
    {
        "id": "gologin-22", "gologinProfileNumber": "22", "assignedRep": "Raheel", "accounts": [
            { "id": "discord-22-1", "discordId": "masterstag", "discordEmail": "masterstag@mail.com", "discordPassword": "y4XthPAvN$CXfqsR", "emailPassword": "y4XthPAvN$CXfqsR", "creationYear": "2018", "twoFactorKey": "nse2 3hge ed74 aug2 73pi plw7 okzx dsbw", "status": "Working" },
            { "id": "discord-22-2", "discordId": "valerchic", "discordEmail": "valerchic@mail.com", "discordPassword": "Future11ko1@@!", "emailPassword": "Future11ko1@@!", "creationYear": "2017", "twoFactorKey": "hjbv xj7j r4qh 647u hsem lwlz 7klu mfhk", "status": "Working" }
        ]
    },
    {
        "id": "gologin-23", "gologinProfileNumber": "23", "assignedRep": "Raheel", "accounts": [
            { "id": "discord-23-1", "discordId": "vandersonmedeiros", "discordEmail": "vandersonmedeiros@mail.com", "discordPassword": "Future110V65N1@#", "emailPassword": "Future110V65N1@#", "creationYear": "2018", "twoFactorKey": "nldq 4khd 5ehk 3706 i3yd ndgj d3jc 5paw", "status": "Working" },
            { "id": "discord-23-2", "discordId": "marchenkova", "discordEmail": "marchenkova@mail.com", "discordPassword": "3r3uS$bulqxl&f5", "emailPassword": "3r3uS$bulqxl&f6", "creationYear": "2018", "twoFactorKey": "tjgl msof be77 onki pihv zkvk d344 c2rg", "status": "Working" }
        ]
    },
    {
        "id": "gologin-24", "gologinProfileNumber": "24", "assignedRep": "Raheel", "accounts": [
            { "id": "discord-24-1", "discordId": "rage.killer", "discordEmail": "rage.killer@mail.com", "discordPassword": "SoMzkPNhmROt", "emailPassword": "aZyGNDPdtORt", "creationYear": "2018", "twoFactorKey": "2wp6 req4 z2ey ygve yb6z qlwc uxxn gair", "status": "Working" },
            { "id": "discord-24-2", "discordId": "jackwebber36", "discordEmail": "jackwebber36@mail.com", "discordPassword": "16!662UawXITeh2p", "emailPassword": "16!662UawXITeh2p", "creationYear": "2018", "twoFactorKey": "wqjx p4uc ugol gnfm pcon ugal imni x74v", "status": "Working" }
        ]
    },
    {
        "id": "gologin-25", "gologinProfileNumber": "25", "assignedRep": "Raheel", "accounts": [
            { "id": "discord-25-1", "discordId": "Hudaya540", "discordEmail": "Hudaya540@gmail.com", "discordPassword": "0B3uSL3zlyFS", "emailPassword": "16A6LMDQ19cy", "creationYear": "2017", "twoFactorKey": "tp3h bam6 5j2f lic4 7gw5 63qp ij7b vijl", "status": "Working" },
            { "id": "discord-25-2", "discordId": "torf365", "discordEmail": "torf365@mail.com", "discordPassword": "Vkiu0211e@#!", "emailPassword": "Vkiu0211e@#!", "creationYear": "2018", "twoFactorKey": "h5lc hu6p lbmb dt7p uzhl x7ss ybqf n4wg", "status": "Working" }
        ]
    },
    {
        "id": "gologin-26", "gologinProfileNumber": "26", "assignedRep": "Ali", "accounts": [
            { "id": "discord-26-1", "discordId": "ananyaa.nissar", "discordEmail": "ananyaa.nissar@hotmail.com", "discordPassword": "Nuan@3333", "emailPassword": "ananyaa.nissar6563@smvmail.com", "creationYear": "2017", "twoFactorKey": "15lm 5tft pxtn 4kut 3wmx a6to fjlu aqc5", "status": "Working" },
            { "id": "discord-26-2", "discordId": "michaelt687", "discordEmail": "michaelt687@mail.com", "discordPassword": "LQ14V!7G0CwgDy", "emailPassword": "LQ14V!7G0CwgDy", "creationYear": "2018", "twoFactorKey": "e56l vldt o75u h3ka 2c4e obpd rt5v y2n2", "status": "Working" }
        ]
    },
    {
        "id": "gologin-27", "gologinProfileNumber": "27", "assignedRep": "Ali", "accounts": [
            { "id": "discord-27-1", "discordId": "djdd80806060", "discordEmail": "djdd80806060@gmail.com", "discordPassword": "Nuan@3333", "emailPassword": "ahmad3027", "creationYear": "2017", "twoFactorKey": "", "status": "Working" },
            { "id": "discord-27-2", "discordId": "naktiyassine", "discordEmail": "naktiyassine@mail.com", "discordPassword": "$BATufW8RtBz", "emailPassword": "$BATufW8RtBz", "creationYear": "2018", "twoFactorKey": "4z4e atel p5ec euu5 7ozd srhk vigf efbe", "status": "Working" }
        ]
    },
    {
        "id": "gologin-28", "gologinProfileNumber": "28", "assignedRep": "Ali", "accounts": [
            { "id": "discord-28-1", "discordId": "marilyn.32creative", "discordEmail": "marilyn.32creative@outlook.com", "discordPassword": "2KIIF9g5q3iP207", "emailPassword": "marilyn.32creative11v@smvmail.com", "creationYear": "2017", "twoFactorKey": "22hk dv63 43ok ygey tgbg yo3u rvet vh6k", "status": "Working" },
            { "id": "discord-28-2", "discordId": "tammit01", "discordEmail": "tammit01@mail.com", "discordPassword": "Futuxeme13@!", "emailPassword": "Futuxeme13@!", "creationYear": "2018", "twoFactorKey": "mehq 3sgr ut23 u4tf 6r6n 6peu 2fmx kc3u", "status": "Working" }
        ]
    },
    {
        "id": "gologin-29", "gologinProfileNumber": "29", "assignedRep": "Ali", "accounts": [
            { "id": "discord-29-1", "discordId": "me.sophia8star.94", "discordEmail": "me.sophia8star.94@outlook.com", "discordPassword": "MWzZoyWkJr9uw7785", "emailPassword": "me.sophia8star.94gx8@smvmail.com", "creationYear": "2017", "twoFactorKey": "2wbs iftg 6j4w cx25 3nrj qntv hwym 7ycd", "status": "Working" },
            { "id": "discord-29-2", "discordId": "ratnadutta", "discordEmail": "ratnadutta@mail.com", "discordPassword": "5fbvgNvMy&S5", "emailPassword": "5fbvgNvMy&S6", "creationYear": "2018", "twoFactorKey": "h45r htxb hyie cyv7 h5gm apxx tz2j nx3w", "status": "Working" }
        ]
    },
    {
        "id": "gologin-30", "gologinProfileNumber": "30", "assignedRep": "Ali", "accounts": [
            { "id": "discord-30-1", "discordId": "kanal.koyzadu", "discordEmail": "kanal.koyzadu@hotmail.com", "discordPassword": "Nuan@3333", "emailPassword": "kanal.koyzadu6563@smvmail.com", "creationYear": "2017", "twoFactorKey": "zcij spbe u2cl edxf qpmp z4cb kf7k tww7", "status": "Working" },
            { "id": "discord-30-2", "discordId": "tommcternan", "discordEmail": "tommcternan@mail.com", "discordPassword": "Vkiu42343@#!", "emailPassword": "Vkiu42343@#!", "creationYear": "2018", "twoFactorKey": "mmwc lqp2 fh75 hshb pw56 aqe7 g72a ruyy", "status": "Working" }
        ]
    },
    {
        "id": "gologin-31", "gologinProfileNumber": "31", "assignedRep": "Hamza", "accounts": [
            { "id": "discord-31-1", "discordId": "saesaem54", "discordEmail": "saesaem54@gmail.com", "discordPassword": "459Yfn0;rHi", "emailPassword": "11)55xOGB+7]", "creationYear": "2017", "twoFactorKey": "bqvu jhfe iq7f Ifac ovhf ap7e jbnc sxsa", "status": "Working" }
        ]
    },
    {
        "id": "gologin-32", "gologinProfileNumber": "32", "assignedRep": "Hamza", "accounts": [
            { "id": "discord-32-1", "discordId": "tyronekfc1", "discordEmail": "tyronekfc1@mail.com", "discordPassword": "Future1LGsa@@!", "emailPassword": "Future1LGsa@@!", "creationYear": "2018", "twoFactorKey": "gpnw 4fnz jqlj uhvj oyqn wuzv fsvl xc5n", "status": "Working" },
            { "id": "discord-32-2", "discordId": "mugalmuga037", "discordEmail": "mugalmuga037@gmail.com", "discordPassword": "1K65K£a6)n5q", "emailPassword": "fX4^@XB~i5s1", "creationYear": "2017", "twoFactorKey": "udoy 6mm5 3slq ch2q eqak wu3g f5zd 633n", "status": "Working" }
        ]
    },
    {
        "id": "gologin-33", "gologinProfileNumber": "33", "assignedRep": "Hamza", "accounts": [
            { "id": "discord-33-1", "discordId": "peganovroman", "discordEmail": "peganovroman@mail.com", "discordPassword": "UxL!yUZF2E44tHu", "emailPassword": "UxL!yUZF2E44tHu", "creationYear": "2018", "twoFactorKey": "af5g gze6 qjbg mthl 24el tacz kmq6 km5s", "status": "Working" },
            { "id": "discord-33-2", "discordId": "gujarguj67", "discordEmail": "gujarguj67@gmail.com", "discordPassword": "@}6Dlr8osJ4)", "emailPassword": "s?mD787&aORC", "creationYear": "2017", "twoFactorKey": "cwpo wrzh bqv2 Irdu 73na 3isc 5jqj 6kbk", "status": "Working" }
        ]
    },
    {
        "id": "gologin-34", "gologinProfileNumber": "34", "assignedRep": "Dawood", "accounts": [
            { "id": "discord-34-1", "discordId": "alisan_2000", "discordEmail": "alisan_2000@mail.com", "discordPassword": "FutTai67k15@!", "emailPassword": "FutTai67k15@!", "creationYear": "2018", "twoFactorKey": "epgo 7rn4 a67g gyi4 36ec sevt mgsa htxu", "status": "Working" },
            { "id": "discord-34-2", "discordId": "zeshn13433", "discordEmail": "zeshn13433@gmail.com", "discordPassword": "LDzg1cVJ98Rk", "emailPassword": "nEj0x20yGCt8", "creationYear": "2017", "twoFactorKey": "kinb xytn gj2n jfau otjl sfje fc76 66vu", "status": "Working" }
        ]
    },
    {
        "id": "gologin-35", "gologinProfileNumber": "35", "assignedRep": "Dawood", "accounts": [
            { "id": "discord-35-1", "discordId": "bratva-s6", "discordEmail": "bratva-s6@mail.com", "discordPassword": "Futhaw11@$@!", "emailPassword": "Futhaw11@$@!", "creationYear": "2018", "twoFactorKey": "pnkj x74v jt45 nanz mz5j d74f nwde sfgg", "status": "Working" },
            { "id": "discord-35-2", "discordId": "bba620957", "discordEmail": "bba620957@gmail.com", "discordPassword": "00rN/uCoR%8m", "emailPassword": "d\\%47%0W%8sJ", "creationYear": "2017", "twoFactorKey": "kta2 nipx 3klr escg mwt7 b4uo 13nl xvon", "status": "Working" }
        ]
    },
    {
        "id": "gologin-36", "gologinProfileNumber": "36", "assignedRep": "Dawood", "accounts": [
            { "id": "discord-36-1", "discordId": "vjghf", "discordEmail": "vjghf@mail.com", "discordPassword": "v!l$8jxh4Gjh&vb", "emailPassword": "v!I$8jxh4Gjh&vb", "creationYear": "2018", "twoFactorKey": "4bfp of2n nslr wsos Inp2 24ef qgn4 zynl", "status": "Working" },
            { "id": "discord-36-2", "discordId": "w61938319", "discordEmail": "w61938319@gmail.com", "discordPassword": "oV; 1X2Y9G;%-", "emailPassword": "*dJR93/0spD", "creationYear": "2017", "twoFactorKey": "erbw lyrv frdy tidj dd7h py7z u6ip xgs5", "status": "Working" }
        ]
    },
    {
        "id": "gologin-37", "gologinProfileNumber": "37", "assignedRep": "Kabeer", "accounts": [
            { "id": "discord-37-1", "discordId": "oku238", "discordEmail": "oku238@mail.com", "discordPassword": "ix2!blKgpO7ICeS", "emailPassword": "ix2!blKgpO7ICES", "creationYear": "2018", "twoFactorKey": "57kd pq7u etx5 i2qc swbk so35 elrz orty", "status": "Working" },
            { "id": "discord-37-2", "discordId": "Jofar732", "discordEmail": "Jofar732@gmail.com", "discordPassword": "0297NE£X!x<$", "emailPassword": "f6rR=n200kw~", "creationYear": "2017", "twoFactorKey": "", "status": "Working" }
        ]
    },
    {
        "id": "gologin-38", "gologinProfileNumber": "38", "assignedRep": "Kabeer", "accounts": [
            { "id": "discord-38-1", "discordId": "iodine_", "discordEmail": "iodine_@mail.com", "discordPassword": "Future110211@@!", "emailPassword": "Future110211@@!", "creationYear": "2018", "twoFactorKey": "yrz7 squg gugo sro5 t2em b4sw yl6a jw3r", "status": "Working" },
            { "id": "discord-38-2", "discordId": "hafi1917622", "discordEmail": "hafi1917622@gmail.com", "discordPassword": "(DPcib%01V2g", "emailPassword": "Glx]y$h5ry00", "creationYear": "2017", "twoFactorKey": "", "status": "Working" }
        ]
    },
    {
        "id": "gologin-39", "gologinProfileNumber": "39", "assignedRep": "Kabeer", "accounts": [
            { "id": "discord-39-1", "discordId": "visikipoor", "discordEmail": "visikipoor@mail.com", "discordPassword": "Futhaw11@$@!", "emailPassword": "Futhaw11@$@!", "creationYear": "2018", "twoFactorKey": "pva4 u6r5 rip4 kezv xr71 k4wn 36sg keiv", "status": "Working" },
            { "id": "discord-39-2", "discordId": "farfarhan154", "discordEmail": "farfarhan154@gmail.com", "discordPassword": "Z0s618]=]e7(", "emailPassword": "4'<|Z406Ljr/", "creationYear": "2017", "twoFactorKey": "", "status": "Working" }
        ]
    },
    {
        "id": "gologin-40", "gologinProfileNumber": "40", "assignedRep": "Riyan", "accounts": [
            { "id": "discord-40-1", "discordId": "rumin_1998", "discordEmail": "rumin_1998@mail.com", "discordPassword": "Future211@ae@!", "emailPassword": "Future211@ae@!", "creationYear": "2018", "twoFactorKey": "xlgz jepy 5dns 33t4 hhk6 eiou kbmv dvin", "status": "Working" },
            { "id": "discord-40-2", "discordId": "Shansh399", "discordEmail": "Shansh399@gmail.com", "discordPassword": "#hUL<2t83=,L", "emailPassword": "c`YGL0IPn2@1", "creationYear": "2017", "twoFactorKey": "yxpc g3jf plsf 6qcb 724h orry mvk6 thm6", "status": "Working" }
        ]
    },
    {
        "id": "gologin-41", "gologinProfileNumber": "41", "assignedRep": "Riyan", "accounts": [
            { "id": "discord-41-1", "discordId": "christopher1492", "discordEmail": "christopher1492@mail.com", "discordPassword": "Futucon49@!", "emailPassword": "Futucon49@!", "creationYear": "2018", "twoFactorKey": "fr5u kwln zmvy gpwu hqvr z5d2 2b7d tlg3", "status": "Working" },
            { "id": "discord-41-2", "discordId": "ali64566676", "discordEmail": "ali64566676@gmail.com", "discordPassword": "m>[Zj2.{2}49", "emailPassword": "fE}1T1 XmP30", "creationYear": "2017", "twoFactorKey": "k37m vdjy vbjl fda7 fzgl gohv v306 4ube", "status": "Working" }
        ]
    },
    {
        "id": "gologin-42", "gologinProfileNumber": "42", "assignedRep": "Riyan", "accounts": [
            { "id": "discord-42-1", "discordId": "mayab25xjjj", "discordEmail": "mayab25xjjj@gmail.com", "discordPassword": "wQZ<?8L21(1@", "emailPassword": "SB0mF|uJ%S38", "creationYear": "2017", "twoFactorKey": "uhoe b7cg Irkh vni7 hmbh 6224 oonx hw4l", "status": "Working" },
            { "id": "discord-42-2", "discordId": "mohsan18181891", "discordEmail": "mohsan18181891@gmail.com", "discordPassword": "nA2753f7&=2{", "emailPassword": "Gj8j[7[=V}37", "creationYear": "2017", "twoFactorKey": "vbz3 o2a3 zlqe tcqg heam npsf p4qd fne2", "status": "Working" }
        ]
    },
    {
        "id": "gologin-43", "gologinProfileNumber": "43", "assignedRep": "Talha", "accounts": [
            { "id": "discord-43-1", "discordId": "h9252225", "discordEmail": "h9252225@gmail.com", "discordPassword": "7vP71ki4STFC", "emailPassword": "7M7fxQ13a9WI", "creationYear": "2017", "twoFactorKey": "3yig 4pto pqxx ehvd pn5z sgy7 ck2y wgpr", "status": "Working" },
            { "id": "discord-43-2", "discordId": "hafi258463", "discordEmail": "hafi258463@gmail.com", "discordPassword": "hUW062QDriuB", "emailPassword": "IVIGOB3sQ1H5", "creationYear": "2017", "twoFactorKey": "zqai zjq2 frhu pjja qnsm tjdb sh21 rfrn", "status": "Working" }
        ]
    },
    {
        "id": "gologin-44", "gologinProfileNumber": "44", "assignedRep": "Talha", "accounts": [
            { "id": "discord-44-1", "discordId": "mayab3728vcjnj", "discordEmail": "mayab3728vcjnj@gmail.com", "discordPassword": "893XxIK9904Q", "emailPassword": "aczWkC84bP3e", "creationYear": "2017", "twoFactorKey": "3h3j 2k7l 5i74 fkzr hnv5 ppun u7wp pbgw", "status": "Working" },
            { "id": "discord-44-2", "discordId": "Somia3027a", "discordEmail": "Somia3027a@gmail.com", "discordPassword": "7>A/WoP2L1Xh", "emailPassword": "M1JY6IWu4i70", "creationYear": "2017", "twoFactorKey": "wkxa bwto 4xrc y7wk eebw 2p4z fje3 rzz5", "status": "Working" }
        ]
    },
    {
        "id": "gologin-45", "gologinProfileNumber": "45", "assignedRep": "Talha", "accounts": [
            { "id": "discord-45-1", "discordId": "jjdhdhd38372", "discordEmail": "jjdhdhd38372@gmail.com", "discordPassword": "7d2PbT4cKV99", "emailPassword": "deuGyD45990c", "creationYear": "2017", "twoFactorKey": "wiqd 5sei 3lyg ulke 2vuw fsdu ug4x wk7j", "status": "Working" },
            { "id": "discord-45-2", "discordId": "Romia3027a", "discordEmail": "Romia3027a@gmail.com", "discordPassword": "ahmad3027", "emailPassword": "ahmad3027ii", "creationYear": "2017", "twoFactorKey": "", "status": "Working" }
        ]
    },
    {
        "id": "gologin-46", "gologinProfileNumber": "46", "assignedRep": "Hassan", "accounts": [
            { "id": "discord-46-1", "discordId": "suliire9", "discordEmail": "suliire9@gmail.com", "discordPassword": "ys/L875~7yh=", "emailPassword": "8y2)6J9iu{=p", "creationYear": "2017", "twoFactorKey": "nz7m wyud fgz7 75ap rmon yvvv xyni 7v6j", "status": "Working" }
        ]
    },
    {
        "id": "gologin-47", "gologinProfileNumber": "47", "assignedRep": "Hassan", "accounts": [
            { "id": "discord-47-1", "discordId": "ehhthrds7", "discordEmail": "ehhthrds7@gmail.com", "discordPassword": "4G8;>qbC|5\"p", "emailPassword": "6j(IW}>2]\\~9", "creationYear": "2017", "twoFactorKey": "2ucf 2kem nh5i kb2b xrtc rr6q xmka cbcl", "status": "Working" }
        ]
    },
    {
        "id": "gologin-48", "gologinProfileNumber": "48", "assignedRep": "Hassan", "accounts": [
            { "id": "discord-48-1", "discordId": "fkjtrttf", "discordEmail": "fkjtrttf@gmail.com", "discordPassword": "D2^Y >9U;1v?", "emailPassword": "xPlvpH7065_1", "creationYear": "2017", "twoFactorKey": "4c3w 6rgb pcxa yeay udun neye jtrv nmmu", "status": "Working" }
        ]
    },
    {
        "id": "gologin-49", "gologinProfileNumber": "49", "assignedRep": "Hassan", "accounts": [
            { "id": "discord-49-1", "discordId": "mayab3366iiuss", "discordEmail": "mayab3366iiuss@gmail.com", "discordPassword": "je4?Bi+/,C71", "emailPassword": "Gmail@@1122", "creationYear": "2017", "twoFactorKey": "u6ez iqpt ponj nsig rhvf 3hlb j64u cqa6", "status": "Working" }
        ]
    },
    {
        "id": "gologin-50", "gologinProfileNumber": "50", "assignedRep": "Hassan", "accounts": [
            { "id": "discord-50-1", "discordId": "asif287664", "discordEmail": "asif287664@gmail.com", "discordPassword": "PP(T*m20<2(U", "emailPassword": "ahmad3027", "creationYear": "2017", "twoFactorKey": "wwyy 3mjm kq3d q6u3 gd7w 2vtk qnzz s3ru", "status": "Working" }
        ]
    }
];

export const INITIAL_SUBSCRIPTION_PAYMENTS: SubscriptionPaymentType[] = [];

export const INITIAL_WITHDRAWAL_DATA: WithdrawalSummaryDataType[] = [
    {
        id: 'wd-history-1',
        date: '2025-11-05T12:00:00.000Z',
        exchangeRate: 276,
        subscriptionCost: 63300,
        totalArtistPaymentsPKR: 93000,
        notes: {
            profit: 'First company profit distribution, based on projects from the November 5, 2025 withdrawal batch.',
            calculations: '',
            distribution: '',
        },
        withdrawnProjectIds: HISTORICAL_WITHDRAWN_PROJECT_IDS,
        withdrawnSubscriptionIds: [],
    }
];

export const INITIAL_CURRENT_WITHDRAWAL_DRAFT: WithdrawalDraftType = {
  exchangeRate: 280,
  subscriptionCost: 0,
  totalArtistPaymentsPKR: 0,
  notes: {
    profit: '',
    calculations: '',
    distribution: '',
  }
};