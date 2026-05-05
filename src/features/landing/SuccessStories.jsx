import React from 'react';
import { Quote, Star } from 'lucide-react';

const STORIES = [
  {
    name: "Juan Dela Cruz",
    role: "PCC Student",
    story: "I used to miss my Shopee deliveries because of my 7 AM classes. With SwiftBox, the rider just drops it, and I pick it up after my exam. No more 'failed delivery' texts!",
  },
  {
    name: "Kuya Rider",
    role: "Delivery Professional",
    story: "Institutional deliveries are the hardest because students are always in class. SwiftBox saves me 15 minutes per delivery. I just input the number, drop the box, and move to my next stop.",
  },
  {
    name: "Dr. Ramos",
    role: "School Administrator",
    story: "Our lobby used to be cluttered with unclaimed parcels. SwiftBox has organized our logistics and added a layer of security that we desperately needed for our campus.",
  }
];

export default function SuccessStories() {
  return (
    <section id="impact-stories" className="px-8 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end md:gap-12">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-4xl font-semibold leading-tight tracking-tight text-royal-blue md:text-5xl">
              Impact stories
            </h2>
            <p className="max-w-lg text-lg font-medium leading-tight text-royal-blue/70 md:text-xl">
              See how SwiftBox is transforming the delivery experience at Pagadian Capitol College.
            </p>
          </div>
          
          <div className="flex gap-1 pb-2" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <Star key={`star-${i}`} aria-hidden="true" size={18} className="fill-royal-blue text-royal-blue" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {STORIES.map(({ name, role, story }) => (
            <div 
              key={name}
              className="group rounded-xl border-2 border-royal-blue/10 bg-cool-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-royal-blue lg:rounded-2xl md:p-10"
            >
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-royal-blue/5 text-royal-blue transition-colors group-hover:bg-royal-blue group-hover:text-white lg:rounded-2xl">
                <Quote aria-hidden="true" size={22} />
              </div>
              
              <p className="mb-8 text-base italic leading-relaxed text-royal-blue/70">
                "{story}"
              </p>
              
              <div className="border-t border-royal-blue/10 pt-8">
                <p className="text-lg font-bold text-royal-blue md:text-xl">
                  {name}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-royal-blue/50 md:text-xs">
                  {role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}