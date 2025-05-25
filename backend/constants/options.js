const cookieOption = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const cookieExpireOption = {
  maxAge: 0,
  expires: new Date(Date.now()),
  httpOnly: true,
};

export { cookieOption, cookieExpireOption };
