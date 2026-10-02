import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Building2, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  BadgeCheck, 
  Share2,
  Check,
  Key,
  ShieldCheck,
  Server,
  Zap,
  Globe
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';

export type AuthView = 'sign-in' | 'request-access' | 'admin-approval' | 'forgot-password' | 'verify' | 'sso-flow';

interface LoginPageProps {
  initialView?: AuthView;
}

export const LoginPage: React.FC<LoginPageProps> = ({ initialView }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, setFilterInstitution } = useInvestigation();

  // Determine current view from prop, URL pathname, or state
  const getViewFromPath = (): AuthView => {
    if (initialView) return initialView;
    const path = location.pathname;
    if (path.includes('request-access')) return 'request-access';
    if (path.includes('pending-approval') || path.includes('admin-approval')) return 'admin-approval';
    if (path.includes('forgot-password')) return 'forgot-password';
    if (path.includes('verify')) return 'verify';
    if (path.includes('sso')) return 'sso-flow';
    return 'sign-in';
  };

  const [view, setView] = useState<AuthView>(getViewFromPath);

  useEffect(() => {
    setView(getViewFromPath());
  }, [location.pathname, initialView]);

  // Sign In State
  const [signInEmail, setSignInEmail] = useState('rahul.kumar@sbi.co.in');
  const [signInPassword, setSignInPassword] = useState('FinGrixSecure#2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [signInLoading, setSignInLoading] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  // Request Access State
  const [reqFullName, setReqFullName] = useState('Rahul Kumar');
  const [reqEmail, setReqEmail] = useState('rahul.kumar@sbi.co.in');
  const [reqOrg, setReqOrg] = useState('State Bank of India (SBI)');
  const [reqDept, setReqDept] = useState('Financial Crime / AML');
  const [reqJobRole, setReqJobRole] = useState('AML Investigator');
  const [reqStaffId, setReqStaffId] = useState('EMP-10482');
  const [reqReason, setReqReason] = useState('Multi-bank cross-clearing financial investigation & forensic topology analysis');
  const [reqSubmitting, setReqSubmitting] = useState(false);

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  // MFA Verification State
  const [mfaDigits, setMfaDigits] = useState(['', '', '', '', '', '']);
  const [mfaLoading, setMfaLoading] = useState(false);
  const [mfaError, setMfaError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const digitInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // SSO Flow State
  const [ssoDomain, setSsoDomain] = useState('sbi.co.in');
  const [selectedProvider, setSelectedProvider] = useState<'entra' | 'google' | 'okta' | null>(null);
  const [ssoStep, setSsoStep] = useState<number>(0); 
  // 0: Select Provider
  // 1: Organization Login
  // 2: Microsoft Entra ID / Google Workspace / Okta Verification
  // 3: Identity Verified
  // 4: BYT01 checks user's role & permissions
  // 5: Directing to Investigator Dashboard

  // Institutions & Roles for Request Access
  const institutions = [
    'State Bank of India (SBI)',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Financial Intelligence Unit (FIU)',
    'Punjab National Bank (PNB)',
    'Standard Chartered'
  ];

  const jobRoles = [
    'AML Investigator',
    'Senior Forensic Analyst',
    'Compliance Officer',
    'Fraud Prevention Specialist',
    'Risk & Surveillance Manager',
    'Regulatory Audit Director'
  ];


  const navigateToView = (nextView: AuthView) => {
    setView(nextView);
    setSignInError(null);
    setMfaError(null);
    if (nextView === 'sso-flow') {
      setSsoStep(0);
      setSelectedProvider(null);
    }
  };

  // Sign In Submit -> goes to MFA verification
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError(null);

    if (!signInEmail.trim()) {
      setSignInError('Please enter your registered institutional work email.');
      return;
    }
    if (!signInPassword) {
      setSignInError('Please enter your account password.');
      return;
    }

    setSignInLoading(true);

    setTimeout(() => {
      setSignInLoading(false);
      navigateToView('verify');
    }, 550);
  };

  // Start SSO Flow
  const handleStartSSO = () => {
    navigateToView('sso-flow');
  };

  // Execute SSO Pipeline Step by Step
  const handleSelectProviderAndLaunch = (provider: 'entra' | 'google' | 'okta') => {
    setSelectedProvider(provider);
    setSsoStep(1); // Step 1: Organization Login

    // Step 2: Microsoft Entra ID / Google / Okta handshake (after 700ms)
    setTimeout(() => {
      setSsoStep(2);

      // Step 3: Identity verified (after 1400ms)
      setTimeout(() => {
        setSsoStep(3);

        // Step 4: BYT01 checks user's role & permissions (after 2100ms)
        setTimeout(() => {
          setSsoStep(4);

          // Step 5: Dashboard redirect (after 2900ms)
          setTimeout(() => {
            setSsoStep(5);
            setTimeout(() => {
              login(
                `rahul.kumar@${ssoDomain || 'sbi.co.in'}`,
                ssoDomain.includes('hdfc') ? 'HDFC Bank' : ssoDomain.includes('icici') ? 'ICICI Bank' : 'State Bank of India (SBI)',
                'AML Investigator'
              );
              setFilterInstitution(ssoDomain.includes('hdfc') ? 'HDFC Bank' : ssoDomain.includes('icici') ? 'ICICI Bank' : 'State Bank of India');
              navigate('/dashboard');
            }, 600);
          }, 800);
        }, 800);
      }, 700);
    }, 700);
  };

  // Request Access Submit -> transitions to Admin Approval Workflow
  const handleRequestAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReqSubmitting(true);

    setTimeout(() => {
      setReqSubmitting(false);
      navigateToView('admin-approval');
    }, 700);
  };

  // Forgot Password Submit
  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;

    setForgotLoading(true);
    setTimeout(() => {
      setForgotLoading(false);
      setForgotSent(true);
    }, 600);
  };

  // MFA Digits input handlers
  const handleDigitChange = (index: number, val: string) => {
    const clean = val.replace(/\D/g, '');
    if (!clean && val === '') {
      const next = [...mfaDigits];
      next[index] = '';
      setMfaDigits(next);
      return;
    }

    const chars = clean.split('');
    const next = [...mfaDigits];
    
    for (let i = 0; i < chars.length && index + i < 6; i++) {
      next[index + i] = chars[i];
    }
    setMfaDigits(next);

    const nextIndex = Math.min(5, index + chars.length);
    digitInputRefs.current[nextIndex]?.focus();
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !mfaDigits[index] && index > 0) {
      digitInputRefs.current[index - 1]?.focus();
    }
  };

  // MFA Verification Submit -> completes login and goes to Dashboard
  const handleMfaVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = mfaDigits.join('');
    if (code.length < 6) {
      setMfaError('Please enter the complete 6-digit authentication code.');
      return;
    }

    setMfaLoading(true);
    setMfaError(null);

    setTimeout(() => {
      setMfaLoading(false);
      login(signInEmail || 'rahul.kumar@sbi.co.in', reqOrg || 'State Bank of India (SBI)', reqJobRole || 'AML Investigator');
      setFilterInstitution('State Bank of India');
      navigate('/dashboard');
    }, 650);
  };

  // Resend code countdown
  const handleResendCode = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(30);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Instant Demo Approval in Admin Approval view
  const handleDemoActivateAndSignIn = () => {
    login(reqEmail || 'rahul.kumar@sbi.co.in', reqOrg || 'State Bank of India (SBI)', reqJobRole || 'AML Investigator');
    setFilterInstitution('State Bank of India');
    navigate('/dashboard');
  };

  const getProviderName = (p: 'entra' | 'google' | 'okta' | null) => {
    if (p === 'entra') return 'Microsoft Entra ID';
    if (p === 'google') return 'Google Workspace Enterprise';
    if (p === 'okta') return 'Okta Identity Cloud';
    return 'Identity Provider';
  };

  return (
    <div className="min-h-screen w-full bg-[#0C1019] text-[#F8FAFC] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative select-none font-sans">
      {/* Subtle Neumorphic Background Canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Main Neumorphic Card Container */}
      <div className="w-full max-w-[560px] relative z-10">
        <div className="neu-card p-6 sm:p-8 relative border border-white/[0.08] shadow-[12px_12px_32px_rgba(0,0,0,0.8),-8px_-8px_24px_rgba(255,255,255,0.035)]">
          
          {/* TOP BANNER: LOGO | FORENSIC INTELLIGENCE PLATFORM | SECURE ACCESS */}
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl neu-raised flex items-center justify-center text-blue-400 border border-white/10 shadow-[4px_4px_10px_rgba(0,0,0,0.6),-2px_-2px_6px_rgba(255,255,255,0.04)]">
                <Share2 className="w-5 h-5 transform -rotate-12" />
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-wider text-white block">
                  FINGRIX
                </span>
                <p className="text-[10px] text-slate-400 font-mono tracking-tight uppercase">
                  Forensic Intelligence Platform
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full neu-inset-sm text-[11px] text-slate-300 font-mono">
              <Lock className="w-3 h-3 text-blue-400" />
              <span>Secure Access</span>
            </div>
          </div>

          {/* =========================================================================
              VIEW 1: SIGN IN
             ========================================================================= */}
          {view === 'sign-in' && (
            <div className="space-y-5">
              {/* Headline */}
              <div className="text-center space-y-1">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Welcome back
                </h1>
                <p className="text-xs text-slate-400">
                  Sign in to your workspace
                </p>
              </div>

              {/* Error Message */}
              {signInError && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.6)]">
                  {signInError}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                {/* Work Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Work Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="name@institution.com"
                      className="neu-input w-full px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 font-mono"
                      disabled={signInLoading}
                      required
                    />
                  </div>
                </div>

                {/* Password with Forgot? link */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => navigateToView('forgot-password')}
                      className="text-xs text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="••••••••••••••••"
                      className="neu-input w-full pl-3.5 pr-10 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 font-mono"
                      disabled={signInLoading}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember device checkbox */}
                <div className="flex items-center pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 hover:text-slate-200">
                    <input
                      type="checkbox"
                      checked={rememberDevice}
                      onChange={(e) => setRememberDevice(e.target.checked)}
                      className="w-4 h-4 rounded bg-[#101521] border border-white/20 accent-blue-500 cursor-pointer"
                    />
                    <span>Remember this device</span>
                  </label>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={signInLoading}
                  className="neu-btn-primary w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer shadow-[6px_6px_16px_rgba(0,0,0,0.65),-3px_-3px_8px_rgba(255,255,255,0.06),0_0_18px_rgba(37,99,235,0.4)]"
                >
                  {signInLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying Credentials...</span>
                    </div>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </form>

              {/* OR Divider */}
              <div className="relative py-1 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/[0.06]" />
                </div>
                <span className="relative px-3 bg-[#141A28] text-[10px] font-mono uppercase text-slate-500">
                  OR
                </span>
              </div>

              {/* Organization SSO Button -> triggers SSO pipeline view */}
              <button
                type="button"
                onClick={handleStartSSO}
                className="neu-btn w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>Continue with Organization SSO</span>
              </button>

              {/* Request Access Link */}
              <div className="text-center text-xs text-slate-400 pt-1">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigateToView('request-access')}
                  className="text-blue-400 hover:text-blue-300 font-semibold hover:underline cursor-pointer"
                >
                  Request Access
                </button>
              </div>


              {/* Footer Note */}
              <div className="text-center pt-2 text-[11px] text-slate-500 flex items-center justify-center gap-1.5 font-mono">
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Authorized personnel only</span>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW: ORGANIZATION SSO FLOW (As requested by user)
              User -> Continue with Organization SSO -> Organization Login
              -> Microsoft Entra ID / Google Workspace / Okta -> Identity verified
              -> BYT01 checks user's role & permissions -> Investigator Dashboard
             ========================================================================= */}
          {view === 'sso-flow' && (
            <div className="space-y-5">
              {/* Stage 0: Organization Login Selection */}
              {ssoStep === 0 && (
                <div className="space-y-4">
                  <div className="text-center space-y-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Organization Login
                    </h1>
                    <p className="text-xs text-slate-400">
                      Sign in with your enterprise Identity Provider (IdP)
                    </p>
                  </div>

                  {/* Institution Domain Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Organization Domain
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={ssoDomain}
                        onChange={(e) => setSsoDomain(e.target.value)}
                        placeholder="sbi.co.in or institution.com"
                        className="neu-input flex-1 px-3.5 py-2 rounded-xl text-xs text-white placeholder-slate-500 font-mono"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-400 font-mono">
                      <span>Quick presets:</span>
                      <button 
                        type="button" 
                        onClick={() => setSsoDomain('sbi.co.in')}
                        className="px-2 py-0.5 rounded neu-btn hover:text-white"
                      >
                        sbi.co.in
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setSsoDomain('hdfcbank.com')}
                        className="px-2 py-0.5 rounded neu-btn hover:text-white"
                      >
                        hdfcbank.com
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setSsoDomain('icicibank.com')}
                        className="px-2 py-0.5 rounded neu-btn hover:text-white"
                      >
                        icicibank.com
                      </button>
                    </div>
                  </div>

                  {/* IdP Providers Buttons */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block">
                      Select Identity Provider
                    </span>

                    {/* Microsoft Entra ID */}
                    <button
                      type="button"
                      onClick={() => handleSelectProviderAndLaunch('entra')}
                      className="neu-btn w-full p-3 rounded-xl flex items-center justify-between transition cursor-pointer hover:border-blue-500/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg neu-inset-sm flex items-center justify-center text-blue-400 font-bold text-sm">
                          ⊞
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-bold text-white">Microsoft Entra ID</div>
                          <div className="text-[10px] text-slate-400">Azure Active Directory • SAML 2.0 / OIDC</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </button>

                    {/* Google Workspace */}
                    <button
                      type="button"
                      onClick={() => handleSelectProviderAndLaunch('google')}
                      className="neu-btn w-full p-3 rounded-xl flex items-center justify-between transition cursor-pointer hover:border-red-500/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg neu-inset-sm flex items-center justify-center text-red-400 font-bold text-sm">
                          G
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-bold text-white">Google Workspace</div>
                          <div className="text-[10px] text-slate-400">Google Cloud Identity Enterprise • Single Sign-On</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </button>

                    {/* Okta */}
                    <button
                      type="button"
                      onClick={() => handleSelectProviderAndLaunch('okta')}
                      className="neu-btn w-full p-3 rounded-xl flex items-center justify-between transition cursor-pointer hover:border-cyan-500/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg neu-inset-sm flex items-center justify-center text-cyan-400 font-bold text-sm">
                          ◎
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-bold text-white">Okta Identity Cloud</div>
                          <div className="text-[10px] text-slate-400">FedRAMP & FIDC Certified Security Gateway</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </button>
                  </div>

                  <div className="text-center pt-3">
                    <button
                      type="button"
                      onClick={() => navigateToView('sign-in')}
                      className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back to Credentials Sign In
                    </button>
                  </div>
                </div>
              )}

              {/* Stage 1 to 5: Live Pipeline Simulation */}
              {ssoStep >= 1 && (
                <div className="space-y-5">
                  <div className="text-center space-y-1">
                    <div className="w-12 h-12 rounded-2xl neu-raised mx-auto flex items-center justify-center text-blue-400 mb-2 border border-blue-500/30">
                      <ShieldCheck className="w-6 h-6 animate-pulse" />
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Federated Authentication Pipeline
                    </h1>
                    <p className="text-xs text-slate-400 font-mono">
                      Institutional SSO Handshake with {getProviderName(selectedProvider)}
                    </p>
                  </div>

                  {/* Workflow steps visual progression */}
                  <div className="space-y-2.5 text-xs">
                    
                    {/* Step 1: Organization Login */}
                    <div className={`p-3 rounded-xl transition-all flex items-center gap-3 ${
                      ssoStep >= 1 
                        ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300' 
                        : 'neu-inset-sm text-slate-400'
                    }`}>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">1. Organization Login</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Target Domain: <strong className="text-slate-200">@{ssoDomain}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Microsoft Entra ID / Google / Okta Verification */}
                    <div className={`p-3 rounded-xl transition-all flex items-center gap-3 ${
                      ssoStep >= 2
                        ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300'
                        : 'neu-inset-sm text-slate-400'
                    }`}>
                      {ssoStep >= 2 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 animate-spin" />
                      )}
                      <div>
                        <div className="font-semibold text-white">2. {getProviderName(selectedProvider)}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {ssoStep >= 2 ? 'SAML 2.0 Mutual TLS Handshake: Complete' : 'Negotiating Security Assertion...'}
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Identity Verified */}
                    <div className={`p-3 rounded-xl transition-all flex items-center gap-3 ${
                      ssoStep >= 3
                        ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300'
                        : 'neu-inset-sm text-slate-500'
                    }`}>
                      {ssoStep >= 3 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-mono">3</span>
                      )}
                      <div>
                        <div className="font-semibold text-white">3. Identity Verified</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {ssoStep >= 3 ? `Principal: rahul.kumar@${ssoDomain} (Token valid)` : 'Awaiting cryptographic signature...'}
                        </div>
                      </div>
                    </div>

                    {/* Step 4: BYT01 checks user's role & permissions */}
                    <div className={`p-3 rounded-xl transition-all flex items-center gap-3 ${
                      ssoStep >= 4
                        ? 'bg-blue-950/40 border border-blue-500/40 text-blue-300'
                        : 'neu-inset-sm text-slate-500'
                    }`}>
                      {ssoStep >= 4 ? (
                        <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-mono">4</span>
                      )}
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>4. BYT01 Checks User's Role & Permissions</span>
                          {ssoStep === 4 && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {ssoStep >= 4 ? (
                            <span className="text-blue-300">
                              ✓ Role: <strong className="text-white">Lead AML Forensic Investigator</strong> • Clearances: PMLA Tier-IV Multi-Bank
                            </span>
                          ) : (
                            'Evaluating ABAC / RBAC institutional permission matrix...'
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Step 5: Investigator Dashboard */}
                    <div className={`p-3 rounded-xl transition-all flex items-center gap-3 ${
                      ssoStep >= 5
                        ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                        : 'neu-inset-sm text-slate-500'
                    }`}>
                      {ssoStep >= 5 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-mono">5</span>
                      )}
                      <div>
                        <div className="font-semibold text-white">5. Investigator Dashboard</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {ssoStep >= 5 ? 'Granting active session token & loading graph canvas...' : 'Awaiting clearance...'}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Progress Status Bar */}
                  <div className="neu-inset-sm p-3 rounded-xl text-center">
                    <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-300">
                      <div className="w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                      <span>
                        {ssoStep < 4 ? 'Processing Single Sign-On Security Exchange...' : ssoStep === 4 ? 'Policy Clearance Verified • Launching Workspace...' : 'Entering Workspace...'}
                      </span>
                    </div>
                  </div>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setSsoStep(0)}
                      className="text-xs text-slate-500 hover:text-slate-300 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      Cancel and choose different IdP
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              VIEW 2: SIGN UP / REQUEST ACCESS
             ========================================================================= */}
          {view === 'request-access' && (
            <div className="space-y-4">
              {/* Headline */}
              <div className="text-center space-y-1">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Request Access
                </h1>
                <p className="text-xs text-slate-400">
                  Create an organization access request
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleRequestAccessSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={reqFullName}
                    onChange={(e) => setReqFullName(e.target.value)}
                    placeholder="Rahul Kumar"
                    className="neu-input w-full px-3.5 py-2 rounded-xl text-xs text-white placeholder-slate-500"
                    required
                  />
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    value={reqEmail}
                    onChange={(e) => setReqEmail(e.target.value)}
                    placeholder="rahul@institution.com"
                    className="neu-input w-full px-3.5 py-2 rounded-xl text-xs text-white placeholder-slate-500 font-mono"
                    required
                  />
                </div>

                {/* Organization / Institution */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Organization / Institution
                  </label>
                  <select
                    value={reqOrg}
                    onChange={(e) => setReqOrg(e.target.value)}
                    className="neu-input w-full px-3.5 py-2 rounded-xl text-xs text-slate-200 cursor-pointer"
                  >
                    {institutions.map(inst => (
                      <option key={inst} value={inst} className="bg-[#141A28] text-white">
                        {inst}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Department & Job Role Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      value={reqDept}
                      onChange={(e) => setReqDept(e.target.value)}
                      placeholder="Financial Crime / AML"
                      className="neu-input w-full px-3.5 py-2 rounded-xl text-xs text-white placeholder-slate-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Job Role
                    </label>
                    <select
                      value={reqJobRole}
                      onChange={(e) => setReqJobRole(e.target.value)}
                      className="neu-input w-full px-3.5 py-2 rounded-xl text-xs text-slate-200 cursor-pointer"
                    >
                      {jobRoles.map(r => (
                        <option key={r} value={r} className="bg-[#141A28] text-white">
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Employee / Staff ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Employee / Staff ID
                  </label>
                  <input
                    type="text"
                    value={reqStaffId}
                    onChange={(e) => setReqStaffId(e.target.value)}
                    placeholder="EMP-10482"
                    className="neu-input w-full px-3.5 py-2 rounded-xl text-xs text-white placeholder-slate-500 font-mono"
                    required
                  />
                </div>

                {/* Reason for Access */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Reason for Access
                  </label>
                  <textarea
                    value={reqReason}
                    onChange={(e) => setReqReason(e.target.value)}
                    placeholder="Investigation / Compliance / Analysis"
                    rows={2}
                    className="neu-input w-full p-2.5 rounded-xl text-xs text-white placeholder-slate-500 resize-none"
                    required
                  />
                </div>

                {/* Submit Access Request */}
                <button
                  type="submit"
                  disabled={reqSubmitting}
                  className="neu-btn-primary w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer shadow-[6px_6px_16px_rgba(0,0,0,0.65),0_0_18px_rgba(37,99,235,0.4)]"
                >
                  {reqSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting Request...</span>
                    </div>
                  ) : (
                    <span>Submit Access Request</span>
                  )}
                </button>
              </form>

              {/* Back to Sign In Link */}
              <div className="text-center text-xs text-slate-400 pt-1">
                Already have access?{' '}
                <button
                  type="button"
                  onClick={() => navigateToView('sign-in')}
                  className="text-blue-400 hover:text-blue-300 font-semibold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 3: ADMIN APPROVAL WORKFLOW
             ========================================================================= */}
          {view === 'admin-approval' && (
            <div className="space-y-5">
              {/* Headline */}
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl neu-raised mx-auto flex items-center justify-center text-amber-400 mb-2 border border-amber-500/20">
                  <Clock className="w-6 h-6 animate-pulse" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Access Request Submitted
                </h1>
                <p className="text-xs text-slate-400">
                  Your organization access request is undergoing administrative review.
                </p>
              </div>

              {/* Ticket Details Box */}
              <div className="neu-inset-sm p-4 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Request Reference:</span>
                  <span className="font-mono font-bold text-blue-400">REQ-2026-10482</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Applicant:</span>
                  <span className="font-semibold text-white">{reqFullName} ({reqStaffId})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Target Institution:</span>
                  <span className="text-slate-200">{reqOrg}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Assigned Department:</span>
                  <span className="text-slate-200">{reqDept}</span>
                </div>
              </div>

              {/* Visual Workflow Steps (As requested by user) */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block">
                  Industry Access Workflow Pipeline
                </span>

                <div className="space-y-2 text-xs">
                  {/* Step 1 */}
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="font-medium">1. Request Access (Submitted by User)</span>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-300">
                    <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 animate-spin" />
                    <span className="font-medium">2. Institution & Staff ID Verification (In Progress)</span>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-center gap-3 p-2 rounded-xl neu-inset-sm text-slate-400">
                    <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-mono">3</span>
                    <span>Administrator Review & Security Clearance</span>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-center gap-3 p-2 rounded-xl neu-inset-sm text-slate-400">
                    <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-mono">4</span>
                    <span>Role & Permission Assignment (AML Investigator)</span>
                  </div>

                  {/* Step 5 */}
                  <div className="flex items-center gap-3 p-2 rounded-xl neu-inset-sm text-slate-400">
                    <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-mono">5</span>
                    <span>Account Activation → MFA Verification → Dashboard</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Demo instant approval or return */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleDemoActivateAndSignIn}
                  className="neu-btn-primary w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <BadgeCheck className="w-4 h-4" />
                  <span>Simulate Instant Approval & Sign In (Demo)</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigateToView('sign-in')}
                  className="neu-btn w-full py-2 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 4: FORGOT PASSWORD
             ========================================================================= */}
          {view === 'forgot-password' && (
            <div className="space-y-5">
              {/* Headline */}
              <div className="text-center space-y-1">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Forgot your password?
                </h1>
                <p className="text-xs text-slate-400">
                  Enter your registered institutional work email to receive a password reset token.
                </p>
              </div>

              {forgotSent ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs text-center space-y-2 neu-inset-sm">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <p className="font-bold text-white text-sm">Verification Token Dispatched</p>
                    <p className="text-slate-300 text-xs">
                      We have sent a cryptographic verification token to <strong className="text-white font-mono">{forgotEmail}</strong>.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigateToView('verify')}
                    className="neu-btn-primary w-full py-2.5 px-4 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Proceed to Identity Verification
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => navigateToView('sign-in')}
                      className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back to Sign In
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Work Email
                    </label>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="name@institution.com"
                      className="neu-input w-full px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 font-mono"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="neu-btn-primary w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide transition cursor-pointer shadow-[6px_6px_16px_rgba(0,0,0,0.65),0_0_18px_rgba(37,99,235,0.4)]"
                  >
                    {forgotLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Token...</span>
                      </div>
                    ) : (
                      <span>Send Verification Code</span>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => navigateToView('sign-in')}
                      className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back to Sign In
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* =========================================================================
              VIEW 5: MFA VERIFICATION
             ========================================================================= */}
          {view === 'verify' && (
            <div className="space-y-5">
              {/* Headline */}
              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-xl neu-raised mx-auto flex items-center justify-center text-blue-400 mb-2 border border-blue-500/20">
                  <Shield className="w-5 h-5" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Verify your identity
                </h1>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  A verification code has been sent to your registered authentication method.
                </p>
              </div>

              {mfaError && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 text-center shadow-[inset_2px_2px_5px_rgba(0,0,0,0.6)]">
                  {mfaError}
                </div>
              )}

              {/* 6-Digit Verification Inputs (Neumorphic Inset Wells) */}
              <form onSubmit={handleMfaVerify} className="space-y-5">
                <div className="flex justify-center items-center gap-2 sm:gap-3 py-2">
                  {mfaDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        digitInputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleDigitKeyDown(idx, e)}
                      autoFocus={idx === 0}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center font-mono font-bold text-lg sm:text-xl text-white neu-input rounded-xl"
                    />
                  ))}
                </div>

                <div className="text-center text-[11px] text-slate-400 font-mono">
                  Authentication target: <strong className="text-white">{signInEmail || 'rahul.kumar@sbi.co.in'}</strong>
                </div>

                {/* Verify Button */}
                <button
                  type="submit"
                  disabled={mfaLoading}
                  className="neu-btn-primary w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide transition cursor-pointer shadow-[6px_6px_16px_rgba(0,0,0,0.65),0_0_18px_rgba(37,99,235,0.4)]"
                >
                  {mfaLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Validating Security Key...</span>
                    </div>
                  ) : (
                    <span>Verify</span>
                  )}
                </button>

                {/* Resend and Back links */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={resendCooldown > 0}
                    className="text-slate-400 hover:text-white disabled:opacity-40 cursor-pointer"
                  >
                    {resendCooldown > 0 ? (
                      <span>Resend code in {resendCooldown}s</span>
                    ) : (
                      <span className="text-blue-400 hover:underline">Didn't receive the code? Resend code</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateToView('sign-in')}
                    className="text-slate-400 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Back to Sign In
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
