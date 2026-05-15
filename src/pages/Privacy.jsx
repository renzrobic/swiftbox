import React from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollReveal from '../components/layout/ScrollReveal';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6 md:px-10">
      <Helmet>
        <title>Privacy Policy | Swiftbox Tech</title>
      </Helmet>
      
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <div className="mb-16">
            <h1 className="text-ink mb-6">Privacy Policy</h1>
            <p className="text-lg font-medium text-ink/60 leading-relaxed">
              At SwiftBox, we are committed to the security of your physical assets and the privacy of your digital data.
            </p>
          </div>
        </ScrollReveal>

        <div className="prose prose-ink max-w-none space-y-12">
          <section>
            <h3 className="text-ink mb-4 font-semibold">1. Data Collection</h3>
            <p className="text-ink/60 leading-relaxed font-medium">
              We collect minimal personal data required for parcel synchronization, including recipient name and hashed authentication tokens. We do not store plain-text passwords or biometric data on our cloud servers.
            </p>
          </section>

          <section>
            <h3 className="text-ink mb-4 font-semibold">2. Hardware Security</h3>
            <p className="text-ink/60 leading-relaxed font-medium">
              Actuation commands are encrypted using AES-256 standards. Physical locker access is logged and audited to ensure accountability for all parcel handovers.
            </p>
          </section>

          <section>
            <h3 className="text-ink mb-4 font-semibold">3. Third-Party Protocols</h3>
            <p className="text-ink/60 leading-relaxed font-medium">
              Our infrastructure utilizes Google Firebase for real-time data synchronization. Your data is protected under their global security compliance standards.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
