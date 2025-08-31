"use client";
import "client-only";
import { MouseEventHandler, ReactNode, useEffect, useRef, useState } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Turnstile } from "@localwebleads/cloudflare";
import { Button, Dialog, Form, Input, Label } from "@localwebleads/html-tags";
import { handleContactFormSubmit } from "@/actions/form-server-actions";


export default function ContactForm() {
  const siteKey = "0x4AAAAAAA6alc1K89jRnHS1";

  const modalRef = useRef<HTMLDialogElement>(null);
  const [turnstile, setTurnstile] = useState<ReactNode | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  useEffect(() => {
    setTurnstile(<Turnstile siteKey={siteKey} />)
    return () => {
      setTurnstile(null);
    }
  }, []);

  const toggleModal = () => {
    if (!!modalRef.current) {
      if (modalRef.current.hasAttribute('open')) {
        modalRef.current.close();
        window.location.reload();
      } else {
        modalRef.current.showModal();
      }
    }
  }

  const handleOutsideModalClick: MouseEventHandler<HTMLDialogElement> = (event) => {
    event.stopPropagation();
    if (!!modalRef.current && (event.target === modalRef.current)) {
      toggleModal()
    }
  }

  const handleSubmit = () => {
    if (!!window?.gtag) {
      window.gtag('event', 'contact_form_submit')
    }
    toggleModal();
  }

  const handlePhoneNumberChange: MouseEventHandler<HTMLInputElement> = (event) => {
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
    <div id="contact-form" className="text-base xl:text-lg">
      <div className="relative">
        <Dialog
          id="contact-form-submit-success"
          ref={modalRef}
          onClick={handleOutsideModalClick}
        >
          <div className="w-full h-fit flex flex-col gap-2 content-center items-center justify-center justify-items-center text-center">
            <div className="w-full h-fit flex content-center items-center justify-end justify-items-center">
              <button
                type="button"
                onClick={toggleModal}
                className="w-fit h-fit cursor-pointer ease-in-out duration-100 hover:scale-101"
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="w-full h-fit relative font-bold px-2">
              {`Success`}
            </h3>
            <p className="w-full h-fit">
              {`Thank you for contacting Hoppe Home Loans. Someone will reach out to you soon.`}
            </p>
          </div>
        </Dialog>
        <div className="flex flex-col gap-4 p-4 content-center items-center justify-center justify-items-center text-center w-full h-full ">
          <div className="w-full h-full flex flex-col gap-4 content-center items-center justify-center justify-items-center text-center">
            <div className="text-center text-2xl font-semibold">
              {`Contact All American Haulin`}
            </div>
          </div>
          <Form
            onSubmit={handleSubmit}
            action={handleContactFormSubmit}
            id="submit-contact-form"
            name="submit-contact-form"
          >
            <div className="w-full gap-4 flex flex-col content-center items-center justify-center justify-items-center md:flex-row">
              <div className="w-full">
                <Label htmlFor="contact-form-first-name" >
                  {`First name`}
                </Label>
                <Input
                  id="contact-form-first-name"
                  name="contact-form-first-name"
                  type="text"
                  required
                  maxLength={50}
                  autoComplete="given-name"
                  placeholder="John"
                  className="focus:border-secondary-medium focus:ring-secondary-medium"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="contact-form-last-name" >
                  {`Last name`}
                </Label>
                <Input
                  id="contact-form-last-name"
                  name="contact-form-last-name"
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
              <Label htmlFor="contact-form-email">
                {`Email address`}
              </Label>
              <Input
                id="contact-form-email"
                name="contact-form-email"
                type="email"
                required
                maxLength={50}
                autoComplete="email"
                placeholder="jsmith@example.com"
                className="focus:border-secondary-medium focus:ring-secondary-medium"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="contact-form-phone">
                Phone number
              </Label>
              <Input
                id="contact-form-phone"
                name="contact-form-phone"
                type="tel"
                required
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
              <Label htmlFor="contact-form-message" className="block font-medium text-gray-900">
                {`Message`}
              </Label>
              <textarea
                id="contact-form-message"
                name="contact-form-message"
                autoCapitalize="sentences"
                autoCorrect="on"
                spellCheck={true}
                rows={5}
                required
                maxLength={300}
                autoComplete="off"
                placeholder="I have a quick question about ..."
                className="block w-full px-3 py-2 text-gray-900 bg-white rounded-md outline-none border border-gray-300 focus:border-secondary-medium focus:ring-secondary-medium focus:ring-2 placeholder:text-gray-400"
              />
            </div>
            {turnstile}
            <Button
              id="contact-form-submit-button"
              name="contact-form-submit-button"
              type="submit"
              className="ease-in-out duration-100 hover:scale-101 rounded-lg bg-red-600 border-red-600 hover:bg-red-400 hover:border-red-400 active:bg-red-900 active:border-red-900"
            >
              {`Contact`}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}