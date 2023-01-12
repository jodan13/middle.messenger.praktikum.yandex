export function validation(target: HTMLInputElement, regExp: RegExp) {
  const value = target.value;
  let error;
  if (target.parentElement) {
    error = target.parentElement!.nextElementSibling;
  }

  if (regExp.test(value)) {
    if (error) {
      error.setAttribute('data-error', 'false');
    }

    return true;
  } else {
    if (error) {
      error!.setAttribute('data-error', 'true');
    }
    return false;
  }

}
