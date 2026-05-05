import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ_DATA = [
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

  const toggleFaq = (index) => {
    setActiveId((prevId) => (prevId === index ? null : index));
  };

  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-32">
      <div className="mb-12 text-center md:mb-16">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-royal-blue md:text-4xl lg:text-5xl">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mx-auto max-w-4xl space-y-4">
        {FAQ_DATA.map((item, index) => {
          const isActive = activeId === index;

          return (
            <div
              key={item.question} // Changed from index to unique string!
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              onClick={() => toggleFaq(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleFaq(index);
                }
              }}
              className={`group cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-500 ease-in-out lg:rounded-2xl ${
                isActive
                  ? 'border-royal-blue bg-royal-blue shadow-xl shadow-royal-blue/10'
                  : 'border-royal-blue/10 bg-white hover:border-royal-blue/40 md:hover:-translate-y-1'
              }`}
            >
              {/* QUESTION AREA */}
              <div className="flex items-center justify-between gap-4 p-5 md:p-6">
                <h3
                  className={`text-base font-semibold leading-snug transition-colors duration-300 md:text-lg lg:text-xl ${
                    isActive ? 'text-white' : 'text-royal-blue'
                  }`}
                >
                  {item.question}
                </h3>

                <div
                  className={`shrink-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    isActive ? 'rotate-180 text-white' : 'text-royal-blue'
                  }`}
                >
                  {isActive ? <Minus className="h-5 w-5 md:h-6 md:w-6" /> : <Plus className="h-5 w-5 md:h-6 md:w-6" />}
                </div>
              </div>

              {/* ANSWER AREA */}
              <div
                aria-hidden={!isActive}
                className={`transition-all duration-500 ease-in-out ${
                  isActive ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-6 text-left md:px-6 md:pb-8">
                  <div
                    className={`mb-6 h-[1px] w-full transition-colors ${
                      isActive ? 'bg-white/20' : 'bg-transparent'
                    }`}
                  />
                  <p className="text-sm font-normal leading-relaxed text-white/90 md:text-base">
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