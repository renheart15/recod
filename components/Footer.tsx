import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">About RECOD 2026</h3>
            <p className="text-primary-foreground/90 leading-relaxed text-sm">
              1st International and 4th Institutional Research Congress celebrating technological
              innovation and academic sustainability.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/program#program" className="hover:underline transition-colors duration-200">
                  Program
                </a>
              </li>
              <li>
                <a href="/speaker#speakers" className="hover:underline transition-colors duration-200">
                  Speakers
                </a>
              </li>
              <li>
                <a href="/panel#panels" className="hover:underline transition-colors duration-200">
                  Panel Members
                </a>
              </li>
              <li>
                <a href="/exhibit#research-exhibits" className="hover:underline transition-colors duration-200">
                  Exhibits
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline transition-colors duration-200">
                  Evaluation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Cebu Technological University – Tuburan Campus, Tuburan, Cebu, Philippines 6043</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:fstlpctuburan@gmail.com" className="hover:underline transition-colors duration-200">
                  fstlpctuburan@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>(032) 555-1234</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/80">
              © {currentYear} Cebu Technological University. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
