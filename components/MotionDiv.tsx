'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionDivProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

export default function MotionDiv({ children, className, ...motionProps }: MotionDivProps) {
  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}
