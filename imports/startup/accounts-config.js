AccountsTemplates.configure({
  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: false,
  lowercaseUsername: false,

  // Appearance
  showAddRemoveServices: false,
  // Email field required for this to work
  showForgotPasswordLink: false,
  showLabels: true,
  showPlaceholders: true,
  showResendVerificationEmailLink: false,

  // Client-side Validation
  continuousValidation: false,
  negativeFeedback: false,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,

  // Privacy Policy and Terms of Use
  /*privacyUrl: 'privacy',
  termsUrl: 'terms-of-use',*/

  // Redirects
  homeRoutePath: '/',
  redirectTimeout: 3000

  // Hooks
  /*onLogoutHook: myLogoutFunc,
  onSubmitHook: mySubmitFunc,

  // Texts
  texts: {
    button: {
        signUp: "Register Now!"
    },
    socialSignUp: "Register",
    socialIcons: {
        "meteor-developer": "fa fa-rocket"
    },
    title: {
        forgotPwd: "Recover Your Password"
    },
  },*/
});

AccountsTemplates.addFields([
  {
    _id: 'displayName',
    type: 'text',
    displayName: 'Display Name',
    required: true,
    minLength: 5
  }
]);
