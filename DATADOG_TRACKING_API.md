# Datadog Tracking API Reference

Quick guide for adding custom tracking to your portfolio components.

## 1. Track Custom Events

### Basic Event
```javascript
import { trackEvent } from '../config/datadog';

trackEvent('my_custom_event', {
  property_name: 'value',
  timestamp: new Date().toISOString(),
});
```

### Example: Track Service Card Click
```javascript
const handleServiceClick = (serviceName) => {
  trackEvent('service_card_clicked', {
    service_name: serviceName,
    price: '$150',
    timestamp: new Date().toISOString(),
  });
};
```

### Example: Track Skill Hover
```javascript
const handleSkillHover = (skillName) => {
  trackEvent('skill_hovered', {
    skill_name: skillName,
    category: 'frontend',
  });
};
```

## 2. Track Errors

### Basic Error
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

### Example: Track Form Validation Error
```javascript
const validateEmail = (email) => {
  try {
    if (!email.includes('@')) {
      throw new Error('Invalid email format');
    }
  } catch (error) {
    trackError(error, {
      component: 'ContactForm',
      field: 'email',
      user_input: email.slice(0, 5) + '***', // Don't log full email
    });
  }
};
```

## 3. Track Section Views

### Using Hook
```javascript
import { useTrackSectionView } from '../hooks/useTrackSectionView';

function MySection() {
  useTrackSectionView('section-id');
  
  return (
    <section id="section-id">
      {/* content */}
    </section>
  );
}
```

### Manual Tracking
```javascript
import { trackEvent } from '../config/datadog';
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    trackEvent('section_viewed', {
      section_name: 'my-section',
      entry_point: 'direct',
    });
  }, []);
}
```

## 4. Track User Actions

### Button Clicks
```javascript
<button 
  onClick={() => {
    trackEvent('button_clicked', { button_name: 'download_resume' });
    downloadResume();
  }}
>
  Download Resume
</button>
```

### Form Field Focus
```javascript
<input
  onFocus={() => {
    trackEvent('form_field_focused', { field_name: 'email' });
  }}
  type="email"
  placeholder="Your email"
/>
```

### Link Clicks
```javascript
<a 
  href="#"
  onClick={() => {
    trackEvent('external_link_clicked', {
      url: 'https://example.com',
      text: 'Read More',
    });
  }}
>
  Read More
</a>
```

## 5. Best Practices

### DO:
✅ Include timestamp for time-series analysis
```javascript
trackEvent('user_action', {
  action: 'clicked_button',
  timestamp: new Date().toISOString(),
});
```

✅ Use descriptive event names
```javascript
trackEvent('contact_form_submitted', {...}); // Good
trackEvent('form', {...}); // Bad
```

✅ Include context about what happened
```javascript
trackEvent('error', {
  error_type: 'validation',
  field: 'email',
  reason: 'invalid_format',
});
```

✅ Batch related data together
```javascript
trackEvent('project_viewed', {
  project_id: '123',
  project_name: 'Portfolio',
  duration_seconds: 45,
  scroll_depth_percent: 75,
});
```

### DON'T:
❌ Track sensitive data
```javascript
trackEvent('login', {
  password: userPassword, // NEVER!
  email: user.email,      // Masked by default, but be careful
});
```

❌ Track too frequently (causes noise)
```javascript
window.addEventListener('mousemove', () => {
  trackEvent('mouse_moved', {x, y}); // DON'T - too many events!
});
```

❌ Use unclear event names
```javascript
trackEvent('x', {a: 1}); // Bad naming
```

## 6. Common Patterns

### Analytics for Portfolio
```javascript
// Track which projects users explore most
trackEvent('project_card_viewed', {
  project_id: 'react-portfolio',
  project_title: 'React Portfolio',
  category: 'web-development',
  position: 1, // card position on page
});

// Track project link clicks
trackEvent('project_link_clicked', {
  project_id: 'react-portfolio',
  link_type: 'github', // or 'live-demo', 'documentation'
  url: 'https://github.com/alekistar/my-portfolio',
});
```

### Analytics for Services
```javascript
// Track service interest
trackEvent('service_viewed', {
  service_name: 'Full Stack Development',
  price_tier: '$400',
  duration_on_card_seconds: 15,
  clicked: true,
});

// Track "Get Started" button
trackEvent('service_cta_clicked', {
  service_name: 'Full Stack Development',
  button_text: 'Get Started',
  action: 'scroll_to_contact',
});
```

### Analytics for Skills
```javascript
// Track skill interest
trackEvent('skill_card_viewed', {
  skill_name: 'React',
  category: 'Frontend',
  proficiency_level: 95,
  hovered: true,
});
```

## 7. Viewing Your Events in Datadog

1. Go to **RUM Explorer** in Datadog
2. Search for your event name:
   ```
   @rum.event_type:action @action.name:button_clicked
   ```
3. View:
   - Event frequency
   - User sessions with this event
   - Related errors
   - Performance impact

## 8. Setting Up Alerts

Example alert setup in Datadog:
```
Alert when count of 'contact_form_submitted' 
is less than 5 per day
(indicates potential issue)
```

## 🔗 See Also

- [Datadog RUM Events](https://docs.datadoghq.com/real_user_monitoring/guide/send-rum-custom-user-actions/)
- [Custom Events Documentation](https://docs.datadoghq.com/real_user_monitoring/browser/#custom-events)
- Files using tracking:
  - `src/components/Hero.jsx` - CTA tracking
  - `src/components/Contact.jsx` - Form tracking
  - `src/components/Navbar.jsx` - Theme tracking
