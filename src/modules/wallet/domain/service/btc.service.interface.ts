import { BuyBtcDto } from '../dto/buy.btc.dto';

export interface BtcServiceInterface {
    updateBtcPrice(): Promise<void>
    buyBtcInDolar(buyBtcDto: BuyBtcDto): Promise<void>
}