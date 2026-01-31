# Datadog Deployment Guide

Instructions for deploying your portfolio with Datadog monitoring to various platforms.

## Deployment Options

### 1. GitHub Pages (Current Setup)

#### With GitHub Actions
If you use GitHub Actions for deployment:

**Step 1:** Add secrets to your repository
1. Go to your repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets:
   - `DD_APPLICATION_ID`: Your Datadog Application ID
   - `DD_CLIENT_TOKEN`: Your Datadog Client Token

**Step 2:** Update your workflow file (`.github/workflows/deploy.yml`)
```yaml
- name: Build
  env:
    REACT_APP_DD_APPLICATION_ID: ${{ secrets.DD_APPLICATION_ID }}
    REACT_APP_DD_CLIENT_TOKEN: ${{ secrets.DD_CLIENT_TOKEN }}
  run: npm run build
```

**Step 3:** Deploy as usual
```bash
git push origin main
```

#### Manual Deployment
1. Create `.env.production` locally with your credentials
2. Run `npm run build`
3. Deploy `dist/` folder to GitHub Pages

---

### 2. Vercel

**Step 1:** Install Vercel CLI
```bash
npm install -g vercel
```

**Step 2:** Link your project
```bash
vercel link
```

**Step 3:** Add environment variables
Via Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add:
   - `REACT_APP_DD_APPLICATION_ID`
   - `REACT_APP_DD_CLIENT_TOKEN`
3. Set scope to: Production, Preview, Development

**Step 4:** Deploy
```bash
vercel
```

Or push to git (auto-deploys):
```bash
git push
```

---

### 3. Netlify

**Step 1:** Connect your repository
Go to netlify.com and link your GitHub repo

**Step 2:** Add environment variables
1. Site settings → Build & Deploy → Environment
2. Click "Edit variables"
3. Add:
   - `REACT_APP_DD_APPLICATION_ID`: `your_id`
   - `REACT_APP_DD_CLIENT_TOKEN`: `your_token`

**Step 3:** Deploy
Push to GitHub:
```bash
git push origin main
```
Netlify auto-deploys!

---

### 4. Heroku (if hosting backend too)

**Step 1:** Install Heroku CLI
```bash
npm install -g heroku
```

**Step 2:** Create app (if not exists)
```bash
heroku create your-app-name
```

**Step 3:** Set environment variables
```bash
heroku config:set REACT_APP_DD_APPLICATION_ID=your_id
heroku config:set REACT_APP_DD_CLIENT_TOKEN=your_token
```

**Step 4:** Deploy
```bash
git push heroku main
```

---

### 5. AWS S3 + CloudFront

**Step 1:** Build locally with env vars
```bash
export REACT_APP_DD_APPLICATION_ID=your_id
export REACT_APP_DD_CLIENT_TOKEN=your_token
npm run build
```

**Step 2:** Upload to S3
```bash
aws s3 sync dist/ s3://your-bucket-name/
```

**Step 3:** CloudFront invalidation (if using)
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

---

### 6. Docker Container

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG REACT_APP_DD_APPLICATION_ID
ARG REACT_APP_DD_CLIENT_TOKEN
ENV REACT_APP_DD_APPLICATION_ID=$REACT_APP_DD_APPLICATION_ID
ENV REACT_APP_DD_CLIENT_TOKEN=$REACT_APP_DD_CLIENT_TOKEN
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Build and run:
```bash
docker build \
  --build-arg REACT_APP_DD_APPLICATION_ID=your_id \
  --build-arg REACT_APP_DD_CLIENT_TOKEN=your_token \
  -t my-portfolio .

docker run -p 3000:3000 my-portfolio
```

---

## Verification Checklist

After deployment, verify Datadog is working:

