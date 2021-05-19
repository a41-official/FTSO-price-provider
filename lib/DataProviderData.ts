import { IPriceProvider } from "./IPriceProvider";

export class DataProviderData {
    public index!: number;
    public pair!: string;
    public decimals!: number;
    public contract! :any;
    public web3contract! :any;
    public priceProvider!: IPriceProvider;
    public label!: string;
}