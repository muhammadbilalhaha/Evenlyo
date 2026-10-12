import React from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const { faqs } = useAppSelector((state) => state.data);

  return (
    <section id='features' className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-gray-900">Have Questions?</h2>
        <p className="text-gray-500 text-center mb-10 md:mb-12 text-sm md:text-base">
          Check out our comprehensive FAQ section or contact our support team.
        </p>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group border border-gray-200 rounded-xl bg-white overflow-hidden hover:border-brand-pink/30 transition">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 md:p-5 text-gray-800 hover:text-brand-pink transition text-sm md:text-base">
                <span>{faq.q}</span>
                <span className="transition group-open:rotate-180 text-gray-400 group-open:text-brand-pink shrink-0 ml-4">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </summary>
              <div className="text-gray-600 text-sm px-4 md:px-5 pb-4 md:pb-5 pt-0 border-t border-gray-100 mt-2">
                <p className="pt-4">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;