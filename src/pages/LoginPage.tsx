import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Shield, Building2, ChevronDown, AlertCircle, X } from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';

// API contract specification for POST /api/auth/login
interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  user?: {
    name: string;
    email: string;
    role: 'Investigator' | 'AML / Compliance Officer' | 'Fraud Analyst' | 'Risk Analyst' | 'Auditor' | 'Administrator';
    institution: string;
  };
  error?: string;
}

// Simulated backend authentication endpoint
const postAuthLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Simulated network latency for POST /api/auth/login
  await new Promise((resolve) => setTimeout(resolve, 600));

  const lowerEmail = credentials.email.toLowerCase().trim();

  // Test credential rejection
  if (lowerEmail.includes('error') || lowerEmail.includes('fail') || credentials.password === 'wrong') {
    return {
      success: false,
      error: 'Unable to sign in. Check your credentials and try again.',
    };
  }

  // Backend derives role & institution (No role dropdown on frontend)
  let backendRole: 'Investigator' | 'AML / Compliance Officer' | 'Fraud Analyst' | 'Risk Analyst' | 'Auditor' | 'Administrator' = 'Investigator';
  if (lowerEmail.includes('compliance') || lowerEmail.includes('aml')) {
    backendRole = 'AML / Compliance Officer';
  } else if (lowerEmail.includes('fraud')) {
    backendRole = 'Fraud Analyst';
  } else if (lowerEmail.includes('risk')) {
    backendRole = 'Risk Analyst';
  } else if (lowerEmail.includes('audit')) {
    backendRole = 'Auditor';
  } else if (lowerEmail.includes('admin')) {
    backendRole = 'Administrator';
  }

  let institution = 'HDFC Bank';
  if (lowerEmail.includes('icici')) institution = 'ICICI Bank';
  else if (lowerEmail.includes('sbi')) institution = 'State Bank of India (SBI)';
  else if (lowerEmail.includes('axis')) institution = 'Axis Bank';

  let name = 'V. Kumar';
  if (credentials.email.includes('@')) {
    const prefix = credentials.email.split('@')[0];
    name = prefix.split('.').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  }

  return {
    success: true,
    user: {
      name,
      email: credentials.email,
      role: backendRole,
      institution,
    },
  };
};

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, setFilterInstitution } = useInvestigation();

  // Form State
  const [email, setEmail] = useState('investigator@organization.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Interaction State
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [showSsoDropdown, setShowSsoDropdown] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; body: React.ReactNode } | null>(null);

  // Approved Institutional SSO Identity Providers
  const ssoInstitutions = [
    { name: 'HDFC Bank', code: 'HDFC', protocol: 'SAML 2.0' },
    { name: 'ICICI Bank', code: 'ICIC', protocol: 'SAML 2.0' },
    { name: 'State Bank of India (SBI)', code: 'SBIN', protocol: 'OIDC' },
    { name: 'Axis Bank', code: 'UTIB', protocol: 'SAML 2.0' },
    { name: 'Standard Chartered / Other Approved IdP', code: 'CORP', protocol: 'Azure AD' },
  ];

  // Client-side Validation
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Please enter your work email.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Please enter a valid work email address.';
      }
    }

    if (!password) {
      newErrors.password = 'Please enter your password.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Primary Login Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await postAuthLogin({ email, password });

      if (response.success && response.user) {
        login(response.user.email, response.user.institution, response.user.role);
        setFilterInstitution(response.user.institution);
        navigate('/dashboard');
      } else {
        setIsLoading(false);
        setAuthError(response.error || 'Unable to sign in. Check your credentials and try again.');
      }
    } catch {
      setIsLoading(false);
      setAuthError('Unable to sign in. Check your credentials and try again.');
    }
  };

  // SSO Login Selection
  const handleSSOSelect = (institutionName: string) => {
    setIsLoading(true);
    setAuthError(null);
    setShowSsoDropdown(false);

    setTimeout(() => {
      const domain = institutionName.toLowerCase().replace(/[^a-z]/g, '');
      const ssoEmail = `investigator@${domain || 'bank'}.internal`;
      login(ssoEmail, institutionName, 'Investigator');
      setFilterInstitution(institutionName);
      navigate('/dashboard');
    }, 550);
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F7FA] text-[#172033] font-sans antialiased flex flex-col justify-between select-none">
      {/* ==================================================
          HEADER
          ================================================== */}
      <header className="w-full px-6 py-5 sm:px-10 lg:px-12 flex items-center justify-between border-b border-[#DDE3EA] bg-transparent">
        {/* Top-left: FINGRAPH simple professional wordmark */}
        <div className="flex flex-col">
          <span className="text-[17px] font-bold tracking-tight text-[#101828]">
            FINGRAPH
          </span>
          <span className="text-[12px] text-[#667085] leading-tight">
            Financial Graph Intelligence & Forensics
          </span>
        </div>

        {/* Top-right: Secure Access with tiny green status dot */}
        <div className="flex items-center gap-2 text-[13px] text-[#344054]">
          <span className="w-2 h-2 rounded-full bg-[#198754] inline-block flex-shrink-0" />
          <span className="font-medium text-[#172033]">Secure Access</span>
        </div>
      </header>

      {/* ==================================================
          OVERALL LAYOUT: CENTERED LOGIN CARD
          ================================================== */}
      <main className="flex-1 flex items-center justify-center px-5 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-[420px] bg-[#FFFFFF] border border-[#DDE3EA] rounded-lg p-8 sm:p-9 shadow-[0_1px_3px_0_rgba(16,24,40,0.06),0_1px_2px_0_rgba(16,24,40,0.04)]">
          {/* LOGIN HEADER */}
          <div className="mb-6">
            <h1 className="text-[24px] font-semibold text-[#172033] tracking-tight leading-tight">
              Sign in
            </h1>
            <p className="text-[14px] text-[#667085] mt-1.5 leading-normal">
              Access your FINGRAPH investigation workspace.
            </p>
          </div>

          {/* AUTHENTICATION ERROR (Inline only, never browser alert) */}
          {authError && (
            <div
              role="alert"
              className="mb-5 p-3 rounded-[6px] bg-[#FEF3F2] border border-[#FECDCA] text-[#D92D20] text-[13px] flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#D92D20]" />
              <div className="leading-snug">
                <span>{authError}</span>
              </div>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* WORK EMAIL */}
            <div>
              <label
                htmlFor="work-email"
                className="block text-[13px] font-medium text-[#344054] mb-1.5"
              >
                Work email
              </label>
              <input
                id="work-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="investigator@organization.com"
                autoComplete="email"
                disabled={isLoading}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full h-12 px-3.5 rounded-[6px] bg-[#FFFFFF] text-[14px] text-[#172033] placeholder:text-[#94A3B8] border transition-colors focus:outline-none focus:ring-1 focus:ring-[#1769E0] focus:border-[#1769E0] ${
                  errors.email
                    ? 'border-[#D92D20] bg-[#FEF3F2]/30'
                    : 'border-[#D0D5DD] hover:border-[#B0BCCB]'
                } ${isLoading ? 'opacity-60 cursor-not-allowed bg-[#F8FAFC]' : ''}`}
              />
              {errors.email && (
                <p id="email-error" className="text-[12px] text-[#D92D20] mt-1.5 flex items-center gap-1">
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="block text-[13px] font-medium text-[#344054] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  disabled={isLoading}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className={`w-full h-12 pl-3.5 pr-11 rounded-[6px] bg-[#FFFFFF] text-[14px] text-[#172033] placeholder:text-[#94A3B8] border transition-colors focus:outline-none focus:ring-1 focus:ring-[#1769E0] focus:border-[#1769E0] ${
                    errors.password
                      ? 'border-[#D92D20] bg-[#FEF3F2]/30'
                      : 'border-[#D0D5DD] hover:border-[#B0BCCB]'
                  } ${isLoading ? 'opacity-60 cursor-not-allowed bg-[#F8FAFC]' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#172033] focus:outline-none transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-[12px] text-[#D92D20] mt-1.5 flex items-center gap-1">
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* OPTIONS */}
            <div className="flex items-center justify-between text-[13px] pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[#344054] hover:text-[#172033]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  className="w-4 h-4 rounded border-[#D0D5DD] text-[#1769E0] focus:ring-[#1769E0] focus:ring-offset-0 accent-[#1769E0] cursor-pointer"
                />
                <span>Remember this device</span>
              </label>

              <button
                type="button"
                onClick={() =>
                  setModalContent({
                    title: 'Credential Recovery Notice',
                    body: (
                      <div className="space-y-3">
                        <p>
                          Self-service password resets are restricted under institutional compliance regulations (RBI &amp; FFIEC guidelines).
                        </p>
                        <div className="p-3 bg-[#F5F7FA] rounded border border-[#DDE3EA] text-[12px] text-[#667085] space-y-1">
                          <p className="font-medium text-[#172033]">Procedure for approved personnel:</p>
                          <p>1. Contact your organization's Chief Information Security Officer (CISO) helpdesk.</p>
                          <p>2. Or raise an internal ticket with the Identity &amp; Access Management (IAM) team.</p>
                        </div>
                      </div>
                    ),
                  })
                }
                className="text-[#1769E0] hover:underline font-medium focus:outline-none"
              >
                Forgot password?
              </button>
            </div>

            {/* PRIMARY BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-2 rounded-[6px] bg-[#1769E0] hover:bg-[#1258BD] text-white text-[14px] font-medium transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#1769E0]/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>

          {/* SSO DIVIDER */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#D0D5DD]" />
            </div>
            <span className="relative bg-[#FFFFFF] px-3 text-[12px] font-normal text-[#667085]">
              OR
            </span>
          </div>

          {/* SSO BUTTON */}
          <div className="relative">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setShowSsoDropdown(!showSsoDropdown)}
              className="w-full h-12 px-4 rounded-[6px] bg-[#FFFFFF] border border-[#D0D5DD] hover:bg-[#F9FAFB] text-[#344054] text-[14px] font-medium flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-1 focus:ring-[#1769E0] focus:border-[#1769E0] disabled:opacity-50"
            >
              <Building2 className="w-4 h-4 text-[#667085]" />
              <span>Sign in with organization SSO</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#667085] ml-1 transition-transform ${
                  showSsoDropdown ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* SSO IDP SELECTION */}
            {showSsoDropdown && (
              <div className="absolute left-0 right-0 top-[52px] bg-[#FFFFFF] border border-[#D0D5DD] rounded-[6px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] py-1.5 z-20 text-[13px]">
                <div className="px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#667085] border-b border-[#E4E7EC] mb-1">
                  Select Approved Identity Provider
                </div>
                {ssoInstitutions.map((inst) => (
                  <button
                    key={inst.code}
                    type="button"
                    onClick={() => handleSSOSelect(inst.name)}
                    className="w-full px-3.5 py-2 text-left hover:bg-[#F5F7FA] flex items-center justify-between text-[#172033] transition-colors"
                  >
                    <span className="font-medium">{inst.name}</span>
                    <span className="text-[11px] text-[#667085] bg-[#F1F4F8] px-2 py-0.5 rounded border border-[#DDE3EA]">
                      {inst.protocol}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SECURITY NOTICE */}
          <div className="mt-8 pt-5 border-t border-[#DDE3EA] flex items-start gap-2.5 text-[#667085]">
            <Shield className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#667085]" />
            <div className="text-[12px] leading-relaxed">
              <span className="font-medium text-[#344054] block">Authorized personnel only.</span>
              <span>Access is restricted to approved organization accounts.</span>
            </div>
          </div>
        </div>
      </main>

      {/* ==================================================
          FOOTER
          ================================================== */}
      <footer className="w-full px-6 py-6 sm:px-10 text-center text-[12px] text-[#667085]">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <span>© 2026 FINGRAPH</span>
          <span className="hidden sm:inline text-[#D0D5DD]">•</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                setModalContent({
                  title: 'Privacy & Data Governance Policy',
                  body: (
                    <div className="space-y-2">
                      <p>
                        FINGRAPH adheres to global banking privacy standards, GDPR, and Indian Digital Personal Data Protection (DPDP) Act 2023.
                      </p>
                      <p>
                        All investigation session logs, graph queries, and entity dossiers are pseudonymized and audit-logged under bank supervision.
                      </p>
                    </div>
                  ),
                })
              }
              className="hover:text-[#172033] hover:underline transition-colors focus:outline-none"
            >
              Privacy
            </button>
            <span className="text-[#D0D5DD]">•</span>
            <button
              type="button"
              onClick={() =>
                setModalContent({
                  title: 'Institutional Security Controls',
                  body: (
                    <div className="space-y-2">
                      <p>
                        Enterprise security features include mutual TLS 1.3 encryption, FIPS 140-2 Level 3 hardware security module key storage, and automated session invalidation.
                      </p>
                      <p>
                        Continuous threat telemetry detects unauthorized access attempts across multi-bank perimeter gateways.
                      </p>
                    </div>
                  ),
                })
              }
              className="hover:text-[#172033] hover:underline transition-colors focus:outline-none"
            >
              Security
            </button>
            <span className="text-[#D0D5DD]">•</span>
            <button
              type="button"
              onClick={() =>
                setModalContent({
                  title: 'Compliance & Technical Support',
                  body: (
                    <div className="space-y-2">
                      <p>
                        For technical issues, node synchronization failures, or law enforcement emergency escalation:
                      </p>
                      <div className="p-3 bg-[#F5F7FA] rounded border border-[#DDE3EA] text-[12px] text-[#667085] space-y-1">
                        <p><strong className="text-[#172033]">Operations Desk:</strong> sec-ops@fingraph.internal</p>
                        <p><strong className="text-[#172033]">Emergency AML Hotline:</strong> +91 (22) 6900-2470</p>
                      </div>
                    </div>
                  ),
                })
              }
              className="hover:text-[#172033] hover:underline transition-colors focus:outline-none"
            >
              Support
            </button>
          </div>
        </div>
      </footer>

      {/* ==================================================
          ENTERPRISE ACCESSIBLE MODAL
          ================================================== */}
      {modalContent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#101828]/40 flex items-center justify-center p-4 backdrop-blur-[1px]"
        >
          <div className="w-full max-w-[420px] bg-[#FFFFFF] border border-[#DDE3EA] rounded-lg p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DDE3EA]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#1769E0]" />
                <h3 className="text-[15px] font-semibold text-[#172033]">
                  {modalContent.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                aria-label="Close dialog"
                className="text-[#667085] hover:text-[#172033] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[13px] text-[#344054] leading-relaxed">
              {modalContent.body}
            </div>

            <div className="mt-5 pt-3 border-t border-[#DDE3EA] flex justify-end">
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="h-9 px-4 rounded-[6px] bg-[#1769E0] hover:bg-[#1258BD] text-white text-[13px] font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
