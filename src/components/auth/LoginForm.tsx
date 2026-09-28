import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, ShieldAlert } from 'lucide-react';
import { FormField } from './FormField';
import { PasswordField } from './PasswordField';
import { SSOButton } from './SSOButton';
import { useInvestigation } from '../../context/InvestigationContext';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { login, setFilterInstitution } = useInvestigation();

  const [email, setEmail] = useState('investigator@organization.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(false);

  // Form states
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Validate email format
  const validateEmail = (val: string) => {
    if (!val.trim()) return 'Please enter your work email.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) return 'Please enter a valid email address.';
    return undefined;
  };

  // Validate password length
  const validatePassword = (val: string) => {
    if (!val) return 'Please enter your password.';
    if (val.length < 6) return 'Password must be at least 6 characters.';
    return undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr });
      return;
    }

    setErrors({});
    setIsLoading(true);

    // Simulated API call (Architecture prepared for POST /api/auth/login)
    setTimeout(() => {
      // Simulate credential check
      if (email.toLowerCase().includes('error')) {
        setIsLoading(false);
        setAuthError('Unable to sign in. Check your credentials and try again.');
        return;
      }

      // Success
      login(email, 'HDFC Bank');
      if (onSuccess) {
        onSuccess();
      } else {
        setTimeout(() => {
          navigate('/dashboard');
        }, 180);
      }
    }, 600);
  };

  const handleSSOSelect = (institutionName: string) => {
    setIsLoading(true);
    setAuthError(null);
    setTimeout(() => {
      login(`investigator@${institutionName.toLowerCase().replace(/[^a-z]/g, '')}.com`, institutionName);
      setFilterInstitution(institutionName);
      setTimeout(() => {
        navigate('/dashboard');
      }, 180);
    }, 450);
  };

  return (
    <div className="w-full max-w-[400px] mx-auto select-none font-sans">
      {/* Form Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">
          Sign in
        </h2>
        <p className="text-xs text-text-secondary mt-1">
          Access your FINGRAPH investigation workspace.
        </p>
      </div>

      {/* Global Authentication Error Alert */}
      {authError && (
        <div 
          role="alert"
          className="mb-5 p-3 rounded bg-risk-subtle border border-risk-border text-risk text-xs flex items-start gap-2 animate-in fade-in duration-200"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div className="leading-snug">
            <span className="font-semibold block">Authentication error</span>
            <span>{authError}</span>
          </div>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email Field */}
        <FormField
          id="work-email"
          label="Work email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
          }}
          placeholder="investigator@organization.com"
          autoComplete="email"
          required
          error={errors.email}
          disabled={isLoading}
        />

        {/* Password Field */}
        <PasswordField
          id="password"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
          }}
          autoComplete="current-password"
          required
          error={errors.password}
          disabled={isLoading}
        />

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none text-text-secondary hover:text-text-primary">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
              className="w-4 h-4 rounded border-border text-brand focus:ring-brand focus:ring-1 accent-brand cursor-pointer"
            />
            <span>Remember this device</span>
          </label>

          <a 
            href="#forgot" 
            onClick={(e) => {
              e.preventDefault();
              setAuthError('Password reset must be initiated through your internal banking security administrator.');
            }}
            className="text-brand hover:underline font-medium focus:outline-none focus:underline"
          >
            Forgot password?
          </a>
        </div>

        {/* Primary Submit Button: 48px high, #1769E0 */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded bg-brand hover:bg-brand-hover text-white text-xs font-semibold shadow-sm transition active:scale-[0.99] flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:opacity-60 disabled:cursor-not-allowed"
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

      {/* Divider */}
      <div className="relative my-5 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <span className="relative bg-page px-3 text-[11px] font-semibold text-text-muted tracking-wider uppercase">
          OR
        </span>
      </div>

      {/* Organization SSO Component */}
      <SSOButton onSelectSSO={handleSSOSelect} disabled={isLoading} />

      {/* Authorized Personnel Notice */}
      <div className="mt-8 pt-5 border-t border-border text-center text-xs text-text-muted space-y-0.5">
        <p className="font-semibold text-text-secondary">
          Authorized personnel only
        </p>
        <p className="text-[11px]">
          Access is restricted to approved organization accounts.
        </p>
      </div>
    </div>
  );
};
