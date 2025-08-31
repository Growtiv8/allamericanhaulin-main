"use server";
import "server-only";


export async function generateMetadata() {
  const dateTime = new Date(Date.now());
  const dateTimeString = dateTime.toISOString();
  const publishedTime = dateTimeString.slice(0, dateTimeString.length - 5) + "-0000";
  return {
    title: `Privacy Policy`,
    description: "Privacy Policy.",
    alternates: {
      canonical: "/privacy-policy"
    },
    openGraph: {
      title: `Privacy Policy`,
      description: "Privacy Policy.",
      type: "article",
      publishedTime,
      authors: ["All American Haulin"],
      images: [
        {
          url: "https://allamericanhaulin.com/images/hotlink-ok/all-american-haulin.png",
          alt: "All American Haulin truck."
        }
      ]
    }
  }
}

export default async function Page() {
  const emailAddress = "privacy@allamericanhaulin.com";
  const businessName = "All American Haulin' Demos, Dumps & Junk Removal";
  const altBusinessName = "All American Haulin";
  const businessUrl = "https://allamericanhaulin.com"

  const divClassname = "max-w-4xl w-full h-fit flex flex-col gap-4 content-center items-center justify-center justify-items-center";
  const h1Classname = "w-full h-fit font-bold text-4xl";
  const h2Classname = "w-full h-fit font-bold text-3xl";
  const h3Classname = "w-full h-fit font-bold text-2xl";
  const pClassName = "w-full h-fit text-base";
  const ulClassname = "w-full h-fit text-base list-disc list-outside pl-6 flex flex-col gap-4";
  const liClassname = "w-full h-fit text-base";
  return (
    <div className="w-full h-full flex flex-col content-center items-center justify-center justify-items-center ">
      <div className="w-full h-full flex flex-col gap-8 py-8 content-center items-center justify-center justify-items-center">

        <div className={divClassname}>
          <h1 className={h1Classname}>
            {`PRIVACY POLICY`}
          </h1>
          <p className={pClassName}>
            {`Last updated May 17, 2025`}
          </p>
          <p className={pClassName}>
            {`This Privacy Notice for ${(altBusinessName.length !== 0) ? businessName + ' (doing business as ' + altBusinessName + ')' : businessName} ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:`}
          </p>
          <ul className={ulClassname}>
            <li className={liClassname}>
              {`Visit our website at ${businessUrl} or any website of ours that links to this Privacy Notice`}
            </li>
            <li className={liClassname}>
              {`Engage with us in other related ways, including any sales, marketing, or events`}
            </li>
          </ul>
          <p className={pClassName}>
            {`Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at ${emailAddress}.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`SUMMARY OF KEY POINTS`}
          </h2>
          <p className={pClassName}>
            {`This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.`}
          </p>
          <p className={pClassName}>
            {`What personal information do we process? When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about personal information you disclose to us.`}
          </p>
          <p className={pClassName}>
            {`Do we process any sensitive personal information? Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.`}
          </p>
          <p className={pClassName}>
            {`Do we collect any information from third parties? We may collect information from public databases, marketing partners, social media platforms, and other outside sources. Learn more about information collected from other sources.`}
          </p>
          <p className={pClassName}>
            {`How do we process your information? We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about how we process your information.`}
          </p>
          <p className={pClassName}>
            {`In what situations and with which types of parties do we share personal information? We may share information in specific situations and with specific categories of third parties. Learn more about when and with whom we share your personal information.`}
          </p>
          <p className={pClassName}>
            {`How do we keep your information safe? We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about how we keep your information safe.`}
          </p>
          <p className={pClassName}>
            {`What are your rights? Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about your privacy rights.`}
          </p>
          <p className={pClassName}>
            {`How do you exercise your rights? The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`TABLE OF CONTENTS`}
          </h2>
          <p className={pClassName}>
            {`1. WHAT INFORMATION DO WE COLLECT?`}
          </p>
          <p className={pClassName}>
            {`2. HOW DO WE PROCESS YOUR INFORMATION?`}
          </p>
          <p className={pClassName}>
            {`3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?`}
          </p>
          <p className={pClassName}>
            {`4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?`}
          </p>
          <p className={pClassName}>
            {`5. HOW LONG DO WE KEEP YOUR INFORMATION?`}
          </p>
          <p className={pClassName}>
            {`6. HOW DO WE KEEP YOUR INFORMATION SAFE?`}
          </p>
          <p className={pClassName}>
            {`7. DO WE COLLECT INFORMATION FROM MINORS?`}
          </p>
          <p className={pClassName}>
            {`8. WHAT ARE YOUR PRIVACY RIGHTS?`}
          </p>
          <p className={pClassName}>
            {`9. CONTROLS FOR DO-NOT-TRACK FEATURES`}
          </p>
          <p className={pClassName}>
            {`10. DO WE MAKE UPDATES TO THIS NOTICE?`}
          </p>
          <p className={pClassName}>
            {`11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?`}
          </p>
        </div>


        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`1. WHAT INFORMATION DO WE COLLECT?`}
          </h2>
          <h3 className={h3Classname}>
            {`Personal information you disclose to us`}
          </h3>
          <p className={pClassName}>
            {`In Short: We collect personal information that you provide to us.`}
          </p>
          <p className={pClassName}>
            {`We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.`}
          </p>
          <p className={pClassName}>
            {`Personal Information Provided by You. The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:`}
          </p>
          <ul className={ulClassname}>
            <li className={liClassname}>
              {`names`}
            </li>
            <li className={liClassname}>
              {`phone numbers`}
            </li>
            <li className={liClassname}>
              {`email addresses`}
            </li>
            <li className={liClassname}>
              {`mailing addresses`}
            </li>
          </ul>
          <p className={pClassName}>
            {`Sensitive Information. We do not process sensitive information.`}
          </p>
          <p className={pClassName}>
            {`All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.`}
          </p>
          <h3 className={h3Classname}>
            {`Information automatically collected`}
          </h3>
          <p className={pClassName}>
            {`In Short: Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.`}
          </p>
          <p className={pClassName}>
            {`We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.`}
          </p>
          <p className={pClassName}>
            {`Like many businesses, we also collect information through cookies and similar technologies.`}
          </p>
          <p className={pClassName}>
            {`The information we collect includes:`}
          </p>
          <ul className={ulClassname}>
            <li className={liClassname}>
              {`Log and Usage Data. Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called "crash dumps"), and hardware settings).`}
            </li>
            <li className={liClassname}>
              {`Device Data. We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.`}
            </li>
            <li className={liClassname}>
              {`Location Data. We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.`}
            </li>
          </ul>
          <h3 className={h3Classname}>
            {`Google API`}
          </h3>
          <p className={pClassName}>
            {`Our use of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.`}
          </p>
          <h3 className={h3Classname}>
            {`Information collected from other sources`}
          </h3>
          <p className={pClassName}>
            {`In Short: We may collect limited data from public databases, marketing partners, and other outside sources.`}
          </p>
          <p className={pClassName}>
            {`In order to enhance our ability to provide relevant marketing, offers, and services to you and update our records, we may obtain information about you from other sources, such as public databases, joint marketing partners, affiliate programs, data providers, and from other third parties. This information includes mailing addresses, job titles, email addresses, phone numbers, intent data (or user behavior data), Internet Protocol (IP) addresses, social media profiles, social media URLs, and custom profiles, for purposes of targeted advertising and event promotion.`}
          </p>
        </div>


        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`2. HOW DO WE PROCESS YOUR INFORMATION?`}
          </h2>
          <p className={pClassName}>
            {`In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.`}
          </p>
          <p className={pClassName}>
            {`We process your personal information for a variety of reasons, depending on how you interact with our Services, including:`}
          </p>
          <ul className={ulClassname}>
            <li className={liClassname}>
              {`To deliver and facilitate delivery of services to the user. We may process your information to provide you with the requested service.`}
            </li>
            <li className={liClassname}>
              {`To respond to user inquiries/offer support to users. We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.`}
            </li>
            <li className={liClassname}>
              {`To fulfill and manage your orders. We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.`}
            </li>
            <li className={liClassname}>
              {`To request feedback. We may process your information when necessary to request feedback and to contact you about your use of our Services.`}
            </li>
            <li className={liClassname}>
              {`To send you marketing and promotional communications. We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time. For more information, see "WHAT ARE YOUR PRIVACY RIGHTS?" below.`}
            </li>
            <li className={liClassname}>
              {`To post testimonials. We post testimonials on our Services that may contain personal information.`}
            </li>
            <li className={liClassname}>
              {`To evaluate and improve our Services, products, marketing, and your experience. We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns, and to evaluate and improve our Services, products, marketing, and your experience.`}
            </li>
            <li className={liClassname}>
              {`To identify usage trends. We may process information about how you use our Services to better understand how they are being used so we can improve them.`}
            </li>
          </ul>
        </div>


        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?`}
          </h2>
          <p className={pClassName}>
            {`In Short: We may share information in specific situations described in this section and/or with the following categories of third parties.`}
          </p>
          <p className={pClassName}>
            {`Vendors, Consultants, and Other Third-Party Service Providers. We may share your data with third-party vendors, service providers, contractors, or agents ("third parties") who perform services for us or on our behalf and require access to such information to do that work. We have contracts in place with our third parties, which are designed to help safeguard your personal information. This means that they cannot do anything with your personal information unless we have instructed them to do it. They will also not share your personal information with any organization apart from us. They also commit to protect the data they hold on our behalf and to retain it for the period we instruct.`}
          </p>
          <p className={pClassName}>
            {`The categories of third parties we may share personal information with are as follows:`}
          </p>
          <ul className={ulClassname}>
            <li className={liClassname}>
              {`Ad Networks`}
            </li>
            <li className={liClassname}>
              {`Cloud Computing Services`}
            </li>
            <li className={liClassname}>
              {`Communication & Collaboration Tools`}
            </li>
            <li className={liClassname}>
              {`Data Analytics Services`}
            </li>
            <li className={liClassname}>
              {`Performance Monitoring Tools`}
            </li>
            <li className={liClassname}>
              {`Retargeting Platforms`}
            </li>
            <li className={liClassname}>
              {`Sales & Marketing Tools`}
            </li>
            <li className={liClassname}>
              {`Testing Tools`}
            </li>
            <li className={liClassname}>
              {`Website Hosting Service Providers`}
            </li>
            <li className={liClassname}>
              {`User Account Registration & Authentication Services`}
            </li>
          </ul>
          <p className={pClassName}>
            {`We also may need to share your personal information in the following situations:`}
          </p>
          <ul className={ulClassname}>
            <li className={liClassname}>
              {`Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.`}
            </li>
            <li className={liClassname}>
              {`When we use Google Maps Platform APIs. We may share your information with certain Google Maps Platform APIs (e.g., Google Maps API, Places API). Google Maps uses GPS, Wi-Fi, and cell towers to estimate your location. GPS is accurate to about 20 meters, while Wi-Fi and cell towers help improve accuracy when GPS signals are weak, like indoors. This data helps Google Maps provide directions, but it is not always perfectly precise.`}
            </li>
            <li className={liClassname}>
              {`Business Partners. We may share your information with our business partners to offer you certain products, services, or promotions.`}
            </li>
          </ul>
        </div>


        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?`}
          </h2>
          <p className={pClassName}>
            {`In Short: We may use cookies and other tracking technologies to collect and store your information.`}
          </p>
          <p className={pClassName}>
            {`We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.`}
          </p>
          <p className={pClassName}>
            {`We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.`}
          </p>
          <h3 className={h3Classname}>
            {`Google Analytics`}
          </h3>
          <p className={pClassName}>
            {`We may share your information with Google Analytics to track and analyze the use of the Services. The Google Analytics Advertising Features that we may use include: Remarketing with Google Analytics, Google Display Network Impressions Reporting and Google Analytics Demographics and Interests Reporting. To opt out of being tracked by Google Analytics across the Services, visit https://tools.google.com/dlpage/gaoptout. You can opt out of Google Analytics Advertising Features through Ads Settings and Ad Settings for mobile apps. Other opt out means include http://optout.networkadvertising.org/ and http://www.networkadvertising.org/mobile-choice. For more information on the privacy practices of Google, please visit the Google Privacy & Terms page.`}
          </p>
        </div>


        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`5. HOW LONG DO WE KEEP YOUR INFORMATION?`}
          </h2>
          <p className={pClassName}>
            {`In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.`}
          </p>
          <p className={pClassName}>
            {`We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).`}
          </p>
          <p className={pClassName}>
            {`When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.`}
          </p>
        </div>


        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`6. HOW DO WE KEEP YOUR INFORMATION SAFE?`}
          </h2>
          <p className={pClassName}>
            {`In Short: We aim to protect your personal information through a system of organizational and technical security measures.`}
          </p>
          <p className={pClassName}>
            {`We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.`}
          </p>
        </div>


        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`7. DO WE COLLECT INFORMATION FROM MINORS?`}
          </h2>
          <p className={pClassName}>
            {`In Short: We do not knowingly collect data from or market to children under 18 years of age.`}
          </p>
          <p className={pClassName}>
            {`We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at ${emailAddress}.`}
          </p>
        </div>


        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`8. WHAT ARE YOUR PRIVACY RIGHTS?`}
          </h2>
          <p className={pClassName}>
            {`Opting out of marketing and promotional communications: You can unsubscribe from our marketing and promotional communications at any time by clicking on the unsubscribe link in the emails that we send, replying "STOP" or "UNSUBSCRIBE" to the SMS messages that we send, or by contacting us using the details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below. You will then be removed from the marketing lists. However, we may still communicate with you — for example, to send you service-related messages that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.`}
          </p>
          <p className={pClassName}>
            {`No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Information sharing to subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with third parties.`}
          </p>
          <p className={pClassName}>
            {`Cookies and similar technologies: Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services.`}
          </p>
          <p className={pClassName}>
            {`If you have questions or comments about your privacy rights, you may email us at ${emailAddress}.`}
          </p>
        </div>


        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`9. CONTROLS FOR DO-NOT-TRACK FEATURES`}
          </h2>
          <p className={pClassName}>
            {`Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.`}
          </p>
          <p className={pClassName}>
            {`Because there currently is not an industry or legal standard for recognizing or honoring DNT signals, we do not respond to them at this time.`}
          </p>
        </div>





        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`10. DO WE MAKE UPDATES TO THIS NOTICE?`}
          </h2>
          <p className={pClassName}>
            {`In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.`}
          </p>
          <p className={pClassName}>
            {`We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.`}
          </p>
        </div>


        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?`}
          </h2>
          <p className={pClassName}>
            {`If you have questions or comments about this notice, you may contact our Data Protection Officer (DPO) by email at ${emailAddress}`}
          </p>
        </div>




      </div>
    </div>
  )
}