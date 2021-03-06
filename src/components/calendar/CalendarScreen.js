import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es'; 

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from "../../actions/ui";
import { useDispatch, useSelector } from 'react-redux';
import { eventClearActiveEvent, eventSetActive, eventAddNewFromSlot, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';


moment.locale('es');

const localizer = momentLocalizer(moment);

// const events = [{
//   title: 'Cumpleaños',
//   start: moment().toDate(),
//   end: moment().add( 2, 'hours' ).toDate(),
//   bgcolor: '#fafafa',
//   notes:'Comprar Regalos',
//   user:{
//     _id:'12312',
//     name:'Carlos'
//   }
// }];

//Component Return
export const CalendarScreen = () => {

  const dispatch = useDispatch();
  const [lastView, setlastView] = useState( localStorage.getItem('lastView') || 'month' );
  const { events, activeEvent } = useSelector(state => state.calendar );
  const { uid } = useSelector(state => state.auth );

  useEffect(() => {
    dispatch(eventStartLoading());
  },[ dispatch ])

  const onDoubleClickEvent = (e) => {
    dispatch( uiOpenModal() );
  }

  const onSelectEvent = (e) => {
    dispatch( eventSetActive(e) )
  }

  const onViewChange = (e) => {
    setlastView(e);
    localStorage.setItem('lastView', e )
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    
    

    const style = {
      backgroundColor: ( uid === event.user._id ) ? '#367CF7': '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: "block",
      color:"white",
    }
    return {
      style
    }
  };

  const onSelectSlot = (event) => {
    dispatch( eventClearActiveEvent() )
    const { action, slots } = event;

    if ( action === 'doubleClick' && slots ) {
      dispatch( eventAddNewFromSlot(slots[0]) );
      dispatch( uiOpenModal() );
    }
  }

  return (
    <div className="calendar-screen">
      <Navbar />
  
      <Calendar
      localizer={localizer}
      events={ events }
      startAccessor="start"
      endAccessor="end"
      messages={ messages }
      eventPropGetter={ eventStyleGetter }
      onDoubleClickEvent={ onDoubleClickEvent }
      onSelectEvent={ onSelectEvent }
      onView={ onViewChange }
      onSelectSlot={ onSelectSlot }
      selectable={ true }
      view={ lastView }
      components={{
        event: CalendarEvent
      }}
      />

      <AddNewFab />
      {
        (
          activeEvent && <DeleteEventFab />
        )
      }
      <CalendarModal />

    </div>
  );
};
