import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiUser, FiClock, FiShare2 } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import './BlogArticle.css';

// All blog articles data
const allArticles = [
  {
    id: 1,
    title: 'How I Integrated M-Pesa STK Push with Python in 15 Minutes',
    excerpt: 'A step-by-step guide to implementing Safaricom\'s Daraja API for seamless mobile payment integration. Perfect for Kenyan businesses looking to accept payments from customers.',
    date: 'Jan 30, 2026',
    author: 'Alex Opiyo',
    position: 'Full-Stack Developer & Scholar at M-Pesa Foundation Academy',
    readTime: '8 min read',
    category: 'Tutorial',
    tags: ['M-Pesa', 'Python', 'API', 'Payments', 'Kenya', 'Daraja', 'E-commerce'],
    image: '💳',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    slug: 'mpesa-stk-push-python',
    seoKeywords: 'M-Pesa integration Kenya, Safaricom Daraja API Python, STK Push implementation, mobile payment Kenya',
    content: `
## The Challenge: "Lipa Na M-Pesa Online"

In Kenya, if your website doesn't accept M-Pesa, you aren't really open for business. We've all seen it: a beautiful e-commerce site that forces you to manually "Send Money" to a number and then forward the confirmation SMS. It's slow, it's prone to errors, and it kills sales.

The solution is the **STK Push** (Sim Tool Kit). You enter your number, your phone buzzes, you type your PIN, and the payment is done.

Safaricom's API (Daraja) is powerful, but the documentation can sometimes feel overwhelming for beginners. As a scholar at the M-Pesa Foundation Academy, I've spent considerable time analyzing how mobile money drives our economy. Recently, I decided to stop just studying it and start building with it.

Here's how I used Python and Flask to integrate the Safaricom Daraja API in under 15 minutes. And how you can do it too.

### What You Need

To get this working, you need three critical components:
- **Authentication**: A way to tell Safaricom "It's me"
- **The Password**: A specific encrypted string generated from the timestamp
- **The Request**: The actual command to trigger the payment prompt on the user's phone

---

## Step 1: Authentication (The Access Token)

You can't just send a payment request. First, you need an Access Token. Think of it like a wristband that lets you into the club.

Using Python's \`requests\` library, we hit the \`oauth/v1/generate\` endpoint using our Consumer Key and Secret:

\`\`\`python
import requests
from requests.auth import HTTPBasicAuth

def get_access_token():
    consumer_key = "YOUR_CONSUMER_KEY"
    consumer_secret = "YOUR_CONSUMER_SECRET"
    api_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    
    r = requests.get(api_URL, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    json_response = r.json()
    my_access_token = json_response['access_token']
    
    return my_access_token
\`\`\`

This token is valid for a limited time. Store it and reuse it within your application to avoid unnecessary API calls.

---

## Step 2: Generating the Timestamp Password

This is where most developers get stuck. Safaricom requires a \`Password\` field which is a Base64 encoded string of:

\`\`\`
Shortcode + Passkey + Timestamp
\`\`\`

If the timestamp is even one second off, the request fails. Here's how I handled it using Python's \`datetime\` and \`base64\` modules:

\`\`\`python
import base64
from datetime import datetime

def generate_password(shortcode, passkey):
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    data_to_encode = shortcode + passkey + timestamp
    encoded_string = base64.b64encode(data_to_encode.encode())
    decoded_password = encoded_string.decode('utf-8')
    return decoded_password, timestamp
\`\`\`

**Key Point**: Always generate a fresh timestamp for each request. Reusing timestamps is a common security vulnerability.

---

## Step 3: Triggering the STK Push

Now for the exciting part. We combine the token and the password to send the actual request.

When this code runs, Safaricom checks the credentials and instantly sends a command to the customer's SIM card:

\`\`\`python
def initiate_stk_push(phone_number, amount):
    access_token = get_access_token()
    headers = { "Authorization": "Bearer %s" % access_token }
    
    password, timestamp = generate_password("174379", "YOUR_PASSKEY")
    
    payload = {
        "BusinessShortCode": "174379",  # Sandbox Shortcode
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": "174379",
        "PhoneNumber": phone_number,
        "CallBackURL": "https://your-domain.com/callback",
        "AccountReference": "YourReference",
        "TransactionDesc": "Payment for Web Services"
    }
    
    response = requests.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', 
        json=payload, 
        headers=headers
    )
    return response.json()
\`\`\`

---

## The Critical Part: Handling Callbacks

Sending the prompt is easy. Knowing if the customer actually paid is the hard part. Safaricom sends a "Callback" (a JSON message) to your server confirming the payment status.

This requires a live backend that listens for these webhooks 24/7. I deployed mine on Render to ensure transactions are recorded even when my development machine is offline.

Code for handling the callback:

\`\`\`
@app.route('/callback', methods=['POST'])
def handle_callback():
    callback_data = request.get_json()
    
    if callback_data['Body']['stkCallback']['ResultCode'] == 0:
        # Payment successful
        amount = callback_data['Body']['stkCallback']['CallbackMetadata']['Item'][0]['Value']
        phone = callback_data['Body']['stkCallback']['CallbackMetadata']['Item'][1]['Value']
        # Save transaction to database
    else:
        # Payment failed or cancelled
        pass
    
    return {"ResultCode": 0}
\`\`\`

---

## Why This Matters for Your Business

A custom M-Pesa integration does far more than just take money:

✅ **Trust**: Customers feel safer entering a PIN on their phone than giving out credit card details
✅ **Speed**: No manual verification of M-Pesa messages
✅ **Automation**: Your system automatically knows the invoice is paid and can release the product instantly
✅ **Professional Image**: Shows your business is serious about digital payments
✅ **Reduced Chargebacks**: M-Pesa transactions are final, no reversals

---

## Ready to Accept M-Pesa?

If you're running a Kenyan business and want to start accepting M-Pesa payments instantly, this integration is non-negotiable. I've built custom payment systems for over 15 SMEs across Kenya.

**Whether you need:**
- A complete e-commerce platform with M-Pesa integration
- A subscription billing system
- A payment verification system for service delivery

**Get in touch.** WhatsApp me, and let's discuss how we can get your system running.
    `
  },
  {
    id: 2,
    title: 'Applying IB Math HL Calculus to Optimize Algorithms',
    excerpt: 'Discover how advanced mathematics from the IB curriculum can be applied to solve real-world algorithmic problems. Learn optimization techniques that improve application performance.',
    date: 'Jan 25, 2026',
    author: 'Alex Opiyo',
    readTime: '12 min read',
    category: 'Tech Deep Dive',
    tags: ['Algorithms', 'Calculus', 'Optimization', 'Performance'],
    image: '📊',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    slug: 'ib-math-algorithms',
    content: 'Coming soon...'
  },
  {
    id: 3,
    title: 'Why Kenyan SMEs Need Custom Websites, Not Just Facebook Pages',
    excerpt: 'A business case for why small and medium enterprises in Kenya should invest in professional websites. Learn how a custom website can increase revenue and build credibility.',
    date: 'Jan 20, 2026',
    author: 'Alex Opiyo',
    readTime: '6 min read',
    category: 'Business',
    tags: ['Kenya', 'SME', 'Website', 'Business Growth', 'Digital'],
    image: '🚀',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    slug: 'kenyan-smes-custom-websites',
    content: 'Coming soon...'
  }
];

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const article = allArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <motion.div
        className={`blog-article-view ${isDark ? 'dark' : 'light'}`}
        style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1>Article not found</h1>
          <motion.button
            onClick={() => navigate('/')}
            style={{
              marginTop: '2rem',
              padding: '0.75rem 1.5rem',
              background: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            whileHover={{ scale: 1.05 }}
          >
            Back to home
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const handleShare = (platform) => {
    const url = `${window.location.origin}/blog/${article.slug}`;
    const text = `Check out this article by Alex Opiyo: ${article.title}`;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
    }
  };

  return (
    <motion.div
      className={`blog-article-view ${isDark ? 'dark' : 'light'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="article-container">
        <motion.button
          className="back-button"
          onClick={() => navigate('/')}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft /> Back to Portfolio
        </motion.button>

        <header className="article-header">
          <div className="article-hero" style={{ background: article.gradient }}>
            <span className="hero-emoji">{article.image}</span>
          </div>

          <motion.div
            className="article-header-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="header-meta">
              <span className="category-large">{article.category}</span>
            </div>

            <h1 className="article-main-title">{article.title}</h1>

            <div className="article-metadata">
              <div className="meta-item">
                <FiUser className="meta-icon" />
                <div className="meta-content">
                  <span className="meta-label">Author</span>
                  <span className="meta-value">{article.author}</span>
                </div>
              </div>

              <div className="meta-item">
                <FiCalendar className="meta-icon" />
                <div className="meta-content">
                  <span className="meta-label">Published</span>
                  <span className="meta-value">{article.date}</span>
                </div>
              </div>

              <div className="meta-item">
                <FiClock className="meta-icon" />
                <div className="meta-content">
                  <span className="meta-label">Read Time</span>
                  <span className="meta-value">{article.readTime}</span>
                </div>
              </div>
            </div>

            {article.position && (
              <p className="author-position">{article.position}</p>
            )}

            <div className="article-tags-full">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="tag-full">{tag}</span>
              ))}
            </div>
          </motion.div>
        </header>

        <motion.article
          className="article-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div 
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: formatMarkdown(article.content) }}
          />
        </motion.article>

        <motion.div
          className="article-share"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h4 className="share-title">
            <FiShare2 /> Share This Article
          </h4>
          <div className="share-buttons">
            <motion.button
              className="share-btn linkedin"
              onClick={() => handleShare('linkedin')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Share on LinkedIn"
            >
              <FaLinkedin />
            </motion.button>
            <motion.button
              className="share-btn twitter"
              onClick={() => handleShare('twitter')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Share on Twitter"
            >
              <FaTwitter />
            </motion.button>
            <motion.button
              className="share-btn facebook"
              onClick={() => handleShare('facebook')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Share on Facebook"
            >
              <FaFacebook />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="article-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>Ready to implement M-Pesa integration?</h3>
          <p>Let's discuss how I can build a custom payment system for your Kenyan business.</p>
          <motion.a
            href="https://wa.me/254759447439?text=Hi%20Alex,%20I%20read%20your%20blog%20on%20M-Pesa%20integration%20and%20I'm%20interested%20in%20working%20with%20you"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Chat on WhatsApp →
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

function formatMarkdown(markdown) {
  let html = markdown
    .replace(/### (.*?)\n/g, '<h3>$1</h3>')
    .replace(/## (.*?)\n/g, '<h2>$1</h2>')
    .replace(/# (.*?)\n/g, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/```(\w+)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/^- (.*?)$/gm, '<li>$1</li>')
    .replace(/✅/g, '<span class="checkmark">✅</span>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/---\n/g, '<hr />')
    .replace(/\n/g, '<br />');

  html = `<p>${html}</p>`;
  return html;
}

export default BlogPost;
