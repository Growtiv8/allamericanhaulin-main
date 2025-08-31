"use server";
import "server-only";


export async function generateMetadata() {
  const dateTime = new Date(Date.now());
  const dateTimeString = dateTime.toISOString();
  const publishedTime = dateTimeString.slice(0, dateTimeString.length - 5) + "-0000";
  return {
    title: `Terms of Service`,
    description: "Terms of Service.",
    alternates: {
      canonical: "/terms-of-service"
    },
    openGraph: {
      title: `Terms of Service`,
      description: "Terms of Service.",
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
  const emailAddress = "info@allamericanhaulin.com";
  const businessName = "All American Haulin' Demos, Dumps & Junk Removal";
  const altBusinessName = "All American Haulin";
  const businessUrl = "https://allamericanhaulin.com"
  const businessAddress = "Citrus Heights, CA, USA"
  const goveringCounty = "Sacramento";
  const governingState = "California"

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
            {`TERMS OF SERVICE`}
          </h1>
          <p className={pClassName}>
            {`Last updated May 17, 2025`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`AGREEMENT TO OUR LEGAL TERMS`}
          </h2>
          <p className={pClassName}>
            {`We are ${(altBusinessName.length !== 0) ? businessName + ' (doing business as ' + altBusinessName + ')' : businessName} ("Company," "we," "us," "our"), a company located in ${businessAddress}.`}
          </p>
          <p className={pClassName}>
            {`We operate the website ${businessUrl} (the "Site"), as well as provide professional junk removal, waste disposal, demolition, and related services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").`}
          </p>
          <p className={pClassName}>
            {`You can contact us by email at ${emailAddress}`}
          </p>
          <p className={pClassName}>
            {`These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and ${businessName}, concerning your use of the Services. You agree that by using the Services, you have read, understood, and agreed to be bound by all of these Legal Terms.`}
          </p>
          <p className={pClassName}>
            {`We recommend that you print a copy of these Legal Terms for your records.`}
          </p>
        </div>




        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`TABLE OF CONTENTS`}
          </h2>
          <p className={pClassName}>
            {`1. OUR SERVICES`}
          </p>
          <p className={pClassName}>
            {`2. RIGHT TO REFUSE SERVICE`}
          </p>
          <p className={pClassName}>
            {`3. PROHIBITED ITEMS`}
          </p>
          <p className={pClassName}>
            {`4. PROPERTY ACCESS AND RESPONSIBILITY`}
          </p>
          <p className={pClassName}>
            {`5. PHOTOS AND MARKETING`}
          </p>
          <p className={pClassName}>
            {`6. DISPOSAL AND DONATION DISCLAIMER`}
          </p>
          <p className={pClassName}>
            {`7. WEATHER DELAYS AND EMERGENCIES`}
          </p>
          <p className={pClassName}>
            {`8. NO GUARANTEE OF FULL REMOVAL FOR DEMOLITION SERVICES`}
          </p>
          <p className={pClassName}>
            {`9. CLIENT PREPAREDNESS CLAUSE`}
          </p>
          <p className={pClassName}>
            {`10. DAMAGE WAIVER FOR REQUESTED ENTRY`}
          </p>
          <p className={pClassName}>
            {`11. PAYMENT FOR SERVICES`}
          </p>
          <p className={pClassName}>
            {`12. MODIFICATIONS AND INTERRUPTIONS`}
          </p>
          <p className={pClassName}>
            {`13. GOVERNING LAW`}
          </p>
          <p className={pClassName}>
            {`14. DISPUTE RESOLUTION`}
          </p>
          <p className={pClassName}>
            {`15. CORRECTIONS`}
          </p>
          <p className={pClassName}>
            {`16. LIMITATIONS OF LIABILITY`}
          </p>
          <p className={pClassName}>
            {`17. INDEMNIFICATION`}
          </p>
          <p className={pClassName}>
            {`18. USER DATA`}
          </p>
          <p className={pClassName}>
            {`19. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES`}
          </p>
          <p className={pClassName}>
            {`20. SMS TEXT MESSAGING`}
          </p>
          <p className={pClassName}>
            {`21. MISCELLANEOUS`}
          </p>
          <p className={pClassName}>
            {`22. CONTACT US`}
          </p>
        </div>


        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`1. OUR SERVICES`}
          </h2>
          <p className={pClassName}>
            {`We offer professional junk removal, waste disposal, demolition, and related services as described at the time of booking. Services are subject to availability and may be modified or canceled at our discretion. Clients will be notified promptly of any changes or cancellations.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`2. RIGHT TO REFUSE SERVICE`}
          </h2>
          <p className={pClassName}>
            {`We reserve the right to refuse service at our discretion. This includes, but is not limited to:`}
          </p>
          <ul className={ulClassname}>
            <li className={liClassname}>
              {`Unsafe or hazardous working conditions`}
            </li>
            <li className={liClassname}>
              {`Presence of illegal or toxic materials`}
            </li>
            <li className={liClassname}>
              {`Disrespectful or abusive behavior toward staff`}
            </li>
          </ul>
          <p className={pClassName}>
            {`A minimum service charge may still apply in these cases.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`3. PROHIBITED ITEMS`}
          </h2>
          <p className={pClassName}>
            {`We do not accept or handle the following materials:`}
          </p>
          <ul className={ulClassname}>
            <li className={liClassname}>
              {`Hazardous waste (chemicals, paints, oils, asbestos, etc.)`}
            </li>
            <li className={liClassname}>
              {`Medical or biological waste`}
            </li>
            <li className={liClassname}>
              {`Ammunition, firearms, or explosives`}
            </li>
            <li className={liClassname}>
              {`Liquids of any kind`}
            </li>
            <li className={liClassname}>
              {`Certain batteries or electronic waste (unless pre-approved)`}
            </li>
          </ul>
          <p className={pClassName}>
            {`Clients are responsible for notifying us of any questionable items. Undisclosed items may result in refusal of service or additional fees.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`4. PROPERTY ACCESS AND RESPONSIBILITY`}
          </h2>
          <p className={pClassName}>
            {`The Client must ensure safe and legal access to the work area. This includes:`}
          </p>
          <ul className={ulClassname}>
            <li className={liClassname}>
              {`Unlocked gates, clear walkways, and accessible driveways`}
            </li>
            <li className={liClassname}>
              {`Someone present or reachable for questions and approvals`}
            </li>
            <li className={liClassname}>
              {`Pets secured away from the work zone`}
            </li>
            <li className={liClassname}>
              {`Certain batteries or electronic waste (unless pre-approved)`}
            </li>
          </ul>
          <p className={pClassName}>
            {`If we arrive and are unable to safely access the work site, we may charge a trip fee or reschedule service.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`5. PHOTOS AND MARKETING`}
          </h2>
          <p className={pClassName}>
            {`We may take before and after photos of work performed for documentation, training, or marketing purposes. No identifying client information will be shared without permission. If you wish to opt out of this, please notify us before the job begins.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`6. DISPOSAL AND DONATION DISCLAIMER`}
          </h2>
          <p className={pClassName}>
            {`We aim to donate and recycle as much as possible through local partners. However, we cannot guarantee all items will be donated or recycled due to donation center restrictions or availability. Disposal decisions are made at our discretion based on safety and efficiency.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`7. WEATHER DELAYS AND EMERGENCIES`}
          </h2>
          <p className={pClassName}>
            {`In cases of severe weather, natural disasters, or emergencies, we may delay or reschedule services to ensure crew and client safety. The deposit will be applied to the rescheduled service.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`8. NO GUARANTEE OF FULL REMOVAL FOR DEMOLITION SERVICES`}
          </h2>
          <p className={pClassName}>
            {`Demolition jobs may have limitations due to hidden obstacles (plumbing, electrical, structural integrity, etc.). While we strive for thorough removal, full completion may not always be possible. We'll communicate any issues immediately and adjust scope if needed.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`9. CLIENT PREPAREDNESS CLAUSE`}
          </h2>
          <p className={pClassName}>
            {`To ensure efficient service:`}
          </p>
          <ul className={ulClassname}>
            <li className={liClassname}>
              {`Please clearly identify items for removal`}
            </li>
            <li className={liClassname}>
              {`Box or bag small items when possible`}
            </li>
            <li className={liClassname}>
              {`Remove items from restricted areas unless discussed`}
            </li>
          </ul>
          <p className={pClassName}>
            {`Delays due to unprepared items may result in additional charges.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`10. DAMAGE WAIVER FOR REQUESTED ENTRY`}
          </h2>
          <p className={pClassName}>
            {`If the Client requests that our crew enter any structure (home, garage, attic, etc.) or move items through narrow doorways, stairwells, or tight hallways, the Client acknowledges the risk of incidental damage and agrees to hold ${businessName} harmless for any damage that may occur during normal operations in such areas.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`11. PAYMENT FOR SERVICES`}
          </h2>
          <h3 className={h3Classname}>
            {`Payment Terms`}
          </h3>
          <p className={pClassName}>
            {`All pricing reflects our cash discount rate. If you choose to pay via credit card or other non-cash methods, a processing fee may apply.`}
          </p>
          <p className={pClassName}>
            {`To secure your scheduled service date and time, a 20% deposit is required upfront. This deposit is applied toward the total cost of your service and is non-refundable if cancellation occurs within 24 hours of the scheduled time.`}
          </p>
          <p className={pClassName}>
            {`The remaining balance is due immediately upon completion of the service. Accepted payment methods include cash, credit card, or approved electronic payments. Full payment confirms that the services were completed to the Client's satisfaction.`}
          </p>
          <h3 className={h3Classname}>
            {`Additional Charges`}
          </h3>
          <p className={pClassName}>
            {`Additional charges may apply for the following:`}
          </p>
          <ul className={ulClassname}>
            <li className={liClassname}>
              {`Oversized or unusually heavy items`}
            </li>
            <li className={liClassname}>
              {`Hazardous or restricted materials`}
            </li>
            <li className={liClassname}>
              {`Limited or difficult access to the property`}
            </li>
            <li className={liClassname}>
              {`Extended labor or time beyond the original estimate`}
            </li>
            <li className={liClassname}>
              {`Excessive wait time caused by the Client, beyond a reasonable grace period`}
            </li>
          </ul>
          <h3 className={h3Classname}>
            {`Cancellation and Rescheduling Policy`}
          </h3>
          <p className={pClassName}>
            {`Cancellations must be made at least 24 hours in advance to avoid forfeiting the deposit or incurring a cancellation fee.`}
          </p>
          <p className={pClassName}>
            {`Rescheduling will be accommodated when possible, based on team availability.`}
          </p>
        </div>


        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`12. MODIFICATIONS AND INTERRUPTIONS`}
          </h2>
          <p className={pClassName}>
            {`We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.`}
          </p>
          <p className={pClassName}>
            {`We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`13. GOVERNING LAW`}
          </h2>
          <p className={pClassName}>
            {`These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of the State of ${governingState} applicable to agreements made and to be entirely performed within the State of ${governingState}, without regard to its conflict of law principles.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`14. DISPUTE RESOLUTION`}
          </h2>
          <h3 className={h3Classname}>
            {`Informal Negotiations`}
          </h3>
          <p className={pClassName}>
            {`To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms (each a "Dispute" and collectively, the "Disputes") brought by either you or us (individually, a "Party" and collectively, the "Parties"), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.`}
          </p>
          <h3 className={h3Classname}>
            {`Binding Arbitration`}
          </h3>
          <p className={pClassName}>
            {`If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute (except those Disputes expressly excluded below) will be finally and exclusively resolved by binding arbitration. YOU UNDERSTAND THAT WITHOUT THIS PROVISION, YOU WOULD HAVE THE RIGHT TO SUE IN COURT AND HAVE A JURY TRIAL. The arbitration shall be commenced and conducted under the Commercial Arbitration Rules of the American Arbitration Association ("AAA") and, where appropriate, the AAA’s Supplementary Procedures for Consumer Related Disputes ("AAA Consumer Rules"), both of which are available at the American Arbitration Association (AAA) website. Your arbitration fees and your share of arbitrator compensation shall be governed by the AAA Consumer Rules and, where appropriate, limited by the AAA Consumer Rules. If such costs are determined by the arbitrator to be excessive, we will pay all arbitration fees and expenses. The arbitration may be conducted in person, through the submission of documents, by phone, or online. The arbitrator will make a decision in writing, but need not provide a statement of reasons unless requested by either Party. The arbitrator must follow applicable law, and any award may be challenged if the arbitrator fails to do so. Except where otherwise required by the applicable AAA rules or applicable law, the arbitration will take place in ${goveringCounty} County, ${governingState}. Except as otherwise provided herein, the Parties may litigate in court to compel arbitration, stay proceedings pending arbitration, or to confirm, modify, vacate, or enter judgment on the award entered by the arbitrator.`}
          </p>
          <p className={pClassName}>
            {`If for any reason, a Dispute proceeds in court rather than arbitration, the Dispute shall be commenced or prosecuted in the state and federal courts located in ${goveringCounty} County, ${governingState}, and the Parties hereby consent to, and waive all defenses of lack of personal jurisdiction, and forum non conveniens with respect to venue and jurisdiction in such state and federal courts. Application of the United Nations Convention on Contracts for the International Sale of Goods and the Uniform Computer Information Transaction Act (UCITA) are excluded from these Legal Terms.`}
          </p>
          <p className={pClassName}>
            {`In no event shall any Dispute brought by either Party related in any way to the Services be commenced more than one (1) years after the cause of action arose. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.`}
          </p>
          <h3 className={h3Classname}>
            {`Restrictions`}
          </h3>
          <p className={pClassName}>
            {`The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilize class action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.`}
          </p>
          <h3 className={h3Classname}>
            {`Exceptions to Informal Negotiations and Arbitration`}
          </h3>
          <p className={pClassName}>
            {`The Parties agree that the following Disputes are not subject to the above provisions concerning informal negotiations binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`15. CORRECTIONS`}
          </h2>
          <p className={pClassName}>
            {`There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`16. LIMITATIONS OF LIABILITY`}
          </h2>
          <p className={pClassName}>
            {`IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM OUR SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO $200.00 USD.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`17. INDEMNIFICATION`}
          </h2>
          <p className={pClassName}>
            {`You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) use of the Services; (2) breach of these Legal Terms; (3) any breach of your representations and warranties set forth in these Legal Terms; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`18. USER DATA`}
          </h2>
          <p className={pClassName}>
            {`We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`19. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES`}
          </h2>
          <p className={pClassName}>
            {`Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`20. SMS TEXT MESSAGING`}
          </h2>
          <h3 className={h3Classname}>
            {`Program Description`}
          </h3>
          <p className={pClassName}>
            {`By opting into any text messaging program, you expressly consent to receive text messages (SMS) to your mobile number. Text messages may include: responses to inquiries and appointment reminders.`}
          </p>
          <h3 className={h3Classname}>
            {`Opting Out`}
          </h3>
          <p className={pClassName}>
            {`If at any time you wish to stop receiving SMS messages from us, simply reply to the text with "STOP.” You may receive an SMS message confirming your opt out.`}
          </p>
          <h3 className={h3Classname}>
            {`Message and Data Rates`}
          </h3>
          <p className={pClassName}>
            {`Please be aware that message and data rates may apply to any SMS messages sent or received. The rates are determined by your carrier and the specifics of your mobile plan.`}
          </p>
          <h3 className={h3Classname}>
            {`Support`}
          </h3>
          <p className={pClassName}>
            {`If you have any questions or need assistance regarding our SMS communications, please email us at info@allamericanhaulin.com.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`21. MISCELLANEOUS`}
          </h2>
          <p className={pClassName}>
            {`These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`22. CONTACT US`}
          </h2>
          <p className={pClassName}>
            {`In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at: ${emailAddress}`}
          </p>
        </div>




      </div>
    </div>
  )
}
