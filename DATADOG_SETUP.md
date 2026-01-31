# Datadog Configuration

This portfolio now includes Datadog Real User Monitoring (RUM) integration to track user behavior, performance metrics, and errors.

## Setup Instructions

### 1. Get Your Datadog Credentials

Since you have the GitHub Student Developer Pack, you should have access to Datadog. Follow these steps:

1. Go to [Datadog GitHub Student Pack](https://education.github.com/pack)
2. Claim your Datadog offer
3. Log in to your Datadog account
4. Go to **UX Monitoring > RUM Applications**
5. Create a new RUM application:
   - **Application name**: `alex-portfolio`
   - **Application type**: `Browser`
   - Select your region
6. Copy the generated credentials

### 2. Create Environment File

Create a `.env.production` file in the root of your project:

```env
# Datadog Credentials (get from your Datadog RUM application)
REACT_APP_DD_APPLICATION_ID=your_app_id_here
REACT_APP_DD_CLIENT_TOKEN=your_client_token_here
```

**IMPORTANT**: Never commit `.env.production` to git! Add it to `.gitignore`:

```
.env.production
.env.local
.env.*.local
```

### 3. What's Being Tracked

#### Automatically Tracked
- **Page Views**: Every page navigation
- **User Interactions**: Clicks, form submissions, scrolling
- **Network Requests**: API calls, image loads
- **Errors**: JavaScript errors caught in production
- **Performance**: Core Web Vitals (LCP, FID, CLS)
- **Session Replays**: 20% of sessions for debugging

#### Custom Events
The portfolio tracks these events:
- `contact_form_submit_attempt` - When user attempts to submit contact form
- `contact_form_success` - Successful form submission
- `section_viewed` - When user scrolls to a section (Hero, Services, Skills, About, Tools, Contact)
- `cta_clicked` - Call-to-action button clicks
- `social_link_clicked` - Social media link interactions
- `theme_toggled` - Dark/Light mode toggle

### 4. View Your Data

Once deployed to production:

1. Go to [Datadog Dashboard](https://app.datadoghq.com)
2. Navigate to **UX Monitoring > RUM Explorer**
3. View:
   - Session replays
   - User sessions
   - Error trends
   - Performance metrics
   - Custom events

## Features Enabled

✅ **Session Replay** - Watch 20% of user sessions  
✅ **Error Tracking** - Catch JavaScript errors  
✅ **User Interactions** - Track form submissions and clicks  
✅ **Network Monitoring** - Monitor API performance  
✅ **Performance Metrics** - Track Core Web Vitals  
✅ **Custom Events** - Track portfolio-specific actions  

## Privacy Considerations

- **Data Masking**: Form inputs are masked by default for privacy
- **Sample Rate**: Only 20% of sessions are recorded (session replay)
- **GDPR Compliant**: Set users' privacy level appropriately

## Using the Tracking Utilities

### Track Custom Events

```javascript
import { trackEvent } from '../config/datadog';

trackEvent('custom_event_name', {
  custom_property: 'value',
  timestamp: new Date().toISOString(),
});
```

### Track Errors

```javascript
import { trackError } from '../config/datadog';

try {
  // your code
} catch (error) {
  trackError(error, {
    component: 'ComponentName',
    action: 'action_name',
  });
}
```

### Track Section Views

```javascript
import { useTrackSectionView } from '../hooks/useTrackSectionView';

function MyComponent() {
  useTrackSectionView('section-id');
  return <section id="section-id">...</section>;
}
```

## Troubleshooting

### Data Not Showing Up?

1. Check that credentials are correct in `.env.production`
2. Ensure app is running in production mode
3. Open browser DevTools and search for "datadog" in console logs
4. Verify network tab shows `datadoghq.com` requests

### Too Much Data?

Adjust `sessionSampleRate` and `sessionReplaySampleRate` in `src/config/datadog.js`

### Privacy Concerns?

Enable additional masking:
- Update `defaultPrivacyLevel: 'mask'` for stricter masking
- Modify `allowedTracingUrls` to limit tracked domains

## Next Steps

1. Deploy to production with environment variables set
2. Wait 5-10 minutes for first data to appear in Datadog
3. Create alerts for:
   - Error rate exceeds 5%
   - Page load time > 3s
   - Form submission failures
4. Set up custom dashboards to monitor key metrics
