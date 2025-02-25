export class Company {
  PIB: number;
  address: string;
  phone: string;
  logoUrl: string | null;
  websiteUrl: string | null;

  constructor(PIB: number, address: string, phone: string, logoUrl: string, websiteUrl: string) {
    this.PIB = PIB;
    this.address = address;
    this.phone = phone;
    this.logoUrl = logoUrl;
    this.websiteUrl = websiteUrl;
  }
}
