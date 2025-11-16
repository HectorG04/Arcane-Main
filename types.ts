

export interface PaymentType {
  id: string;
  amount: number;
  date: string; // ISO Date string
  screenshotUrl?: string; // Base64 data URL
  notes?: string;
}

export interface AttachmentType {
  id: string;
  name: string;
  url: string; // Base64 data URL
  type: 'image' | 'document' | 'other';
  addedAt: string; // ISO DateTime string
}

export interface CommentType {
  id: string;
  author: string; // 'system' or user name
  content: string; // Can be simple text or HTML
  timestamp: string; // ISO DateTime string
  attachments: AttachmentType[];
}

export interface CardType {
  id: string;
  title: string;
  description?: string;
  assignedArtist?: string;
  gologinProfile?: string;
  discordHandle?: string;
  payments: PaymentType[];
  comments: CommentType[];
  coverImageUrl?: string;
  dueDate?: string | null;
  dueDateComplete?: boolean;
}

export interface ColumnType {
  id: string;
  title: string;
  cards: CardType[];
}

export interface DiscordAccount {
    id: string;
    discordId: string; // The user handle/username
    discordEmail: string;
    discordPassword?: string;
    creationYear: string;
    twoFactorKey: string;
    emailPassword?: string;
    status: 'Working' | 'Error';
}

export interface GoLoginProfileType {
  id: string;
  gologinProfileNumber: string;
  assignedRep: string;
  accounts: DiscordAccount[];
}


export type ProjectStatus = 'Completed' | 'In Progress' | 'Cancelled' | 'Refunded';
// FIX: Added 'Paypal (Vortex)' to the list of accepted payment merchants.
export type PaymentMerchantType = 'Paypal (Huzaifa)' | 'Paypal (Vortex)' | 'Paypal (Design Vortex)' | 'Zelle (847-609-9117)' | 'Stripe' | 'Venmo' | 'Other' | '';


export interface ProjectType {
  id: string;
  clientName: string;
  projectType: string;
  profileNoId: string;
  projectAmount: number;
  amountReceived: number;
  afterDeduction: number;
  amountRemaining: number;
  salesRepName: string;
  date: string; // ISO string format: YYYY-MM-DD
  projectStatus: ProjectStatus;
  artistCost: number;
  paymentMerchant: PaymentMerchantType;
  isWithdrawn: boolean;
}

export interface SubscriptionPaymentType {
  id: string;
  serviceName: string;
  amount: number;
  date: string; // ISO string format: YYYY-MM-DD
}

export interface WithdrawalSummaryDataType {
  id: string;
  date: string; // ISO String
  exchangeRate: number;
  subscriptionCost: number;
  totalArtistPaymentsPKR: number;
  notes: {
    profit: string;
    calculations: string;
    distribution: string;
  };
  withdrawnProjectIds: string[];
  withdrawnSubscriptionIds: string[];
}

export type WithdrawalDraftType = Omit<WithdrawalSummaryDataType, 'id' | 'date' | 'withdrawnProjectIds' | 'withdrawnSubscriptionIds'>;