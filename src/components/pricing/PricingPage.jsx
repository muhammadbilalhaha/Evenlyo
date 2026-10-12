import React from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import { Check, Star } from 'lucide-react';

const PricingPage = () => {
  // If you later add `pricingPlans` to dataSlice, this will pick them up.
  // For now, it returns undefined and shows the empty state.
  const pricingPlans = useAppSelector((state) => state.data.pricingPlans);

  return (
    <div className="bg-[#F8F9FB] min-h-screen">
      {/* ===================== HEADER ===================== */}
      <section className="pt-20 md:pt-24 pb-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5">
          Pricing &amp; Plans
        </h1>
        <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
          Pick the plan that's right for you as a vendor and start scaling with confidence.
        </p>
      </section>

      {/* ===================== PLANS OR EMPTY STATE ===================== */}
      <section className="container mx-auto px-4 pb-24">
        {pricingPlans && pricingPlans.length > 0 ? (
          /* -------- Plans Grid (when data exists) -------- */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-8 border-2 transition-shadow hover:shadow-lg ${
                  plan.isPopular ? 'border-brand-pink shadow-lg' : 'border-gray-100'
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-pink text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> Most Popular
                  </span>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">€{plan.price}</span>
                  <span className="text-sm text-gray-500 ml-1">/month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold text-sm transition ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-[#d81b70] via-[#ea1d82] to-[#ff2a5d] text-white shadow-md shadow-pink-500/25 hover:opacity-95'
                      : 'border-2 border-brand-pink text-brand-pink hover:bg-pink-50'
                  }`}
                >
                  {plan.cta || 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* -------- Empty State (matches screenshot) -------- */
          <div className="text-center py-16">
            <p className="text-base md:text-lg text-gray-400 font-medium">
              No pricing plans available
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default PricingPage;