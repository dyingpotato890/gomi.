'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { useRouter } from "next/navigation";

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative w-full flex justify-center items-center pt-14">
      {/* Button to toggle drawer */}
    <div className="flex justify-around w-[50vw]">
    <Button label="Sign Up" func={router.push} parameter="/landingpage"/>
 <Button label="Join Gomi" func={setIsOpen} parameter="true"/>
    <Button label="Login" func={router.push} parameter="/login"/>
    </div>
         {/* Animated Drawer */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: isOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', stiffness: 60, damping: 15 }}
        className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-lg p-6"
        style={{ height: '50vh' }}
      >
        <div className="relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-4 text-green-500 text-xl"
          >
            ✕
          </button>
          <div className="w-full h-16 rounded-b-full absolute -top-8"></div>
          <p className="text-center text-black text-lg mt-8">Welcome to the Drawer!</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Drawer;
