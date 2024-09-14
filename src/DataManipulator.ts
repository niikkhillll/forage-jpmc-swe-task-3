import { ServerRespond } from "./DataStreamer";

export interface Row {
  ratio: number;
  upper_bound: number;
  lower_bound: number;
  trigger_alert: number | undefined;
  timestamp: Date;
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): any[] {
    const priceABC =
      (serverResponds[0].top_ask && serverResponds[0].top_ask.price) || 0;
    const priceDEF =
      (serverResponds[1].top_ask && serverResponds[1].top_ask.price) || 0;
    const ratio = priceABC / priceDEF;

    // Set bounds (you can adjust these values as per the PDF guide).
    const upper_bound = 1.05;
    const lower_bound = 0.95;

    // Determine if the ratio crosses any threshold.
    const trigger_alert =
      ratio > upper_bound || ratio < lower_bound ? ratio : undefined;

    // Return an array of objects for Perspective to consume
    return serverResponds.map((respond) => ({
      ratio,
      upper_bound,
      lower_bound,
      trigger_alert,
      timestamp: respond.timestamp,
    }));
  }
}
