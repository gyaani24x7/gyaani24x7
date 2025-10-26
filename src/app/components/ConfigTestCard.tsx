"use client"

import React from "react"
import { Button } from "@/components/ui/button"

interface ConfigTestCardProps {
  contextData?: string
  file?: File | null
  onBack: () => void
}

const ConfigTestCard: React.FC<ConfigTestCardProps> = ({
  contextData,
  file,
  onBack,
}) => {
  return (
    <div className="bg-[#0a0a0a] border border-red-500 rounded-2xl p-8 shadow-xl text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-red-500 mb-4">Configure Your Test</h2>
      <p className="text-gray-300 text-sm sm:text-base mb-8">
        <span className="text-gray-400">Context Source:</span>{" "}
        {contextData ? (
          <span className="text-white">{contextData.slice(0, 80)}...</span>
        ) : (
          <span className="text-white">{file?.name || "No input provided"}</span>
        )}
      </p>

      <div className="flex justify-center">
        <Button
          onClick={onBack}
          className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-6 py-2 text-base font-medium"
        >
          Back
        </Button>
      </div>
    </div>
  )
}

export default ConfigTestCard
