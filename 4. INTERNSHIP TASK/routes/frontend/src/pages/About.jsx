import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-24">
      <div className="mx-auto max-w-5xl rounded-4xl border border-slate-700/70 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl md:p-12">
        <div className="space-y-6 text-slate-100">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">About this project</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">A clean interface designed for fast browsing and clear actions.</h2>
          <p className="max-w-3xl text-slate-400">
            This React frontend uses Tailwind CSS to deliver a polished visual system with accessible contrast, elegant cards, and responsive layout across every page.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <InfoCard title="Modern Design" description="A soft glass effect, gradient accents, and bold headings help your content feel current and confident." />
          <InfoCard title="Consistent Navigation" description="Sticky navigation and active states keep visitors oriented on every route." />
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-10 inline-flex rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
};

const InfoCard = ({ title, description }) => (
  <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-6 text-slate-200 shadow-xl shadow-slate-950/20">
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="mt-3 text-slate-400">{description}</p>
  </div>
);

export default About;
