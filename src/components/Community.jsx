import { useState, useEffect } from 'react';
import { ExternalLink, MessageSquare, ClipboardList } from 'lucide-react';

// Maximum number of comments
const MAX_COMMENTS = 8;

// Default example comments
const defaultComments = [
  {
    nickname: "Alex Chen",
    text: "I've noticed the CO₂ levels are higher near the main street during rush hours. Maybe we need more green spaces in that area?",
    timestamp: "2 hours ago",
    id: 1
  },
  {
    nickname: "Maria Rodriguez", 
    text: "The temperature data is really helpful! I can see why it feels so much cooler in the park compared to downtown.",
    timestamp: "5 hours ago",
    id: 2
  },
  {
    nickname: "David Kim",
    text: "Great initiative! The real-time data helps me choose better routes for my morning jog. Air quality matters!",
    timestamp: "1 day ago",
    id: 3
  },
  {
    nickname: "Sarah Johnson",
    text: "I love how this platform shows the environmental impact of different areas. It's making me more conscious about my daily choices.",
    timestamp: "2 days ago",
    id: 4
  }
];

// Load comments from localStorage, use default if none found
const loadCommentsFromStorage = () => {
  try {
    const storedComments = localStorage.getItem('engage-in-comments');
    if (storedComments) {
      return JSON.parse(storedComments);
    }
    return defaultComments;
  } catch (error) {
    console.error('Error loading comments from storage:', error);
    return defaultComments;
  }
};

// Save comments to localStorage
const saveCommentsToStorage = (comments) => {
  try {
    localStorage.setItem('engage-in-comments', JSON.stringify(comments));
  } catch (error) {
    console.error('Error saving comments to storage:', error);
  }
};

export default function Community() {
  const [comments, setComments] = useState(loadCommentsFromStorage);
  const [nickname, setNickname] = useState('');
  const [text, setText] = useState('');

  // When comments update, save to localStorage
  useEffect(() => {
    saveCommentsToStorage(comments);
  }, [comments]);

  // Handle comment submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname || !text) return;
    
    const newComment = { 
      nickname, 
      text, 
      timestamp: "Just now",
      id: Date.now() // 使用时间戳作为唯一ID
    };
    
    setComments(prevComments => {
      const updatedComments = [newComment, ...prevComments];
      // 如果超过最大数量，移除最老的评论
      if (updatedComments.length > MAX_COMMENTS) {
        return updatedComments.slice(0, MAX_COMMENTS);
      }
      return updatedComments;
    });
    
    setNickname('');
    setText('');
  };

  // Open research survey in new tab
  const handleQuizClick = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScmioDN1MfMPzf39N-ln5Ne6HDGEH5t7I6g7VB6XbYbiGgjjA/viewform', '_blank');
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ 
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#456646',
        color: 'white',
        borderRadius: '8px'
      }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MessageSquare size={28} />
          Community Engagement
        </h1>
        <p style={{ margin: 0, opacity: 0.9 }}>
          Share your thoughts about environmental data and participate in our research survey
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Left section - Comments */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #ddd',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            minHeight: '500px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={20} />
              Community Comments
            </h3>
            
            <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  style={{ 
                    padding: '0.75rem', 
                    width: '100%',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <textarea
                  placeholder="Share your thoughts about the environmental data..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows="3"
                  style={{ 
                    padding: '0.75rem', 
                    width: '100%',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>
              <button 
                type="submit" 
                style={{ 
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#456646',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#365535'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#456646'}
              >
                Submit Comment
              </button>
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                fontSize: '0.8rem', 
                color: '#666',
                fontStyle: 'italic'
              }}>
                💡 Comments are saved automatically. Newest {MAX_COMMENTS} comments are displayed.
              </p>
            </form>

            {/* Comments display */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {comments.length === 0 ? (
                <p style={{ color: '#666', fontStyle: 'italic' }}>
                  No comments yet. Be the first to share your thoughts!
                </p>
              ) : (
                <>
                  <div style={{ 
                    marginBottom: '1rem', 
                    padding: '0.5rem', 
                    backgroundColor: '#f0f8ff', 
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    color: '#555'
                  }}>
                    💬 {comments.length} community {comments.length === 1 ? 'comment' : 'comments'} (max {MAX_COMMENTS})
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, maxHeight: '350px', overflowY: 'auto' }}>
                    {comments.map((c) => (
                      <li key={c.id || c.nickname + c.timestamp} style={{ 
                        marginBottom: '1rem',
                        padding: '1rem',
                        backgroundColor: c.timestamp === "Just now" ? '#f0f8f0' : '#f8f9fa',
                        borderRadius: '6px',
                        borderLeft: `4px solid ${c.timestamp === "Just now" ? '#28a745' : '#456646'}`,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease'
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          marginBottom: '0.5rem'
                        }}>
                          <strong style={{ color: '#456646', fontSize: '0.95rem' }}>
                            {c.nickname}
                          </strong>
                          <span style={{ 
                            fontSize: '0.8rem', 
                            color: '#888',
                            fontStyle: 'italic'
                          }}>
                            {c.timestamp}
                          </span>
                        </div>
                        <p style={{ 
                          margin: 0, 
                          color: '#333', 
                          lineHeight: '1.4',
                          fontSize: '0.9rem'
                        }}>
                          {c.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right section - Survey */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <div style={{
            backgroundColor: '#e8f5e8',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #c3e6c3',
            minHeight: '500px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#2d5a2d', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ClipboardList size={20} />
              Research Survey
            </h3>
            
            <p style={{ margin: '0 0 1rem 0', color: '#2d5a2d', lineHeight: '1.6' }}>
              Help us understand how environmental data affects citizen behavior and decision-making. 
              Your participation in this research survey is valuable for improving urban environmental policies.
            </p>
            
            <div style={{
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '6px',
              marginBottom: '1rem',
              border: '1px solid #b8e6b8'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#2d5a2d' }}>Survey includes:</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#2d5a2d' }}>
                <li>Environmental awareness questions</li>
                <li>Data interpretation scenarios</li>
                <li>Behavioral change insights</li>
                <li>Urban planning preferences</li>
              </ul>
            </div>
            
            <button 
              onClick={handleQuizClick}
              style={{ 
                padding: '0.75rem 1.5rem',
                backgroundColor: '#2d5a2d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'background-color 0.2s',
                width: '100%',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1e3a1e'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2d5a2d'}
            >
              <ClipboardList size={18} />
              Take Research Survey
              <ExternalLink size={16} />
            </button>
            
            <p style={{ 
              margin: '0.75rem 0 0 0', 
              fontSize: '0.875rem', 
              color: '#5a7c5a',
              textAlign: 'center'
            }}>
              Opens in a new tab • Takes about 5-10 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
