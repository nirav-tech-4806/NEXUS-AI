/**
 * NEXUS AI – Web Technology (01CE1306)
 * Student: Nirav Nimavat (92610103001)
 * 
 * JAVASCRIPT FORM VALIDATION SCRIPT
 * Enforcing 5 Mandatory Rules:
 * 1. Phone number pattern
 * 2. Password pattern
 * 3. Email pattern
 * 4. Password length
 * 5. All fields are required
 */

// ==========================================
// 1. REGEX PATTERNS & VALIDATION FUNCTIONS
// ==========================================

// Rule 1: Phone number pattern (10 to 14 digits, optional + prefix)
function validatePhoneNumber(phone) {
  const phonePattern = /^\+?[0-9]{10,14}$/;
  const cleanPhone = phone.replace(/[-.\s()]/g, '');
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

// Rule 2 & 4: Password Length and Password Pattern
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

  // Rule 2: Password Pattern (Must have uppercase, lowercase, number, special character)
  if (isSignUp) {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>_~-]/.test(password);

    if (!hasUpper) {
      return {
        isValid: false,
        message: 'Password pattern requires at least one uppercase letter (A-Z).'
      };
    }
    if (!hasLower) {
      return {
        isValid: false,
        message: 'Password pattern requires at least one lowercase letter (a-z).'
      };
    }
    if (!hasNumber) {
      return {
        isValid: false,
        message: 'Password pattern requires at least one number (0-9).'
      };
    }
    if (!hasSpecial) {
      return {
        isValid: false,
        message: 'Password pattern requires at least one special character (!@#$%^&*).'
      };
    }
  }

  return { isValid: true, message: '' };
}

// Rule 3: Email Pattern
function validateEmail(email) {
  // Rule 5: Required
  if (!email || email.trim() === '') {
    return { isValid: false, message: 'Email address is required.' };
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.trim())) {
    return {
      isValid: false,
      message: 'Please enter a valid email address (e.g. name@domain.com).'
    };
  }
  return { isValid: true, message: '' };
}

// Rule 5: Required Field Check
function validateRequired(value, fieldName) {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      message: fieldName + ' is required.'
    };
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
}

// ==========================================
// 2. DOM MANIPULATION & ERROR DISPLAY
// ==========================================

function setFieldError(fieldId, errorId, errorMessage) {
  const inputEl = document.getElementById(fieldId);
  const errorEl = document.getElementById(errorId);
  if (inputEl) {
    if (errorMessage) {
      inputEl.classList.add('input-error');
    } else {
      inputEl.classList.remove('input-error');
    }
  }
  if (errorEl) {
    errorEl.textContent = errorMessage;
    errorEl.style.display = errorMessage ? 'block' : 'none';
  }
}

function clearFieldError(fieldId, errorId) {
  setFieldError(fieldId, errorId, '');
}

