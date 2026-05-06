import { Cpu, Clock, ShieldCheck } from 'lucide-react';
import hardwareImg from '../../../assets/tech/embedded_tech_hardware.png';
import securityImg from '../../../assets/tech/security_encryption_abstract.png';
import kineticImg from '../../../assets/tech/kinetic_lock_render.png';

export const PLATFORM_FEATURES = [
  {
    id: 'hardware',
    icon: Cpu,
    label: "Hardware Infrastructure",
    title: "ESP32 Powered Smart Nodes",
    description: "Deploy resilient locker units across campus. Each node manages physical security through 12V solenoid-driven access control, eliminating insecure Gate Drops.",
    image: hardwareImg,
  },
  {
    id: 'protocol',
    icon: Clock,
    label: "Asynchronous Protocol",
    title: "Solve the Attendance Problem",
    description: "SwiftBox removes the necessity for simultaneous physical presence. Couriers secure parcels instantly using the 'Drop and Go' protocol via the iPad kiosk.",
    image: kineticImg, 
  },
  {
    id: 'security',
    icon: ShieldCheck,
    label: "Cloud Security",
    title: "Dynamic QR Validation",
    description: "Maintain end-to-end data integrity as the Firebase backend handles encrypted Time-Based One-Time Password (TOTP) generation and audit logs.",
    image: securityImg, 
  }
];

export const FAQS = [
  { q: "What is the SwiftBox Node?", a: "A fully autonomous ESP32-powered locker unit designed to secure parcels using a 'Drop and Go' asynchronous protocol." },
  { q: "What is the Attendance Problem?", a: "It occurs when delivery windows overlap with recipient schedules, leading to failed attempts. SwiftBox solves this by removing the need for simultaneous physical presence." },
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
