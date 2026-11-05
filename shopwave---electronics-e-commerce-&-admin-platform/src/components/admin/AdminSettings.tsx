import React, { useState } from 'react';
import { Save, CheckCircle2, Globe, Truck, DollarSign, Bell, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetToDemoData } = useStore();

  const [siteName, setSiteName] = useState(settings.siteName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [contactPhone, setContactPhone] = useState(settings.contactPhone);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [address, setAddress] = useState(settings.address);
  const [deliveryInside, setDeliveryInside] = useState(settings.deliveryFeeInsideDhaka);
  const [deliveryOutside, setDeliveryOutside] = useState(settings.deliveryFeeOutsideDhaka);
  const [freeThreshold, setFreeThreshold] = useState(settings.freeDeliveryThreshold);
  const [heroHeading, setHeroHeading] = useState(settings.heroHeading);
  const [heroSubheading, setHeroSubheading] = useState(settings.heroSubheading);
  const [heroCtaText, setHeroCtaText] = useState(settings.heroCtaText);
  const [announcementBanner, setAnnouncementBanner] = useState(settings.announcementBanner);
  const [showAnnouncement, setShowAnnouncement] = useState(settings.showAnnouncement);
  const [isStoreOpen, setIsStoreOpen] = useState(settings.isStoreOpen);

  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      siteName,
      tagline,
      contactEmail,
      contactPhone,
      whatsappNumber,
      address,
      deliveryFeeInsideDhaka: Number(deliveryInside),
      deliveryFeeOutsideDhaka: Number(deliveryOutside),
      freeDeliveryThreshold: Number(freeThreshold),
      heroHeading,
      heroSubheading,
      heroCtaText,
      announcementBanner,
      showAnnouncement,
      isStoreOpen,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset the entire store database back to initial 20 electronics and sample orders? This will overwrite recent demo entries.')) {
      resetToDemoData();
      alert('Store reset successfully to initial demo state!');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Website & Operations Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure storefront hero copywriting, Bangladesh delivery charges, and contact details.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3.5 py-2 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold"
        >
          Reset Store Demo Data
        </button>
      </div>

      {savedNotice && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Website settings successfully saved and applied to storefront!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Homepage Hero & Banner Management */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#168DE2]" />
            <span>Homepage Hero & Marketing Banners</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold mb-1">Hero Main Heading</label>
              <input
                type="text"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Hero Subheading Description</label>
              <textarea
                rows={2}
                value={heroSubheading}
                onChange={(e) => setHeroSubheading(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Hero CTA Button Text</label>
                <input
                  type="text"
                  value={heroCtaText}
                  onChange={(e) => setHeroCtaText(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Top Announcement Strip Text</label>
                <input
                  type="text"
                  value={announcementBanner}
                  onChange={(e) => setAnnouncementBanner(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="pt-1 flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer font-semibold">
                <input
                  type="checkbox"
                  checked={showAnnouncement}
                  onChange={(e) => setShowAnnouncement(e.target.checked)}
                  className="rounded text-[#168DE2]"
                />
                <span>Display top announcement bar</span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 2: Delivery Rates & Thresholds */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#168DE2]" />
            <span>Delivery Fees & Shipping Thresholds</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Inside Dhaka Fee (৳)</label>
              <input
                type="number"
                min="0"
                value={deliveryInside}
                onChange={(e) => setDeliveryInside(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 tabular-nums font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Outside Dhaka Fee (৳)</label>
              <input
                type="number"
                min="0"
                value={deliveryOutside}
                onChange={(e) => setDeliveryOutside(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 tabular-nums font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Free Delivery Threshold (৳)</label>
              <input
                type="number"
                min="0"
                value={freeThreshold}
                onChange={(e) => setFreeThreshold(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 tabular-nums font-bold text-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Contact Details & Hub Address */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#168DE2]" />
            <span>Store Identity & Hub Address</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Store Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Support Phone</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold mb-1">WhatsApp Hotline</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold mb-1">Store Hub & Dispatch Address</label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#168DE2] hover:bg-[#123B82] text-white text-xs font-bold rounded-2xl shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save All Website Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
