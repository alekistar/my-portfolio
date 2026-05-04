import{C as m,a as h,j as e,g as u,A as p,B as y,D as g,E as b,G as f,I as w,J as k}from"./react-vendor-CBt7h57m.js";import{u as x}from"./index-CZa31gFB.js";import{m as t}from"./motion-vendor-kbTjkjdY.js";const v=[{id:1,title:"How I Integrated M-Pesa STK Push with Python in 15 Minutes",excerpt:"A step-by-step guide to implementing Safaricom's Daraja API for seamless mobile payment integration. Perfect for Kenyan businesses looking to accept payments from customers.",date:"Jan 30, 2026",author:"Alex Opiyo",position:"Full-Stack Developer & Scholar at M-Pesa Foundation Academy",readTime:"8 min read",category:"Tutorial",tags:["M-Pesa","Python","API","Payments","Kenya","Daraja","E-commerce"],image:"💳",gradient:"linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",slug:"mpesa-stk-push-python",seoKeywords:"M-Pesa integration Kenya, Safaricom Daraja API Python, STK Push implementation, mobile payment Kenya",content:`
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
    `},{id:2,title:"Applying IB Math HL Calculus to Optimize Algorithms",excerpt:"Discover how advanced mathematics from the IB curriculum can be applied to solve real-world algorithmic problems. Learn optimization techniques that improve application performance.",date:"Jan 25, 2026",author:"Alex Opiyo",readTime:"12 min read",category:"Tech Deep Dive",tags:["Algorithms","Calculus","Optimization","Performance"],image:"📊",gradient:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",slug:"ib-math-algorithms",content:"Coming soon..."},{id:3,title:"Why Kenyan SMEs Need Custom Websites, Not Just Facebook Pages",excerpt:"A business case for why small and medium enterprises in Kenya should invest in professional websites. Learn how a custom website can increase revenue and build credibility.",date:"Jan 20, 2026",author:"Alex Opiyo",readTime:"6 min read",category:"Business",tags:["Kenya","SME","Website","Business Growth","Digital"],image:"🚀",gradient:"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",slug:"kenyan-smes-custom-websites",content:"Coming soon..."}],S=()=>{const{slug:o}=m(),s=h(),{isDark:c}=x(),a=v.find(n=>n.slug===o);if(!a)return e.jsx(t.div,{className:`blog-article-view ${c?"dark":"light"}`,style:{minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("h1",{children:"Article not found"}),e.jsx(t.button,{onClick:()=>s("/"),style:{marginTop:"2rem",padding:"0.75rem 1.5rem",background:"#6366f1",color:"white",border:"none",borderRadius:"8px",cursor:"pointer"},whileHover:{scale:1.05},children:"Back to home"})]})});const r=n=>{const i=`${window.location.origin}/blog/${a.slug}`,d=`Check out this article by Alex Opiyo: ${a.title}`,l={twitter:`https://twitter.com/intent/tweet?text=${encodeURIComponent(d)}&url=${encodeURIComponent(i)}`,linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(i)}`,facebook:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(i)}`};l[n]&&window.open(l[n],"_blank")};return e.jsx(t.div,{className:`blog-article-view ${c?"dark":"light"}`,initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:e.jsxs("div",{className:"article-container",children:[e.jsxs(t.button,{className:"back-button",onClick:()=>s("/"),whileHover:{x:-5},whileTap:{scale:.95},children:[e.jsx(u,{})," Back to Portfolio"]}),e.jsxs("header",{className:"article-header",children:[e.jsx("div",{className:"article-hero",style:{background:a.gradient},children:e.jsx("span",{className:"hero-emoji",children:a.image})}),e.jsxs(t.div,{className:"article-header-content",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1},children:[e.jsx("div",{className:"header-meta",children:e.jsx("span",{className:"category-large",children:a.category})}),e.jsx("h1",{className:"article-main-title",children:a.title}),e.jsxs("div",{className:"article-metadata",children:[e.jsxs("div",{className:"meta-item",children:[e.jsx(p,{className:"meta-icon"}),e.jsxs("div",{className:"meta-content",children:[e.jsx("span",{className:"meta-label",children:"Author"}),e.jsx("span",{className:"meta-value",children:a.author})]})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx(y,{className:"meta-icon"}),e.jsxs("div",{className:"meta-content",children:[e.jsx("span",{className:"meta-label",children:"Published"}),e.jsx("span",{className:"meta-value",children:a.date})]})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx(g,{className:"meta-icon"}),e.jsxs("div",{className:"meta-content",children:[e.jsx("span",{className:"meta-label",children:"Read Time"}),e.jsx("span",{className:"meta-value",children:a.readTime})]})]})]}),a.position&&e.jsx("p",{className:"author-position",children:a.position}),e.jsx("div",{className:"article-tags-full",children:a.tags.map((n,i)=>e.jsx("span",{className:"tag-full",children:n},i))})]})]}),e.jsx(t.article,{className:"article-body",initial:{opacity:0},animate:{opacity:1},transition:{delay:.2,duration:.5},children:e.jsx("div",{className:"markdown-content",dangerouslySetInnerHTML:{__html:j(a.content)}})}),e.jsxs(t.div,{className:"article-share",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},children:[e.jsxs("h4",{className:"share-title",children:[e.jsx(b,{})," Share This Article"]}),e.jsxs("div",{className:"share-buttons",children:[e.jsx(t.button,{className:"share-btn linkedin",onClick:()=>r("linkedin"),whileHover:{scale:1.1},whileTap:{scale:.95},title:"Share on LinkedIn",children:e.jsx(f,{})}),e.jsx(t.button,{className:"share-btn twitter",onClick:()=>r("twitter"),whileHover:{scale:1.1},whileTap:{scale:.95},title:"Share on Twitter",children:e.jsx(w,{})}),e.jsx(t.button,{className:"share-btn facebook",onClick:()=>r("facebook"),whileHover:{scale:1.1},whileTap:{scale:.95},title:"Share on Facebook",children:e.jsx(k,{})})]})]}),e.jsxs(t.div,{className:"article-cta",initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0},children:[e.jsx("h3",{children:"Ready to implement M-Pesa integration?"}),e.jsx("p",{children:"Let's discuss how I can build a custom payment system for your Kenyan business."}),e.jsx(t.a,{href:"https://wa.me/254759447439?text=Hi%20Alex,%20I%20read%20your%20blog%20on%20M-Pesa%20integration%20and%20I'm%20interested%20in%20working%20with%20you",target:"_blank",rel:"noopener noreferrer",className:"cta-button",whileHover:{scale:1.05},whileTap:{scale:.95},children:"Chat on WhatsApp →"})]})]})})};function j(o){let s=o.replace(/### (.*?)\n/g,"<h3>$1</h3>").replace(/## (.*?)\n/g,"<h2>$1</h2>").replace(/# (.*?)\n/g,"<h1>$1</h1>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/__(.*?)__/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/_(.*?)_/g,"<em>$1</em>").replace(/```(\w+)\n([\s\S]*?)```/g,'<pre><code class="language-$1">$2</code></pre>').replace(/```([\s\S]*?)```/g,"<pre><code>$1</code></pre>").replace(/`(.*?)`/g,"<code>$1</code>").replace(/^- (.*?)$/gm,"<li>$1</li>").replace(/✅/g,'<span class="checkmark">✅</span>').replace(/\n\n/g,"</p><p>").replace(/---\n/g,"<hr />").replace(/\n/g,"<br />");return s=`<p>${s}</p>`,s}export{S as default};
