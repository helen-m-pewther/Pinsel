import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import s from './Login.module.scss'

// ── Google icon ────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

// ── Field wrapper ──────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={s.field}>
      <label className={s.fieldLabel}>{label}</label>
      {children}
    </div>
  )
}

// ── Mini commission card (login hero) ──────────────────────────────────
interface MiniCardProps {
  title: string
  client?: string
  tag: string
  tagColor: string
  tagBg: string
  style?: React.CSSProperties
}

function MiniCard({ title, client, tag, tagColor, tagBg, style }: MiniCardProps) {
  return (
    <div className={s.miniCard} style={style}>
      <div className={s.miniCardTitle}>{title}</div>
      {client && <div className={s.miniCardClient}>{client}</div>}
      <span className={s.miniCardTag} style={{ color: tagColor, background: tagBg }}>{tag}</span>
    </div>
  )
}

// ── Hero panel ─────────────────────────────────────────────────────────
function HeroPanel({ isLogin }: { isLogin: boolean }) {
  const steps = [
    { n: '01', title: 'Create your studio', desc: 'Set up your Pinsel account in under a minute.' },
    { n: '02', title: 'Add your commissions', desc: 'Drop them onto the Kanban board — client, price, deadline.' },
    { n: '03', title: 'Pin your inspiration', desc: 'Drag images from anywhere onto your moodboard.' },
    { n: '04', title: 'Watch the sales log fill up', desc: 'Move a card to Done and log the sale in one step.' },
  ]

  return (
    <div className={s.heroPanel}>
      <div className={s.heroTexture} />
      <div className={s.bloomBottom} />
      <div className={s.bloomTop} />

      <div className={s.brandmark}>
        <span className={s.brandName}>Pinsel</span>
        <span className={s.brandSub}>artist studio</span>
      </div>

      <div className={s.heroCenter}>
        {isLogin ? (
          <div className={s.miniCards}>
            <MiniCard
              title="Portrait of Elara" client="Elara Kim"
              tag="High priority" tagColor="#B53A2A" tagBg="#FDECEA"
              style={{ transform: 'rotate(-2deg)', top: 0, left: 0 }}
            />
            <MiniCard
              title="Album Cover Art" client="Neon Veil Band"
              tag="In Progress" tagColor="#3A4A7A" tagBg="#EEF0F7"
              style={{ transform: 'rotate(1.5deg)', top: 130, left: 80, boxShadow: '0 12px 40px rgba(35,26,22,0.22)' }}
            />
            <MiniCard
              title="Wolf Illustration" client="Marcus D."
              tag="Review" tagColor="#A05A10" tagBg="#FEF3E2"
              style={{ transform: 'rotate(2.5deg)', top: 55, left: 225 }}
            />
            <div className={s.inspoCard} style={{ transform: 'rotate(-1.5deg)', top: 250, left: 20 }}>
              <div className={s.inspoImage}><span>inspo image</span></div>
              <div className={s.inspoLabel}>Earth tones ref</div>
            </div>
          </div>
        ) : (
          <div className={s.steps}>
            {steps.map((step, i) => (
              <div key={step.n} className={s.step}>
                <div className={`${s.stepNum} ${i === 0 ? s.stepNumActive : ''}`}>{step.n}</div>
                <div>
                  <div className={`${s.stepTitle} ${i === 0 ? s.stepTitleActive : ''}`}>{step.title}</div>
                  <div className={`${s.stepDesc} ${i === 0 ? s.stepDescActive : ''}`}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={s.heroBottom}>
        <blockquote className={s.heroQuote}>
          {isLogin
            ? '"Your commissions, your inspiration — one quiet place."'
            : '"Built for artists who’d rather be painting."'}
        </blockquote>
        <ul className={s.featureList}>
          {(isLogin
            ? ['Kanban board', 'Inspo pinboard', 'Sales log']
            : ['Free to start', 'No credit card', 'Cancel anytime']
          ).map(f => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </div>
  )
}

// ── Login form ─────────────────────────────────────────────────────────
type LoginMode = 'login' | 'forgot'

function LoginForm() {
  const [mode, setMode] = useState<LoginMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1200)
  }

  if (done) {
    return (
      <div className={s.successBanner}>
        <div className={s.successCheck}>✓</div>
        <div className={s.successTitle}>{mode === 'forgot' ? 'Check your inbox' : 'Signed in'}</div>
        <div className={s.successSub}>
          {mode === 'forgot' ? `A reset link is on its way to ${email}.` : 'Redirecting to your studio…'}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={s.formHeader}>
        <h1 className={s.formTitle}>{mode === 'login' ? 'Welcome back' : 'Reset password'}</h1>
        <p className={s.formSubtitle}>
          {mode === 'login' ? 'Sign in to your Pinsel studio.' : "We'll send you a reset link."}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <button type="button" className={s.oauthBtn}>
          <GoogleIcon />
          Continue with Google
        </button>

        <div className={s.divider}><span>or</span></div>

        <Field label="Email">
          <input
            className={s.input} type="email" value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@studio.com" autoFocus
          />
        </Field>

        {mode === 'login' && (
          <Field label="Password">
            <input
              className={s.input} type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </Field>
        )}

        {mode === 'login' && (
          <div className={s.forgotLink}>
            <button type="button" className={s.textBtn} onClick={() => setMode('forgot')}>
              Forgot password?
            </button>
          </div>
        )}

        <button type="submit" className={s.submitBtn} disabled={loading} data-loading={loading}>
          {loading ? '…' : mode === 'login' ? 'Sign in' : 'Send reset link'}
        </button>
      </form>

      <div className={s.switchMode}>
        {mode === 'login'
          ? <>No account? <Link to="/register" className={s.switchLink}>Sign up free</Link></>
          : <button type="button" className={s.switchLink} onClick={() => setMode('login')}>← Back to sign in</button>}
      </div>

      <div className={s.legal}>
        By continuing you agree to Pinsel's{' '}
        <span className={s.legalLink}>Terms</span> &amp; <span className={s.legalLink}>Privacy Policy</span>.
      </div>
    </>
  )
}

// ── Register form (3-step wizard) ──────────────────────────────────────
const ARTIST_TYPES = ['Illustrator', 'Painter', 'Character artist', 'Concept artist', 'Muralist', 'Tattoo artist', 'Graphic designer', 'Other']
const EXPERIENCES = ['Just starting', '1–3 yrs', '3–7 yrs', '7+ yrs']
const REFERRALS = ['Instagram', 'TikTok', 'Twitter / X', 'Friend or colleague', 'Reddit', 'Search engine', 'Other']

interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  username: string
  artistType: string
  experience: string
  referral: string
}

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null
  const len = password.length
  const label = len < 4 ? 'Too short' : len < 6 ? 'Weak' : len < 8 ? 'Fair' : 'Strong'
  const barColors = ['#C8633A', '#C8633A', '#A05A10', '#3A7A45']
  return (
    <div className={s.passwordStrength}>
      <div className={s.strengthBars}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={s.strengthBar} style={{ background: len >= i * 2 ? barColors[i - 1] : '#EDE4D8' }} />
        ))}
      </div>
      <span className={s.strengthLabel}>{label}</span>
    </div>
  )
}

function ProgressDots({ step }: { step: number }) {
  return (
    <div className={s.progressDots}>
      {[0, 1].map(i => (
        <div
          key={i}
          className={s.progressDot}
          style={{
            width: i === step ? 18 : 6,
            background: i === step ? '#C8633A' : i < step ? '#F5E8DF' : '#EDE4D8',
          }}
        />
      ))}
    </div>
  )
}

function RegisterForm() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<RegisterFormData>({
    firstName: '', lastName: '', email: '', password: '',
    username: '', artistType: '', experience: '', referral: '',
  })

  function set<K extends keyof RegisterFormData>(k: K, v: string) {
    setForm(p => ({ ...p, [k]: v }))
  }

  function handleNext(e: React.BaseSyntheticEvent) {
    e.preventDefault()
    if (step === 1) {
      setLoading(true)
      setTimeout(() => { setLoading(false); setStep(2) }, 1100)
    } else {
      setStep(s => s + 1)
    }
  }

  if (step === 2) {
    return (
      <div className={s.successState}>
        <div className={s.successEmoji}>🎨</div>
        <h1 className={s.formTitle}>
          {form.firstName ? `Welcome, ${form.firstName}!` : 'Your studio is ready.'}
        </h1>
        <p className={s.successBody}>
          Your Pinsel studio has been created. Start by adding your first commission or pinning some inspiration.
        </p>
        <div className={s.actionCards}>
          {[
            { icon: '⊞', label: 'Add your first commission', sub: 'Drop in a project from the Kanban board' },
            { icon: '⊟', label: 'Pin some inspiration', sub: 'Build a moodboard for your next piece' },
          ].map(item => (
            <div key={item.label} className={s.actionCard}>
              <div className={s.actionIcon}>{item.icon}</div>
              <div>
                <div className={s.actionLabel}>{item.label}</div>
                <div className={s.actionSub}>{item.sub}</div>
              </div>
              <span className={s.actionArrow}>→</span>
            </div>
          ))}
        </div>
        <Link to="/" className={s.goToStudioBtn}>Go to my studio →</Link>
        <div className={s.skipLink}>Or <span>skip and explore first</span></div>
      </div>
    )
  }

  return (
    <>
      <ProgressDots step={step} />

      {step === 0 && (
        <>
          <div className={s.formHeader}>
            <h1 className={s.formTitle}>Create your studio</h1>
            <p className={s.formSubtitle}>Start with the basics — your account details.</p>
          </div>

          <button type="button" className={s.oauthBtn}>
            <GoogleIcon />
            Continue with Google
          </button>

          <div className={s.divider}><span>or</span></div>

          <form onSubmit={handleNext}>
            <div className={s.nameRow}>
              <Field label="First name">
                <input className={s.input} value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Maya" autoFocus />
              </Field>
              <Field label="Last name">
                <input className={s.input} value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Ostrovsky" />
              </Field>
            </div>
            <Field label="Email">
              <input className={s.input} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@studio.com" />
            </Field>
            <Field label="Password">
              <input className={s.input} type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="At least 8 characters" />
            </Field>
            <PasswordStrength password={form.password} />
            <button type="submit" className={s.submitBtn}>Continue →</button>
          </form>

          <div className={s.switchMode}>
            Already have an account? <Link to="/login" className={s.switchLink}>Sign in</Link>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <div className={s.formHeader}>
            <h1 className={s.formTitle}>Tell us about your practice</h1>
            <p className={s.formSubtitle}>Helps us tailor Pinsel to how you work.</p>
          </div>

          <form onSubmit={handleNext}>
            <Field label="Studio username">
              <div className={s.usernameInput}>
                <span className={s.usernameAt}>@</span>
                <input
                  className={`${s.input} ${s.inputWithAt}`}
                  value={form.username}
                  onChange={e => set('username', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  placeholder="mayaostro"
                  autoFocus
                />
              </div>
              <div className={s.usernamePreview}>pinsel.app/@{form.username || 'yourstudio'}</div>
            </Field>

            <Field label="I'm primarily a…">
              <div className={s.pills}>
                {ARTIST_TYPES.map(type => (
                  <button
                    key={type} type="button"
                    className={`${s.pill} ${form.artistType === type ? s.pillSelected : ''}`}
                    onClick={() => set('artistType', type)}
                  >{type}</button>
                ))}
              </div>
            </Field>

            <Field label="Years of experience">
              <div className={s.expGrid}>
                {EXPERIENCES.map(exp => (
                  <button
                    key={exp} type="button"
                    className={`${s.expBtn} ${form.experience === exp ? s.expBtnSelected : ''}`}
                    onClick={() => set('experience', exp)}
                  >{exp}</button>
                ))}
              </div>
            </Field>

            <Field label="How did you hear about Pinsel?">
              <select className={s.select} value={form.referral} onChange={e => set('referral', e.target.value)}>
                <option value="">Select one…</option>
                {REFERRALS.map(r => <option key={r}>{r}</option>)}
              </select>
            </Field>

            <div className={s.stepActions}>
              <button type="button" className={s.backBtn} onClick={() => setStep(0)}>←</button>
              <button type="submit" className={`${s.submitBtn} ${s.submitBtnFlex}`} disabled={loading} data-loading={loading}>
                {loading ? '…' : 'Create my studio'}
              </button>
            </div>

            <p className={s.legalStep}>
              All fields optional — you can update this in your account settings.<br />
              By signing up you agree to Pinsel's{' '}
              <span className={s.legalLink}>Terms</span> &amp; <span className={s.legalLink}>Privacy Policy</span>.
            </p>
          </form>
        </>
      )}
    </>
  )
}

// ── Auth layout ────────────────────────────────────────────────────────
function AuthLayout() {
  const { pathname } = useLocation()
  const isLogin = pathname === '/login'

  return (
    <div className={s.authSplit}>
      <HeroPanel isLogin={isLogin} />
      <div className={s.formPanel}>
        <div className={s.formInner}>
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
