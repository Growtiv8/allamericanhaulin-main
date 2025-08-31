"use client";
import "client-only";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@localwebleads/html-tags";
import Image from "next/image";
import { MouseEventHandler, useRef } from "react";
import Link from "next/link";


export default function FounderBio({ person, linkedinIconString }: { person: { _id: string, name: string, role: string, photo: string, bio: string, socialMedia: { linkedin: string } }, linkedinIconString: string }) {
  const ModalRef = useRef<HTMLDialogElement>(null);
  const toggleModal = () => {
    if (!!ModalRef.current) {
      if (ModalRef.current.hasAttribute('open')) {
        ModalRef.current.close();
        window.location.reload();
      } else {
        ModalRef.current.showModal();
      }
    }
  }
  const handleOutsideModalClick: MouseEventHandler<HTMLDialogElement> = (event) => {
    event.stopPropagation();
    if (!!ModalRef.current && (event.target === ModalRef.current)) {
      toggleModal();
    }
  };
  return (
    <div className="w-fit h-fit">
      <Dialog
        id={`about-page-profile-bio-${person._id}`}
        ref={ModalRef}
        onClick={handleOutsideModalClick}
        className="overflow-y-scroll overflow-x-hidden"
      >
        <div className="w-full h-fit px-2 flex flex-col gap-2 content-center items-center justify-center justify-items-center text-center md:w-[30rem]">
          <div className="w-full h-fit flex content-center items-center justify-end justify-items-center">
            <button
              type="button"
              onClick={toggleModal}
              className="w-fit h-fit cursor-pointer"
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>
          <Image
            alt={person.name}
            src={`data:image/avif;base64,${person.photo}`}
            width={0}
            height={0}
            style={{ width: "15rem", height: "auto", borderRadius: "0.75rem", objectFit: "cover", boxShadow: "var(--shadow-md)" }}
            priority={true}
            loading="eager"
            rel="preload"
          />
          <h3 className="w-full h-fit font-bold">
            {person.name}
          </h3>
          <h4 className="w-full fit">
            {person.role}
          </h4>
          <Link
            href={person.socialMedia.linkedin}
            target="_blank"
            className="w-fit h-fit flex gap-4 content-start items-center justify-center justify-items-center"
          >
            <Image
              alt={`${person.name}'s LinkedIn profile.`}
              src={`data:image/jpg;base64,${linkedinIconString}`}
              width={16}
              height={16}
              className="object-cover ease-in-out duration-100 hover:scale-110"
              priority={true}
              loading="eager"
              rel="preload"
            />
          </Link>
          <p className="w-full fit text-left">
            {person.bio}
          </p>
        </div>
      </Dialog>
      <button
        id={person._id}
        name={person._id}
        type="button"
        className="cursor-pointer ease-in-out duration-100 hover:scale-101 w-fit flex flex-col gap-4 content-start items-center justify-center justify-items-center"
        onClick={toggleModal}
      >
        {(person.photo !== "") ?
          <Image
            alt={person.name}
            src={`data:image/avif;base64,${person.photo}`}
            width={0}
            height={0}
            style={{ width: "15rem", height: "auto", borderRadius: "0.75rem", objectFit: "cover", boxShadow: "var(--shadow-md)" }}
            priority={true}
            loading="eager"
            rel="preload"
          /> :
          <div className="w-[15rem] h-[15rem] rounded-xl shadow-md" />
        }

        <div className="w-[15rem] h-full flex flex-col gap-2 overflow-hidden">
          <div className="w-full h-full text-nowrap text-lg flex flex-col ">
            <h3 className="font-bold text-shadow-lg">
              {person.name}
            </h3>
            <h4>
              {person.role}
            </h4>
          </div>
        </div>
      </button>
    </div>
  )
}