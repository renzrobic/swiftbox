import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    question: "What is SwiftBox?",
    answer: "SwiftBox is an IoT-enabled smart locker system designed to solve the 'attendance problem' in institutional deliveries. It allows couriers to drop parcels securely even when the recipient is unavailable."
  },
  {
    question: "How does the SMS notification work?",
    answer: "Once a parcel is dropped and the locker is authorized via the Web Portal, our backend triggers an SMS via Semaphore to the recipient containing their unique claim PIN and locker number."
  },
  {
    question: "Is the system secure?",
    answer: "Yes. The lockers are equipped with industrial-grade 12V Solenoid locks and are controlled by an ESP32 node that communicates via encrypted Firebase protocols."
  },
  {
    question: "What happens if I forget my PIN?",
    answer: "The System Administrator can perform a 'Manual Release' from the Admin Hub to open the locker and reset the status to available."
  }
];

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section id="faq" className="mx-auto max-w-7xl px-8 py-24 md:px-10 md:py-32">
      <div className="mb-12 text-center md:mb-16">
        <h2 className="text-4xl font-semibold tracking-tight text-royal-blue leading-tight md:text-5xl">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mx-auto max-w-4xl space-y-4">
        {faqData.map((item, index) => {
          const isActive = activeId === index;

          return (
            <div
              key={index}
              onClick={() => setActiveId(isActive ? null : index)}
              className={`
                group cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-500 ease-in-out md:rounded-3xl
                ${isActive 
                  ? 'bg-royal-blue border-royal-blue shadow-xl shadow-royal-blue/10' 
                  : 'bg-cool-white border-royal-blue/10 hover:border-royal-blue/40 md:hover:-translate-y-1'}
              `}
            >
              {/* QUESTION AREA */}
              <div className="flex items-center justify-between gap-4 p-5 md:p-6">
                <h3 className={`
                  text-lg font-semibold leading-snug transition-colors duration-300 md:text-xl
                  ${isActive ? 'text-white' : 'text-royal-blue'}
                `}>
                  {item.question}
                </h3>
                
                <div className={`
                  shrink-0 transition-all duration-500
                  ${isActive ? 'rotate-180 text-cool-white' : 'text-royal-blue'}
                `}>
                  {isActive ? <Minus className="h-5 w-5 md:h-6 md:w-6" /> : <Plus className="h-5 w-5 md:h-6 md:w-6" />}
                </div>
              </div>

              {/* ANSWER AREA */}
              <div className={`
                transition-all duration-500 ease-in-out
                ${isActive ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
              `}>
                <div className="px-5 pb-6 md:px-6 md:pb-8">
                  <div className={`mb-6 h-[1px] w-full transition-colors ${isActive ? 'bg-white/20' : 'bg-transparent'}`} />
                  <p className={`
                    text-sm font-normal leading-relaxed md:text-base
                    ${isActive ? 'text-white/90' : 'text-matte-charcoal'}
                  `}>
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}