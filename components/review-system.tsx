'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ThumbsUp, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

const sampleReviews = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    city: 'Frisco, TX',
    rating: 5,
    date: '2024-01-15',
    text: 'Absolutely exceptional service! Faris installed a stunning chandelier in our dining room. Professional, punctual, and the work was flawless. Highly recommend!',
    photos: ['/placeholder-review-1.jpg', '/placeholder-review-2.jpg'],
    project: 'Chandelier Installation',
    verified: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    city: 'Plano, TX',
    rating: 5,
    date: '2024-01-10',
    text: 'Same-day service for our EV charger installation. The team was knowledgeable and left everything clean. Great communication throughout.',
    project: 'EV Charger Installation',
    verified: true,
  },
  {
    id: 3,
    name: 'Jennifer Adams',
    city: 'Lewisville, TX',
    rating: 5,
    date: '2024-01-05',
    text: 'Our kitchen renovation electrical work was handled perfectly. They coordinated with our contractor and stayed on schedule.',
    project: 'Kitchen Renovation',
    verified: true,
  },
  {
    id: 4,
    name: 'David Thompson',
    city: 'Southlake, TX',
    rating: 5,
    date: '2024-01-02',
    text: 'Smart home installation exceeded expectations. The team explained everything clearly and the automation works flawlessly.',
    project: 'Smart Home Integration',
    verified: false,
  },
  {
    id: 5,
    name: 'Emily Rodriguez',
    city: 'McKinney, TX',
    rating: 5,
    date: '2023-12-28',
    text: 'Professional, reliable, and reasonably priced. Had multiple outlets installed and the quality was excellent.',
    project: 'Outlet Installation',
    verified: true,
  },
];

const stats = {
  total: 127,
  average: 5.0,
  fiveStar: 98,
  fourStar: 0,
  threeStar: 0,
  twoStar: 0,
  oneStar: 0,
};

export function ReviewSystem() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'verified' | 'recent' | 'highest'>('all');
  const [showWriteReview, setShowWriteReview] = useState(false);

  const filteredReviews = selectedFilter === 'all'
    ? sampleReviews
    : selectedFilter === 'verified'
    ? sampleReviews.filter((r) => r.verified)
    : sampleReviews;

  return (
    <section id="reviews" className="py-24 bg-[var(--color-black-rich)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl mb-6">
            Customer Reviews
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            See what our customers say about our electrical services.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[var(--color-gold-primary)] mb-2">{stats.average}</div>
            <div className="text-sm text-[var(--color-text-muted)]">Average Rating</div>
            <div className="flex justify-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-[var(--color-gold-primary)] text-[var(--color-gold-primary)]" />
              ))}
            </div>
          </div>

          <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[var(--color-gold-primary)] mb-2">{stats.total}</div>
            <div className="text-sm text-[var(--color-text-muted)]">Total Reviews</div>
          </div>

          <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[var(--color-gold-primary)] mb-2">{stats.fiveStar}%</div>
            <div className="text-sm text-[var(--color-text-muted)]">5-Star Reviews</div>
          </div>

          <div className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[var(--color-gold-primary)] mb-2">100%</div>
            <div className="text-sm text-[var(--color-text-muted)]">Would Recommend</div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'verified', label: 'Verified Only' },
            { id: 'recent', label: 'Most Recent' },
            { id: 'highest', label: 'Highest Rated' },
          ].map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedFilter(filter.id as 'all' | 'verified' | 'recent' | 'highest')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-black-rich)]",
                selectedFilter === filter.id
                  ? "bg-[var(--color-gold-primary)] text-[var(--color-black-pure)]"
                  : "bg-[var(--color-surface-800)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-700)]"
              )}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Write Review CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-lg text-[var(--color-text-secondary)] mb-6">
            Had a great experience? Share your story!
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowWriteReview(true)}
            className="px-8 py-4 rounded-lg bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-semibold text-lg transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)]"
          >
            Write a Review
          </motion.button>
        </motion.div>
      </div>

      {/* Write Review Modal */}
      <AnimatePresence>
        {showWriteReview && <WriteReviewModal onClose={() => setShowWriteReview(false)} />}
      </AnimatePresence>
    </section>
  );
}

function ReviewCard({ review, index }: { review: typeof sampleReviews[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-[var(--color-surface-900)]/50 border border-[var(--color-surface-800)] rounded-xl p-6 hover:border-[var(--color-gold-primary)]/50 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-[var(--color-gold-primary)]/10 flex items-center justify-center">
            <span className="text-lg font-bold text-[var(--color-gold-primary)]">
              {review.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-[var(--color-text-primary)]">{review.name}</h4>
              {review.verified && (
                <div className="flex items-center gap-1 text-[var(--color-gold-primary)]">
                  <ThumbsUp className="h-3 w-3" />
                  <span className="text-xs">Verified</span>
                </div>
              )}
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">{review.city}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i <= review.rating
                  ? "fill-[var(--color-gold-primary)] text-[var(--color-gold-primary)]"
                  : "text-[var(--color-text-muted)]"
              )}
            />
          ))}
        </div>
      </div>

      <p className="text-[var(--color-text-secondary)] mb-4 line-clamp-4">
        {review.text}
      </p>

      {review.project && (
        <div className="text-sm text-[var(--color-text-muted)] mb-4">
          Project: {review.project}
        </div>
      )}

      {review.photos && review.photos.length > 0 && (
        <div className="flex gap-2 mb-4">
          {review.photos.map((photo, i) => (
            <div
              key={i}
              className="h-20 w-20 rounded-lg bg-[var(--color-surface-800)] overflow-hidden"
            >
              <div className="h-full w-full bg-gradient-to-br from-[var(--color-surface-700)] to-[var(--color-surface-800)] flex items-center justify-center">
                <Camera className="h-6 w-6 text-[var(--color-text-muted)]" />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-xs text-[var(--color-text-muted)]">
        {new Date(review.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    </motion.div>
  );
}

function WriteReviewModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[1060] bg-[var(--color-black-pure)]/95 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--color-surface-900)] border border-[var(--color-surface-800)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-6">
          <h3 className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-6">
            Write a Review
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                Overall Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    className="p-2 hover:scale-110 transition-transform"
                  >
                    <Star className="h-8 w-8 text-[var(--color-text-muted)] hover:text-[var(--color-gold-primary)]" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                Your Review *
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-800)] border border-[var(--color-surface-700)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] resize-none focus:border-[var(--color-gold-primary)] focus:ring-2 focus:ring-[var(--color-gold-primary)]/20 transition-all outline-none"
                placeholder="Share your experience with Manaseerz Electric..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                Upload Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-[var(--color-surface-700)] rounded-lg p-8 hover:border-[var(--color-gold-primary)] transition-colors cursor-pointer">
                <Camera className="h-8 w-8 text-[var(--color-gold-primary)] mx-auto mb-2" />
                <p className="text-sm text-[var(--color-text-secondary)] text-center">
                  Click to upload photos of your project
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 py-3 px-6 rounded-lg border-2 border-[var(--color-surface-800)] text-[var(--color-text-primary)] transition-all hover:border-[var(--color-gold-primary)]"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 px-6 rounded-lg bg-[var(--color-gold-primary)] text-[var(--color-black-pure)] font-semibold transition-all hover:bg-[var(--color-gold-light)] hover:shadow-[var(--shadow-gold)]"
              >
                Submit Review
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}