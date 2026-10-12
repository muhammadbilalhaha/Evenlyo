import React from 'react';
import { CheckCircle2, Map } from 'lucide-react';
import Badge from '../ui/Badge';

const ValueSection = () => {
  return (
    <section className="bg-brand-dark text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Map Visual */}
          <div className="relative order-2 md:order-1">
            <div className="bg-gray-900 rounded-2xl p-4 md:p-6 aspect-video flex items-center justify-center border border-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                <div className="text-center relative z-10 w-full">
                    <img src="./section.png" alt="" srcset="" />
                </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <Badge className="mb-4 md:mb-6">Evenlyo Across The Netherlands</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Everything for your event, all in one place.
            </h2>
            <p className="text-gray-300 mb-8 md:mb-10 leading-relaxed text-sm md:text-lg">
              Evenlyo connects customers and event suppliers across the Netherlands. From DJs and food trucks to marquee letters, venues, catering, photo booths and entertainment — easily compare suppliers, read reviews and book with confidence.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {['Trusted Vendors', 'Direct Communication', 'Secure Payments', 'Nationwide Coverage'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-brand-pink w-5 h-5 shrink-0" />
                  <span className="text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;