import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../../utils/constants';

const Process: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <h2 className="section-title">Процесс работы</h2>

        <div className="relative">
          {/* Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-accent/30 transform -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10"
              >
                <div className="bg-bg-secondary rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-bg-primary font-bold text-xl">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold">{step}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;