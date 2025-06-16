import React, { useState } from "react";
import { toast } from "sonner";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS configuration with your actual credentials
      const serviceId = 'service_hdm83ys';
      const templateId = 'template_wnj8r2e';
      const publicKey = '2xRVvdGC6tiOqly3h';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'Contact from Portfolio',
        message: formData.message,
        to_name: 'Mohammed Raazi',
        to_email: 'amraazi088@gmail.com'
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      toast.success("Message sent successfully! I'll get back to you soon.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error("Failed to send message. Please try again or contact me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-12">
          <div className="pulse-chip mx-auto mb-4">
            <span>Contact</span>
          </div>
          <h2 className="section-title mb-4">Let's Work Together</h2>
          <p className="section-subtitle mx-auto">
            I'm always interested in discussing new opportunities and innovative projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pulse-50 rounded-full flex items-center justify-center text-pulse-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:amraazi088@gmail.com" className="text-gray-600 hover:text-pulse-500 transition-colors">
                      amraazi088@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pulse-50 rounded-full flex items-center justify-center text-pulse-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+918310521470" className="text-gray-600 hover:text-pulse-500 transition-colors">
                      +91 8310521470
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pulse-50 rounded-full flex items-center justify-center text-pulse-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">Bangalore, India</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t border-gray-200">
                <h4 className="font-medium mb-4">Follow Me</h4>
                <div className="flex space-x-3">
                  <a 
                    href="https://www.linkedin.com/in/mohammed-raazi-027559269" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="liquid-button-social group"
                  >
                    <div className="liquid-button-bg"></div>
                    <Linkedin className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                  <a 
                    href="https://github.com/raazi29" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="liquid-button-social group"
                  >
                    <div className="liquid-button-bg"></div>
                    <Github className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 sm:p-8">
              <h3 className="text-xl font-semibold mb-6">Send me a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                  />
                </div>
                
                <div className="flex justify-center sm:justify-start">
                  <style>{`
                    .emboss-button {
                      all: unset;
                      cursor: pointer;
                      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                      position: relative;
                      border-radius: 100em;
                      background-color: rgba(0, 0, 0, 0.75);
                      box-shadow:
                        -0.1em -0.1em 0.1em -0.05em rgba(5, 5, 5, 0.25),
                        0.025em 0.025em 0.045em 0 rgba(5, 5, 5, 0.1);
                    }

                    .emboss-button::after {
                      content: "";
                      position: absolute;
                      z-index: 0;
                      width: calc(100% + 0.2em);
                      height: calc(100% + 0.2em);
                      top: -0.1em;
                      left: -0.1em;
                      border-radius: inherit;
                      background: linear-gradient(
                        -135deg,
                        rgba(5, 5, 5, 0.5),
                        transparent 20%,
                        transparent 100%
                      );
                      filter: blur(0.01em);
                      opacity: 0.25;
                      mix-blend-mode: multiply;
                    }

                    .emboss-button .button-outer {
                      position: relative;
                      z-index: 1;
                      border-radius: inherit;
                      transition: box-shadow 300ms ease;
                      will-change: box-shadow;
                      box-shadow:
                        0 0.035em 0.035em -0.005em rgba(5, 5, 5, 1),
                        0 0.005em 0.005em -0.005em rgba(5, 5, 5, 0.5),
                        0.1em 0.2em 0.07em -0.005em rgba(5, 5, 5, 0.25);
                    }

                    .emboss-button:hover .button-outer {
                      box-shadow:
                        0 0 0 0 rgba(5, 5, 5, 1),
                        0 0 0 0 rgba(5, 5, 5, 0.5),
                        0 0 0 0 rgba(5, 5, 5, 0.25);
                    }

                    .button-inner {
                      --inset: 0.025em;
                      position: relative;
                      z-index: 1;
                      border-radius: inherit;
                      padding: 0.6em 1em;
                      background-image: linear-gradient(
                        135deg,
                        rgba(230, 230, 230, 1),
                        rgba(180, 180, 180, 1)
                      );
                      transition:
                        box-shadow 300ms ease,
                        clip-path 250ms ease,
                        background-image 250ms ease,
                        transform 250ms ease;
                      will-change: box-shadow, clip-path, background-image, transform;
                      overflow: clip;
                      clip-path: inset(0 0 0 0 round 100em);
                      box-shadow:
                            /* 1 */
                        0 0 0 0 inset rgba(5, 5, 5, 0.1),
                        /* 2 */ -0.035em -0.035em 0.035em 0 inset rgba(5, 5, 5, 0.25),
                        /* 3 */ 0 0 0 0 inset rgba(5, 5, 5, 0.1),
                        /* 4 */ 0 0 0.035em 0.14em inset rgba(255, 255, 255, 0.25),
                        /* 5 */ 0.015em 0.035em 0.07em 0 inset rgba(255, 255, 255, 1),
                        /* 6 */ 0.08em 0.08em 0.08em inset rgba(255, 255, 255, 0.25),
                        /* 7 */ -0.05em -0.17em 0.17em 0.07em inset rgba(5, 5, 5, 0.25);
                    }

                    .emboss-button:hover .button-inner {
                      clip-path: inset(
                        clamp(1px, 0.04em, 2px) clamp(1px, 0.04em, 2px)
                          clamp(1px, 0.04em, 2px) clamp(1px, 0.04em, 2px) round 100em
                      );
                      box-shadow:
                            /* 1 */
                        0.07em 0.1em 0.035em 0 inset rgba(5, 5, 5, 0.75),
                        /* 2 */ -0.015em -0.02em 0.035em 0.015em inset rgba(5, 5, 5, 0.5),
                        /* 3 */ 0.17em 0.17em 0.14em 0 inset rgba(5, 5, 5, 0.5),
                        /* 4 */ 0 0 0.035em 0.35em inset rgba(255, 255, 255, 0.15),
                        /* 5 */ 0 0 0 0 inset rgba(255, 255, 255, 1),
                        /* 6 */ 0.08em 0.08em 0.08em inset rgba(255, 255, 255, 0.25),
                        /* 7 */ -0.05em -0.08em 0.14em 0.07em inset rgba(5, 5, 5, 0.25);
                    }

                    .emboss-button .button-inner span {
                      position: relative;
                      z-index: 4;
                      font-family: "Inter", sans-serif;
                      letter-spacing: -0.03em;
                      font-weight: 500;
                      font-size: 0.9em;
                      color: rgba(0, 0, 0, 0);
                      background-image: linear-gradient(
                        135deg,
                        rgba(25, 25, 25, 1),
                        rgba(75, 75, 75, 1)
                      );
                      -webkit-background-clip: text;
                      background-clip: text;
                      transition: transform 250ms ease;
                      display: block;
                      will-change: transform;
                      text-shadow: rgba(0, 0, 0, 0.1) 0 0 0.07em;
                      -webkit-user-select: none;
                      -moz-user-select: none;
                      -ms-user-select: none;
                      user-select: none;
                    }

                    .emboss-button:hover .button-inner span {
                      transform: scale(0.975);
                    }

                    .emboss-button:active .button-inner {
                      transform: scale(0.975);
                    }
                  `}</style>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="emboss-button disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="button-outer">
                      <div className="button-inner">
                        <span>{isSubmitting ? 'Sending...' : 'Send'}</span>
                      </div>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
