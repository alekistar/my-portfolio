# Email Form Setup Instructions

## Quick Setup: Formspree Integration

Your contact form is now integrated with **Formspree**, a free email form service. To activate it:

### Step 1: Create Formspree Account
1. Visit https://formspree.io/
2. Sign up with your email: **lexaura.lexp@gmail.com**
3. Confirm your email

### Step 2: Create a New Form
1. Click "New Project"
2. Add your portfolio domain or use "Personal Portfolio"
3. Create a new form
4. Formspree will generate a unique form ID (looks like: `f/xxxxxxxxxxx`)

### Step 3: Update the Form ID
Replace the form ID in [src/components/Contact.jsx](src/components/Contact.jsx) at line 26:

```jsx
// CHANGE THIS LINE:
const response = await fetch('https://formspree.io/f/xyzpqrstuv', {
```

To:
```jsx
// TO YOUR ACTUAL FORM ID:
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

### Step 4: Verify & Done!
1. Go back to your Formspree dashboard
2. Verify your email address in the form settings
3. Your form is now live! 🎉

## How It Works

When users submit the form:
1. Their message is sent to **lexaura.lexp@gmail.com**
2. You can reply directly from Formspree dashboard
3. User gets automatic confirmation email
4. No backend coding needed!

## Alternative Email Services

If you prefer, you can also use:
- **EmailJS** (https://www.emailjs.com/) - Free tier with email limits
- **Basin** (https://usebasin.com/) - Simple form submissions
- **Netlify Forms** - Built-in if deployed to Netlify

## Current Setup

✅ Form fields: Name, Email, Message
✅ Email destination: lexaura.lexp@gmail.com
✅ Success message: "✓ Message sent! I'll get back to you soon."
✅ Error handling: Shows error message if submission fails
✅ Loading state: Button shows "Sending..." during submission

## Testing the Form

Once Formspree ID is set:
1. Fill out the contact form on your portfolio
2. Click "Send Message"
3. Wait for success confirmation
4. Check your email inbox

---

**Important:** Don't forget to replace the Formspree ID before deploying to production!
