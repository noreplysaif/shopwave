import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface StaticPageProps {
  page: 'about' | 'contact' | 'faq' | 'privacy' | 'terms' | 'refund';
  onNavigate: (view: string) => void;
}

export const StaticPages: React.FC<StaticPageProps> = ({ page, onNavigate }) => {
  const { settings } = useStore();

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSent(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setTimeout(() => setContactSent(false), 5000);
  };

  const FAQS = [
    {
      q: 'Are all electronics sold on ShopWave 100% authentic?',
      a: 'Yes, absolutely. ShopWave only imports and sells factory-sealed, official global and regional units with valid manufacturer serials and official warranty coverage.',
    },
    {
      q: 'How fast is delivery inside Dhaka?',
      a: 'We offer express same-day and next-day delivery across Dhaka metropolitan area for orders placed before 3:00 PM. Delivery charge is ৳60 (FREE on orders above ৳50,000).',
    },
    {
      q: 'Do you deliver outside Dhaka?',
      a: 'Yes! We deliver across all 64 districts of Bangladesh via reliable courier partners (Steadfast, Pathao, RedX). Outside Dhaka delivery takes 48 to 72 hours for a flat fee of ৳120.',
    },
    {
      q: 'How does Cash on Delivery (COD) work?',
      a: 'You can inspect the sealed package upon delivery and pay the full invoice amount in cash directly to our delivery courier.',
    },
    {
      q: 'What is your 7-Day Return and Replacement Policy?',
      a: 'If your device arrives defective or dead-on-arrival, notify us within 7 days. Once verified by our technical lab in Gulshan, we will issue an immediate brand-new replacement or full refund.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* ABOUT US */}
      {page === 'about' && (
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#168DE2] uppercase tracking-wider">Our Story</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              About ShopWave
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Technology Meets Lifestyle. Bangladesh’s premier flagship electronics platform.
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
            <p>
              Founded with the vision to bring genuine, cutting-edge computing, smartphones, and audiophile gear directly to creators and technology enthusiasts in Bangladesh, <strong>ShopWave</strong> combines verified authenticity with premium customer service.
            </p>
            <p>
              Headquartered in Gulshan, Dhaka, our state-of-the-art logistics and customer experience team ensures fast doorstep delivery, safe payment channels via bKash, Nagad, and Cash on Delivery, and hassle-free warranty backing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-2xl font-black text-[#168DE2]">100%</div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">Sealed & Genuine</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Every unit verified by serial</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-2xl font-black text-[#15C8D9]">64</div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">Districts Covered</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Nationwide express transit</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-2xl font-black text-emerald-500">24/7</div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">Dedicated Support</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Expert hardware technicians</p>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT US */}
      {page === 'contact' && (
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#168DE2] uppercase tracking-wider">Get in Touch</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Contact ShopWave
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Have a question about product compatibility, bulk ordering, or shipment tracking?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Info Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Customer Support</h3>

              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#168DE2] shrink-0 mt-0.5" />
                  <div>
                    <strong>Flagship Hub & Service Center</strong>
                    <p className="text-slate-400 mt-0.5">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#168DE2] shrink-0 mt-0.5" />
                  <div>
                    <strong>Direct Hotline & WhatsApp</strong>
                    <p className="text-slate-400 mt-0.5">{settings.contactPhone}</p>
                    <p className="text-slate-400">WhatsApp: {settings.whatsappNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#168DE2] shrink-0 mt-0.5" />
                  <div>
                    <strong>Official Email</strong>
                    <p className="text-slate-400 mt-0.5">{settings.contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Send a Message</h3>

              {contactSent && (
                <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Message delivered! Our support team will reply within 2 hours.</span>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Tanvir Ahmed"
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="tanvir@example.com"
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="How can we assist you with electronics specifications or orders?"
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#168DE2] hover:bg-[#123B82] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {page === 'faq' && (
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#168DE2] uppercase tracking-wider">Help Center</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Frequently Asked Questions
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Common questions on delivery, payment methods, returns, and warranties.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#168DE2] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REFUND & RETURN POLICY */}
      {page === 'refund' && (
        <div className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Return & Refund Policy (Bangladesh)
          </h1>
          <p className="text-xs text-slate-500">Effective Date: November 2026</p>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">1. 7-Day Replacement Guarantee</h3>
            <p>
              ShopWave provides a full 7-day replacement guarantee on all sealed brand products if a hardware manufacturing defect is identified upon unboxing.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white text-sm">2. Return Eligibility</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Product must have original box, serial stickers, manuals, and accessories intact.</li>
              <li>No physical drop damage, liquid spills, or unauthorized modification.</li>
            </ul>

            <h3 className="font-bold text-slate-900 dark:text-white text-sm">3. Refund Processing</h3>
            <p>
              Approved refunds are credited back to the customer's bKash, Nagad, or bank account within 3 to 5 business days after product inspection at our Gulshan hub.
            </p>
          </div>
        </div>
      )}

      {/* PRIVACY POLICY */}
      {page === 'privacy' && (
        <div className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
            <p>
              At <strong>ShopWave</strong>, we value your privacy. We collect customer shipping addresses, phone numbers, and email accounts strictly to facilitate order processing, deliver goods, and provide warranty assistance.
            </p>
            <p>
              We do not sell customer personal data to third parties. All mobile transaction records (bKash/Nagad) are stored encrypted for bookkeeping and reconciliation.
            </p>
          </div>
        </div>
      )}

      {/* TERMS & CONDITIONS */}
      {page === 'terms' && (
        <div className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Terms & Conditions</h1>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
            <p>
              By purchasing hardware or accessing services on ShopWave, you agree to comply with our store terms and the laws of Bangladesh. Prices are displayed in Bangladeshi Taka (BDT) and are subject to real-time inventory availability.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
