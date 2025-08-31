"use server";
import "server-only";
import Link from "next/link";


export async function generateMetadata() {
  const dateTime = new Date(Date.now());
  const dateTimeString = dateTime.toISOString();
  const publishedTime = dateTimeString.slice(0, dateTimeString.length - 5) + "-0000";
  return {
    title: `Cookie Policy`,
    description: "Cookie Policy.",
    alternates: {
      canonical: "/cookie-policy"
    },
    openGraph: {
      title: `Cookie Policy`,
      description: "Cookie Policy.",
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
  const aClassName = "w-full h-fit text-base text-blue-600";
  const pClassName = "w-full h-fit text-base";
  const ulClassname = "w-full h-fit text-base list-disc list-outside pl-6 flex flex-col gap-4";
  const liClassname = "w-full h-fit text-base";
  return (
    <div className="w-full h-full flex flex-col content-center items-center justify-center justify-items-center ">
      <div className="w-full h-full flex flex-col gap-8 py-8 content-center items-center justify-center justify-items-center">

        <div className={divClassname}>
          <h1 className={h1Classname}>
            {`COOKIE POLICY`}
          </h1>
          <p className={pClassName}>
            {`Last updated May 17, 2025`}
          </p>
          <p className={pClassName}>
            {`This Cookie Policy explains how ${(altBusinessName.length !== 0) ? businessName + ' (doing business as ' + altBusinessName + ')' : businessName}  ("Company," "we," "us," and "our") uses cookies and similar technologies to recognize you when you visit our website at ${businessUrl} ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.`}
          </p>
          <p className={pClassName}>
            {`In some cases we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`What are cookies?`}
          </h2>
          <p className={pClassName}>
            {`Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.`}
          </p>
          <p className={pClassName}>
            {`Cookies set by the website owner (in this case, ${altBusinessName}) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`Why do we use cookies?`}
          </h2>
          <p className={pClassName}>
            {`We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes. This is described in more detail below.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`How can I control cookies?`}
          </h2>
          <p className={pClassName}>
            {`As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information. The following is information about how to manage cookies on the most popular browsers:`}
          </p>
          <ul className={ulClassname}>
            <li className={liClassname}>
              <Link href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies" target="_blank" className={aClassName}>
                {`Chrome`}
              </Link>
            </li>
            <li className={liClassname}>
              <Link href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" className={aClassName}>
                {`Internet Explorer`}
              </Link>
            </li>
            <li className={liClassname}>
              <Link href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US" target="_blank" className={aClassName}>
                {`Firefox`}
              </Link>
            </li>
            <li className={liClassname}>
              <Link href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac" target="_blank" className={aClassName}>
                {`Safari`}
              </Link>
            </li>
            <li className={liClassname}>
              <Link href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank" className={aClassName}>
                {`Edge`}
              </Link>
            </li>
            <li className={liClassname}>
              <Link href="https://help.opera.com/en/latest/web-preferences/" target="_blank" className={aClassName}>
                {`Opera`}
              </Link>
            </li>
          </ul>
          <p className={pClassName}>
            {`In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit:`}
          </p>
          <ul className={ulClassname}>
            <li className={liClassname}>
              <Link href="http://www.aboutads.info/choices/" target="_blank" className={aClassName}>
                {`Digital Advertising Alliance`}
              </Link>
            </li>
            <li className={liClassname}>
              <Link href="https://youradchoices.ca/" target="_blank" className={aClassName}>
                {`Digital Advertising Alliance of Canada`}
              </Link>
            </li>
            <li className={liClassname}>
              <Link href="http://www.youronlinechoices.com/" target="_blank" className={aClassName}>
                {`European Interactive Digital Advertising Alliance`}
              </Link>
            </li>
          </ul>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`What about other tracking technologies, like web beacons?`}
          </h2>
          <p className={pClassName}>
            {`Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enables us to recognize when someone has visited our Website or opened an email including them. This allows us, for example, to monitor the traffic patterns of users from one page within a website to another, to deliver or communicate with cookies, to understand whether you have come to the website from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of email marketing campaigns. In many instances, these technologies are reliant on cookies to function properly, and so declining cookies will impair their functioning.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`Do you use Flash cookies or Local Shared Objects?`}
          </h2>
          <p className={pClassName}>
            {`Websites may also use so-called "Flash Cookies" (also known as Local Shared Objects or "LSOs") to, among other things, collect and store information about your use of our services, fraud prevention, and for other site operations.`}
          </p>
          <p className={pClassName}>
            {`If you do not want Flash Cookies stored on your computer, you can adjust the settings of your Flash player to block Flash Cookies storage using the tools contained in the `}
            <Link href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html" target="_blank" className={aClassName}>
              {`Website Storage Settings Panel. `}
            </Link>
            {`You can also control Flash Cookies by going to the `}
            <Link href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html" target="_blank" className={aClassName}>
              {`Global Storage Settings Panel `}
            </Link>
            {`and following the instructions (which may include instructions that explain, for example, how to delete existing Flash Cookies (referred to "information" on the Macromedia site), how to prevent Flash LSOs from being placed on your computer without your being asked, and (for Flash Player 8 and later) how to block Flash Cookies that are not being delivered by the operator of the page you are on at the time).`}
          </p>
          <p className={pClassName}>
            {`Please note that setting the Flash Player to restrict or limit acceptance of Flash Cookies may reduce or impede the functionality of some Flash applications, including, potentially, Flash applications used in connection with our services or online content.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`Do you serve targeted advertising?`}
          </h2>
          <p className={pClassName}>
            {`Third parties may serve cookies on your computer or mobile device to serve advertising through our Website. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in. They may also employ technology that is used to measure the effectiveness of advertisements. They can accomplish this by using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you. The information collected through this process does not enable us or them to identify your name, contact details, or other details that directly identify you unless you choose to provide these.`}
          </p>
        </div>


        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`How often will you update this Cookie Policy?`}
          </h2>
          <p className={pClassName}>
            {`We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.`}
          </p>
          <p className={pClassName}>
            {`The date at the top of this Cookie Policy indicates when it was last updated.`}
          </p>
        </div>

        <div className={divClassname}>
          <h2 className={h2Classname}>
            {`Where can I get further information?`}
          </h2>
          <p className={pClassName}>
            {`If you have any questions about our use of cookies or other technologies, please contact us at: ${emailAddress}`}
          </p>
        </div>

      </div>
    </div>
  )
}