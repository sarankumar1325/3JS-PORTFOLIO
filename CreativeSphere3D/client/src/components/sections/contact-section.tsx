import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import useScrollReveal from "@/hooks/use-scroll-reveal";

// Define form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const titleReveal = useScrollReveal();
  const formReveal = useScrollReveal();
  const infoReveal = useScrollReveal();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-dark-lighter relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={titleReveal.ref as React.RefObject<HTMLDivElement>}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={titleReveal.isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-semibold">GET IN TOUCH</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-2">
              Contact Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
            <p className="text-gray-300 max-w-2xl mx-auto mt-6">
              Have a project in mind or want to discuss potential collaborations?
              I'd love to hear from you! Drop me a message and I'll get back to
              you as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {/* Contact info */}
            <motion.div
              ref={infoReveal.ref as React.RefObject<HTMLDivElement>}
              className="md:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={infoReveal.isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-dark p-6 rounded-xl border border-white/5">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-semibold mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:hello@example.com"
                        className="text-gray-300 hover:text-secondary transition-colors duration-300"
                      >
                        hello@example.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-md bg-secondary/20 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-secondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-semibold mb-1">
                        Location
                      </h3>
                      <p className="text-gray-300">San Francisco, California</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-md bg-accent/20 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-semibold mb-1">
                        Social
                      </h3>
                      <div className="flex space-x-3 mt-2">
                        {["github", "linkedin", "twitter", "instagram"].map(
                          (platform) => (
                            <a
                              key={platform}
                              href="#"
                              className="w-9 h-9 rounded-full bg-dark flex items-center justify-center border border-white/10 hover:bg-primary/20 hover:border-primary/50 transition-colors duration-300"
                            >
                              <i className={`ri-${platform}-fill`}></i>
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              ref={formReveal.ref as React.RefObject<HTMLDivElement>}
              className="md:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              animate={formReveal.isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form className="space-y-6 relative" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className={`w-full px-4 py-3 bg-dark border ${
                        errors.name ? "border-red-500" : "border-white/10"
                      } rounded-lg focus:outline-none focus:border-secondary transition-colors duration-300 text-white pt-6`}
                    />
                    <label
                      htmlFor="name"
                      className={`absolute top-1 left-4 text-xs pointer-events-none transition-all duration-300 ${
                        errors.name ? "text-red-500" : "text-gray-400"
                      }`}
                    >
                      Your Name
                    </label>
                    {errors.name && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={`w-full px-4 py-3 bg-dark border ${
                        errors.email ? "border-red-500" : "border-white/10"
                      } rounded-lg focus:outline-none focus:border-secondary transition-colors duration-300 text-white pt-6`}
                    />
                    <label
                      htmlFor="email"
                      className={`absolute top-1 left-4 text-xs pointer-events-none transition-all duration-300 ${
                        errors.email ? "text-red-500" : "text-gray-400"
                      }`}
                    >
                      Email Address
                    </label>
                    {errors.email && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="text"
                    id="subject"
                    {...register("subject")}
                    className={`w-full px-4 py-3 bg-dark border ${
                      errors.subject ? "border-red-500" : "border-white/10"
                    } rounded-lg focus:outline-none focus:border-secondary transition-colors duration-300 text-white pt-6`}
                  />
                  <label
                    htmlFor="subject"
                    className={`absolute top-1 left-4 text-xs pointer-events-none transition-all duration-300 ${
                      errors.subject ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    Subject
                  </label>
                  {errors.subject && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.subject.message}
                    </span>
                  )}
                </div>

                <div className="relative group">
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message")}
                    className={`w-full px-4 py-3 bg-dark border ${
                      errors.message ? "border-red-500" : "border-white/10"
                    } rounded-lg focus:outline-none focus:border-secondary transition-colors duration-300 text-white pt-6`}
                  ></textarea>
                  <label
                    htmlFor="message"
                    className={`absolute top-1 left-4 text-xs pointer-events-none transition-all duration-300 ${
                      errors.message ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    Your Message
                  </label>
                  {errors.message && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center"
                >
                  {contactMutation.isPending ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/4 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/4 bg-secondary/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default ContactSection;
