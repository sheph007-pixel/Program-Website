"use client";

import { Monitor, ArrowUpRight } from "lucide-react";
import PhoneContact from "@/components/PhoneContact";
import { useUserName } from "@/components/NameContext";

export default function EnrollmentPage() {
  const { name } = useUserName();

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">
          {name ? `Ready To Enroll, ${name}?` : "Enrollment"}
        </h1>
        <p className="page-subtitle">
          Log in to the Enrollment Portal to see the specific
          plans and rates available for your group. Everything is customized for
          you based on your employer. Not sure where to start? Call the
          Enrollment Help Line and a Benefits Coach will walk you through it.
        </p>
      </div>

      {/* Enrollment Portal */}
      <div className="animate-fade-in-up stagger-1">
        <a
          href="https://goenroll.employeenavigator.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <Monitor size={20} strokeWidth={1.8} />
          Enrollment Portal
          <ArrowUpRight size={16} className="ml-1 opacity-60" />
        </a>
      </div>

      <div className="divider" />

      {/* Help Line */}
      <div className="animate-fade-in-up stagger-2 text-center">
        <p className="mb-5 text-[15px] text-slate-500">
          Need help enrolling? A Benefits Coach can walk you through your
          options, explain your rates, and get you enrolled over the phone.
        </p>
      </div>

      <div className="animate-fade-in-up stagger-3">
        <PhoneContact
          number="(833) 614-1622"
          label="Enrollment Help Line"
          sublabel="Live enrollment support from your Benefits Coach"
          gradient="from-emerald-600 to-teal-500"
          shadow="shadow-emerald-500/20"
        />
      </div>
    </div>
  );
}
