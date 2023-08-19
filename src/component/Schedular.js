import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { MdOutlineDeleteOutline, MdOutlineWatchLater } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import "../css/Schedular.css";
import additionalEvent from "../events";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const Schedular = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [popoverShow, setPopoverShow] = useState(false);

  // FOR LOADING AN PREDEFINED EVENT
  useEffect(() => {
    setEvents(additionalEvent);
  }, []);

  // FOR OPEN CLOSE POPOVER ON EVENT CLICK
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setPopoverShow(!popoverShow);
  };

  // FOR POPOVER COMPOENT
  const renderPopover = ({ event }) => {
    let popover = (
      <Popover className="custom__form">
        <Popover.Header
          as="h3"
          className="d-flex align-items-center justify-content-between"
        >
          Custom hour override <RxCrossCircled />
        </Popover.Header>
        <Popover.Body>
          <p className="mb-0">
            Edit Custom offer value for specific hours of a day
          </p>
          <p className="mb-0">You can add maximum 2 overrides per day</p>
          <Form className="d-flex mt-4">
            <Form.Group className="mb-4 funded__offer" controlId="funded-offer">
              <Form.Label>
                Murchant funded offer <HiQuestionMarkCircle />
              </Form.Label>
              <Form.Control type="email" placeholder="45%" />
            </Form.Group>
            <Form.Group className="mb-3 ml-1" controlId="customer-get">
              <Form.Label>
                What customer get <HiQuestionMarkCircle />
              </Form.Label>
              <Form.Control type="email" placeholder="28%" />
            </Form.Group>
          </Form>
          <div className="event-details d-flex align-items-center justify-content-between">
            <div className="d-flex">
              <MdOutlineWatchLater className="watch__icon" alt="watch-icon" />
              <p>Monday</p>
            </div>
            <div className="event-info d-flex">
              <span className="start">
                {moment(event.start).format("h:mm A")}{" "}
              </span>{" "}
              -<span className="end">{moment(event.end).format("h:mm A")}</span>
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-end">
            <Button className="delete__btn d-flex align-items-center">
              <MdOutlineDeleteOutline />
              Delete
            </Button>
            <Button className="save__btn">Save custom hours</Button>
          </div>
        </Popover.Body>
      </Popover>
    );

    return (
      <OverlayTrigger
        id={`overlay-${event.id}`}
        trigger="click"
        rootClose
        container={this}
        flip
        placement="left"
        overlay={popover}
      >
        <div className="custom-event">{event.title}</div>
      </OverlayTrigger>
    );
  };

  // FOR EVENT DRAG AND DROP
  const onEventDrop = (data) => {
    const updatedEvents = events.map((event) =>
      event.id === data.event.id
        ? { ...event, start: data.start, end: data.end }
        : event
    );
    setEvents(updatedEvents);
  };

  // FOR DISPLAY WEEK DAY NAME
  const dayHeaderFormat = (date, localizer) => localizer.format(date, "dddd"); // Format to display only the weekday name

  return (
    <div className="schedular__calendar">
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="week"
        views={["week"]}
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        resizable
        style={{ height: "100vh" }}
        onSelectEvent={handleEventClick}
        formats={{ dayHeaderFormat }}
        components={{ event: renderPopover }}
      />
    </div>
  );
};

export default Schedular;
