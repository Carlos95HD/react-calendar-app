import React, { useEffect, useState } from "react";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { uiCloseModal } from "../../actions/ui";
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from "../../actions/events";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

if (process.env.NODE_ENV !== "test") {
  Modal.setAppElement("#root");
}

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus1 = now.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlus1.toDate(),
}

export const CalendarModal = () => {

  const dispatch = useDispatch();
  const { modalOpen } = useSelector( state => state.ui );
  const { activeEvent, slot } = useSelector( state => state.calendar );

  // const [dateStart, setDateStart] = useState(now.toDate());
  // const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, end, start } = formValues;

  useEffect(() => {
    if ( activeEvent ) {
      setFormValues( activeEvent );
    } else {
      setFormValues( initEvent );
    }
  }, [activeEvent, setFormValues]);

  //Create Event from onSelectSlot
  useEffect(() => {
    if ( slot ) {
      setFormValues({
        ...initEvent,
        start: slot,
        end: moment(slot).add(1, "hours").toDate()
      });
    }
  }, [slot]);
  
  const closeModal = () => {
    dispatch( uiCloseModal() );
    dispatch( eventClearActiveEvent() ) // Limpia activeEvent
    setFormValues(initEvent);//Limpia el modal
  };

  const handleStartDateChange = (e) => {
    setFormValues({
      ...formValues,
      start: e,
    });
    // setDateStart(e);
  };

  const handleEndDateChange = (e) => {
    // setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleinputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    //Si la fecha inicial es la misma o menor a momentEnd
    if (momentStart.isSameOrAfter( momentEnd )) {
      return Swal.fire(
        "Error",
        "La fecha fin debe de ser mayor a la fecha de inicio!",
        "error"
      );
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    if ( activeEvent ) {
      dispatch( eventStartUpdate( formValues ) )
    } else {
      dispatch( eventStartAddNew( formValues ));
    }


    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={ modalOpen }
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      className="modal"
      ariaHideApp={ !process.env.NODE_ENV === 'test' }
      overlayClassName="modal-fondo"
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h1>{ ( activeEvent ) ? "Editar evento" : "Nuevo evento" }</h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <div>
            <DateTimePicker
              onChange={handleStartDateChange}
              value={start}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <div>
            <DateTimePicker
              onChange={handleEndDateChange}
              value={end}
              minDate={start}
              className="form-control"
            />
          </div>
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleinputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleinputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
