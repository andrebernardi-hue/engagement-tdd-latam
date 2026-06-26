/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // Replace the defaults so stray values are impossible to use accidentally.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      plum: { DEFAULT: '#4B286D', deep: '#2A1640', ink: '#1C1426', mist: '#C9B6DB' },
      paper: { DEFAULT: '#F2F1EB', 2: '#EAE8DF', card: '#FBFAF6' },
      lime: { DEFAULT: '#7FBF2E', bright: '#8CD211', text: '#4C770F' },
      teal: { DEFAULT: '#1E9E72', 2: '#3FBE8A', text: '#147552', mist: '#BCD9CC' },
      red: { DEFAULT: '#C53A2B', soft: '#E08A7E' },
      amber: { DEFAULT: '#E4B53C' },
      muted: '#6A6275',
      white: '#FFFFFF',
    },
    fontFamily: {
      display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['"Space Mono"', 'monospace'],
    },
    // 8pt-based spacing scale (02-DESIGN-SYSTEM §4). Replaces defaults.
    spacing: {
      0: '0px',
      px: '1px',
      0.5: '4px',
      1: '8px',
      1.5: '12px',
      2: '16px',
      2.5: '18px',
      3: '24px',
      4: '30px',
      5: '38px',
      6: '46px',
      8: '64px',
      12: '92px',
    },
    extend: {
      borderColor: {
        line: 'rgba(28,20,38,.12)',
        strong: 'rgba(28,20,38,.22)',
      },
      boxShadow: {
        card: '0 1px 0 rgba(28,20,38,.04), 0 18px 40px -28px rgba(42,22,64,.45)',
      },
      borderRadius: {
        chip: '7px',
        card: '16px',
        pill: '999px',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(.2,.7,.2,1)',
        expoOut: 'cubic-bezier(.16,1,.3,1)',
      },
      transitionDuration: {
        quick: '200ms',
        base: '700ms',
        slow: '1000ms',
        count: '1400ms',
      },
      maxWidth: {
        // Reading/heading measure (prose blocks). Wider than before for the
        // larger projector type, but still a comfortable measure.
        content: '1320px',
        // The full slide frame: each scene fills this, so on a 1920 projector
        // the content uses ~90% of the width — a bold, poster-like slide.
        slide: '1760px',
      },
      height: {
        // TELUS Digital logo in the nav (2rem ≈ 35% larger than the prior 24px).
        logo: '2rem',
      },
      letterSpacing: {
        eyebrow: '0.18em',
        tight: '-0.01em',
        tighter: '-0.02em',
      },
      fontSize: {
        // Fluid, token-driven type scale (02-DESIGN-SYSTEM §3), tuned for
        // legibility when projected on a large screen during a talk: the small
        // labels and body are noticeably larger than a typical web baseline.
        hero: ['clamp(3rem, 8.6vw, 7rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        h2: ['clamp(2.2rem, 5.2vw, 3.6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h3: ['1.4rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        lead: ['clamp(1.25rem, 2.2vw, 1.6rem)', { lineHeight: '1.5' }],
        body: ['1.125rem', { lineHeight: '1.55' }],
        eyebrow: ['14px', { lineHeight: '1', letterSpacing: '0.18em' }],
        chapternum: ['15px', { lineHeight: '1' }],
        stat: ['clamp(2.2rem, 4.6vw, 3.1rem)', { lineHeight: '1.0' }],
        bigstat: ['clamp(3.8rem, 12vw, 6.2rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        monolabel: ['13px', { lineHeight: '1.35', letterSpacing: '0.05em' }],
        monovalue: ['15px', { lineHeight: '1.2' }],
        // Oversized poster index numeral (graphic element, bled off the corner).
        numeral: ['clamp(8rem, 19vw, 17rem)', { lineHeight: '0.8', letterSpacing: '-0.04em' }],
      },
      zIndex: {
        nav: '60',
        rail: '55',
        progress: '70',
      },
    },
  },
  plugins: [],
}
