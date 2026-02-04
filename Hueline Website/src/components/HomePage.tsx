import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Palette, Brush, Droplet, Home, Users, Sparkles, Shield, Phone, Mail, MapPin, MoveRight, Star, Award, ChevronLeft, ChevronRight } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  subject: string;
  projectType: string;
  serviceNeeded: string;
  budgetRange: string;
  timeline: string;
  preferredContactMethod: string;
  city: string;
  message: string;
}

interface Product {
  title: string;
  image: string;
}

interface GalleryItem {
  title: string;
  image: string;
  category: string;
}

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

function HomePage() {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    subject: '',
    projectType: '',
    serviceNeeded: '',
    budgetRange: '',
    timeline: '',
    preferredContactMethod: '',
    city: '',
    message: ''
  });


  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const autoPlayRef = useRef<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveFormData = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsFormVisible(false);

  try {
    const res = await fetch("http://localhost:8000/save-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!res.ok) throw new Error("Failed to save");

    alert("Message Sent Successfully!");
  } catch (err) {
    console.error(err);
    alert("Error sending message");
  }
};


  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (products.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + (products.length - 2)) % (products.length - 2));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = window.setInterval(nextSlide, 4000);
    }
    return () => {
      if (autoPlayRef.current) {
        window.clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, slidesPerView]);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth >= 1024) setSlidesPerView(3);
      else if (window.innerWidth >= 640) setSlidesPerView(2);
      else setSlidesPerView(1);
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const homeInfo = {
    title: 'Premium Painting Solutions for Every Space',
    subtitle: 'Transforming Environments with Quality & Expertise',
    description: 'As a trusted partner in paint and coating solutions, HueLine Enterprises delivers exceptional quality products combined with professional services to bring your vision to life.'
  }

  const products: Product[] = [
    {
      title: 'Paint Collection',
      image: '/Hueline-Enterprises-Website/assets/images/products/img1.webp'
    },
    {
      title: 'Primers & Undercoats',
      image: '/Hueline-Enterprises-Website/assets/images/products/img2.webp'
    },
    {
      title: 'Tools & Accessories',
      image: '/Hueline-Enterprises-Website/assets/images/products/img3.webp'
    },
    {
      title: 'Thinners & Solvents',
      image: '/Hueline-Enterprises-Website/assets/images/products/img4.webp'
    },
    {
      title: 'Decorative Finishes',
      image: '/Hueline-Enterprises-Website/assets/images/products/img5.webp'
    },
    {
      title: 'Color Aids',
      image: '/Hueline-Enterprises-Website/assets/images/products/img6.webp'
    }
  ]

  const galleryItems: GalleryItem[] = [
    {
      title: 'Exterior Facade',
      image: '/Hueline-Enterprises-Website/assets/images/shop gallery/img1.webp',
      category: 'Exterior'
    },
    {
      title: 'Opus Bar Experience',
      image: '/Hueline-Enterprises-Website/assets/images/shop gallery/img2.webp',
      category: 'Commercial'
    },
    {
      title: 'Joy of Picking Paint',
      image: '/Hueline-Enterprises-Website/assets/images/shop gallery/img3.webp',
      category: 'Experience'
    },
    {
      title: 'Consultation Services',
      image: '/Hueline-Enterprises-Website/assets/images/shop gallery/img4.webp',
      category: 'Services'
    },
    {
      title: 'Paint Gallery Display',
      image: '/Hueline-Enterprises-Website/assets/images/shop gallery/img5.webp',
      category: 'Showroom'
    },
    {
      title: 'Paint Collection',
      image: '/Hueline-Enterprises-Website/assets/images/shop gallery/img6.webp',
      category: 'Products'
    }
  ]

  const services: Service[] = [
    {
      icon: <Droplet className="w-8 h-8 text-blue-600" />,
      title: "Color Consultation",
      description: "Our expert color consultants help you choose the perfect palette for your space, considering lighting, architecture, and your personal style.",
      features: ["Personalized color schemes", "Digital color visualization", "Sample testing"]
    },
    {
      icon: <Brush className="w-8 h-8 text-blue-600" />,
      title: "Professional Application",
      description: "Skilled painters deliver flawless results with attention to detail and premium techniques for lasting beauty.",
      features: ["Surface preparation", "Expert application", "Clean finish"]
    },
    {
      icon: <Home className="w-8 h-8 text-blue-600" />,
      title: "Interior & Exterior Solutions",
      description: "Comprehensive painting solutions for both interior and exterior surfaces, using weather-resistant and durable products.",
      features: ["Weather protection", "UV resistance", "Long-lasting finish"]
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Commercial Services",
      description: "Specialized solutions for offices, retail spaces, and industrial facilities with minimal disruption to operations.",
      features: ["Project management", "Flexible scheduling", "Safety compliance"]
    },
    {
      icon: <Sparkles className="w-8 h-8 text-blue-600" />,
      title: "Special Effects & Textures",
      description: "Create unique finishes with our range of decorative painting techniques and textured coatings.",
      features: ["Metallic finishes", "Textured walls", "Custom patterns"]
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Maintenance Programs",
      description: "Regular maintenance services to keep your painted surfaces looking fresh and protected year-round.",
      features: ["Annual inspections", "Touch-up services", "Preventive care"]
    }
  ]

  const maxSlide = Math.max(0, products.length - slidesPerView);

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

      {/* Home Section */}
      <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 pb-20 pt-20">
        {/* Main Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-blue-400/30 inline-flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-semibold">Trusted Painting Experts Since 2010</span>
              <Award className="w-5 h-5 text-yellow-400" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl">
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {homeInfo.title}
            </span>
          </h1>

          <p className="text-2xl md:text-3xl font-light mb-8 text-blue-100 leading-relaxed">
            {homeInfo.subtitle}
          </p>

          <p className="text-xl text-blue-200 max-w-4xl mx-auto mb-12 leading-relaxed">
            {homeInfo.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-white text-blue-900 rounded-lg font-semibold text-lg hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <Link to="/#contact" className="px-8 py-4 flex items-center">
                <span className="px-2">Get Free Consultation</span>
                <MoveRight className="w-5 h-5 mt-1" />
              </Link>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transform hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
              <Link to="/ProductsPage" className="px-8 py-4">View Our Projects</Link>
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Explore Products</h2>
          <p className="text-lg text-center mb-6">
            From walls paints to painting tools, we offer everything you're looking for your painting needs.
          </p>
          <p className="text-center mb-12">
            <Link to="/ProductsPage" className="text-blue-600 hover:text-blue-800 font-semibold">
              View products <MoveRight className="inline ml-2 w-5 h-5" />
            </Link>
          </p>

          {/* Custom Slider */}
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Slider Track */}
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`
              }}
            >
              {products.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  <div className="relative rounded-lg overflow-hidden h-64 group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/90">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <button
              onClick={nextSlide}
              disabled={currentSlide >= maxSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Shop Gallery</h2>
          <p className="text-lg text-center mb-12">
            Visit our stores and explore a spectrum of colours and designs to inspire your next paint project.<br />
            Connect with our experts for an interactive colour consultation.
          </p>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative rounded-lg overflow-hidden h-64 shadow-lg hover:shadow-xl transition-all duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-80">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <span className="text-blue-300 text-sm">{item.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center space-x-4 mb-6">
                  {service.icon}
                  <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Get In Touch</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

            {/* Contact Info - Enhanced */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Let's Start Your Project</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Ready to transform your space? Our team of painting experts is here to help you achieve the perfect finish for your project.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">Call Us</h4>
                    <p className="text-gray-600">+1 (620) 634-0541</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Sat: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="bg-green-600 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">Email Us</h4>
                    <p className="text-gray-600">info@huelineenterprises.com</p>
                    <p className="text-gray-600">support@huelineenterprises.com</p>
                    <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">Visit Our Stores</h4>
                    <p className="text-sm text-gray-500">Walk in for color consultation and product samples</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-lg text-gray-800 mb-4">Business Hours</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-semibold">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-semibold">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </div>

              {/* Emergency Service */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="w-6 h-6 text-orange-600" />
                  <h4 className="font-semibold text-lg text-gray-800">Emergency Service</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Need urgent painting services? Call our emergency line for immediate assistance with critical projects.
                </p>
                <p className="text-orange-600 font-semibold mt-2">+1 (620) 634-0541</p>
              </div>
            </div>

            {/* Contact Form - Unchanged */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
              {isFormVisible ? (
                <form onSubmit={saveFormData} className="space-y-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Your Name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Your Email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />

                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Company Name (Optional)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">-- Select Inquiry Type --</option>
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="General Feedback">General Feedback</option>
                    <option value="Dealership Inquiry">Dealership Inquiry</option>
                    <option value="Bulk Order Inquiry">Bulk Order Inquiry</option>
                    <option value="Other">Other</option>
                  </select>

                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">-- Project Type --</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                  </select>

                  <select
                    name="serviceNeeded"
                    value={formData.serviceNeeded}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">-- Service Needed --</option>
                    <option value="Color Consultation">Color Consultation</option>
                    <option value="Professional Painting">Professional Painting</option>
                    <option value="Interior Solutions">Interior Solutions</option>
                    <option value="Exterior Solutions">Exterior Solutions</option>
                    <option value="Commercial Services">Commercial Services</option>
                    <option value="Special Effects & Textures">Special Effects & Textures</option>
                    <option value="Maintenance Program">Maintenance Program</option>
                  </select>

                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">-- Budget Range --</option>
                    <option value="Below ₹10,000">Below ₹10,000</option>
                    <option value="₹10,000 - ₹50,000">₹10,000 - ₹50,000</option>
                    <option value="₹50,000 - ₹2,00,000">₹50,000 - ₹2,00,000</option>
                    <option value="₹2,00,000 - ₹10,00,000">₹2,00,000 - ₹10,00,000</option>
                    <option value="Above ₹10,00,000">Above ₹10,00,000</option>
                  </select>

                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">-- Project Timeline --</option>
                    <option value="Urgent (Within 1 Week)">Urgent (Within 1 Week)</option>
                    <option value="1-4 Weeks">1-4 Weeks</option>
                    <option value="1-3 Months">1-3 Months</option>
                    <option value="3+ Months">3+ Months</option>
                  </select>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City / Location"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />

                  <select
                    name="preferredContactMethod"
                    value={formData.preferredContactMethod}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">-- Preferred Contact Method --</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your requirements"
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  ></textarea>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    Send Message
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}
            </div>
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
  )
}

export default HomePage;