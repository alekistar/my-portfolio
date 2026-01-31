import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';

export const initializeDatadog = () => {
  // Only initialize in production to avoid noise in development
  if (process.env.NODE_ENV === 'production') {
    // Datadog credentials from RUM Application
    const DD_APPLICATION_ID = process.env.REACT_APP_DD_APPLICATION_ID || 'cd8b5725-fd18-419b-8d84-999442c5d696';
    const DD_CLIENT_TOKEN = process.env.REACT_APP_DD_CLIENT_TOKEN || 'pub10f295f5ee582e18c8aae0e72fff8c';

    // Initialize Datadog RUM (Real User Monitoring)
    datadogRum.init({
      applicationId: DD_APPLICATION_ID,
      clientToken: DD_CLIENT_TOKEN,
      site: 'datadoghq.com',
      service: 'alex-portfolio',
      env: 'production',
      version: '1.0.0',
      sessionSampleRate: 100, // Track 100% of sessions
      sessionReplaySampleRate: 20, // Record 20% of sessions for replay
      trackUserInteractions: true, // Track clicks, form submissions, etc.
      trackResources: true, // Track network requests
      trackLongTasks: true, // Track tasks over 50ms
      defaultPrivacyLevel: 'mask-user-input', // Mask sensitive data in forms
      allowedTracingUrls: [
        // Add your backend URLs here if you have API calls
        /^https:\/\/api\.alex-odhiambo\.tech/,
        /^https:\/\/formspree\.io/,
      ],
    });

    // Start RUM
    datadogRum.startSessionReplayRecording();

    // Initialize Datadog Logs
    datadogLogs.init({
      applicationId: DD_APPLICATION_ID,
      clientToken: DD_CLIENT_TOKEN,
      site: 'datadoghq.com',
      service: 'alex-portfolio',
      env: 'production',
      sessionSampleRate: 100,
      forwardErrorsToLogs: true, // Forward browser errors to logs
      level: 'info',
    });

    // Set user info for better tracking
    const userId = localStorage.getItem('portfolio_visitor_id');
    if (userId) {
      datadogRum.setUser({
        id: userId,
        name: 'Visitor',
        email: 'visitor@alex-odhiambo.tech',
      });
    }

    // Track page views
    datadogRum.addAction('page_loaded', {
      page_title: document.title,
      page_url: window.location.href,
    });

    console.log('✅ Datadog initialized successfully');
  }
};

// Helper function to track custom events
export const trackEvent = (eventName, eventData = {}) => {
  if (process.env.NODE_ENV === 'production') {
    datadogRum.addAction(eventName, eventData);
  }
};

// Helper function for error tracking
export const trackError = (error, context = {}) => {
  if (process.env.NODE_ENV === 'production') {
    datadogRum.addError(error, context);
  }
};
