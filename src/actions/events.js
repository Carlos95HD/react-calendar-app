import { types } from "../types/types";
import { fetchConToken } from '../helpers/fetch';
;


export const eventStartAddNew = ( event ) => {
  return async ( dispatch, getState ) => {

    const { uid, name } = getState().auth;

    try {
      const resp = await fetchConToken('events', event, 'POST');
      const body = await resp.json();
  
      if ( body ) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name: name
        }

        console.log( event );
        dispatch(eventAddNew( event ));
      }

    } catch (error) {
      console.log( error )
    }

  }
}

const eventAddNew = (event) => ({
  type:types.eventAddNew,
  payload:event
});

export const eventAddNewFromSlot = (slot) => ({
  type:types.eventAddNewFromSlot,
  payload : slot
});

export const eventSetActive = (event) => ({
  type:types.eventSetActive,
  payload: event
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event
});

export const eventDeleted = () => ({
  type: types.eventDeleted
});