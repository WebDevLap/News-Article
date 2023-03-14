// click on glass near input
export const glassClick = (element: React.RefObject<HTMLInputElement> | null) => {
  if (!element) return;
  if (!element.current) return;
  switch (element?.current.type) {
    case 'password':
      element.current.type = 'text';
      break;
    case 'text':
      element.current.type = 'password';
      break;
  }
};

export function onPasswordChange(
  e: any,
  state: React.Dispatch<React.SetStateAction<string>>,
  error: React.Dispatch<React.SetStateAction<string>>,
) {
  state(e.target.value);

  if (e.target.value.length < 7) {
    error('Пароль состоит меньше чем из 7 символов');
    if (!e.target.value.length) {
      error('Пустое поле');
    }
  } else {
    error('');
  }
}

export function onEmailChange(
  e: any,
  state: React.Dispatch<React.SetStateAction<string>>,
  error: React.Dispatch<React.SetStateAction<string>>,
) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  state(e.target.value);

  if (re.test(String(e.target.value).toLowerCase())) {
    error('');
  } else {
    error('Некорректная почта');
    if (!e.target.value.length) {
      error('Пустое поле');
    }
  }
}

export function dirtyFocus(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(false);
}

export function dirtyBlur(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(true);
}

export function onNicknameChange(
  e: any,
  state: React.Dispatch<React.SetStateAction<string>>,
  error: React.Dispatch<React.SetStateAction<string>>,
) {
  state(e.target.value);

  if (e.target.value.length < 5) {
    error('Никнейм состоит меньше чем из 5 символов');
    if (!e.target.value.length) {
      error('Пустое поле');
    }
  } else if (e.target.value.length > 15) {
    error('Никнейм состоит больше чем из 15 символов');
  } else {
    error('');
  }
}
