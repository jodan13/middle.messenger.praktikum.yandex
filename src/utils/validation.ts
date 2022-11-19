export function validation(target: HTMLInputElement, regExp: RegExp) {
  const value = target.value;
  const error = target.parentElement!.nextElementSibling;
  if (regExp.test(value)) {
    error!.classList.remove('visible');
    return true;
  } else {
    error!.classList.add('visible');
    return false;
  }
}

