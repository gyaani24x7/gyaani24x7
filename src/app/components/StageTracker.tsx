"use client"

import React, { useState } from "react"
import ContextInputCard from "./ContextInputCard"
import ConfigTestCard from "./ConfigTestCard"
import { motion, AnimatePresence } from "framer-motion"

const StageTracker: React.FC = () => {
  const [stage, setStage] = useState<1 | 2>(1)
  const [contextData, setContextData] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)

  const handleContinue = () => {
    if (stage === 1) setStage(2)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 pb-12 sm:py-16 relative">
      {/* --- Stepper Header --- */}
      <div className="flex items-center justify-center mb-10">
        <div className="flex items-center gap-8 sm:gap-12">
          {/* Step 1 */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                stage >= 1 ? "bg-red-500 text-white" : "bg-gray-800 text-gray-400"
              }`}
            >
              1
            </div>
            <span
              className={`text-sm sm:text-base ${
                stage >= 1 ? "text-red-500" : "text-gray-500"
              }`}
            >
              Add Context
            </span>
          </div>

          <div className="w-14 sm:w-20 h-[2px] bg-red-500" />

          {/* Step 2 */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                stage >= 2 ? "bg-red-500 text-white" : "bg-gray-800 text-gray-400"
              }`}
            >
              2
            </div>
            <span
              className={`text-sm sm:text-base ${
                stage >= 2 ? "text-red-500" : "text-gray-500"
              }`}
            >
              Configure Test
            </span>
          </div>
        </div>
      </div>

      {/* --- Main Stage Section --- */}
      <div className="w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {stage === 1 ? (
            <motion.div
              key="context"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ContextInputCard onTextChange={setContextData} onFileSelect={setFile} onContinue={handleContinue} />
            </motion.div>
          ) : (
            <motion.div
              key="config"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ConfigTestCard
                contextData={contextData}
                file={file}
                onBack={() => setStage(1)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default StageTracker
