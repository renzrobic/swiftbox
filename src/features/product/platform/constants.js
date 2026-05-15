import { Cpu, Clock, ShieldCheck } from 'lucide-react';

export const PLATFORM_FEATURES = [
  {
    id: 'hardware',
    icon: Cpu,
    label: "Hardware Infrastructure",
    title: "ESP32 Powered Smart Nodes",
    description: "Deploy resilient locker units across campus. Each node manages physical security through 12V solenoid-driven access control, eliminating insecure Gate Drops.",
    video: "https://videos.pexels.com/video-files/2792370/2792370-hd_1920_1080_30fps.mp4",
  },
  {
    id: 'protocol',
    icon: Clock,
    label: "Asynchronous Protocol",
    title: "Last-Mile Delivery Optimization",
    description: "SwiftBox eliminates the 'Attendance Problem'—where recipients are unavailable during delivery—by shifting from synchronous to asynchronous logistics.",
    video: "https://videos.pexels.com/video-files/10241357/10241357-uhd_2560_1440_24fps.mp4", 
  },
  {
    id: 'security',
    icon: ShieldCheck,
    label: "Cloud Security",
    title: "Dynamic QR Validation",
    description: "Maintain end-to-end data integrity as the Firebase backend handles encrypted Time-Based One-Time Password (TOTP) generation and audit logs.",
    video: "https://videos.pexels.com/video-files/31359793/13382284_1920_1080_30fps.mp4", 
  }
];

export const FAQS = [
  { q: "What is the SwiftBox Node?", a: "A fully autonomous ESP32-powered locker unit designed to secure parcels using a 'Drop and Go' asynchronous protocol." },
  { q: "How does SwiftBox optimize last-mile delivery?", a: "By shifting from synchronous to asynchronous delivery, SwiftBox solves the 'Attendance Problem'—where delivery windows overlap with recipient schedules—eliminating failed attempts and courier dwell time." },
  { q: "How are Gate Drops prevented?", a: "By providing a secure, automated compartment, couriers no longer need to leave packages with security guards or unauthorized personnel, reducing liability." },
  { q: "How secure is the QR verification?", a: "The iPad application acts as a central kiosk to scan Time-Based One-Time Password (TOTP) QR codes that expire immediately after use, preventing replay attacks." },
];

export const TECH_SPECS = [
  ["Microcontroller", "ESP32-WROOM-32 (Dual Core 240MHz)"],
  ["Actuator System", "12V Electromagnetic Solenoid (75kg Stress Limit)"],
  ["Circuit Isolation", "Optocoupled 4-Channel Relay (1N4007 Protected)"],
  ["Central Interface", "iPadOS Kiosk Node (Real-time QR Orchestration)"],
  ["Data Engine", "Firebase Realtime DB (Sub-200ms Global Sync)"]
];
