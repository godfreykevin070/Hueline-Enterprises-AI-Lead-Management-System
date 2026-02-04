import { Link } from 'react-router-dom';
import { Palette, Home, ArrowLeft } from 'lucide-react';

interface Product {
  title: string;
  image: string;
  description: string;
  category: string;
  features: string[];
}

function ProductsPage() {
  const products: Product[] = [
    {
      title: 'Premium Paint Collection',
      image: '/Hueline-Enterprises-Website/assets/images/products/img1.webp',
      description: 'Our extensive range of premium paints offers vibrant colors, excellent coverage, and long-lasting durability for all your painting needs.',
      category: 'Paints',
      features: ['Wide color palette', 'Weather resistant', 'Easy application', 'Quick drying']
    },
    {
      title: 'Primers & Undercoats',
      image: '/Hueline-Enterprises-Website/assets/images/products/img2.webp',
      description: 'High-quality primers and undercoats that ensure perfect surface preparation and enhance paint adhesion for flawless finishes.',
      category: 'Primers',
      features: ['Superior adhesion', 'Stain blocking', 'Surface sealing', 'Smooth base']
    },
    {
      title: 'Professional Tools & Accessories',
      image: '/Hueline-Enterprises-Website/assets/images/products/img3.webp',
      description: 'Complete range of professional painting tools and accessories designed for both DIY enthusiasts and professional painters.',
      category: 'Tools',
      features: ['Professional brushes', 'Rollers & trays', 'Painting tapes', 'Surface prep tools']
    },
    {
      title: 'Thinners & Solvents',
      image: '/Hueline-Enterprises-Website/assets/images/products/img4.webp',
      description: 'High-purity thinners and solvents for proper paint consistency, cleaning, and maintenance of painting equipment.',
      category: 'Solvents',
      features: ['High purity', 'Fast evaporation', 'Equipment cleaning', 'Paint thinning']
    },
    {
      title: 'Decorative Finishes',
      image: '/Hueline-Enterprises-Website/assets/images/products/img5.webp',
      description: 'Special decorative finishes including metallic, pearlescent, and textured coatings for unique visual effects.',
      category: 'Finishes',
      features: ['Metallic effects', 'Textured coatings', 'Pearlescent finishes', 'Custom patterns']
    },
    {
      title: 'Color Matching & Aids',
      image: '/Hueline-Enterprises-Website/assets/images/products/img6.webp',
      description: 'Advanced color matching technology and aids to help you achieve the exact shade and finish you desire.',
      category: 'Color Solutions',
      features: ['Color matching', 'Sample testing', 'Digital visualization', 'Custom mixing']
    }
  ];

  const categories = [
    'All',
    'Paints',
    'Primers',
    'Tools',
    'Solvents',
    'Finishes',
    'Color Solutions'
  ];

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 h-16 flex items-center justify-between px-8">
        <div className="flex items-center space-x-3">
          <Palette className="w-8 h-8 text-blue-600" />
          <span className="font-bold text-xl">HUELINE ENTERPRISES</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 h-full">
          <Link to="/#home" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-1">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link to="/#products" className="text-gray-600 hover:text-blue-600 transition-colors">Products</Link>
          <Link to="/#gallery" className="text-gray-600 hover:text-blue-600 transition-colors">Shop Gallery</Link>
          <Link to="/#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</Link>
          <Link to="/#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
        </div>
      </nav>

      {/* Products Header */}
      <section className="pt-20 pb-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Our Products</h1>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of premium paints, tools, and accessories.
            Each product is carefully selected to ensure quality, durability, and exceptional results.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className="px-6 py-3 rounded-full border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3 text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button className="flex-1 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                      <Link to="/#contact" className="flex px-4 py-3 justify-center">Inquire Now</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Help Choosing the Right Products?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our expert team is here to help you select the perfect products for your project.
            Get personalized recommendations and professional advice.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/#contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Contact Our Experts
            </Link>
            <Link
              to="/#services"
              className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Palette className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-bold text-white">HUELINE ENTERPRISES</h3>
              </div>
              <p className="leading-relaxed">
                Premium paints and expert services for your perfect space
              </p>
              <div className="flex space-x-4">
                <div className="bg-blue-600/20 rounded-lg px-3 py-2 border border-blue-500/30">
                  <span className="text-sm font-semibold text-blue-300">Licensed & Insured</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/#Home" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/#products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link to="/#gallery" className="hover:text-white transition-colors">Shop Gallery</Link></li>
                <li><Link to="/#services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Branches */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Our Branches</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white text-sm">Downtown Showroom</h4>
                  <p className="text-gray-400 text-sm mt-1">
                    123 Design District Avenue, Creative Center, Suite 450, Metropolitan City, MC 10001
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Westside Branch</h4>
                  <p className="text-gray-400 text-sm mt-1">
                    456 Innovation Parkway, Tech Valley, Building B, Suite 200, Progress City, PC 20002
                  </p>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">📍 Find Us Easily!</h3>
              <img
                src="/Hueline-Enterprises-Website/assets/images/Offline-Dino-Runner-QR-Code.webp"
                alt="QR Code"
                className="w-48 h-48 object-cover"
                loading="lazy"
              />
              <p className="text-sm">
                Scan the QR code below to get the exact location of our company on your map. We're looking forward to welcoming you!
              </p>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>© 2025 HUELINE ENTERPRISES. All rights reserved. | Professional Painting Solutions</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default ProductsPage;