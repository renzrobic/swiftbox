import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/layout/ScrollReveal';
import OptimizedMedia from '../../components/ui/OptimizedMedia';
import SystemInfrastructureSkeleton from './SystemInfrastructureSkeleton';

const INFRASTRUCTURE_STEPS = [
  {
    title: "ESP32 Powered Smart Nodes",
    description: "Deploy resilient locker units across campus. Each node manages physical security through 12V solenoid-driven access control, eliminating insecure Gate Drops.",
    videoSrc: "https://videos.pexels.com/video-files/6754824/6754824-uhd_2560_1440_25fps.mp4",
    poster: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    reversed: false,
  },
  {
    title: "Asynchronous Protocol",
    description: "SwiftBox removes the necessity for simultaneous physical presence. Couriers secure parcels instantly using the 'Drop and Go' protocol via the iPad kiosk.",
    videoSrc: "https://videos.pexels.com/video-files/6169110/6169110-hd_1920_1080_25fps.mp4", 
    poster: "https://images.pexels.com/photos/4392039/pexels-photo-4392039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    reversed: true,
  },
  {
    title: "Cloud Security",
    description: "Maintain end-to-end data integrity as the Firebase backend handles encrypted Time-Based One-Time Password (TOTP) generation and audit logs.",
    videoSrc: "https://videos.pexels.com/video-files/34160292/14482687_2560_1440_25fps.mp4", 
    poster: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    reversed: false,
  }
];


export default function SystemInfrastructure() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <SystemInfrastructureSkeleton />;

  return (
    <section id="infrastructure" className="overflow-hidden section-spacing">
      <div className="section-container">
        
        <ScrollReveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-10 md:mb-24 md:flex-row md:gap-12">
            <div className="max-w-2xl">
              <h2 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-ink md:mb-8 md:text-5xl">
                Intelligent Nodes That <br className="hidden sm:block" /> Streamline Logistics
              </h2>
              <p className="max-w-xl text-lg font-medium leading-tight text-ink/70 md:text-xl">
                SwiftBox integrates an iPad-based central kiosk and ESP32 hardware to automate physical exchange, actively developed for academic institutions like Pagadian Capitol College.
              </p>            </div>
            <Link 
              to="/platform"
              className="rounded-full bg-ink px-6 py-2 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-matte-charcoal md:w-auto btn-ai-glow"
            >
              Explore System
            </Link>
          </div>
        </ScrollReveal>

        <div className="space-y-32 md:space-y-64">
          {INFRASTRUCTURE_STEPS.map((step, index) => (
            <ScrollReveal key={step.title} delay={0.1}>
              <div 
                className={`flex flex-col items-center gap-12 lg:flex-row md:gap-24 ${step.reversed ? 'lg:flex-row-reverse' : ''}`}
              >
                
                {/* VIDEO CANVAS */}
                <div className="relative aspect-[16/10] w-full lg:w-7/12" aria-hidden="true">
                  <div className="relative h-full w-full overflow-hidden rounded-xl bg-ink/10 shadow-xl lg:rounded-2xl">
                    <OptimizedMedia 
                      type="video"
                      src={step.videoSrc}
                      fallbackSrc={step.poster}
                      className="h-full w-full"
                      aspectRatio="h-full w-full"
                    />
                  </div>
                </div>
  
                {/* TEXT CONTENT */}
                <div className="w-full lg:w-5/12">
                  <h3 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
                    {step.title}
                  </h3>
  
                  <p className="text-base font-normal leading-tight text-ink/70 md:text-lg">
                    {step.description}
                  </p>
                </div>
  
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}