import React from 'react';
import { motion } from 'framer-motion';
import { REVIEWS } from '../../utils/constants';

const Reviews: React.FC = () => {
  return (
    <section className="py-20 bg-bg-secondary">
      <div className="container-custom">
        <h2 className="section-title">Отзывы клиентов</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-bg-element rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.photo}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <p className="text-text-secondary text-sm">{review.carModel}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${
                          i < review.rating ? 'text-accent' : 'text-text-secondary'
                        }`}
                      ></i>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-text-secondary">{review.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;