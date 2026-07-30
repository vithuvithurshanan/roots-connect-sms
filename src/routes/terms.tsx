import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Woodcrest Tree Buffalo" },
      {
        name: "description",
        content:
          "Terms and Conditions for Woodcrest Tree Buffalo, including SMS messaging terms, opt-out instructions, liability and intellectual property.",
      },
      { property: "og:title", content: "Terms & Conditions | Woodcrest Tree Buffalo" },
      {
        property: "og:description",
        content: "Website and service terms, including SMS program terms, for Woodcrest Tree Buffalo.",
      },
      { property: "og:url", content: "https://woodcrest-tree-buffalo-ny.web.app/terms" },
    ],
    links: [{ rel: "canonical", href: "https://woodcrest-tree-buffalo-ny.web.app/terms" }],
  }),
});

function Terms() {
  return (
    <SiteLayout>
      <section className="px-4 pt-12 sm:pt-20">
        <div className="container-page max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="display-lg mt-4">Terms &amp; Conditions</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Effective Date: {SITE.effectiveDate} | Last Updated: {SITE.lastUpdated}
          </p>

          <div className="legal-prose mt-10">
            <p>
              Welcome to {SITE.name}. By accessing this website or using our services, you agree to
              be bound by these Terms and Conditions. If you do not agree with any part of these
              terms, please do not use our website or services.
            </p>

            <h2>1. Business Identity</h2>
            <p>
              These Terms and Conditions govern your use of the services provided by {SITE.name},
              located at {SITE.addressLine}. Contact: {SITE.phone} | {SITE.email}.
            </p>

            <h2>2. Age Requirement (18+)</h2>
            <p>
              By using this website or enrolling in our services, including SMS messaging, you
              confirm that you are at least 18 years of age. Our SMS program is not directed to
              individuals under 18.
            </p>

            <h2>3. Terminology</h2>
            <p>
              “Client,” “You,” and “Your” refers to the user of this website. “The Company,” “We,”
              “Our,” and “Us” refers to {SITE.name}.
            </p>

            <h2>4. SMS Messaging Terms of Service</h2>
            <h3>4a. Program Description &amp; Message Types</h3>
            <p>
              By providing your phone number and checking the SMS consent checkbox on our contact
              forms, you agree to receive recurring automated text messages from {SITE.name}.
              Messages may include:
            </p>
            <ul>
              <li>Free estimate confirmations and scheduling notifications</li>
              <li>Appointment reminders and project status updates</li>
              <li>Customer support and service follow-up communications</li>
              <li>Promotional offers and seasonal announcements related to our tree care services</li>
            </ul>

            <h3>4b. Message Frequency</h3>
            <p>
              Message frequency varies based on your service activity and interactions with us. You
              may receive up to 4–8 messages per month. Frequency may increase during active service
              periods.
            </p>

            <h3>4c. Message &amp; Data Rates</h3>
            <p>
              Message and data rates may apply for any messages sent to you from us and to us from
              you. Charges are determined by your mobile carrier and your individual service plan.{" "}
              {SITE.name} is not responsible for any carrier charges.
            </p>

            <h3>4d. How to Opt Out (STOP)</h3>
            <p>
              You can opt out of receiving SMS messages at any time by replying STOP to any message
              we send. After opting out, you will receive a one-time confirmation message and will
              no longer receive SMS messages from us unless you re-enroll.
            </p>

            <h3>4e. How to Get Help (HELP)</h3>
            <p>
              For help with our SMS program, reply HELP to any message or contact us directly at:
            </p>
            <ul>
              <li>Phone: {SITE.phone}</li>
              <li>Email: {SITE.email}</li>
            </ul>

            <h3>4f. Carrier Liability Disclaimer</h3>
            <p>
              Mobile carriers are not liable for delayed or undelivered messages. {SITE.name} cannot
              guarantee delivery of SMS messages. Delivery of information through SMS may be subject
              to your mobile carrier’s capability and coverage area.
            </p>

            <h3>4g. Supported Carriers</h3>
            <p>
              Our SMS program is supported by all major U.S. wireless carriers including AT&amp;T,
              Verizon, T-Mobile, and Sprint. Not all carriers are supported for all messages.
            </p>

            <h2>5. Cookies</h2>
            <p>
              We use cookies in accordance with our Privacy Policy to improve user experience and
              website functionality.
            </p>

            <h2>6. Intellectual Property &amp; License</h2>
            <p>
              Unless otherwise stated, {SITE.name} owns the intellectual property rights for all
              content on this website. You may not copy, reproduce, republish, sell, or redistribute
              any material without prior written permission.
            </p>

            <h2>7. Comments &amp; User Content</h2>
            <p>
              {SITE.name} reserves the right to monitor and remove any comments or user-generated
              content on our platforms that are inappropriate, offensive, or violate these terms.
            </p>

            <h2>8. Content Liability</h2>
            <p>
              We are not responsible for content that appears on external websites linking to us.
              You agree to defend and protect {SITE.name} against any claims arising from your
              website or digital properties.
            </p>

            <h2>9. Disclaimer</h2>
            <p>
              To the maximum extent permitted by applicable law, {SITE.name} excludes all
              warranties, representations, and conditions relating to our website and services. We
              are not liable for any loss or damage (including, without limitation, damage for loss
              of business, profits, or revenue) arising from the use of our website or services.
            </p>

            <h2>10. Changes to These Terms</h2>
            <p>
              We reserve the right to update these Terms and Conditions at any time. Changes will be
              posted on this page with a revised “Last Updated” date. Continued use of our website
              or services constitutes acceptance of the updated terms.
            </p>

            <h2>11. Contact Information</h2>
            <p>For questions about these Terms and Conditions, please contact us:</p>
            <ul>
              <li>Company: {SITE.name}</li>
              <li>Address: {SITE.addressLine}</li>
              <li>Phone: {SITE.phone}</li>
              <li>Email: {SITE.email}</li>
            </ul>
          </div>
        </div>
      </section>
      <div className="h-20" />
    </SiteLayout>
  );
}
