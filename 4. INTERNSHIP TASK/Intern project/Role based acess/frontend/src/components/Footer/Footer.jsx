import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Farm Root</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Bringing fresh organic produce from farm to table with love, quality, and care.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 mb-3">Quick links</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li><Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-emerald-600 transition-colors">Products</Link></li>
              <li><Link to="/about" className="hover:text-emerald-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 mb-3">Contact</h3>
            <p className="text-sm text-slate-700">Email: support@farmroot.com</p>
            <p className="text-sm text-slate-700">Phone: +1 (555) 123-4567</p>
            <p className="text-sm text-slate-700 mt-4">123 Green Lane, Nature City</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 text-sm text-slate-500 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Farm Root. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="hover:text-emerald-600 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-emerald-600 transition-colors">Terms</Link>
            <Link to="/support" className="hover:text-emerald-600 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
