export type FieldOrigin = "document" | "history" | "flagged";

export type OrderField = {
  label: string;
  value: string;
  origin: FieldOrigin;
  /** Shown for origin: "document" — the exact line the value was read from. */
  sourceQuote?: string;
  /** Shown for origin: "flagged" — why this needs a human look. */
  flagReason?: string;
};

export type OrderStatus = "needs-review" | "completed" | "no-order";

export type MockOrder = {
  id: string;
  reference: string;
  subject: string;
  from: string;
  status: OrderStatus;
  origin: string;
  destination: string;
  fields: OrderField[];
};

/** The order the review scene walks through. Its `fields` list is the source of truth
 *  for the queue row's completion count below — nothing is stated that isn't shown. */
export const featuredOrder: MockOrder = {
  id: "ord-1",
  reference: "PO 48291",
  subject: "Pickup Thursday — 24 pallets to Hamburg",
  from: "ops@rotterdam-distribution.example",
  status: "needs-review",
  origin: "Rotterdam, NL",
  destination: "Hamburg, DE",
  fields: [
    {
      label: "Shipper",
      value: "Rotterdam Distribution B.V.",
      origin: "document",
      sourceQuote: "From: ops@rotterdam-distribution.example",
    },
    {
      label: "Consignee",
      value: "Hamburg Freight GmbH",
      origin: "document",
      sourceQuote: "Please deliver to Hamburg Freight GmbH, Dock 4",
    },
    {
      label: "Incoterm",
      value: "FCA",
      origin: "history",
    },
    {
      label: "Pieces",
      value: "24 pallets",
      origin: "document",
      sourceQuote: "24 pallets, general cargo, packing list attached",
    },
    {
      label: "Weight",
      value: "3,240 kg",
      origin: "document",
      sourceQuote: "Total weight: 3,240 kg",
    },
    {
      label: "Carrier rate",
      value: "€1,180",
      origin: "flagged",
      flagReason: "18% above the contracted rate for this lane. Worth a second look before it goes to the TMS.",
    },
  ],
};

export const mockOrders: MockOrder[] = [
  featuredOrder,
  {
    id: "ord-2",
    reference: "PO 47960",
    subject: "Weekly consolidation — Antwerp to Lyon",
    from: "logistics@antwerp-supply.example",
    status: "completed",
    origin: "Antwerp, BE",
    destination: "Lyon, FR",
    fields: [],
  },
  {
    id: "ord-3",
    reference: "PO 48114",
    subject: "Reefer container, temp-controlled",
    from: "planning@nordic-foods.example",
    status: "completed",
    origin: "Gothenburg, SE",
    destination: "Bremerhaven, DE",
    fields: [],
  },
  {
    id: "ord-4",
    reference: "—",
    subject: "Re: Invoice #4471 — payment confirmation",
    from: "accounts@antwerp-supply.example",
    status: "no-order",
    origin: "—",
    destination: "—",
    fields: [],
  },
];

/** Illustrative mechanism only — no volumes or percentages, so nothing here reads
 *  as a performance number. See DashboardTour's pipeline scene. */
export type PipelineNode = {
  label: string;
  detail: string;
};

export const pipelineMain: PipelineNode[] = [
  { label: "Inbox", detail: "Every channel, one stream" },
  { label: "Classified", detail: "Order or not" },
  { label: "Extracted", detail: "Fields read and structured" },
  { label: "Reviewed", detail: "Flags surfaced, nothing hidden" },
  { label: "Pushed to TMS", detail: "Only after approval" },
];

export const pipelineBranches: { fromIndex: number; label: string; detail: string }[] = [
  { fromIndex: 1, label: "Not an order", detail: "Filtered out, never enters the queue" },
  { fromIndex: 3, label: "Flagged", detail: "Held for a human, not guessed at" },
];
