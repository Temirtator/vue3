import { describe, it, expect } from "vitest";
import { formatAmount } from "../utils/formatAmount";

describe("formatAmount", () => {
  it("formats integer amount correctly", () => {
    expect(formatAmount(145000, "KZT")).toBe("1450.00 KZT");
  });

  it("formats small numbers", () => {
    expect(formatAmount(28990, "KZT")).toBe("289.90 KZT");
  });

  it("formats zero", () => {
    expect(formatAmount(0, "KZT")).toBe("0.00 KZT");
  });

  it("supports different currency codes", () => {
    expect(formatAmount(500000, "USD")).toBe("5000.00 USD");
  });
});
