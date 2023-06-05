import {IOrder} from "../models/IOrder";
import {CANCELED, ORDER_STATUS_BY_NAME, OrderStatus} from "../constants/OrderStatus";

export function getStatus(order: IOrder): OrderStatus {
    let status = ORDER_STATUS_BY_NAME.get(order.status);
    return status ? status : CANCELED;
}