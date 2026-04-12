'use client';

import { useState } from 'react';
import { speakers, type Speaker } from '@/lib/data';
import { X } from 'lucide-react';

// Reusable Modal Component for Speakers
function SpeakerModal({ 
  speaker, 
  isOpen, 
  onClose 
}: { 
  speaker: Speaker | null; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  if (!isOpen || !speaker) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Modal Content - Centered vertically */}
        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* Image Section */}
          <div className="md:w-2/5 bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex items-center justify-center">
            <div className="w-full max-w-[350px] mx-auto">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-full h-auto rounded-xl shadow-2xl object-cover"
              />
            </div>
          </div>

          {/* Details Section - Centered text */}
          <div className="md:w-3/5 p-8 md:p-10 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {speaker.name}
            </h2>
            <p className="text-primary font-semibold text-xl mb-2">
              {speaker.title}
            </p>
            <p className="text-foreground/70 text-base mb-4">
              {speaker.affiliation}
            </p>
            {speaker.topic && (
              <div className="mt-4 pt-4 border-t border-border w-full">
                <p className="text-sm font-semibold text-foreground/60 mb-1">Presentation Topic</p>
                <p className="text-lg font-medium text-primary">
                  {speaker.topic}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpeakersGrid() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpeaker(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">SPEAKERS</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Meet our distinguished speakers and presenters
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {speakers.map((speaker) => (
              <div
                key={speaker.id}
                onClick={() => openModal(speaker)}
                className="overflow-hidden rounded-xl border border-border/50 bg-white hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[480px]"
              >
                <div className="h-64 w-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="h-full w-full object-contain transition-transform duration-300 hover:scale-110"
                  />
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-foreground text-lg mb-1">{speaker.name}</h3>
                  <p className="text-sm font-semibold text-primary mb-1">{speaker.title}</p>
                  <p className="text-xs text-foreground/70">{speaker.affiliation}</p>
                  {speaker.topic && (
                    <p className="text-xs text-foreground/50 mt-2 line-clamp-2">
                      Topic: {speaker.topic}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <SpeakerModal 
        speaker={selectedSpeaker}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}