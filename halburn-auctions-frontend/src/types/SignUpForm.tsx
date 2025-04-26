export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  purpose: '1' | '2';
}