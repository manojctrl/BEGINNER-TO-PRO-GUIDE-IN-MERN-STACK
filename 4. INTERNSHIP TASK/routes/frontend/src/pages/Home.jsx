import React from "react";
import { FaRocket, FaUsers, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="pt-24">
      <div className="mx-auto max-w-6xl rounded-4xl border border-slate-700/70 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-300">
              Premium React experience
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Beautiful routing, polished pages, and modern UI.
            </h1>
            <p className="mt-5 max-w-2xl text-slate-300 sm:text-lg">
              Explore an attractive frontend layout built with Tailwind CSS, clean navigation, and responsive sections designed for a seamless experience.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400"
              >
                Get Started
              </Link>
              <Link
                to="/testonomials"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-500 hover:text-white"
              >
                See Testimonials
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
              <h2 className="text-lg font-semibold text-white">Speed & polish</h2>
              <p className="mt-3 text-slate-400">
                Fast interactive pages with refined spacing, subtle glass surfaces, and a clean visual hierarchy.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureCard icon={<FaRocket />} title="Launch fast" description="Beautiful loading states and navigation that feels premium." />
              <FeatureCard icon={<FaShieldAlt />} title="Secure flow" description="Protected routes and user feedback for a polished app." />
              <FeatureCard icon={<FaUsers />} title="User friendly" description="Clear structure and consistent UI across every page." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="rounded-3xl border border-slate-800/90 bg-slate-950/80 p-5 text-slate-200 shadow-lg shadow-slate-950/20 transition hover:-translate-y-1 hover:border-cyan-500/50">
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
      {icon}
    </div>
    <h3 className="mt-4 font-semibold text-white">{title}</h3>
    <p className="mt-2 text-sm text-slate-400">{description}</p>
  </div>
);

export default Home;
