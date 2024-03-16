export function isAuth(): boolean {
  const currentUser = localStorage.getItem('currentUserId');
  return !!currentUser;
}
