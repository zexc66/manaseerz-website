'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackConversion, trackCTAClick } from '@/lib/analytics';
import { toast } from '@/components/toaster';
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isBefore,
  isAfter,
  parseISO,
} from 'date-fns';

// Available time slots
const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
];

// Service types with durations
const serviceTypes = [
  { id: 'chandelier', name: 'Chandelier Installation', duration: 2 },
  { id: 'ev-charger', name: 'EV Charger Installation', duration: 3 },
  { id: 'smart-home', name: 'Smart Home Integration', duration: 2 },
  { id: 'outlet-circuit', name: 'Outlet & Circuit Work', duration: 1 },
  { id: 'renovation', name: 'Electrical Renovation', duration: 4 },
  { id: 'range-hood', name: 'Range Hood Wiring', duration: 2 },
];

export function AppointmentBooking() {
  const [step, setStep] = useState<'service' | 'calendar' | 'time' | 'details' | 'confirmation'>('service');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentWeekStart = startOfWeek(new Date());
  const weekDates = eachDayOfInterval({
    start: currentWeekStart,
    end: endOfWeek(currentWeekStart),
  });

  const isToday = (date: Date) => isSameDay(date, new Date());
  const isPast = (date: Date) => isBefore(date, new Date());
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const handleNextStep = () => {
    switch (step) {
      case 'service':
        if (selectedService) setStep('calendar');
        break;
      case 'calendar':
        if (selectedDate) setStep('time');
        break;
      case 'time':
        if (selectedTime) setStep('details');
        break;
      case 'details':
        handleSubmit();
        break;
    }
  };

  const handleSubmit = async () => {
    if (!selectedService || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Track conversion
      trackConversion('form_submission', 'Appointment Booking');

      toast.success('Appointment Booked!', 'We\'ll send you a confirmation shortly.');

      setStep('confirmation');
    } catch (error) {
      toast.error('Booking Failed', 'Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book-appointment" className="py-24 bg-[var(--color-black-pure)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl mb-6">
            Book Your Appointment
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Schedule your electrical service online. We'll confirm your appointment within 24 hours.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center"
                style={{ flex: 1 }}
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: step === item.id ? 1.1 : 1,
                      opacity: getStepIndex(item.id) <= getStepIndex(step) ? 1 : 0.5,
                    }}
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all',
                      step === item.id
                        ? 'bg-[var(--color-gold-primary)] text-[var(--color-black-pure)]'
                        : getStepIndex(item.id) < getStepIndex(step)
                        ? 'bg-green-500 text-white'
                        : 'bg-[var(--color-surface-800)] text-[var(--color-text-muted)]'
                    )}
                  >
                    {getStepIndex(item.id) < getStepIndex(step) ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      index + 1
                    )}
                  </motion.div>
                  <span className="mt-2 text-sm text-[var(--color-text-secondary)] hidden sm:block">
                    {item.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-4 bg-[var(--color-surface-800)] rounded">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: getStepIndex(item.id) < getStepIndex(step) ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-[var(--color-gold-primary)] rounded"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-2xl p-8"
        >
          {step === 'service' && (
            <ServiceSelection
              selected={selectedService}
              onSelect={setSelectedService}
              onNext={handleNextStep}
            />
          )}

          {step === 'calendar' && (
            <CalendarSelection
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              onBack={() => setStep('service')}
              onNext={handleNextStep}
            />
          )}

          {step === 'time' && (
            <TimeSelection
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
              onBack={() => setStep('calendar')}
              onNext={handleNextStep}
              selectedDate={selectedDate}
            />
          )}

          {step === 'details' && (
            <ContactDetails
              formData={formData}
              onChange={setFormData}
              onBack={() => setStep('time')}
              onNext={handleNextStep}
              isSubmitting={isSubmitting}
            />
          )}

          {step === 'confirmation' && <Confirmation details={{ selectedService, selectedDate, selectedTime, formData }} />}
        </motion.div>
      </div>
    </section>
  );
}

const steps = [
  { id: 'service', label: 'Service' },
  { id: 'calendar', label: 'Date' },
  { id: 'time', label: 'Time' },
  { id: 'details', label: 'Details' },
  { id: 'confirmation', label: 'Confirm' },
];

