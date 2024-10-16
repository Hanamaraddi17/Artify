import React from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignupSuccessModal = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    setTimeout(() => {
      navigate("/login"); // Redirect to login page after 2 seconds
    }, 500);
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-80"
        initial={{ scale: 0.5, y: -100 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="bg-green-500 rounded-full p-2 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <CheckIcon className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-gray-600 text-center mb-4">
            Your details have been successfully submitted. Thanks!
          </p>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            onClick={handleClick}
          >
            OK
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignupSuccessModal;
