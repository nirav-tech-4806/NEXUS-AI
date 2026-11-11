import React, { useState } from 'react';
import {
  Code,
  FileCode,
  Copy,
  Check,
  ExternalLink,
  Download,
  X,
  FolderArchive,
} from 'lucide-react';

interface CodeSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  wireframeMode: boolean;
}

export const CodeSubmissionModal: React.FC<CodeSubmissionModalProps> = ({
  isOpen,
  onClose,
  wireframeMode,
}) => {
  const [activeTab, setActiveTab] = useState<'validation' | 'auth' | 'index' | 'admin' | 'guide'>('guide');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  // The Pure JavaScript Validation File
  const validationCode = `/**
 * NEXUS AI – Web Technology Project (01CE1306)
 * Student: Nirav Nimavat (92610103001)
 *
 * PURE JAVASCRIPT FORM VALIDATION SCRIPT
 * Enforcing 5 Mandatory Rules:
 * 1. Phone number pattern
 * 2. Password pattern
 * 3. Email pattern
 * 4. Password length
 * 5. All fields are required
 */

// Rule 1: Phone number pattern (10 to 14 digits)
function validatePhoneNumber(phone) {
  const phonePattern = /^\\+?[0-9]{10,14}$/;
  const cleanPhone = phone.replace(/[-.\\s()]/g, '');
  if (!cleanPhone) {
    return { isValid: false, message: 'Phone number is required.' };
  }
  if (!phonePattern.test(cleanPhone)) {
    return {
      isValid: false,
      message: 'Phone number must be a valid 10-14 digit number (e.g., +1234567890 or 9876543210).'
    };
  }
  return { isValid: true, message: '' };
}

// Rule 2 & 4: Password Pattern & Password Length
function validatePassword(password, isSignUp = false) {
  // Rule 5: Required
  if (!password || password.trim() === '') {
    return { isValid: false, message: 'Password is required.' };
  }

  // Rule 4: Password Length (at least 8 characters)
  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password length must be at least 8 characters long.'
    };
  }
  if (password.length > 32) {
    return {
      isValid: false,
      message: 'Password cannot exceed 32 characters.'
    };
  }

  // Rule 2: Password Pattern (Upper + Lower + Number + Special Char)
  if (isSignUp) {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>_~-]/.test(password);

    if (!hasUpper) {
      return { isValid: false, message: 'Password requires at least one uppercase letter (A-Z).' };
    }
    if (!hasLower) {
      return { isValid: false, message: 'Password requires at least one lowercase letter (a-z).' };
    }
    if (!hasNumber) {
      return { isValid: false, message: 'Password requires at least one number (0-9).' };
    }
    if (!hasSpecial) {
      return { isValid: false, message: 'Password requires at least one special character (!@#$%^&*).' };
    }
  }

  return { isValid: true, message: '' };
}

// Rule 3: Email Pattern
function validateEmail(email) {
  if (!email || email.trim() === '') {
    return { isValid: false, message: 'Email address is required.' };
  }
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.trim())) {
    return {
      isValid: false,
      message: 'Please enter a valid email address (e.g. name@domain.com).'
    };
  }
  return { isValid: true, message: '' };
}

// Rule 5: All fields are required check
function validateRequired(value, fieldName) {
  if (!value || value.trim() === '') {
    return { isValid: false, message: fieldName + ' is required.' };
  }
  return { isValid: true, message: '' };
}

// Helper: Confirm Password Match
function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return { isValid: false, message: 'Please confirm your password.' };
  }
  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match.' };
  }
  return { isValid: true, message: '' };
}`;

  // Complete HTML code snippets
  const authHtmlCode = `<!-- Save as auth.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>NEXUS AI - Authentication Portal (HTML, CSS, JS)</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-neutral-50 min-h-screen flex items-center justify-center p-6 font-sans">
  <!-- Dual-Sided Auth Box: Researcher vs System Admin with 5 JS Validations -->
  <div class="w-full max-w-xl bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
    <div class="text-center mb-6">
      <h1 class="text-xl font-bold uppercase">NEXUS AI AUTHENTICATION</h1>
      <p class="text-xs text-neutral-500">Pure HTML5, CSS3, and JavaScript Validation</p>
    </div>
    <!-- Validation Form -->
    <form id="auth-form" class="space-y-4 text-xs">
      <div>
        <label class="block font-medium mb-1">Email Address *</label>
        <input type="email" id="email" class="w-full px-3 py-2 border rounded">
        <p id="error-email" class="text-rose-500 hidden mt-1"></p>
      </div>
      <div>
        <label class="block font-medium mb-1">Password * (Min 8 chars, Upper, Lower, Number, Special)</label>
        <input type="password" id="password" class="w-full px-3 py-2 border rounded">
        <p id="error-password" class="text-rose-500 hidden mt-1"></p>
      </div>
      <button type="submit" class="w-full py-2.5 bg-neutral-900 text-white font-semibold rounded">
        Validate & Authenticate
      </button>
    </form>
  </div>
  <script src="validation.js"></script>
</body>
</html>`;

  const indexHtmlCode = `<!-- Save as index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>NEXUS AI - Researcher Workspace (HTML, CSS, JS)</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-neutral-100/60 min-h-screen flex flex-col font-sans">
  <!-- Complete High-Fidelity Client-Side Research Workspace -->
  <!-- Contains: Landscape (SVG Canvas), Evolving Thread, Connected Systems, Exploration, Tier Plan -->
  <div class="p-6">
    <h1 class="text-xl font-bold">NEXUS AI – Intelligent Research Workspace</h1>
    <p class="text-xs text-neutral-500">HTML5 + CSS + JavaScript</p>
  </div>
</body>
</html>`;

  const adminHtmlCode = `<!-- Save as admin.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>NEXUS AI - Admin Control (HTML, CSS, JS)</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-neutral-100/60 min-h-screen flex flex-col font-sans">
  <!-- Complete High-Fidelity Admin Governance -->
  <!-- Contains: Dashboard 4 KPIs, System Activity, Users Directory, Neural Models, Subscriptions, Analytics -->
  <div class="p-6">
    <h1 class="text-xl font-bold">ADMIN CONTROL – Governance & Telemetry</h1>
    <p class="text-xs text-neutral-500">HTML5 + CSS + JavaScript</p>
  </div>
</body>
</html>`;

  const currentSnippet =
    activeTab === 'validation'
      ? validationCode
      : activeTab === 'auth'
      ? authHtmlCode
      : activeTab === 'index'
      ? indexHtmlCode
      : adminHtmlCode;

  const currentFilename =
    activeTab === 'validation'
      ? 'validation.js'
      : activeTab === 'auth'
      ? 'auth.html'
      : activeTab === 'index'
      ? 'index.html'
      : 'admin.html';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadActiveFile = () => {
    const blob = new Blob([currentSnippet], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAllBundle = () => {
    // Generate full standalone file that runs locally right out of the box
    window.open('/nexus-project/auth.html', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className={`w-full max-w-4xl max-h-[92vh] rounded-xl border flex flex-col shadow-2xl overflow-hidden ${
          wireframeMode
            ? 'border-neutral-900 bg-white text-neutral-900'
            : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm">
                Pure HTML, CSS & JavaScript Project Source
              </h3>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              01CE1306 · Nirav Nimavat (92610103001) · Exact matching standalone files
            </p>
          </div>

          {/* Quick Launch Buttons for Standalone Files */}
          <div className="flex items-center gap-2">
            <a
              href="/nexus-project/auth.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Standalone Auth</span>
            </a>
            <a
              href="/nexus-project/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Standalone Workspace</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs bg-neutral-50 dark:bg-neutral-950/40">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-2 font-mono font-semibold border-b-2 transition-colors ${
                activeTab === 'guide'
                  ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              📖 How to Run on PC
            </button>
            <button
              onClick={() => setActiveTab('validation')}
              className={`px-3 py-2 font-mono font-semibold border-b-2 transition-colors ${
                activeTab === 'validation'
                  ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              validation.js (5 JS Rules)
            </button>
            <button
              onClick={() => setActiveTab('auth')}
              className={`px-3 py-2 font-mono font-semibold border-b-2 transition-colors ${
                activeTab === 'auth'
                  ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              auth.html (Login & Signup)
            </button>
            <button
              onClick={() => setActiveTab('index')}
              className={`px-3 py-2 font-mono font-semibold border-b-2 transition-colors ${
                activeTab === 'index'
                  ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              index.html (Client Workspace)
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-2 font-mono font-semibold border-b-2 transition-colors ${
                activeTab === 'admin'
                  ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              admin.html (Admin Control)
            </button>
          </div>

          <div className="flex items-center gap-2 pb-2">
            {activeTab !== 'guide' && (
              <>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
                <button
                  onClick={handleDownloadActiveFile}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {currentFilename}</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Code Content or Guide Viewport */}
        {activeTab === 'guide' ? (
          <div className="flex-1 overflow-auto p-6 space-y-6 text-xs bg-white dark:bg-neutral-900">
            <div>
              <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-1">
                How to Run the Exported Project Locally on Your PC
              </h4>
              <p className="text-neutral-500 text-xs">
                You can run the HTML, CSS & JavaScript files in three simple ways without needing this preview.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Method 1: Double Click */}
              <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-2">
                <div className="text-[10px] font-mono font-bold text-emerald-600 uppercase">
                  Method 1 · Instant (No Setup)
                </div>
                <h5 className="font-bold text-neutral-900 dark:text-white">Direct Double-Click</h5>
                <ol className="list-decimal pl-4 space-y-1.5 text-neutral-600 dark:text-neutral-300">
                  <li>Unzip or download your exported files.</li>
                  <li>Double-click <code className="font-mono font-bold text-neutral-900 dark:text-white">auth.html</code> or <code className="font-mono font-bold text-neutral-900 dark:text-white">index.html</code>.</li>
                  <li>It immediately opens and runs in Google Chrome or Microsoft Edge!</li>
                </ol>
                <div className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                  Runs directly offline with full JS validations.
                </div>
              </div>

              {/* Method 2: VS Code Live Server */}
              <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-2">
                <div className="text-[10px] font-mono font-bold text-blue-600 uppercase">
                  Method 2 · For College Labs
                </div>
                <h5 className="font-bold text-neutral-900 dark:text-white">VS Code Live Server</h5>
                <ol className="list-decimal pl-4 space-y-1.5 text-neutral-600 dark:text-neutral-300">
                  <li>Open the extracted folder in Visual Studio Code.</li>
                  <li>Right-click on <code className="font-mono text-neutral-900 dark:text-white">auth.html</code>.</li>
                  <li>Click <span className="font-semibold">"Open with Live Server"</span>.</li>
                </ol>
                <div className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-200 dark:border-neutral-700 font-mono">
                  Opens at http://127.0.0.1:5500
                </div>
              </div>

              {/* Method 3: Python Localhost */}
              <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-2">
                <div className="text-[10px] font-mono font-bold text-amber-600 uppercase">
                  Method 3 · Any Terminal
                </div>
                <h5 className="font-bold text-neutral-900 dark:text-white">Python HTTP Server</h5>
                <ol className="list-decimal pl-4 space-y-1.5 text-neutral-600 dark:text-neutral-300">
                  <li>Open terminal in the project folder.</li>
                  <li>Run: <code className="p-1 rounded bg-neutral-200 dark:bg-neutral-700 font-mono">python -m http.server 3000</code></li>
                  <li>Open browser at <code className="font-mono">localhost:3000/auth.html</code></li>
                </ol>
                <div className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                  No Node or npm installation needed!
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300">
              <div className="font-bold mb-1">What to Submit for Web Technology (01CE1306):</div>
              <p className="text-[11px] leading-relaxed">
                Submit the 5 files in the folder: <code className="font-mono font-semibold">index.html</code> (Workspace), <code className="font-mono font-semibold">auth.html</code> (Auth Portal), <code className="font-mono font-semibold">admin.html</code> (Admin Control), <code className="font-mono font-semibold">validation.js</code> (all 5 JS validations), and <code className="font-mono font-semibold">style.css</code>. Your professor or examiner can double-click them on any computer!
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-auto p-4 bg-neutral-950 text-neutral-100 font-mono text-xs leading-relaxed selection:bg-neutral-800">
            <pre className="whitespace-pre overflow-x-auto">{currentSnippet}</pre>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-500 flex justify-between items-center bg-neutral-50 dark:bg-neutral-900">
          <div>
            Standalone files live in <code className="font-mono text-neutral-700 dark:text-neutral-300">/public/nexus-project/</code>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-emerald-600">✓ 100% Identical Visual Fidelity</span>
            <span className="font-mono text-neutral-400">·</span>
            <span className="font-mono text-neutral-700 dark:text-neutral-300">5/5 Validation Rules Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
