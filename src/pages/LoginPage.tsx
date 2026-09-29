import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../context/InvestigationContext';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
.su *{box-sizing:border-box;margin:0}
.su{min-height:100vh;background:#111;display:flex;align-items:center;justify-content:center;padding:24px;font-family:'Manrope',system-ui,sans-serif;color:#f2f2f2}
.su-wrap{display:grid;grid-template-columns:405px 1fr;gap:12px;width:100%;max-width:980px;height:605px}
.su-card{background:#161616;border:1px solid #232323;border-radius:16px;display:flex;flex-direction:column;align-items:center;padding:40px 65px 0;position:relative}
.su-logo{width:25px;height:25px;margin-bottom:36px;color:#e8e8e8}
.su-badge{font:400 9px 'JetBrains Mono',monospace;background:#262626;color:#bdbdbd;padding:8px 12px;border-radius:9px;margin-bottom:12px;letter-spacing:0.2px}
.su h1{font-size:25px;font-weight:500;letter-spacing:-.4px;margin-bottom:9px;white-space:nowrap}
.su-sub{font-size:9.5px;color:#8a8a8a;margin-bottom:28px;white-space:nowrap}
.su-field{position:relative;width:245px;height:42px;margin-bottom:8px}
.su-field input{width:100%;height:100%;background:#191919;border:1px solid #2c2c2c;border-radius:12px;padding:0 38px 0 13px;font:400 10px 'Manrope',sans-serif;color:#f2f2f2;outline:none;transition:border-color .15s}
.su-field input::placeholder{color:#8a8a8a}
.su-field input:focus-visible{border-color:#7a7a7a}
.su-field input:disabled{opacity:0.6;cursor:not-allowed}
.su-eye{position:absolute;right:11px;top:50%;transform:translateY(-50%);background:none;border:0;color:#8a8a8a;cursor:pointer;display:grid;place-items:center;padding:2px}
.su-options{display:flex;align-items:center;justify-content:space-between;width:245px;margin-top:6px;font:400 9px 'JetBrains Mono',monospace;color:#8a8a8a}
.su-remember{display:flex;align-items:center;gap:6px;cursor:pointer;user-select:none}
.su-remember input{accent-color:#e9e9e9;width:12px;height:12px;cursor:pointer}
.su-forgot{background:none;border:0;color:#8a8a8a;font:inherit;cursor:pointer;padding:0;transition:color .15s}
.su-forgot:hover{color:#f2f2f2;text-decoration:underline}
.su-error{width:245px;margin-bottom:10px;padding:7px 10px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.3);border-radius:8px;font:400 9px 'JetBrains Mono',monospace;color:#f87171;text-align:center}
.su-submit{width:245px;height:42px;margin-top:26px;border:0;border-radius:12px;background:#e9e9e9;color:#111;font:500 10.5px 'Manrope',sans-serif;display:flex;align-items:center;justify-content:center;gap:7px;cursor:pointer;transition:background .15s;position:relative}
.su-submit:hover:not(:disabled){background:#fff}
.su-submit:disabled{opacity:0.7;cursor:not-allowed}
.su-login{margin-top:16px;display:flex;align-items:center;gap:7px;font:400 9px 'JetBrains Mono',monospace;color:#6f6f6f}
.su-login button{background:#1c1c1c;border:1px solid #2c2c2c;color:#e0e0e0;border-radius:6px;padding:5px 8px;font:400 9px 'Manrope',sans-serif;cursor:pointer;transition:all .15s}
.su-login button:hover{background:#2a2a2a;border-color:#3a3a3a}
.su-grid{display:grid;grid-template-columns:80px 1fr 1fr 80px;grid-template-rows:100px 190px 190px 1fr;gap:7px}
.su-t{border-radius:16px;overflow:hidden;position:relative}
.su-img{background:
 radial-gradient(ellipse 60% 45% at 30% 25%,#a6b52a 0 35%,transparent 70%),
 radial-gradient(ellipse 50% 60% at 75% 60%,#7f8f22 0 30%,transparent 70%),
 linear-gradient(160deg,#c9cdb8,#dfe1d2 60%,#b9bea6)}
.su-img.b{background:
 radial-gradient(ellipse 55% 55% at 45% 30%,#93a325 0 35%,transparent 72%),
 radial-gradient(ellipse 45% 30% at 55% 88%,#3f4436 0 50%,transparent 75%),
 linear-gradient(180deg,#d6d9c6,#c4c8b0)}
.su-img.c{background:
 radial-gradient(ellipse 45% 65% at 80% 40%,#8a9a24 0 35%,transparent 72%),
 linear-gradient(200deg,#dfe2d3,#d0d4c0)}
.su-img.d{background:linear-gradient(150deg,#b9c0a4,#8e9678 60%,#a9b08f)}
.su-img.e{background:radial-gradient(ellipse 60% 50% at 40% 40%,#e5e7db 0 40%,transparent 75%),linear-gradient(180deg,#a5ab92,#7c8468)}
.su-dark{background:#151515;display:flex;flex-direction:column;justify-content:flex-end;padding:16px 15px 20px}
.su-chips{position:absolute;top:0;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:8px}
.su-chip{font:400 8px 'JetBrains Mono',monospace;background:#b4b4b0;color:#222;border-radius:12px;padding:8px 12px;display:flex;align-items:center;gap:6px;width:min-content;white-space:nowrap}
.su-chip.m{width:97px;height:26px;opacity:.75;transform:translateY(-12px)}
.su-chip.n{width:98px;height:26px;font-size:8.5px;background:#a8a8a4}
.su-chip.a{width:120px;height:31px;background:#f3f3f0;color:#111;font-size:9px}
.su-spin{width:9px;height:9px;border:1.5px solid #999;border-top-color:#111;border-radius:50%;animation:sp 1s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){.su-spin{animation:none}}
.su-dark h3{font-size:14px;font-weight:500;margin-bottom:6px}
.su-dark p{font-size:8.5px;color:#b0b0b0}
.su-yellow{background:#ecff3d;color:#111;padding:20px 16px}
.su-yellow h3{font-size:15px;font-weight:500;line-height:1.2;margin-bottom:8px;letter-spacing:-.2px}
.su-yellow p{font-size:8.5px;line-height:1.35;max-width:135px}
.su-shape{position:absolute;right:16px;bottom:14px;width:32px;height:32px}
.su-green{background:#14f58c;display:grid;place-items:center}
.su-black{background:#050505}
@media (max-width:820px){.su-wrap{grid-template-columns:1fr;height:auto}.su-grid{display:none}.su-card{padding:36px 24px 36px}}
`;

const Logo = () => (
  <svg className="su-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3c1.2 0 2 .6 2.6 1.6l6 10.2c.7 1.2.1 3.2-1.9 3.2H5.3c-2 0-2.6-2-1.9-3.2l6-10.2C10 3.6 10.8 3 12 3Z" />
    <path d="M8.5 15.5c1-1 2-1.4 3.5-1.4s2.5.4 3.5 1.4" />
  </svg>
);

const Eye = ({ off }: { off?: boolean }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.500 6-10 6S2 12 2 12Z" />
    <circle cx="12" cy="12" r="2.800" />
    {off && <path d="M4 4l16 16" />}
  </svg>
);

const Check = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12l5 5L20 6" />
  </svg>
);

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, setFilterInstitution } = useInvestigation();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    username: 'investigator',
    email: 'investigator@organization.com',
    password: 'password123',
  });

  const setField = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleAuth = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const emailValue = form.email.trim();
    if (!emailValue) {
      setErrorMessage('Please enter your email address');
      return;
    }
    if (!form.password) {
      setErrorMessage('Please enter your password');
      return;
    }

    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      const emailLower = emailValue.toLowerCase();

      let institution = 'HDFC Bank';
      if (emailLower.includes('icici')) institution = 'ICICI Bank';
      else if (emailLower.includes('sbi')) institution = 'State Bank of India (SBI)';
      else if (emailLower.includes('axis')) institution = 'Axis Bank';

      let role: 'Investigator' | 'AML / Compliance Officer' | 'Fraud Analyst' | 'Risk Analyst' | 'Auditor' | 'Administrator' = 'Investigator';
      if (emailLower.includes('compliance') || emailLower.includes('aml')) role = 'AML / Compliance Officer';
      else if (emailLower.includes('fraud')) role = 'Fraud Analyst';
      else if (emailLower.includes('admin')) role = 'Administrator';

      login(emailValue, institution, role);
      setFilterInstitution(institution);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="su">
      <style>{css}</style>
      <div className="su-wrap">
        <section className="su-card">
          <Logo />
          
          <span className="su-badge">
            {mode === 'login' ? 'Welcome back, Investigator' : 'Create Investigator Account'}
          </span>

          <h1>{mode === 'login' ? 'Sign in account' : 'Sign up account'}</h1>

          <p className="su-sub">
            {mode === 'login'
              ? 'Enter your credentials to access your account'
              : 'Enter your personal data to create your account'}
          </p>

          {errorMessage && <div className="su-error">{errorMessage}</div>}

          <form onSubmit={handleAuth} style={{ display: 'contents' }}>
            {mode === 'signup' && (
              <div className="su-field">
                <input
                  type="text"
                  placeholder="Username"
                  value={form.username}
                  onChange={setField('username')}
                  autoComplete="username"
                  disabled={isLoading}
                  required
                />
              </div>
            )}

            <div className="su-field">
              <input
                type="email"
                placeholder={mode === 'login' ? 'Email or username' : 'Email address'}
                value={form.email}
                onChange={setField('email')}
                autoComplete="email"
                disabled={isLoading}
                required
              />
            </div>

            <div className="su-field">
              <input
                type={show ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={setField('password')}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                className="su-eye"
                onClick={() => setShow(!show)}
                aria-label={show ? 'Hide password' : 'Show password'}
              >
                <Eye off={!show} />
              </button>
            </div>

            {mode === 'login' && (
              <div className="su-options">
                <label className="su-remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  remember me
                </label>
                <button
                  type="button"
                  className="su-forgot"
                  onClick={() => alert('Password recovery link dispatched to your registered address.')}
                >
                  forgot password?
                </button>
              </div>
            )}

            <button type="submit" className="su-submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="su-spin" style={{ width: 11, height: 11 }} />
                  {mode === 'login' ? 'Signing in...' : 'Creating...'}
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Sign in' : 'Sign up'}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12h16M14 6l6 6-6 6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="su-login">
            {mode === 'login' ? (
              <>
                Don't have an account?
                <button type="button" onClick={() => { setMode('signup'); setErrorMessage(null); }}>
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?
                <button type="button" onClick={() => { setMode('login'); setErrorMessage(null); }}>
                  Log in
                </button>
              </>
            )}
          </div>
        </section>

        <section className="su-grid" aria-hidden="true">
          <div className="su-t su-img" />
          <div className="su-t su-img b" />
          <div className="su-t su-img c" />
          <div className="su-t su-img d" />

          <div className="su-t su-img e" />
          <div className="su-t su-img b" />
          <div className="su-t su-img c" />
          <div className="su-t su-img d" />

          <div className="su-t su-img d" />
          <div className="su-t su-dark">
            <div className="su-chips">
              <div className="su-chip m">
                <Check />
                {mode === 'login' ? 'verify_session' : 'choose_template'}
              </div>
              <div className="su-chip n">
                <Check />
                {mode === 'login' ? 'decrypt_vault' : 'setup_scene'}
              </div>
              <div className="su-chip a">
                <span className="su-spin" />
                {mode === 'login' ? 'sync_workspace..' : 'generate_3d_object..'}
              </div>
            </div>
            <h3>{mode === 'login' ? 'Instant Access' : 'Fast Generation'}</h3>
            <p>
              {mode === 'login'
                ? 'Resume your workspace and projects in seconds'
                : 'Create unique 3D objects in seconds'}
            </p>
          </div>

          <div className="su-t su-yellow">
            <h3>
              {mode === 'login' ? 'Cloud' : 'Maximum'}
              <br />
              {mode === 'login' ? 'Continuity' : 'Customization'}
            </h3>
            <p>
              {mode === 'login'
                ? 'Pick up right where you left off across all connected devices'
                : 'Tailor every aspect of your 3D object to your specifications'}
            </p>
            <svg className="su-shape" viewBox="0 0 32 32" fill="#111">
              <circle cx="11" cy="11" r="9" />
              <path d="M14 16h13a3 3 0 0 1 3 3v9H17a3 3 0 0 1-3-3v-9Z" />
            </svg>
          </div>

          <div className="su-t su-green">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#111"
              strokeWidth="2"
              strokeLinejoin="round"
              style={{ transform: 'translateX(18px)' }}
            >
              <path d="M12 3c1.200 0 2 .6 2.600 1.600l6 10.200c.7 1.200.1 3.200-1.900 3.200H5.300c-2 0-2.600-2-1.900-3.200l6-10.200C10 3.600 10.800 3 12 3Z" />
            </svg>
          </div>

          <div className="su-t su-img e" />
          <div className="su-t su-black" />
          <div className="su-t su-img e" />
          <div className="su-t su-img d" />
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
