"use client"

import React, { useState, KeyboardEvent } from "react"
import { X } from "lucide-react"

interface AddTagProps {
  tags?: string[]
  setTags?: (tags: string[]) => void
}

export default function AddTag({ tags = [], setTags }: AddTagProps) {
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag()
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  const addTag = () => {
    const trimmed = inputValue.trim().replace(/^#/, "")
    if (trimmed && !tags.includes(trimmed)) {
      const newTags = [...tags, trimmed]
      setTags?.(newTags)
      setInputValue("")
    }
  }

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove)
    setTags?.(newTags)
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2 p-2.5 min-h-[46px] bg-neutral-50/50 border border-neutral-200 rounded-xl focus-within:border-black focus-within:bg-white focus-within:ring-1 focus-within:ring-black transition-all">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-black text-white rounded-full animate-in fade-in zoom-in-95 duration-150 shadow-2xs"
          >
            #{tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="hover:bg-neutral-800 rounded-full p-0.5 transition-colors"
              aria-label={`Hapus tag ${tag}`}
            >
              <X className="w-3 h-3 text-neutral-300 hover:text-white" />
            </button>
          </span>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? "Ketik topik & tekan Enter (misal: #rusak, #berlubang)..." : "Tambah tag..."}
          className="flex-1 min-w-[140px] bg-transparent text-xs font-medium text-black outline-none placeholder:text-neutral-400"
        />
      </div>
      <p className="text-[11px] text-neutral-400">
        Tekan Enter atau tanda koma (,) untuk menambahkan tag laporan.
      </p>
    </div>
  )
}