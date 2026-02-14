import React from 'react';
import { Heart, Github, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/10 bg-dark-primary/50 backdrop-blur-sm">
      <div className="container-custom py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4">Oploverz</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Platform streaming dan download anime subtitle Indonesia terlengkap. 
              Nonton anime favorit kamu dengan kualitas HD.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  Jadwal Anime
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  Anime Ongoing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  Anime Completed
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informasi</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Globe size={16} className="text-primary-400" />
                <span>API by Sanka Vollerei</span>
              </li>
              <li className="flex items-center space-x-2">
                <Github size={16} className="text-primary-400" />
                <span>Open Source</span>
              </li>
              <li className="flex items-center space-x-2">
                <Heart size={16} className="text-red-400" />
                <span>Made for Anime Fans</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Oploverz. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Built with</span>
              <Heart size={16} className="text-red-400 animate-pulse" />
              <span>using React + Vite + Tailwind CSS</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-xs text-yellow-200/80 text-center">
            ⚠️ Disclaimer: Semua konten anime di website ini adalah milik dari pemilik aslinya. 
            Website ini hanya menyediakan layanan streaming dan tidak menyimpan file video di server kami.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
