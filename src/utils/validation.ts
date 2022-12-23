export function validation(target: HTMLInputElement, regExp: RegExp) {
  const value = target.value;
  const error = target.parentElement!.nextElementSibling;
  if (regExp.test(value)) {
    error!.setAttribute('data-error', 'false');
    return true;
  } else {
    error!.setAttribute('data-error', 'true');
    return false;
  }
}

