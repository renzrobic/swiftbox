import React from 'react';
import AdminForm from './AdminForm';

export default function RegistrationColumn() {
  return (
    <section className="lg:col-span-4 order-2 lg:order-1">
      <div className="lg:sticky lg:top-32">
        <div className="mb-8 border-b-2 border-royal-blue/30 pb-4">
          <h3 className="text-xs font-semibold text-royal-blue/70 uppercase tracking-[0.2em]">
            Registration
          </h3>
        </div>
        <AdminForm />
      </div>
    </section>
  );
}