// ==========================================
// 3. ATTACH FORM EVENT LISTENERS
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
  // Portal Tab Switching (Client / Admin)
  const clientTabBtn = document.getElementById('tab-client');
  const adminTabBtn = document.getElementById('tab-admin');
  const portalLabel = document.getElementById('portal-label');
  const adminCodeGroup = document.getElementById('admin-code-group');

  let currentPortal = 'client'; // 'client' or 'admin'
  let currentMode = 'login';    // 'login' or 'signup'

  function updatePortalView() {
    if (portalLabel) {
      portalLabel.textContent = currentPortal === 'client' ? 'Researcher Portal' : 'System Admin Portal';
    }
    if (clientTabBtn && adminTabBtn) {
      if (currentPortal === 'client') {
        clientTabBtn.classList.add('active');
        adminTabBtn.classList.remove('active');
      } else {
        adminTabBtn.classList.add('active');
        clientTabBtn.classList.remove('active');
      }
    }
    if (adminCodeGroup) {
      adminCodeGroup.style.display = (currentPortal === 'admin' && currentMode === 'signup') ? 'block' : 'none';
    }
  }

  if (clientTabBtn) {
    clientTabBtn.addEventListener('click', function () {
      currentPortal = 'client';
      updatePortalView();
    });
  }
  if (adminTabBtn) {
    adminTabBtn.addEventListener('click', function () {
      currentPortal = 'admin';
      updatePortalView();
    });
  }

  // Mode Switcher (Sign In / Sign Up)
  const modeLoginBtn = document.getElementById('mode-login');
  const modeSignupBtn = document.getElementById('mode-signup');
  const formTitle = document.getElementById('form-title');
  const submitBtn = document.getElementById('submit-btn');
  const signupFields = document.querySelectorAll('.signup-only');

  function updateModeView() {
    const isSignup = currentMode === 'signup';
    if (formTitle) {
      formTitle.textContent = isSignup ? 'Create Account' : 'Sign In';
    }
    if (submitBtn) {
      submitBtn.textContent = isSignup ? 'Register & Continue' : 'Sign In to Workspace';
    }
    if (modeLoginBtn && modeSignupBtn) {
      if (isSignup) {
        modeSignupBtn.classList.add('active');
        modeLoginBtn.classList.remove('active');
      } else {
        modeLoginBtn.classList.add('active');
        modeSignupBtn.classList.remove('active');
      }
    }
    signupFields.forEach(el => {
      el.style.display = isSignup ? 'block' : 'none';
    });
    if (adminCodeGroup) {
      adminCodeGroup.style.display = (currentPortal === 'admin' && isSignup) ? 'block' : 'none';
    }
  }

  if (modeLoginBtn) {
    modeLoginBtn.addEventListener('click', function () {
      currentMode = 'login';
      updateModeView();
    });
  }
  if (modeSignupBtn) {
    modeSignupBtn.addEventListener('click', function () {
      currentMode = 'signup';
      updateModeView();
    });
  }

  // Form Submission Validation
  const authForm = document.getElementById('auth-form');
  const alertBox = document.getElementById('form-alert');

  if (authForm) {
    authForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Stop default submit to validate via JS

      let isFormValid = true;
      const isSignup = currentMode === 'signup';

      // 1. Validate Email (Rule 3 & 5)
      const emailInput = document.getElementById('email');
      const emailRes = validateEmail(emailInput ? emailInput.value : '');
      if (!emailRes.isValid) {
        setFieldError('email', 'email-error', emailRes.message);
        isFormValid = false;
      } else {
        clearFieldError('email', 'email-error');
      }

      // 2. Validate Password (Rule 2, 4, 5)
      const passwordInput = document.getElementById('password');
      const passVal = passwordInput ? passwordInput.value : '';
      const passRes = validatePassword(passVal, isSignup);
      if (!passRes.isValid) {
        setFieldError('password', 'password-error', passRes.message);
        isFormValid = false;
      } else {
        clearFieldError('password', 'password-error');
      }

      // 3. Validate Signup-only fields
      if (isSignup) {
        // Full Name (Rule 5)
        const nameInput = document.getElementById('fullname');
        const nameRes = validateRequired(nameInput ? nameInput.value : '', 'Full Name');
        if (!nameRes.isValid) {
          setFieldError('fullname', 'fullname-error', nameRes.message);
          isFormValid = false;
        } else {
          clearFieldError('fullname', 'fullname-error');
        }

        // Phone Number (Rule 1 & 5)
        const phoneInput = document.getElementById('phone');
        const phoneRes = validatePhoneNumber(phoneInput ? phoneInput.value : '');
        if (!phoneRes.isValid) {
          setFieldError('phone', 'phone-error', phoneRes.message);
          isFormValid = false;
        } else {
          clearFieldError('phone', 'phone-error');
        }

        // Confirm Password Match
        const confirmInput = document.getElementById('confirm-password');
        const confirmRes = validateConfirmPassword(passVal, confirmInput ? confirmInput.value : '');
        if (!confirmRes.isValid) {
          setFieldError('confirm-password', 'confirm-error', confirmRes.message);
          isFormValid = false;
        } else {
          clearFieldError('confirm-password', 'confirm-error');
        }

        // Admin Security Code
        if (currentPortal === 'admin') {
          const adminCodeInput = document.getElementById('admin-code');
          const codeRes = validateRequired(adminCodeInput ? adminCodeInput.value : '', 'Admin Security Code');
          if (!codeRes.isValid) {
            setFieldError('admin-code', 'admin-code-error', codeRes.message);
            isFormValid = false;
          } else {
            clearFieldError('admin-code', 'admin-code-error');
          }
        }
      }

      // Result summary feedback
      if (alertBox) {
        if (!isFormValid) {
          alertBox.className = 'alert alert-danger';
          alertBox.textContent = 'Validation Failed: Please correct the highlighted errors above.';
          alertBox.style.display = 'block';
        } else {
          alertBox.className = 'alert alert-success';
          alertBox.textContent = isSignup
            ? 'Success! All 5 JavaScript validation criteria passed. Account registered successfully.'
            : 'Success! Credentials validated. Authenticated to ' + (currentPortal === 'admin' ? 'Admin Control' : 'Researcher Workspace') + '.';
          alertBox.style.display = 'block';

          setTimeout(function () {
            if (currentPortal === 'admin') {
              window.location.href = 'admin.html';
            } else {
              window.location.href = 'index.html';
            }
          }, 1500);
        }
      }
    });
  }

  // Quick Demo Buttons
  const btnDemoResearcher = document.getElementById('btn-demo-researcher');
  const btnDemoAdmin = document.getElementById('btn-demo-admin');

  if (btnDemoResearcher) {
    btnDemoResearcher.addEventListener('click', function () {
      currentPortal = 'client';
      currentMode = 'login';
      updatePortalView();
      updateModeView();
      document.getElementById('email').value = 'evelyn.vance@nexus.ai';
      document.getElementById('password').value = 'Nexus@Research2026!';
    });
  }

  if (btnDemoAdmin) {
    btnDemoAdmin.addEventListener('click', function () {
      currentPortal = 'admin';
      currentMode = 'login';
      updatePortalView();
      updateModeView();
      document.getElementById('email').value = 'admin@nexus.ai';
      document.getElementById('password').value = 'Admin#NexusPass88';
    });
  }
});
