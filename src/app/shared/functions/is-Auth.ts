export function isAuth(): boolean {
  const currentUser = localStorage.getItem('currentUser');
  return !!currentUser;
}
