import { useState } from 'react';
import { ChevronDown, ChevronRight, MapPin, BarChart3, Users, Home, HelpCircle } from 'lucide-react';

export default function Help() {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const helpSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Home size={20} />,
      content: [
        'Welcome to ENGAGE-IN! This platform helps you monitor and engage with your city\'s environmental data. Navigate using the sidebar on the left to explore different features. The Home page shows real-time environmental data and community engagement tools that help you stay informed about your local environment.'
      ]
    },
    {
      id: 'navigation',
      title: 'Map Panel',
      icon: <MapPin size={20} />,
      content: [
        'The Map Panel provides an interactive map interface where you can explore environmental monitoring stations across the city. Simply click on any marker on the map to view real-time data from that specific observation point. Each marker represents a sensor location that continuously monitors CO₂ levels, temperature, and humidity, giving you instant access to current environmental conditions at different locations throughout the urban area.'
      ]
    },
    {
      id: 'features',
      title: 'Historical Data',
      icon: <BarChart3 size={20} />,
      content: [
        'The Historical Data section allows you to analyze environmental trends over time for each monitoring station. You can select any observation point and view its historical records of CO₂ levels, temperature, and humidity measurements. This feature helps you understand environmental patterns, identify seasonal changes, and track long-term trends in air quality and climate conditions at specific locations across the city.'
      ]
    },
    {
      id: 'community',
      title: 'Community Engagement',
      icon: <Users size={20} />,
      content: [
        'The community section allows you to actively participate in city improvement initiatives by joining polls about urban development, sharing your thoughts on environmental projects, and taking small quizzes to reflect on environmental data insights. You can view what other citizens are saying, contribute to ongoing discussions, and help make your city more sustainable through collective engagement and feedback.'
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: <HelpCircle size={20} />,
      content: [
        'If you encounter issues with data loading, please check your internet connection and refresh the page. For map display problems, try refreshing the page or clearing your browser cache. Environmental data is updated every few minutes from IoT sensors, ensuring you always have the most current information. While data export features are currently in development, you can view and analyze all historical data directly on the platform.'
      ]
    }
  ];

  return (
    <div style={{ 
      padding: '1rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <div style={{ 
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#456646',
        color: 'white',
        borderRadius: '8px'
      }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HelpCircle size={28} />
          Help & Support
        </h1>
        <p style={{ margin: 0, opacity: 0.9 }}>
          Learn how to use ENGAGE-IN! and make the most of our environmental monitoring platform.
        </p>
      </div>

      {/* Help Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {helpSections.map((section) => (
          <div
            key={section.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: expandedSections[section.id] ? '#f8f9fa' : 'white',
                border: 'none',
                textAlign: 'center',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = expandedSections[section.id] ? '#f8f9fa' : 'white'}
            >
              {expandedSections[section.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              {section.icon}
              {section.title}
            </button>

            {/* Section Content */}
            {expandedSections[section.id] && (
              <div style={{
                padding: '1rem',
                backgroundColor: '#fafafa',
                borderTop: '1px solid #eee'
              }}>
                {section.content.map((item, index) => (
                  <p key={index} style={{
                    marginBottom: '1rem',
                    lineHeight: '1.6',
                    color: '#333',
                    textAlign: 'justify'
                  }}>
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#e8f5e8',
        borderRadius: '8px',
        border: '1px solid #c3e6c3'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#2d5a2d' }}>
          Need More Help?
        </h3>
        <p style={{ margin: 0, color: '#2d5a2d' }}>
          This is a demo project for IoT-based citizen engagement in smart cities. 
          For more information about the project, contact us by email at luyi.wang@tum.de.
        </p>
      </div>
    </div>
  );
}
