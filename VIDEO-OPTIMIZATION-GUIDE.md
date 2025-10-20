# Video Optimization Guide for Bacho Ilia Website

## Current Status
✅ Responsive video component with lazy loading implemented
✅ Intersection Observer for battery/data savings
✅ Poster image placeholder created
⚠️  Video files need compression (current: 34MB)

---

## Mobile Performance Improvements Implemented

### 1. **Lazy Loading with Intersection Observer**
- Video only loads when 25% visible on screen
- Automatically pauses when scrolled away (saves battery & data)
- Reduces initial page load time

### 2. **Responsive Video Component**
- Detects mobile vs desktop devices
- Serves different video files based on screen size
- Falls back gracefully if mobile video isn't available

### 3. **Loading Optimizations**
- `preload="metadata"` - Only loads video metadata initially
- Poster image shows while video loads
- Smooth fade-in transition when ready
- Loading skeleton for better UX

### 4. **Performance Features**
- Automatically pauses when not in viewport
- Muted autoplay for better mobile support
- `playsInline` attribute for iOS compatibility

---

## Next Step: Video Compression

### Option 1: Install FFmpeg (Recommended)

**On macOS:**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install FFmpeg
brew install ffmpeg
```

**On Linux:**
```bash
sudo apt update
sudo apt install ffmpeg
```

**On Windows:**
Download from: https://ffmpeg.org/download.html

---

## FFmpeg Compression Commands

Once FFmpeg is installed, run these commands from your project directory:

### 1. Create Mobile-Optimized Video (~3MB, 720p)
```bash
ffmpeg -i public/bacho-video.mp4 \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
  -c:v libx264 \
  -crf 28 \
  -preset faster \
  -movflags +faststart \
  -an \
  public/bacho-video-mobile.mp4
```

**What this does:**
- Scales to 720p (1280x720)
- Higher compression (crf 28 = smaller file)
- Removes audio (not needed for background video)
- `-movflags +faststart` = optimizes for web streaming
- Target size: ~2-4MB

### 2. Create Desktop-Optimized Video (~12MB, 1080p)
```bash
ffmpeg -i public/bacho-video.mp4 \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
  -c:v libx264 \
  -crf 23 \
  -preset medium \
  -movflags +faststart \
  -an \
  public/bacho-video-desktop.mp4
```

**What this does:**
- Keeps 1080p quality
- Moderate compression (crf 23 = good quality)
- Removes audio
- Optimized for streaming
- Target size: ~10-15MB

### 3. Extract High-Quality Poster Image (Optional)
```bash
ffmpeg -i public/bacho-video.mp4 \
  -ss 00:00:03 \
  -vframes 1 \
  -vf "scale=1920:-1" \
  -q:v 2 \
  public/bacho-video-poster-hq.jpg
```

Then convert to WebP:
```bash
# If you have ImageMagick installed
convert public/bacho-video-poster-hq.jpg -quality 85 public/bacho-video-poster.webp
```

---

## Alternative: Online Video Compression Tools

If you can't install FFmpeg, use these online tools:

1. **CloudConvert** - https://cloudconvert.com/mp4-compress
   - Upload your video
   - Set quality to ~70% for mobile, ~85% for desktop
   - Resize to 720p and 1080p respectively

2. **Clideo** - https://clideo.com/compress-video
   - Automatic compression
   - Download and test file sizes

3. **HandBrake** - https://handbrake.fr (Desktop app)
   - Free, powerful video converter
   - Use "Web Optimized" preset
   - Adjust dimensions manually

---

## Expected File Sizes & Performance

| Version | Resolution | Current | Target | Load Time (4G) |
|---------|-----------|---------|---------|----------------|
| Mobile  | 720p      | 34MB    | 2-4MB   | ~1-2 seconds   |
| Desktop | 1080p     | 34MB    | 10-15MB | ~3-5 seconds   |

**Current Issues:**
- 34MB takes 8-17 seconds on 4G
- High data usage (concerning for mobile users)
- Poor mobile experience

**After Optimization:**
- Mobile users: 85% reduction in size
- Faster page load
- Better user experience
- Lower bounce rate

---

## Testing Your Optimized Videos

1. Replace current video or rename:
```bash
# Backup original
mv public/bacho-video.mp4 public/bacho-video-original.mp4

# Use desktop version as default
mv public/bacho-video-desktop.mp4 public/bacho-video.mp4
```

2. Ensure mobile version exists:
```bash
ls -lh public/bacho-video-mobile.mp4
```

3. Test on:
   - Mobile Chrome (DevTools mobile view)
   - Desktop browser
   - Actual mobile device

---

## Verification Checklist

- [ ] FFmpeg installed
- [ ] Mobile video created (720p, ~3MB)
- [ ] Desktop video created (1080p, ~12MB)
- [ ] Poster image in place
- [ ] Videos load correctly on mobile
- [ ] Videos load correctly on desktop
- [ ] Lazy loading working (check Network tab)
- [ ] Video pauses when scrolled away

---

## Current Implementation Status

✅ **Code Changes Complete:**
- `components/OptimizedVideo.tsx` - New responsive video component
- `app/page.tsx` - Updated to use OptimizedVideo component
- `components/BachoStory.tsx` - Fixed "50+" to "30+" years
- Poster image placeholder created

⚠️ **Action Required:**
- Compress videos using FFmpeg commands above
- Test on mobile device
- Verify file sizes are acceptable

---

## Performance Monitoring

After compression, monitor:

1. **Google PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Check mobile score

2. **Chrome DevTools Network Tab**
   - Check video load time
   - Verify correct video loads per device

3. **Real Device Testing**
   - Test on actual mobile device
   - Check data usage
   - Verify playback smoothness

---

## Questions?

Run these commands to check your videos:
```bash
# Check current file sizes
ls -lh public/*.mp4

# Get video info
ffmpeg -i public/bacho-video.mp4 2>&1 | grep -E "Duration|Stream|Video"
```
