import React from 'react';
import ScrollReveal from '../../components/layout/ScrollReveal';
import Accordion from '../../components/ui/Accordion';

const FAQ_DATA = [
  {
    question: "What is SwiftBox?",
    answer: "SwiftBox is an IoT-enabled smart locker system designed to solve the 'Attendance Problem' in institutional deliveries. It allows couriers to securely drop parcels using an asynchronous 'Drop and Go' protocol."
  },
  {
    question: "How does the QR authentication work?",
    answer: "The iPad application acts as a central kiosk. It generates and scans 'Time-Based One-Time Password' (TOTP) dynamic QR codes that expire immediately after use, preventing replay attacks."
  },
  {
    question: "Is the system secure?",
    answer: "Yes. The lockers are equipped with industrial-grade 12V Solenoid locks and are controlled by an ESP32 node that communicates via encrypted Firebase protocols, eliminating insecure 'Gate Drops'."
  },
  {
    question: "What happens during network outages?",
    answer: "While the iPad kiosk requires Wi-Fi for real-time Firebase synchronization, the system architecture ensures that physical actuation commands are only processed when securely authenticated."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-32">
      <ScrollReveal noScale>
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
        </div>
      </ScrollReveal>

      <div className="mx-auto max-w-4xl">
        <Accordion items={FAQ_DATA} />
      </div>
    </section>
  );
}