export interface SignUpInterFace {
  name: string;
  email: string;
  password: string;
}
export interface SignInInterFace {
  email: string;
  password: string;
}
export interface ResetPassword {
  email: string;
}
export interface verifyCode {
  email: string;
  verificationCode: string;
  code: string;
}
export interface changePassword {
  email: string;
  password: string;
}
