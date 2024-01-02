export const userEmail = {
  required: "필수 입력란입니다.",
  minLength: {
    value: 4,
    message: "최소 8자를 입력해주세요.",
  },
  maxLength: {
    value: 30,
    message: "최대 30자까지 입력하실 수 있습니다..",
  },
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,

    message: "@를 포함한 이메일 양식으로 입력해주세요",
  },
};

export const userPassword = {
  required: "최소 8자를 입력해주세요",
  minLength: {
    value: 8,
    message: "영문, 숫자, 특수문자(!@#$%^*+=-) 포함 8 ~ 20자로 입력해주세요",
  },
  maxLength: {
    value: 20,
    message: "영문, 숫자, 특수문자(!@#$%^*+=-) 포함 8 ~ 20자로 입력해주세요",
  },
  pattern: {
    value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/,

    message: "영문, 숫자, 특수문자(!@#$%^*+=-) 포함 8 ~ 20자로 입력해주세요",
  },
};

export const confirmPassword = {
  required: "필수 입력란입니다.",
  minLength: {
    value: 4,
    message: "최소 4자를 입력해주세요.",
  },
  maxLength: {
    value: 20,
    message: "최대 20자까지 입력하실 수 있습니다.",
  },
};

export const userAddress = {
  required: "필수 입력란입니다.",
  minLength: {
    value: 4,
    message: "주소의 길이가 너무 짧습니다.",
  },
  maxLength: {
    value: 20,
    message: "최대 20자까지 입력하실 수 있습니다.",
  },
};

export const userNickname = {
  required: "필수 입력란입니다.",
  minLength: {
    value: 1,
    message: "최소 1자를 입력해주세요.",
  },
  maxLength: {
    value: 15,
    message: "최대 15자까지 입력하실 수 있습니다.",
  },
};
