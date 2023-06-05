export interface OrderStatus {
    name: string,
    text: string,
    color: string
}

export const ADDED: OrderStatus = {
    name: "ADDED",
    text: "Добавлен",
    color: "#1976d2"
}

export const READY: OrderStatus = {
    name: "READY",
    text: "В процессе",
    color: "#ff9800"
}

export const GIVEN: OrderStatus = {
    name: "GIVEN",
    text: "Выполнен",
    color: "#4caf50"
}

export const CANCELED: OrderStatus = {
    name: "CANCELED",
    text: "Отменен",
    color: "#f44336"
}

export const NEXT_COMMAND = "NEXT";
export const BACK_COMMAND = "BACK";
export const CANCEL_COMMAND = "CANCEL";

export const ORDER_STATUS_BY_NAME: Map<string, OrderStatus> = new Map<string, OrderStatus>([
    [ADDED.name, ADDED],
    [READY.name, READY],
    [GIVEN.name, GIVEN],
    [CANCELED.name, CANCELED]
])