'use client';

import { researchExhibits } from '@/lib/research-exhibit';
import { X } from 'lucide-react';
import { useState } from 'react';

export function ResearchExhibits() {
  const [selectedExhibit, setSelectedExhibit] = useState<string | null>(null);
  const selectedExhibitData = researchExhibits.find((e) => e.id === selectedExhibit);

  return (
    <section id="research-exhibits" className="py-16 bg-gradient-to-b from-white to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Research Exhibits</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Explore innovative research projects and studies presented at RECOD 2026
          </p>
        </div>

        {/* Exhibits Grid - Image Only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchExhibits.map((exhibit) => (
            <div
              key={exhibit.id}
              onClick={() => setSelectedExhibit(exhibit.id)}
              className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Exhibit Image - 1954x1303 aspect ratio */}
              <div
                className="w-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 relative"
                style={{ aspectRatio: '1954 / 1303' }}
              >
                <img
                  src={exhibit.image}
                  alt={exhibit.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Exhibit Details Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 p-6">
                  <div className="text-center text-white">
                    <h4 className="text-4xl font-bold mb-4">{exhibit.exhibitNumber}</h4>
                    <h5 className="text-lg font-semibold mb-3 leading-tight">{exhibit.title}</h5>
                    <p className="text-sm">{exhibit.author}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      {selectedExhibitData && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/95 p-0 animate-fade-in-up"
          onClick={() => setSelectedExhibit(null)}
        >
          <div
            className="relative min-h-screen w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedExhibit(null)}
              className="absolute top-4 right-4 z-50 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
            >
              <X size={24} className="text-foreground" />
            </button>

            {/* Full-screen Image */}
            <img
              src={selectedExhibitData.image}
              alt={selectedExhibitData.title}
              className="mx-auto block w-full max-h-[calc(100vh-110px)] object-contain bg-black"
            />

            {/* Overlay Details */}
            <div className="absolute inset-x-0 bottom-0 bg-black/75 px-6 py-5 text-white backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-primary-200 mb-2">{selectedExhibitData.exhibitNumber}</p>
              <h2 className="text-3xl font-bold mb-2">{selectedExhibitData.title}</h2>
              <p className="text-sm text-primary-100 mb-1">{selectedExhibitData.author}</p>
              <p className="text-sm text-primary-100">{selectedExhibitData.cluster}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
