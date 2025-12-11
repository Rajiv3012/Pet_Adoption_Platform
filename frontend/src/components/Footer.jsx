export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#2D2D3A] to-[#1a1a24] text-white mt-auto">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E07A5F] via-[#81B29A] to-[#FFB347] flex items-center justify-center shadow-xl animate-spin-slow">
                  <i className="fas fa-paw text-white text-2xl"></i>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#81B29A] animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Pawfect Match</h3>
                <p className="text-sm text-gray-400">Where hearts find homes</p>
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              Creating lifelong bonds between pets and loving families through compassionate adoption since 2015.
            </p>
            
            <div className="flex space-x-4">
              {['fab fa-facebook-f', 'fab fa-twitter', 'fab fa-instagram', 'fab fa-youtube', 'fab fa-linkedin-in'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-[#E07A5F] hover:to-[#81B29A] flex items-center justify-center text-white transform hover:scale-110 hover:rotate-12 transition-all duration-300 shadow-lg"
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Available Pets', icon: 'fas fa-paw' },
                { name: 'Adoption Process', icon: 'fas fa-list-ol' },
                { name: 'Success Stories', icon: 'fas fa-heart' },
                { name: 'Volunteer Program', icon: 'fas fa-hands-helping' },
                { name: 'Pet Care Guide', icon: 'fas fa-book' },
                { name: 'Contact Us', icon: 'fas fa-phone' }
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={`/${link.name.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <i className={`${link.icon} w-5 mr-3 text-[#81B29A] group-hover:text-[#FFB347] transform group-hover:translate-x-1 transition-all duration-300`}></i>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700 inline-block">
              Resources
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Adoption FAQ', icon: 'fas fa-question-circle' },
                { name: 'Training Tips', icon: 'fas fa-graduation-cap' },
                { name: 'Vet Partners', icon: 'fas fa-stethoscope' },
                { name: 'Pet Supplies', icon: 'fas fa-shopping-bag' },
                { name: 'Emergency Help', icon: 'fas fa-ambulance' },
                { name: 'Blog', icon: 'fas fa-blog' }
              ].map((resource, i) => (
                <li key={i}>
                  <a
                    href={`/${resource.name.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <i className={`${resource.icon} w-5 mr-3 text-[#81B29A] group-hover:text-[#FFB347] transform group-hover:rotate-12 transition-all duration-300`}></i>
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700 inline-block">
              Stay Connected
            </h4>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-400 mb-4">
                  Subscribe for adoption updates and pet care tips
                </p>
                <form className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent"
                    />
                    <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-gradient-to-r from-[#E07A5F] to-[#81B29A] text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                  >
                    <span>Subscribe Now</span>
                    <i className="fas fa-paper-plane ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
                  </button>
                </form>
              </div>

              <div className="pt-6 border-t border-gray-800">
                <div className="flex items-start space-x-3 mb-3">
                  <i className="fas fa-map-marker-alt text-[#81B29A] mt-1"></i>
                  <div>
                    <p className="font-medium">Our Shelter</p>
                    <p className="text-sm text-gray-400">123 Pet Street, Animal City</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-phone text-[#81B29A]"></i>
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p className="text-sm text-gray-400">(555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Pawfect Match Pet Adoption Platform. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: 'Privacy Policy', icon: 'fas fa-shield-alt' },
                { name: 'Terms of Service', icon: 'fas fa-file-contract' },
                { name: 'Cookie Policy', icon: 'fas fa-cookie-bite' },
                { name: 'Accessibility', icon: 'fas fa-universal-access' }
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center group"
                >
                  <i className={`${item.icon} mr-2 text-xs group-hover:text-[#FFB347] transition-colors duration-300`}></i>
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-6">
          {[
            { text: '🐾 Non-Profit Organization', color: 'from-[#81B29A] to-[#2D2D3A]' },
            { text: '❤️ 100% Adoption Focused', color: 'from-[#E07A5F] to-[#FFB347]' },
            { text: '⭐ Top Rated Shelter', color: 'from-[#FFB347] to-[#E07A5F]' }
          ].map((badge, i) => (
            <div
              key={i}
              className={`px-4 py-2 bg-gradient-to-r ${badge.color} rounded-full text-sm font-medium shadow-lg flex items-center space-x-2`}
            >
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-[#E07A5F] to-[#81B29A] rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-40"
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </footer>
  );
}