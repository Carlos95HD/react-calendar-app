import { types } from "../types/types";

export const uiOpenModal = () => ({ type:types.uiOpenModal });
export const uiCloseModal = () => ({ type:types.uiCloseModal });

export const uiEventAddNewFromSlot = (slot) => ({
  type:types.uiEventAddNewFromSlot,
  payload : slot
});