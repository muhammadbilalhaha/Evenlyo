import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { closeVendorDetail } from '../../features/ui/uiSlice';
import {
  ChevronLeft, ChevronRight, Star, ArrowLeft,
  Heart, ShoppingBag, MapPin, Clock, ShieldCheck,
  PartyPopper, Music, Utensils, Tent, Users, Armchair, Lightbulb, Sofa,
  Flower2, UtensilsCrossed, Castle, Baby, Disc, Car, Flame, Mic2, Guitar,
  Wand2, Camera, Headphones, Mic, Palette, Truck, ChefHat, GlassWater, Cake,
  Palmtree, Anchor, Video, Shield, ClipboardList, Warehouse
} from 'lucide-react';

const iconMap = {
  PartyPopper, Music, Utensils, Tent, Users, Armchair, Lightbulb, Sofa,
  Flower2, UtensilsCrossed, Castle, Baby, Disc, Car, Flame, Mic2, Guitar,
  Wand2, Camera, Headphones, Mic, Palette, Truck, ChefHat, GlassWater, Cake,
  Palmtree, Anchor, Video, Shield, ClipboardList, Warehouse
};

const VendorDetail = () => {
  const dispatch = useAppDispatch();
  const { selectedVendor } = useAppSelector((state) => state.ui);
  const { categories } = useAppSelector((state) => state.data);

  // Calendar state
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  if (!selectedVendor) return null;

  const vendor = selectedVendor;
  const category = categories.find(c => c.id === vendor.categoryId);
  const renderIcon = (iconName, className = "w-5 h-5") => {
    const IconComponent = iconMap[iconName] || PartyPopper;
    return <IconComponent className={className} />;
  };

  // ---------- CALENDAR LOGIC ----------
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => {
    // Convert Sunday (0) to Monday-based index (Mon=0, Sun=6)
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayIndex = getFirstDayOfMonth(currentMonth, currentYear);

  // Previous month's trailing days
  const prevMonthDays = getDaysInMonth(
    currentMonth === 0 ? 11 : currentMonth - 1,
    currentMonth === 0 ? currentYear - 1 : currentYear
  );

  const calendarDays = [];
  // Previous month filler days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    calendarDays.push({ day: prevMonthDays - i, isCurrentMonth: false, isPrev: true });
  }
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, isCurrentMonth: true });
  }
  // Next month filler days (fill to 42 for 6 rows)
  const remaining = 42 - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({ day: i, isCurrentMonth: false, isNext: true });
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else { setCurrentMonth(currentMonth - 1); }
  };
  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else { setCurrentMonth(currentMonth + 1); }
  };

  const isPastDate = (day) => {
    const d = new Date(currentYear, currentMonth, day);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const handleDateClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth || isPastDate(day)) return;
    setSelectedDate(day);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <button
          onClick={() => dispatch(closeVendorDetail())}
          className="flex items-center gap-2 text-gray-600 hover:text-brand-pink transition text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to results
        </button>
      </div>

      {/* Instruction Text */}
      <div className="text-center py-6">
        <p className="text-sm text-gray-600">
          Please select your desired date(s) on the calendar, then click 'Book Now' to continue.
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">

          {/* LEFT: Calendar */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full transition">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h3 className="text-xl font-semibold text-gray-900">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full transition">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((d, idx) => {
                const isSelected = d.isCurrentMonth && selectedDate === d.day;
                const isPast = d.isCurrentMonth && isPastDate(d.day);
                const isDisabled = !d.isCurrentMonth || isPast;

                return (
                  <button
                    key={idx}
                    onClick={() => handleDateClick(d.day, d.isCurrentMonth)}
                    disabled={isDisabled}
                    className={`
                      aspect-square flex items-center justify-center text-sm rounded-lg transition
                      ${!d.isCurrentMonth ? 'text-gray-300' : ''}
                      ${isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                      ${d.isCurrentMonth && !isPast && !isSelected ? 'text-gray-700 hover:bg-pink-50 hover:text-brand-pink' : ''}
                      ${isSelected ? 'bg-brand-pink text-white font-semibold shadow-md' : ''}
                    `}
                  >
                    {d.day}
                  </button>
                );
              })}
            </div>

            {/* Selected Date Info */}
            {selectedDate && (
              <div className="mt-6 p-3 bg-pink-50 rounded-lg text-sm text-brand-pink font-medium text-center">
                Selected: {selectedDate} {monthNames[currentMonth]} {currentYear}
              </div>
            )}
          </div>

          {/* RIGHT: Vendor Info */}
          <div>
            {/* Vendor Badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-pink/10 rounded-full flex items-center justify-center">
                <span className="text-brand-pink font-bold text-sm">D</span>
              </div>
              <span className="text-sm text-gray-600 font-medium">{vendor.vendorName}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {vendor.name}
            </h1>
            <p className="text-sm text-gray-500 mb-4">Vendor: {vendor.vendorName}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              {vendor.reviews > 0 ? (
                <>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(vendor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">{vendor.rating.toFixed(1)} ({vendor.reviews} Reviews)</span>
                </>
              ) : (
                <>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gray-300" />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">0.0 (0 Reviews)</span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Description:</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {vendor.description} Would you like to attend a cocktail workshop on location with unique cocktails, for a bachelorette party, corporate outing, or another occasion? The Cocktail Bike is happy to provide an interactive cocktail workshop in Rotterdam, The Hague, Amsterdam, or another location in the Netherlands or Belgium!
              </p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 mb-1">EU (excl. VAT)</p>
              <p className="text-3xl font-bold text-gray-900">€{vendor.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-1">Travel Cost: €0.69/km</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button className="border border-brand-pink text-brand-pink hover:bg-pink-50 font-semibold px-6 py-3 rounded-lg transition flex items-center gap-2">
                <Heart className="w-4 h-4" /> Add To Wishlist
              </button>
              <button className="bg-brand-pink hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition flex items-center gap-2 shadow-md shadow-pink-500/25">
                <ShoppingBag className="w-4 h-4" /> Book Now
              </button>
            </div>

            {/* Helper Text */}
            <p className="text-xs text-gray-500 leading-relaxed">
              You can add to wishlist without dates and specify them later, or select dates first for convenience
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VendorDetail;