import React, { useState } from 'react';
import { AppMode, AuthSession } from '../../types/nexus.ts';
import {
  Lock,
  Mail,
  Phone,
  User,
  Shield,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  KeyRound,
  ArrowLeft,
} from 'lucide-react';

interface AuthPageProps {
  initialPortal?: AppMode;
  initialMode?: 'login' | 'signup';
  onLoginSuccess: (session: AuthSession) => void;
  onCancel?: () => void;
  wireframeMode: boolean;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialPortal = 'client',
  initialMode = 'login',
  onLoginSuccess,
  onCancel,
  wireframeMode,
}) => {
  const [portal, setPortal] = useState<AppMode>(initialPortal);
  const [isSignUp, setIsSignUp] = useState<boolean>(initialMode === 'signup');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminAuthCode, setAdminAuthCode] = useState('');

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Validation Patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Phone: optional +, 10 to 14 digits with optional dashes/spaces
  const phoneCleanRegex = /^\+?[0-9]{10,14}$/;
  // Password pattern: uppercase, lowercase, number, special char
  const passwordHasUpper = /[A-Z]/;
  const passwordHasLower = /[a-z]/;
  const passwordHasNumber = /[0-9]/;
  const passwordHasSpecial = /[!@#$%^&*(),.?":{}|<>_~-]/;

  // Single Field Validator
  const validateField = (fieldName: string, value: string): string => {
    const trimmed = value.trim();

    // 5. All fields are required
    if (!trimmed) {
      switch (fieldName) {
        case 'name':
          return 'Full Name is required.';
        case 'email':
          return 'Email address is required.';
        case 'phone':
          return 'Phone number is required.';
        case 'password':
          return 'Password is required.';
        case 'confirmPassword':
          return 'Password confirmation is required.';
        case 'adminAuthCode':
          return 'Admin Authorization Code is required.';
        default:
          return 'This field is required.';
      }
    }

    // 3. Email Pattern validation
    if (fieldName === 'email') {
      if (!emailRegex.test(trimmed)) {
        return 'Invalid email format (e.g. name@domain.com).';
      }
    }

    // 1. Phone number Pattern validation
    if (fieldName === 'phone' && isSignUp) {
      const sanitized = trimmed.replace(/[-.\s()]/g, '');
      if (!phoneCleanRegex.test(sanitized)) {
        return 'Phone number must be 10–14 digits (e.g., +1234567890 or 9876543210).';
      }
    }

    // 4. Password Length & 2. Password Pattern
    if (fieldName === 'password') {
      // 4. Password Length
      if (value.length < 8) {
        return 'Password must be at least 8 characters long.';
      }
      if (value.length > 32) {
        return 'Password cannot exceed 32 characters.';
      }

      // 2. Password Pattern
      if (isSignUp) {
        if (!passwordHasUpper.test(value)) {
          return 'Password must include at least one uppercase letter (A-Z).';
        }
        if (!passwordHasLower.test(value)) {
          return 'Password must include at least one lowercase letter (a-z).';
        }
        if (!passwordHasNumber.test(value)) {
          return 'Password must include at least one number (0-9).';
        }
        if (!passwordHasSpecial.test(value)) {
          return 'Password must include at least one special character (!@#$%^&*).';
        }
      }
    }

    // Confirm Password Match
    if (fieldName === 'confirmPassword' && isSignUp) {
      if (value !== password) {
        return 'Passwords do not match.';
      }
    }

    // Admin Auth Code check
    if (fieldName === 'adminAuthCode' && portal === 'admin' && isSignUp) {
      if (trimmed.length < 5) {
        return 'Admin authorization code must be at least 5 alphanumeric characters.';
      }
    }

    return '';
  };

  const handleBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (field: string, value: string) => {
    // Update state
    if (field === 'name') setName(value);
    if (field === 'email') setEmail(value);
    if (field === 'phone') setPhone(value);
    if (field === 'password') setPassword(value);
    if (field === 'confirmPassword') setConfirmPassword(value);
    if (field === 'adminAuthCode') setAdminAuthCode(value);

    // If submit has been attempted or field was touched, re-validate dynamically
    if (submitAttempted || touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  // Full Form Validation on Submit
  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (isSignUp) {
      const nameErr = validateField('name', name);
      if (nameErr) newErrors.name = nameErr;

      const phoneErr = validateField('phone', phone);
      if (phoneErr) newErrors.phone = phoneErr;

      const confirmErr = validateField('confirmPassword', confirmPassword);
      if (confirmErr) newErrors.confirmPassword = confirmErr;

      if (portal === 'admin') {
        const codeErr = validateField('adminAuthCode', adminAuthCode);
        if (codeErr) newErrors.adminAuthCode = codeErr;
      }
    }

    const emailErr = validateField('email', email);
    if (emailErr) newErrors.email = emailErr;

    const passErr = validateField('password', password);
    if (passErr) newErrors.password = passErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    // Mark all relevant fields as touched
    const touchedFields: Record<string, boolean> = {
      email: true,
      password: true,
    };
    if (isSignUp) {
      touchedFields.name = true;
      touchedFields.phone = true;
      touchedFields.confirmPassword = true;
      if (portal === 'admin') touchedFields.adminAuthCode = true;
    }
    setTouched(touchedFields);

    if (!validateAll()) {
      return;
    }

    // Success simulation
    const roleTitle =
      portal === 'admin'
        ? 'System Administrator'
        : 'Senior Research Investigator';

    const session: AuthSession = {
      isAuthenticated: true,
      name: isSignUp
        ? name
        : portal === 'admin'
        ? 'System Admin'
        : 'Dr. Evelyn Vance',
      email: email.trim(),
      phone: isSignUp ? phone.trim() : '+1 (555) 234-5678',
      role: roleTitle,
      portal: portal,
      plan: portal === 'admin' ? 'ENTERPRISE' : 'PROFESSIONAL',
    };

    setSuccessMessage(
      isSignUp
        ? `Account successfully created! Authenticated to ${
            portal === 'admin' ? 'Admin Control' : 'Research Workspace'
          }.`
        : `Credentials authenticated. Welcome back to ${
            portal === 'admin' ? 'Admin Control' : 'Nexus Research Workspace'
          }.`
    );

    setTimeout(() => {
      onLoginSuccess(session);
    }, 900);
  };

  // Quick Demo Fillers for user convenience
  const handleAutofillResearcher = () => {
    setPortal('client');
    setIsSignUp(false);
    setEmail('evelyn.vance@nexus.ai');
    setPassword('Nexus@Research2026!');
    setErrors({});
    setTouched({});
    setSubmitAttempted(false);
  };

  const handleAutofillAdmin = () => {
    setPortal('admin');
    setIsSignUp(false);
    setEmail('admin@nexus.ai');
    setPassword('Admin#NexusPass88');
    setErrors({});
    setTouched({});
    setSubmitAttempted(false);
  };

  const handleAutofillNewSignUp = () => {
    setIsSignUp(true);
    setName(portal === 'admin' ? 'Chief Admin Vance' : 'Dr. Nirav Nimavat');
    setEmail(portal === 'admin' ? 'admin.nirav@nexus.ai' : 'nirav.nimavat@nexus.ai');
    setPhone('+19876543210');
    setPassword('NexusSecure#2026');
    setConfirmPassword('NexusSecure#2026');
    if (portal === 'admin') {
      setAdminAuthCode('NX-ROOT-92610');
    }
    setErrors({});
    setTouched({});
    setSubmitAttempted(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center p-6 ${
        wireframeMode
          ? 'bg-neutral-100 text-neutral-900 font-mono'
          : 'bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100'
      }`}
    >
      {/* Back button if opened from existing workspace */}
      {onCancel && (
        <button
          onClick={onCancel}
          className="absolute top-6 left-6 flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Workspace</span>
        </button>
      )}

      {/* Main Auth Container */}
      <div
        className={`w-full max-w-xl rounded-xl border p-8 shadow-sm transition-all ${
          wireframeMode
            ? 'border-neutral-900 bg-white'
            : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md'
        }`}
      >
        {/* Brand / Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <div
              className={`w-7 h-7 rounded flex items-center justify-center font-bold text-xs ${
                portal === 'admin'
                  ? 'bg-amber-600 text-white'
                  : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
              }`}
            >
              {portal === 'admin' ? 'A' : 'N'}
            </div>
            <h1 className="text-xl font-bold tracking-tight uppercase">
              {portal === 'admin' ? 'NEXUS ADMIN CONTROL' : 'NEXUS RESEARCH'}
            </h1>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {portal === 'admin'
              ? 'Autonomous Infrastructure Governance & Telemetry Portal'
              : 'Continuous Intelligence & Hypothesis Development Workspace'}
          </p>
        </div>

        {/* Portal Switcher Tabs: Client vs Admin */}
        <div className="mb-6 p-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex text-xs">
          <button
            type="button"
            onClick={() => {
              setPortal('client');
              setErrors({});
            }}
            className={`flex-1 py-2 rounded-md font-semibold transition-all ${
              portal === 'client'
                ? wireframeMode
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Researcher / Client Portal
          </button>
          <button
            type="button"
            onClick={() => {
              setPortal('admin');
              setErrors({});
            }}
            className={`flex-1 py-2 rounded-md font-semibold transition-all ${
              portal === 'admin'
                ? wireframeMode
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white dark:bg-neutral-900 text-amber-600 dark:text-amber-400 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            System Admin Portal
          </button>
        </div>

        {/* Mode Switcher: Sign In vs Sign Up */}
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-6">
          <div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              {isSignUp
                ? `Create ${portal === 'admin' ? 'Admin' : 'Research'} Account`
                : `Sign In to ${portal === 'admin' ? 'Admin Control' : 'Workspace'}`}
            </h2>
            <p className="text-[11px] text-neutral-500">
              {isSignUp
                ? 'Enter your credentials with validated security parameters.'
                : 'Enter your verified credentials to access your session.'}
            </p>
          </div>

          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setErrors({});
                setSubmitAttempted(false);
              }}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                !isSignUp
                  ? wireframeMode
                    ? 'border border-neutral-900 bg-neutral-900 text-white'
                    : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setErrors({});
                setSubmitAttempted(false);
              }}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                isSignUp
                  ? wireframeMode
                    ? 'border border-neutral-900 bg-neutral-900 text-white'
                    : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-6 p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form with JS Validation */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs">
          {/* Sign Up Fields: Full Name & Phone Number */}
          {isSignUp && (
            <>
              {/* Full Name */}
              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name', name)}
                    placeholder="e.g. Dr. Nirav Nimavat"
                    className={`w-full pl-9 pr-3 py-2 rounded border outline-none transition-colors ${
                      errors.name
                        ? 'border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/20'
                        : 'border-neutral-300 dark:border-neutral-700 bg-transparent focus:border-neutral-900 dark:focus:border-white'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-sans">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Phone Number (Pattern validated) */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-medium text-neutral-700 dark:text-neutral-300">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    10–14 digits (e.g. +1234567890)
                  </span>
                </div>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone', phone)}
                    placeholder="+1234567890 or 9876543210"
                    className={`w-full pl-9 pr-3 py-2 rounded border outline-none transition-colors font-mono ${
                      errors.phone
                        ? 'border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/20'
                        : 'border-neutral-300 dark:border-neutral-700 bg-transparent focus:border-neutral-900 dark:focus:border-white'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-sans">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </>
          )}

          {/* Email Address (Required + Email Pattern validated) */}
          <div>
            <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email', email)}
                placeholder="name@domain.com"
                className={`w-full pl-9 pr-3 py-2 rounded border outline-none transition-colors font-mono ${
                  errors.email
                    ? 'border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/20'
                    : 'border-neutral-300 dark:border-neutral-700 bg-transparent focus:border-neutral-900 dark:focus:border-white'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-sans">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Password (Required + Length min 8 + Pattern validated) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-medium text-neutral-700 dark:text-neutral-300">
                Password <span className="text-rose-500">*</span>
              </label>
              <span className="text-[10px] text-neutral-400 font-mono">
                Min 8 characters
              </span>
            </div>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => handleChange('password', e.target.value)}
                onBlur={() => handleBlur('password', password)}
                placeholder="••••••••••••"
                className={`w-full pl-9 pr-10 py-2 rounded border outline-none transition-colors font-mono ${
                  errors.password
                    ? 'border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/20'
                    : 'border-neutral-300 dark:border-neutral-700 bg-transparent focus:border-neutral-900 dark:focus:border-white'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                {showPassword ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-sans">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.password}</span>
              </p>
            )}

            {/* Live Password Pattern Checklist for Sign Up */}
            {isSignUp && password.length > 0 && (
              <div className="mt-2.5 p-2.5 rounded bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                <div
                  className={`flex items-center gap-1.5 ${
                    password.length >= 8 ? 'text-emerald-600' : 'text-neutral-400'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>Min 8 characters</span>
                </div>
                <div
                  className={`flex items-center gap-1.5 ${
                    passwordHasUpper.test(password)
                      ? 'text-emerald-600'
                      : 'text-neutral-400'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>1 Uppercase (A-Z)</span>
                </div>
                <div
                  className={`flex items-center gap-1.5 ${
                    passwordHasLower.test(password)
                      ? 'text-emerald-600'
                      : 'text-neutral-400'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>1 Lowercase (a-z)</span>
                </div>
                <div
                  className={`flex items-center gap-1.5 ${
                    passwordHasNumber.test(password) &&
                    passwordHasSpecial.test(password)
                      ? 'text-emerald-600'
                      : 'text-neutral-400'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>Number & Special (!@#)</span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password (Sign Up only) */}
          {isSignUp && (
            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) =>
                    handleChange('confirmPassword', e.target.value)
                  }
                  onBlur={() => handleBlur('confirmPassword', confirmPassword)}
                  placeholder="••••••••••••"
                  className={`w-full pl-9 pr-3 py-2 rounded border outline-none transition-colors font-mono ${
                    errors.confirmPassword
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/20'
                      : 'border-neutral-300 dark:border-neutral-700 bg-transparent focus:border-neutral-900 dark:focus:border-white'
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
            </div>
          )}

          {/* Admin Authorization Code (Admin Sign Up only) */}
          {isSignUp && portal === 'admin' && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-medium text-neutral-700 dark:text-neutral-300">
                  Admin Authorization Security Key <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] text-neutral-400 font-mono">
                  e.g. NX-ROOT-92610
                </span>
              </div>
              <div className="relative">
                <KeyRound className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="text"
                  value={adminAuthCode}
                  onChange={(e) =>
                    handleChange('adminAuthCode', e.target.value)
                  }
                  onBlur={() => handleBlur('adminAuthCode', adminAuthCode)}
                  placeholder="NX-ROOT-92610"
                  className={`w-full pl-9 pr-3 py-2 rounded border outline-none transition-colors font-mono ${
                    errors.adminAuthCode
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/20'
                      : 'border-neutral-300 dark:border-neutral-700 bg-transparent focus:border-neutral-900 dark:focus:border-white'
                  }`}
                />
              </div>
              {errors.adminAuthCode && (
                <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.adminAuthCode}</span>
                </p>
              )}
            </div>
          )}

          {/* Form Actions */}
          <div className="pt-3">
            <button
              type="submit"
              className={`w-full py-2.5 px-4 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                portal === 'admin'
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : wireframeMode
                  ? 'border border-neutral-900 bg-neutral-900 text-white'
                  : 'bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 shadow-sm'
              }`}
            >
              <span>
                {isSignUp
                  ? `Register & Launch ${
                      portal === 'admin' ? 'Admin Portal' : 'Workspace'
                    }`
                  : `Authenticate & Enter ${
                      portal === 'admin' ? 'Admin Portal' : 'Workspace'
                    }`}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Validation Summary & Demo Quick-Fill Bar */}
        <div className="mt-6 pt-5 border-t border-neutral-200 dark:border-neutral-800">
          <div className="text-[11px] text-neutral-500 mb-2 font-medium">
            Active Validation Rules Enforced:
          </div>
          <div className="text-[10px] text-neutral-500 dark:text-neutral-400 space-y-1 font-mono">
            <div>1. Phone number pattern (10 to 14 digits, e.g. +1234567890)</div>
            <div>2. Password pattern (Uppercase + Lowercase + Number + Special character)</div>
            <div>3. Email pattern (e.g. name@domain.com)</div>
            <div>4. Password length (Minimum 8 to 32 characters)</div>
            <div>5. All fields are required</div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-neutral-400">Quick Test Autofill:</span>
            <button
              type="button"
              onClick={handleAutofillResearcher}
              className="text-[10px] px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Researcher Sign In
            </button>
            <button
              type="button"
              onClick={handleAutofillAdmin}
              className="text-[10px] px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Admin Sign In
            </button>
            <button
              type="button"
              onClick={handleAutofillNewSignUp}
              className="text-[10px] px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Valid Sign Up Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
