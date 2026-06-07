export function getElementById<T extends HTMLElement>(id: string) {
  const element = document.getElementById(id);
  if (element === null) {
    alert("Could not find element by id " + id);
    throw "Could not find element by id " + id;
  }
  return element as T;
}

export const getButton = (id: string) => getElementById<HTMLButtonElement>(id);