function getStepIndex(stepId: string) {
  return steps.findIndex((s) => s.id === stepId);
}

function ServiceSelection({
  selected,
  onSelect,
  onNext,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h3 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-6">
        Select Your Service
      </h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {serviceTypes.map((service) => (
          <motion.button
            key={service.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onSelect(service.id);
              trackCTAClick('Service Selection', 'Appointment Booking');
            }}
            className={cn(
              'p-6 rounded-xl border-2 text-left transition-all',
              selected === service.id
                ? 'border-[var(--color-gold-primary)] bg-[var(--color-gold-primary)]/10'
                : 'border-[var(--color-surface-800)] hover:border-[var(--color-gold-primary)]/50'
            )}
          >
            <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              {service.name}
            </h4>
            <p className="text-sm text-[var(--color-text-muted)]">
              Est. Duration: {service.duration} hour{service.duration > 1 ? 's' : ''}
            </p>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={!selected}
          className="px-8 py-3 rounded-lg bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-semibold transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
}

function CalendarSelection({
  selectedDate,
  onSelectDate,
  onBack,
  onNext,
}: {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const currentWeekStart = startOfWeek(new Date());
  const weekDates = eachDayOfInterval({
    start: currentWeekStart,
    end: endOfWeek(currentWeekStart),
  });

  const isToday = (date: Date) => isSameDay(date, new Date());
  const isPast = (date: Date) => isBefore(date, new Date());
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <div>
      <h3 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-6">
        Choose a Date
      </h3>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {}}
          className="p-2 rounded-lg hover:bg-[var(--color-surface-800)] transition-colors"
        >
          <ChevronLeft className="h-6 w-6 text-[var(--color-text-secondary)]" />
        </button>
        <span className="text-lg font-semibold text-[var(--color-text-primary)]">
          This Week
        </span>
        <button
          onClick={() => {}}
          className="p-2 rounded-lg hover:bg-[var(--color-surface-800)] transition-colors"
        >
          <ChevronRight className="h-6 w-6 text-[var(--color-text-secondary)]" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-8">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-[var(--color-text-muted)] py-2">
            {day}
          </div>
        ))}

        {weekDates.map((date) => {
          const disabled = isPast(date) || isWeekend(date);
          const isSelected = selectedDate && isSameDay(date, selectedDate);

          return (
            <motion.button
              key={date.toString()}
              whileHover={{ scale: disabled ? 1 : 1.05 }}
              whileTap={{ scale: disabled ? 1 : 0.95 }}
              onClick={() => !disabled && onSelectDate(date)}
              disabled={disabled}
              className={cn(
                'p-4 rounded-xl transition-all font-semibold',
                disabled
                  ? 'text-[var(--color-text-muted)] cursor-not-allowed'
                  : isSelected
                  ? 'bg-[var(--color-gold-primary)] text-[var(--color-black-pure)]'
                  : 'bg-[var(--color-surface-800)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-700)] cursor-pointer'
              )}
            >
              {format(date, 'd')}
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="px-6 py-3 rounded-lg border-2 border-[var(--color-surface-800)] text-[var(--color-text-primary)] transition-all hover:border-[var(--color-gold-primary)]"
        >
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={!selectedDate}
          className="px-8 py-3 rounded-lg bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-semibold transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
}

function TimeSelection({
  selectedTime,
  onSelectTime,
  onBack,
  onNext,
  selectedDate,
}: {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  onBack: () => void;
  onNext: () => void;
  selectedDate: Date | null;
}) {
  return (
    <div>
      <h3 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-2">
        Select a Time Slot
      </h3>
      {selectedDate && (
        <p className="text-[var(--color-text-secondary)] mb-6">
          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </p>
      )}

      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {timeSlots.map((time) => (
          <motion.button
            key={time}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onSelectTime(time);
              trackCTAClick('Time Selection', 'Appointment Booking');
            }}
            className={cn(
              'p-4 rounded-xl transition-all font-semibold flex items-center justify-center gap-2',
              selectedTime === time
                ? 'bg-[var(--color-gold-primary)] text-[var(--color-black-pure)]'
                : 'bg-[var(--color-surface-800)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-700)]'
            )}
          >
            <Clock className="h-4 w-4" />
            {time}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="px-6 py-3 rounded-lg border-2 border-[var(--color-surface-800)] text-[var(--color-text-primary)] transition-all hover:border-[var(--color-gold-primary)]"
        >
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={!selectedTime}
          className="px-8 py-3 rounded-lg bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-semibold transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
}

function ContactDetails({
  formData,
  onChange,
  onBack,
  onNext,
  isSubmitting,
}: {
  formData: typeof contactDetailsFormData;
  onChange: (data: typeof contactDetailsFormData) => void;
  onBack: () => void;
  onNext: () => void;
  isSubmitting: boolean;
}) {
  const handleChange = (field: string, value: string) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <div>
      <h3 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-6">
        Your Details
      </h3>

      <div className="space-y-4 mb-8">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-800)] border border-[var(--color-surface-700)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-gold-primary)] focus:ring-2 focus:ring-[var(--color-gold-primary)]/20 transition-all outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-800)] border border-[var(--color-surface-700)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-gold-primary)] focus:ring-2 focus:ring-[var(--color-gold-primary)]/20 transition-all outline-none"
              placeholder="(682) 451-5951"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-800)] border border-[var(--color-surface-700)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-gold-primary)] focus:ring-2 focus:ring-[var(--color-gold-primary)]/20 transition-all outline-none"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            Service Address *
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-800)] border border-[var(--color-surface-700)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-gold-primary)] focus:ring-2 focus:ring-[var(--color-gold-primary)]/20 transition-all outline-none"
            placeholder="123 Main St, City, TX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            Additional Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-800)] border border-[var(--color-surface-700)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] resize-none focus:border-[var(--color-gold-primary)] focus:ring-2 focus:ring-[var(--color-gold-primary)]/20 transition-all outline-none"
            placeholder="Any special instructions or details..."
          />
        </div>
      </div>

      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="px-6 py-3 rounded-lg border-2 border-[var(--color-surface-800)] text-[var(--color-text-primary)] transition-all hover:border-[var(--color-gold-primary)]"
        >
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.address}
          className="px-8 py-3 rounded-lg bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-semibold transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-black-pure)] border-t-transparent" />
              Booking...
            </>
          ) : (
            'Book Appointment'
          )}
        </motion.button>
      </div>
    </div>
  );
}

