import { useState } from "react";
import Label from "./Elements/Label";
import Button from "./Elements/Button";
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Message sent successfully!");
  };

  return (
    <section id="contact" className="py-16 bg-[#0e0e0e] text-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-start justify-between gap-12">
        {/* Left: Contact Info */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold mb-6 text-lime-400">Get in Touch</h2>
          <p className="text-gray-400 leading-relaxed">
            Every project I work on teaches me something new — about code,
            design, and even myself.  
            <br />
            <br />
            I’m always open to connect, share ideas, and grow together in this
            ever-evolving world of technology. Whether it’s about web
            development, creative design, or just exchanging thoughts about tech,
            feel free to drop a message. 🌱
          </p>

          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-lime-400 text-lg" />
              <span className="text-gray-300">rakhafausta07@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-lime-400 text-lg" />
              <span className="text-gray-300">Semarang, Indonesia</span>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-6">
            <a
              href="https://github.com/rakhaafd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-lime-400 transition"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/rakha-fausta-17aba1286/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-lime-400 transition"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="w-full md:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="bg-[#181818] border border-gray-700 rounded-2xl p-6 shadow-lg space-y-4"
          >
            <div>
              <Label htmlFor="name" text="Name" />
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-gray-700 text-white focus:outline-none focus:border-lime-400"
              />
            </div>

            <div>
              <Label htmlFor="email" text="Email" />
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-gray-700 text-white focus:outline-none focus:border-lime-400"
              />
            </div>

            <div>
              <Label htmlFor="message" text="Message" />
              <textarea
                id="message"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg bg-[#0e0e0e] border border-gray-700 text-white focus:outline-none focus:border-lime-400"
              />
            </div>

            <Button
              text="Send Message"
              className="w-full justify-center mt-2"
              type="submit"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
