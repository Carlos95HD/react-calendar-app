import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es'; 

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

moment.locale('es');

const localizer = momentLocalizer(moment);

const events = [{
  title: 'Cumpleaños',
  start: moment().toDate(),
  end: moment().add( 2, 'hours' ).toDate(),
  bgcolor: '#fafafa',
  notes:'Comprar Regalos',
  user:{
    _id:'12312',
    name:'Carlos'
  }
}];

//Component Return
export const CalendarScreen = () => {

  const [lastView, setlastView] = useState( localStorage.getItem('lastView') || 'month' );

  const onDoubleClickEvent = (e) => {
    console.log( e )
  }

  const onSelectEvent = (e) => {
    console.log( e )
  }

  const onViewChange = (e) => {
    setlastView(e);
    localStorage.setItem('lastView', e )
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: "block",
      color:"white",
    }
    return {
      style
    }
  };

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
      view={ lastView }
      components={{
        event: CalendarEvent
      }}
      />

      <CalendarModal />

    </div>
  );
};