const contactDetailsFormData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  notes: '',
};

function Confirmation({
  details,
}: {
  details: {
    selectedService: string | null;
    selectedDate: Date | null;
    selectedTime: string | null;
    formData: typeof contactDetailsFormData;
  };
}) {
  const serviceName = serviceTypes.find((s) => s.id === details.selectedService)?.name;

  return (
    <div className="text-center">
      <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-10 w-10 text-green-500" />
      </div>

      <h3 className="text-3xl font-display font-bold text-[var(--color-text-primary)] mb-4">
        Appointment Confirmed!
      </h3>

      <p className="text-lg text-[var(--color-text-secondary)] mb-8">
        We'll send a confirmation email to {details.formData.email}
      </p>

      <div className="bg-[var(--color-surface-800)] rounded-xl p-6 text-left space-y-4 mb-8">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-[var(--color-gold-primary)]" />
          <div>
            <p className="text-sm text-[var(--color-text-muted)]">Service</p>
            <p className="text-[var(--color-text-primary)] font-medium">{serviceName}</p>
          </div>
        </div>

        {details.selectedDate && (
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-[var(--color-gold-primary)]" />
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Date</p>
              <p className="text-[var(--color-text-primary)] font-medium">
                {format(details.selectedDate, 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
          </div>
        )}

        {details.selectedTime && (
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-[var(--color-gold-primary)]" />
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Time</p>
              <p className="text-[var(--color-text-primary)] font-medium">{details.selectedTime}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-[var(--color-gold-primary)]" />
          <div>
            <p className="text-sm text-[var(--color-text-muted)]">Contact</p>
            <p className="text-[var(--color-text-primary)] font-medium">{details.formData.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-[var(--color-gold-primary)]" />
          <div>
            <p className="text-sm text-[var(--color-text-muted)]">Email</p>
            <p className="text-[var(--color-text-primary)] font-medium">{details.formData.email}</p>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => window.location.reload()}
        className="px-8 py-3 rounded-lg bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-semibold transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)]"
      >
        Book Another Appointment
      </motion.button>
    </div>
  );
}