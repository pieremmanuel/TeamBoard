const getSessionKey = (userId) => `session_${userId}`;

export const saveSessionToLocalStorage = (session) => {
  try {
    if (!session?.userId) throw new Error('Session must include userId');
    localStorage.setItem(getSessionKey(session.userId), JSON.stringify(session));
  } catch (error) {
    console.error('Failed to save session:', error);
  }
};

export const loadSessionFromLocalStorage = (userId) => {
  try {
    const data = localStorage.getItem(getSessionKey(userId));
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load session:', error);
    return null;
  }
};

export const clearSessionFromLocalStorage = (userId) => {
  try {
    localStorage.removeItem(getSessionKey(userId));
  } catch (error) {
    console.error('Failed to clear session:', error);
  }
};
