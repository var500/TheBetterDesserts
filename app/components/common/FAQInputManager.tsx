import React, { useState } from "react";
import { Button } from "../ui/button";
import type { FAQItem } from "~/common/types"; // Adjust import path as needed

interface FAQInputManagerProps {
  faqs: FAQItem[];
  onChange: (faqs: FAQItem[]) => void;
}

const MAX_FAQS = 10;
const MAX_Q_CHARS = 150;
const MAX_A_CHARS = 400;

export default function FAQInputManager({
  faqs = [],
  onChange,
}: FAQInputManagerProps) {
  const [qInput, setQInput] = useState("");
  const [aInput, setAInput] = useState("");

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editQ, setEditQ] = useState("");
  const [editA, setEditA] = useState("");

  const handleAdd = () => {
    const trimmedQ = qInput.trim();
    const trimmedA = aInput.trim();

    if (trimmedQ && trimmedA && faqs.length < MAX_FAQS) {
      onChange([...faqs, { question: trimmedQ, answer: trimmedA }]);
      setQInput("");
      setAInput("");
    }
  };

  const handleDelete = (indexToDelete: number) => {
    onChange(faqs.filter((_, index) => index !== indexToDelete));
    if (editingIndex === indexToDelete) setEditingIndex(null);
  };

  const handleEditStart = (index: number) => {
    setEditingIndex(index);
    setEditQ(faqs[index].question);
    setEditA(faqs[index].answer);
  };

  const handleEditSave = () => {
    const trimmedQ = editQ.trim();
    const trimmedA = editA.trim();

    if (trimmedQ && trimmedA && editingIndex !== null) {
      const newFaqs = [...faqs];
      newFaqs[editingIndex] = { question: trimmedQ, answer: trimmedA };
      onChange(newFaqs);
      setEditingIndex(null);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Frequently Asked Questions
          </label>
          <span className="text-xs font-medium text-gray-500">
            {faqs.length} / {MAX_FAQS} Added
          </span>
        </div>

        {/* Add New FAQ Form */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
          <div>
            <input
              type="text"
              placeholder="Question (e.g., Is Caszel vegan?)"
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              maxLength={MAX_Q_CHARS}
              disabled={faqs.length >= MAX_FAQS}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border outline-none text-sm font-medium"
            />
            <div className="text-right mt-1 text-xs text-gray-500">
              {MAX_Q_CHARS - qInput.length} chars left
            </div>
          </div>
          <div>
            <textarea
              rows={2}
              placeholder="Answer (e.g., Yes, Caszel is 100% vegan...)"
              value={aInput}
              onChange={(e) => setAInput(e.target.value)}
              maxLength={MAX_A_CHARS}
              disabled={faqs.length >= MAX_FAQS}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border outline-none text-sm"
            />
            <div className="text-right mt-1 text-xs text-gray-500">
              {MAX_A_CHARS - aInput.length} chars left
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              variant="default"
              onClick={handleAdd}
              disabled={
                !qInput.trim() || !aInput.trim() || faqs.length >= MAX_FAQS
              }
              className="px-4 py-2 text-sm"
            >
              Add FAQ
            </Button>
          </div>
        </div>
      </div>

      {/* List of Added FAQs */}
      {faqs.length > 0 && (
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-3 border border-gray-200 rounded-md bg-white shadow-sm"
            >
              {editingIndex === index ? (
                // EDIT MODE
                <div className="space-y-2 w-full">
                  <input
                    type="text"
                    value={editQ}
                    onChange={(e) => setEditQ(e.target.value)}
                    maxLength={MAX_Q_CHARS}
                    className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border outline-none text-sm font-medium"
                  />
                  <textarea
                    rows={2}
                    value={editA}
                    onChange={(e) => setEditA(e.target.value)}
                    maxLength={MAX_A_CHARS}
                    className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 border outline-none text-sm"
                  />
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setEditingIndex(null)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleEditSave}
                      disabled={!editQ.trim() || !editA.trim()}
                      className="text-sm text-blue-600 font-medium hover:text-blue-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                // VIEW MODE
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Q: {faq.question}
                    </p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      A: {faq.answer}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEditStart(index)}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
