"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FilePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: string;
  onUseSelection: (selected: string) => void;
}

const FilePreviewDialog: React.FC<FilePreviewDialogProps> = ({
  open,
  onOpenChange,
  content,
  onUseSelection,
}) => {
  const [selection, setSelection] = useState("");

  const handleTextSelect = () => {
    const selected = window.getSelection()?.toString() || "";
    if (selected) {
      setSelection(selected);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-[#0a0a0a] text-white border border-red-600 rounded-2xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-red-500">
            Preview & Select Text from File
          </DialogTitle>
        </DialogHeader>

        <div
          className="overflow-y-auto border border-red-700 p-4 rounded-lg bg-[#111] text-gray-300 text-sm whitespace-pre-wrap select-text max-h-[60vh]"
          onMouseUp={handleTextSelect}
        >
          {content || "No content extracted."}
        </div>

        <DialogFooter className="flex justify-between mt-4">
          <div className="text-gray-400 text-xs sm:text-sm max-w-[70%]">
            {selection
              ? `${selection.slice(0, 80)}${selection.length > 80 ? "..." : ""}`
              : "Select text above to use as context"}
          </div>
          <Button
            onClick={() => {
              if (selection) onUseSelection(selection);
              onOpenChange(false);
            }}
            disabled={!selection}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Use Selected Text
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreviewDialog;