- [ ] Wait 2-5 minutes for data to appear
- [ ] Go to [Datadog RUM Dashboard](https://app.datadoghq.com/ux/rum)
- [ ] Select your application
- [ ] Check for:
  - [ ] Page views showing
  - [ ] Session replays available
  - [ ] Custom events appearing
  - [ ] No errors on your section

### Browser Console Check
In production, open DevTools and search console for:
```
Datadog initialized successfully
```

### Network Tab Check
Should see requests to:
- `api.datadoghq.com` (or your region)
- Look for RUM events being sent

---

## Troubleshooting

### Data Not Showing?

1. **Check credentials are correct**
   ```bash
   # Verify env vars are set
   echo $REACT_APP_DD_APPLICATION_ID
   echo $REACT_APP_DD_CLIENT_TOKEN
   ```

2. **Check production build**
   - Datadog only initializes when `NODE_ENV === 'production'`
   - Verify your build is optimized

3. **Check network requests**
   - Open DevTools → Network tab
   - Look for `datadoghq.com` requests
   - Check for CORS errors

4. **Check Datadog region**
   - Default is `datadoghq.com` (US)
   - If you're in EU, change to `datadoghq.eu` in `src/config/datadog.js`

### Events Not Tracking?

1. Check browser console for errors
2. Verify component changes were deployed
3. Wait 5 minutes for data to propagate
4. Check Datadog RUM Filter for correct app selection

### Performance Issues?

If your page load time increased:
1. Reduce `sessionSampleRate` to 50% in `src/config/datadog.js`
2. Reduce `sessionReplaySampleRate` to 10%
3. This still gives good data with less overhead

---

## Environment Variables by Platform

### GitHub Pages / Actions
```yaml
env:
  REACT_APP_DD_APPLICATION_ID: ${{ secrets.DD_APPLICATION_ID }}
  REACT_APP_DD_CLIENT_TOKEN: ${{ secrets.DD_CLIENT_TOKEN }}
```

### Vercel
```
REACT_APP_DD_APPLICATION_ID = xxx
REACT_APP_DD_CLIENT_TOKEN = xxx
```

### Netlify
```
REACT_APP_DD_APPLICATION_ID
REACT_APP_DD_CLIENT_TOKEN
```

### Docker
```dockerfile
ARG REACT_APP_DD_APPLICATION_ID
ARG REACT_APP_DD_CLIENT_TOKEN
ENV REACT_APP_DD_APPLICATION_ID=$REACT_APP_DD_APPLICATION_ID
ENV REACT_APP_DD_CLIENT_TOKEN=$REACT_APP_DD_CLIENT_TOKEN
```

### AWS Lambda
```bash
aws lambda update-function-configuration \
  --function-name my-portfolio \
  --environment Variables="{REACT_APP_DD_APPLICATION_ID=xxx,REACT_APP_DD_CLIENT_TOKEN=xxx}"
```

---

## Security Best Practices

✅ **DO:**
- Use repository secrets for sensitive values
- Never commit `.env.production` to git
- Use environment-specific variables
- Rotate tokens if compromised
- Monitor Datadog cost

❌ **DON'T:**
- Commit credentials to git
- Share credentials in Slack/Discord
- Use the same token everywhere
- Leave test tokens in production
- Store in plaintext files

---

## Monitoring Datadog Costs

Datadog charges per:
- Sessions recorded
- Custom events
- GB of data ingested

To reduce costs:
1. Lower `sessionReplaySampleRate` (from 20% to 10%)
2. Lower `sessionSampleRate` (from 100% to 50%)
3. Remove unnecessary custom events
4. Set appropriate retention policy

Example for lower costs:
```javascript
// In src/config/datadog.js
sessionSampleRate: 50,           // Only 50% of sessions
sessionReplaySampleRate: 10,     // Only 10% replays
```

---

## Quick Deploy Commands

### GitHub Pages
```bash
npm run build && npm run deploy
```

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod --dir=dist
```

### Docker
```bash
docker build -t portfolio . && docker push your-registry/portfolio
```

---

## Support & Resources

- **Datadog Docs**: https://docs.datadoghq.com/real_user_monitoring/
- **Deployment Guides**: See other docs in this repo
- **Integration Files**: Check `src/config/datadog.js`

---

**Ready to deploy?** Choose your platform above and follow the steps! 🚀
