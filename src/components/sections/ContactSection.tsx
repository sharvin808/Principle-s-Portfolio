'use client';

import { useState, FormEvent } from 'react';
import { Mail, MapPin } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import type { ContactMe } from '@/lib/types';

interface ContactSectionProps {
  contactMe: ContactMe;
}

export default function ContactSection({ contactMe }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate form submission API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const email = contactMe.emailId;

  return (
    <SectionWrapper
      id="contact"
      title="Contact Me"
      //subtitle="Get in touch for academic collaborations, research inquiries, or speaking engagements"
      theme="oxford"
      cutout="top-center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Contact Info Card */}
        <ScrollReveal className="lg:col-span-2" delay={0}>
          <div className="card-premium h-full flex flex-col justify-between">
            <div>
              <h3
                className="text-2xl font-semibold text-heading mb-6"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Contact Details
              </h3>
              
              <div className="space-y-6">
                {/* Office Address */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-gold-muted)' }}>
                    <MapPin size={22} style={{ color: 'var(--color-gold)' }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-heading uppercase tracking-wider mb-1">
                      Office Location
                    </h4>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {contactMe.officeLocation ? (
                        <span>{contactMe.officeLocation}</span>
                      ) : (
                        <span className="text-muted italic">Office Location not configured</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-gold-muted)' }}>
                    <Mail size={22} style={{ color: 'var(--color-gold)' }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-heading uppercase tracking-wider mb-1">
                      Email Address
                    </h4>
                    {email ? (
                      <a
                        href={`mailto:${email}`}
                        className="text-foreground/70 hover:text-gold text-sm transition-colors break-all"
                      >
                        {email}
                      </a>
                    ) : (
                      <span className="text-muted italic">Email Address not configured</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* Profiles & Networks Card on Right */}
        <ScrollReveal className="lg:col-span-3" delay={0.15}>
          <div className="card-premium h-full flex flex-col justify-between">
            <div>
              <h3
                className="text-2xl font-semibold text-heading mb-6"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Profiles & Networks
              </h3>
              <p className="text-foreground/70 text-lg leading-relaxed mb-8">
                Connect with me on professional and academic platforms to stay updated with my latest research, publications, and professional activities.
              </p>
              
              <div className="flex flex-wrap gap-4">

                {/* LinkedIn */}
                {contactMe.linkedin && (
                  <a
                    href={contactMe.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-[#2F4F4F] bg-[#2F4F4F] text-[#faf3e3] text-base font-semibold hover:bg-transparent hover:text-[#2F4F4F] hover:border-[#2F4F4F] transition-colors duration-200"
                  >
                    <svg
                      className="w-4.5 h-4.5 fill-current shrink-0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                )}

                {/* Instagram */}
                {contactMe.instagram && (
                  <a
                    href={contactMe.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-[#2F4F4F] bg-[#2F4F4F] text-[#faf3e3] text-base font-semibold hover:bg-transparent hover:text-[#2F4F4F] hover:border-[#2F4F4F] transition-colors duration-200"
                  >
                    <svg
                      className="w-4.5 h-4.5 fill-current shrink-0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>Instagram</span>
                  </a>
                )}

                {/* Twitter/X */}
                {contactMe.twitter && (
                  <a
                    href={contactMe.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-[#2F4F4F] bg-[#2F4F4F] text-[#faf3e3] text-base font-semibold hover:bg-transparent hover:text-[#2F4F4F] hover:border-[#2F4F4F] transition-colors duration-200"
                  >
                    <svg
                      className="w-4.5 h-4.5 fill-current shrink-0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>Twitter</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
