import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { IoIosCall, IoMdMail, IoMdPin } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0B7EC8] via-[#0A72B8] to-[#0A63A5] text-white">
      {/* <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" /> */}

      <div className="max-w-7xl mx-auto px-16 py-10">
        <div className="grid gap-20 md:grid-cols-[0.9fr_1fr_1fr_1fr]  ">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-12 flex items-center justify-center bg-white/90 rounded-lg">
                <svg viewBox="0 0 64 64" className="w-10 h-10">
                  <path
                    d="M32 2C21.5 2 13 10.4 13 20.8c0 14.2 19 41.2 19 41.2s19-27 19-41.2C51 10.4 42.5 2 32 2z"
                    fill="#0A63A5"
                  />
                  <circle cx="32" cy="21" r="6" fill="#BFE6FF" />
                  <rect
                    x="34"
                    y="18"
                    width="22"
                    height="14"
                    rx="3"
                    fill="#DFF2FF"
                  />
                  <circle cx="45" cy="25" r="4" fill="#0A63A5" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-wide">CIVIRA</h2>
                <p className="text-xs uppercase tracking-widest text-white/70">
                  Civic Issue Reporting
                </p>
              </div>
            </div>

            <p className="text-xs text-white/80 max-w-xs">
              Report local issues, track progress, and improve community
              services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-widest text-white/70">
              Quick Links
            </p>
            <a href="#" className="text-white/90 hover:text-white">
              About Civira
            </a>
            <a href="#" className="text-white/90 hover:text-white">
              How It Works
            </a>
            <a href="#" className="text-white/90 hover:text-white">
              Report an Issue
            </a>
            <a href="#" className="text-white/90 hover:text-white">
              Public Dashboard
            </a>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-widest text-white/70">
              Support
            </p>
            <a href="#" className="text-white/90 hover:text-white">
              Help Center
            </a>
            <a href="#" className="text-white/90 hover:text-white">
              Contact Us
            </a>
            <a href="#" className="text-white/90 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-white/90 hover:text-white">
              Terms & Conditions
            </a>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-widest text-white/70">
              City Desk
            </p>
            <div className="flex items-start gap-2 text-white/90 text-sm">
              <IoMdPin className="mt-0.5" />
              <p>Municipal Service Center, Main City Rd</p>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <IoIosCall />
              <p>1800-000-000</p>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <IoMdMail />
              <p>support@civira.gov</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 ">
          <p className="text-xs text-white/70">
            � {new Date().getFullYear()} Civira. All rights reserved.
          </p>
          <div className="flex gap-5 text-lg">
            <a
              href="#"
              className="hover:scale-110 transition text-white/90 hover:text-white"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="hover:scale-110 transition text-white/90 hover:text-white"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:scale-110 transition text-white/90 hover:text-white"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
