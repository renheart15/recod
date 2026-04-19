'use client';

import { useState } from 'react';
import { clustersByType, PresentationType } from '@/lib/data';
import { X, Monitor, Package } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  image: string;
}

const TYPES: { key: PresentationType; label: string; icon: React.ReactNode }[] = [
  {
    key: 'online',
    label: 'Online Research Presentation',
    icon: <Monitor className="w-4 h-4" />,
  },
  {
    key: 'product',
    label: 'Product Exhibit',
    icon: <Package className="w-4 h-4" />,
  },
];

export function PanelMembers() {
  const [activeType, setActiveType] = useState<PresentationType>('online');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clusters = clustersByType[activeType];

  const openModal = (member: Member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              PANEL MEMBERS BY CLUSTER
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Meet the distinguished academics and researchers from various departments
            </p>

            {/* Toggle Switch */}
            <div className="mt-8 inline-flex items-center rounded-xl border border-border bg-muted p-1 gap-1">
              {TYPES.map((type) => (
                <button
                  key={type.key}
                  onClick={() => setActiveType(type.key)}
                  className={`
                    inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold
                    transition-all duration-200
                    ${
                      activeType === type.key
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-foreground/60 hover:text-foreground hover:bg-background/60'
                    }
                  `}
                >
                  {type.icon}
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            {clusters.map((cluster) => (
              <div
                key={cluster.id}
                className="rounded-2xl border border-border bg-white p-8 hover:shadow-lg transition-all duration-300"
              >
                {/* Cluster Title */}
                <div className="mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {cluster.name}
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                </div>

                {/* Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cluster.members.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => openModal(member)}
                      className="overflow-hidden rounded-xl border border-border/50 bg-white hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                      {/* Member Image */}
                      <div className="h-64 w-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-full w-full object-contain transition-transform duration-300 hover:scale-110"
                        />
                      </div>

                      {/* Member Info */}
                      <div className="p-5">
                        <h4 className="font-bold text-foreground text-lg">{member.name}</h4>
                        <p className="text-sm font-semibold text-primary mb-1">{member.title}</p>
                        <p className="text-xs text-foreground/70">{member.affiliation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col md:flex-row min-h-[500px]">
              {/* Image Section */}
              <div className="md:w-2/5 bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex items-center justify-center">
                <div className="w-full max-w-[350px] mx-auto">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-auto rounded-xl shadow-2xl object-cover"
                  />
                </div>
              </div>

              {/* Details Section */}
              <div className="md:w-3/5 p-8 md:p-10 flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {selectedMember.name}
                </h2>
                <p className="text-primary font-semibold text-xl mb-2">
                  {selectedMember.title}
                </p>
                <p className="text-foreground/70 text-base">{selectedMember.affiliation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}