"use client";
import "client-only";
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/20/solid";
import {
  add,
  addMonths,
  eachDayOfInterval,
  format,
  isAfter,
  isBefore,
  isEqual,
  isSameMonth,
  isToday,
  isWeekend,
  max,
  min,
  startOfMonth,
  startOfWeek,
  subMonths
} from "date-fns";
import { MouseEventHandler, useEffect, useRef, useState, ReactNode, useMemo } from "react";
import { Button, Dialog, Form, Input, Label } from "@/lib/html-tags";
import { twMerge } from "tailwind-merge";
import { Turnstile } from "@/lib/cloudflare";
import { handleCalendarFormSubmit } from "@/actions/form-server-actions";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";



function getNewDays(selectedDay: Date) {
  const firstDaySelectedMonth = startOfMonth(selectedDay);
  const date = new Date(firstDaySelectedMonth);
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(date)),
    end: add(startOfWeek(startOfMonth(date)), { days: 41 })
  }) as Date[];
  return days
}



export default function CalendarForm({ availableAppointmentsString }: { availableAppointmentsString: string }): ReactNode {
  const siteKey = "0x4AAAAAAA0KTorwL_RSnqVo";

  const availableAppointmentsData = JSON.parse(availableAppointmentsString) as { [key: string]: string[] };
  const availableDates = useMemo(() => Object.keys(availableAppointmentsData), [availableAppointmentsData]);
  const availableAppointments = useMemo(() => Object.fromEntries(Object.keys(availableAppointmentsData).map(v => [v, availableAppointmentsData[v].map(e => new Date(e))])), [availableAppointmentsData]);

  const startDate = availableDates[0];
  const endDate = availableDates[availableDates.length];

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [turnstile, setTurnstile] = useState<ReactNode>(null);
  const successModalRef = useRef<HTMLDialogElement>(null);
  const [appointment, setAppointment] = useState<Date | undefined>(availableAppointments[availableDates[0]][0]);
  const [selectedDay, setSelectedDay] = useState(new Date(availableDates[0] + ' 00:00:00'));
  const [calBox, setCalBox] = useState<ReactNode | ReactNode[]>(null);
  const [apptBox, setApptBox] = useState<ReactNode | ReactNode[]>(null);

  function nextMonth() {
    const firstDaySelectedMonth = startOfMonth(selectedDay);
    const daysWithAvailableAppointments = availableDates.map(v => new Date(v + ' 00:00:00'));
    if (isBefore(addMonths(firstDaySelectedMonth, 1), max(daysWithAvailableAppointments))) {
      const firstDayNextMonth = addMonths(firstDaySelectedMonth, 1);
      const defaultSelectedDay = daysWithAvailableAppointments.filter(v => isEqual(v.getMonth(), firstDayNextMonth.getMonth())).map(v => v)[0];
      setSelectedDay(defaultSelectedDay);
      setAppointment(min(availableAppointments[format(defaultSelectedDay, 'yyyy-MM-dd')]));
    }
  }
  function prevMonth() {
    const firstDaySelectedMonth = startOfMonth(selectedDay);
    const daysWithAvailableAppointments = availableDates.map(v => new Date(v + ' 00:00:00'));
    if (isAfter(firstDaySelectedMonth, min(daysWithAvailableAppointments))) {
      const firstDayPrevMonth = subMonths(firstDaySelectedMonth, 1);
      const defaultSelectedDay = daysWithAvailableAppointments.filter(v => isEqual(v.getMonth(), firstDayPrevMonth.getMonth())).map(v => v)[0];
      setSelectedDay(defaultSelectedDay);
      setAppointment(min(availableAppointments[format(defaultSelectedDay, 'yyyy-MM-dd')]));
    }
  }

  useEffect(() => {
    setTurnstile(<Turnstile siteKey={siteKey} />);
    return () => {
      setTurnstile(null);
    }
  }, []);

  useEffect(() => {
    const availableAppointmentsOnSelectedDay = availableAppointments[format(selectedDay, 'yyyy-MM-dd')];
    if (!!availableAppointmentsOnSelectedDay && availableAppointmentsOnSelectedDay.length !== 0) {
      const defaultAppointmentsOnSelectedDay = availableAppointmentsOnSelectedDay[0];
      setAppointment(defaultAppointmentsOnSelectedDay);
    } else {
      setAppointment(undefined);
    }
  }, [selectedDay, availableAppointments]);

  const toggleModal = () => {
    if (!!successModalRef.current) {
      if (successModalRef.current.hasAttribute('open')) {
        successModalRef.current.close();
        window.location.reload();
      } else {
        successModalRef.current.showModal();
      }
    }
  }

  const handleSubmit = () => {
    if (!!window?.gtag) {
      window.gtag('event', 'calendar_form_submit');
    }
    toggleModal();
  }

  const handleOutsideSuccessModalClick: MouseEventHandler<HTMLDialogElement> = (event) => {
    event.stopPropagation();
    if (!!successModalRef.current && (event.target === successModalRef.current)) {
      toggleModal();
    }
  };

  const handleSelectDay: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    const value = new Date(event.currentTarget.value);
    setSelectedDay(value);
  }

  const handleSelectAppointment: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    const value = new Date(event.currentTarget.value);
    setAppointment(value);
  }

  useEffect(() => {
    const today = new Date();
    const firstDaySelectedMonth = startOfMonth(selectedDay)
    const newDays = getNewDays(selectedDay);
    const calendarBox = newDays.map((day, idx) => (
      <button
        key={format(day, 'yyyy-MM-dd HH:mm:ss')}
        type="button"
        id={format(day, 'yyyy-MM-dd HH:mm:ss')}
        name={format(day, 'yyyy-MM-dd HH:mm:ss')}
        value={format(day, 'yyyy-MM-dd HH:mm:ss')}
        disabled={!isEqual(day, selectedDay) && (!isSameMonth(day, firstDaySelectedMonth) || isWeekend(day) || isBefore(day, today) || isToday(day))}
        onClick={handleSelectDay}
        className={twMerge(
          'flex w-10 h-10 content-center items-center justify-center justify-items-center text-center hover:bg-gray-100 focus:z-10',
          (isSameMonth(day, firstDaySelectedMonth) && !isWeekend(day) && isAfter(day, today)) ? 'bg-white cursor-pointer' : 'bg-gray-50',
          (isEqual(day, selectedDay) || isToday(day)) && 'font-bold',
          isEqual(day, selectedDay) && 'text-white',
          !isEqual(day, selectedDay) && isSameMonth(day, firstDaySelectedMonth) && !isWeekend(day) && isAfter(day, today) && !isToday(day) && 'text-gray-900',
          !isEqual(day, selectedDay) && (!isSameMonth(day, firstDaySelectedMonth) || isWeekend(day) || isBefore(day, today)) && !isToday(day) && 'text-gray-400',
          isToday(day) && !isEqual(day, selectedDay) && 'text-secondary-medium',
          idx === 0 && 'rounded-tl-md',
          idx === 6 && 'rounded-tr-md',
          idx === newDays.length - 7 && 'rounded-bl-md',
          idx === newDays.length - 1 && 'rounded-br-md',
        )}
      >
        <time
          dateTime={format(day, 'yyyy-MM-dd HH:mm:ss')}
          className={twMerge(
            'flex w-7 h-7 content-center items-center justify-center justify-items-center text-center rounded-full',
            isEqual(day, selectedDay) && 'bg-secondary-medium',
            (isSameMonth(day, firstDaySelectedMonth) && !isWeekend(day) && isAfter(day, today)) && 'ease-in-out duration-100 hover:scale-110'
          )}
        >
          {format(day, 'd')}
        </time>
      </button>
    ))
    setCalBox(calendarBox);
  }, [selectedDay]);

  useEffect(() => {
    let appointmentBox;
    if (!!availableAppointments[format(selectedDay, 'yyyy-MM-dd')]) {
      appointmentBox = (availableAppointments[format(selectedDay, 'yyyy-MM-dd')]
        .map((app) => (
          <button
            key={format(app, 'h-mm-aaa')}
            type="button"
            id={`select-${format(app, 'h-mm-aaa')}-appointment-button`}
            name={`select-${format(app, 'h-mm-aaa')}-appointment-button`}
            value={String(app)}
            disabled={!!appointment && (isEqual(app, appointment))}
            onClick={handleSelectAppointment}
            className={`w-full flex content-center items-center justify-center justify-items-center overflow-hidden ${!!appointment && (isEqual(app, appointment)) ? 'bg-secondary-medium text-white font-bold' : 'cursor-pointer hover:bg-gray-100'}`}
          >
            <div className="w-[6rem] text-right ">
              <div className={twMerge('w-full h-full', !(!!appointment && (isEqual(app, appointment))) && 'ease-in-out duration-100 hover:scale-110')}>
                {format(app, 'h:mm aaa')}
              </div>
            </div>
          </button>
        ))
      )
    } else {
      appointmentBox = (
        <div className="w-full h-full flex content-center items-center justify-center justify-items-center ">
          {`No available appointments.`}
        </div>
      )
    }
    setApptBox(appointmentBox)
  }, [selectedDay, appointment, availableAppointments]);

  function localToZulu({ localDateTime, includeTime = false }: { localDateTime: Date, includeTime?: boolean }) {
    const year = localDateTime.getUTCFullYear().toString();
    const month = (localDateTime.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = localDateTime.getUTCDate().toString().padStart(2, '0');
    const hour = localDateTime.getUTCHours().toString().padStart(2, '0');
    const minute = localDateTime.getUTCMinutes().toString().padStart(2, '0');
    const second = localDateTime.getUTCSeconds().toString().padStart(2, '0');
    let zuluDateTime = [year, month, day].join('-');
    if (includeTime) {
      zuluDateTime += 'T' + [hour, minute, second].join(':')
    }
    return (zuluDateTime)
  }

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const oldPhoneNumber = event.currentTarget.value.replace(/-/g, '');
    let newPhonNumber = oldPhoneNumber;
    switch (true) {
      case ((oldPhoneNumber.length >= 4) && (oldPhoneNumber.length < 7)):
        newPhonNumber = oldPhoneNumber.slice(0, 3) + '-' + oldPhoneNumber.slice(3);
        break;
      case (oldPhoneNumber.length >= 7):
        newPhonNumber = oldPhoneNumber.slice(0, 3) + '-' + oldPhoneNumber.slice(3, 6) + '-' + oldPhoneNumber.slice(6);
        break;
    }
    setPhoneNumber(newPhonNumber)
  }

  return (
    <div id="calendar-form">
      <div className="flex flex-col w-fit h-fit p-4 gap-4 content-center items-center justify-center justify-items-center">
        <Dialog
          id="event-booked-dialog"
          ref={successModalRef}
          onClick={handleOutsideSuccessModalClick}
        >
          <div className="w-fit h-full flex flex-col gap-2 content-center items-center justify-center justify-items-center text-center">
            <div className="w-full h-fit flex content-center items-center justify-end justify-items-center">
              <button
                type="button"
                onClick={toggleModal}
                className="w-fit h-fit cursor-pointer ease-in-out duration-100 hover:scale-105"
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="w-full h-fit font-bold px-2">
              {`Success`}
            </h3>
            <p className="w-full h-fit">
              {`Your appointment has been booked.`}
            </p>
          </div>
        </Dialog>
        <div className="w-[18rem] flex flex-col gap-4 content-center items-center justify-center justify-items-center md:w-full">
          <div className="text-center text-2xl font-bold text-gray-900">
            {`Book an appointment with Hoppe Home Loans`}
          </div>
        </div>
        <div className="w-fit flex flex-col gap-2 md:w-full">
          <div className="flex flex-col w-full gap-4 content-center items-center justify-center justify-items-center md:flex-row">
            <div className="flex flex-col text-center content-center items-center justify-center justify-items-center text-center">
              <div className="w-full h-full flex text-gray-900 content-center items-center justify-around justify-items-center text-center">
                <button
                  type="button"
                  onClick={prevMonth}
                  disabled={isBefore(new Date(startOfMonth(selectedDay)), new Date(startDate))}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{`Previous month`}</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <div className="font-bold">{format(selectedDay, 'MMM yyyy')}</div>
                <button
                  type="button"
                  onClick={nextMonth}
                  disabled={isAfter(new Date(startOfMonth(selectedDay)), subMonths(new Date(endDate), 1))}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{`Next month`}</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-px w-fit h-fit text-gray-500 content-center items-center justify-around justify-items-center text-center">
                <div className="w-10 h-10 content-center items-center justify-around justify-items-center text-center">S</div>
                <div className="w-10 h-10 content-center items-center justify-around justify-items-center text-center">M</div>
                <div className="w-10 h-10 content-center items-center justify-around justify-items-center text-center">T</div>
                <div className="w-10 h-10 content-center items-center justify-around justify-items-center text-center">W</div>
                <div className="w-10 h-10 content-center items-center justify-around justify-items-center text-center">T</div>
                <div className="w-10 h-10 content-center items-center justify-around justify-items-center text-center">F</div>
                <div className="w-10 h-10 content-center items-center justify-around justify-items-center text-center">S</div>
              </div>
              <div className="grid grid-cols-7 gap-px content-center items-center justify-center justify-items-center text-center w-fit h-fit rounded-md bg-gray-200 ring-1 ring-gray-200">
                {calBox}
              </div>
            </div>
            <div className="flex flex-col text-center h-[19.4rem] content-center items-center justify-center justify-items-center text-center">
              <div className="w-[18rem] h-full flex flex-col text-gray-900 content-center items-center justify-around justify-items-center text-center">
                <div className="w-full h-full font-bold content-center items-center justify-center justify-items-center text-center">
                  {`Available appointments`}
                </div>
                <div className="flex flex-col w-fit h-fit text-gray-500 content-center items-center justify-around justify-items-center text-center">
                  <div className="w-full h-10 content-center items-center justify-around justify-items-center text-center">
                    {format(selectedDay, 'd MMM')}
                  </div>
                </div>
              </div>
              <div className="rounded-md ring-1 ring-gray-200 overflow-y-auto w-[18rem] h-[73rem]">
                {apptBox}
              </div>
            </div>
          </div>
          <Form
            onSubmit={handleSubmit}
            action={handleCalendarFormSubmit}
            id="submit-calendar-form"
            name="submit-calendar-form"
          >
            <Input
              id="calendar-form-appointment"
              name="calendar-form-appointment"
              type="hidden"
              value={!!appointment ? localToZulu({ localDateTime: appointment, includeTime: true }) : ''}
              readOnly={true}
            />
            <div className="w-full gap-4 flex flex-col content-center items-center justify-center justify-items-center md:flex-row">
              <div className="w-full">
                <Label htmlFor="calendar-form-first-name" >
                  {`First name`}
                </Label>
                <Input
                  id="calendar-form-first-name"
                  name="calendar-form-first-name"
                  type="text"
                  required
                  maxLength={50}
                  autoComplete="given-name"
                  placeholder="John"
                  className="focus:border-secondary-medium focus:ring-secondary-medium"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="calendar-form-last-name" >
                  {`Last name`}
                </Label>
                <Input
                  id="calendar-form-last-name"
                  name="calendar-form-last-name"
                  type="text"
                  required
                  maxLength={50}
                  autoComplete="family-name"
                  placeholder="Smith"
                  className="focus:border-secondary-medium focus:ring-secondary-medium"
                />
              </div>
            </div>
            <div className="w-full">
              <Label htmlFor="calendar-form-email" className="block font-medium text-gray-900">
                {`Email address`}
              </Label>
              <Input
                id="calendar-form-email"
                name="calendar-form-email"
                type="email"
                required
                maxLength={50}
                autoComplete="email"
                placeholder="jsmith@example.com"
                className="focus:border-secondary-medium focus:ring-secondary-medium"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="calendar-form-phone">
                Phone number
              </Label>
              <Input
                id="calendar-form-phone"
                name="calendar-form-phone"
                type="tel"
                maxLength={12}
                autoComplete="tel-national"
                placeholder="555-555-5555"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                className="focus:border-secondary-medium focus:ring-secondary-medium"
                onChange={handlePhoneNumberChange}
                value={phoneNumber}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="calendar-form-message" className="block font-medium text-gray-900">
                {`Message`}
              </Label>
              <textarea
                id="calendar-form-message"
                name="calendar-form-message"
                autoCapitalize="sentences"
                autoCorrect="on"
                spellCheck={true}
                rows={5}
                required
                maxLength={300}
                autoComplete="off"
                placeholder="Hi Allison! I'd like to meet about ..."
                className="block w-full px-3 py-2 text-gray-900 bg-white rounded-md outline-none border border-gray-300 focus:border-secondary-medium focus:ring-secondary-medium focus:ring-2 placeholder:text-gray-400"
              />
            </div>
            {turnstile}
            <Button
              id="calendar-form-submit-button"
              name="calendar-form-submit-button"
              type="submit"
              className="ease-in-out duration-100 hover:scale-105 rounded-full bg-secondary-medium border-secondary-dark hover:bg-secondary-light hover:border-secondary-light active:bg-secondary-dark active:border-secondary-dark"
            >
              {`Book appointment`}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
