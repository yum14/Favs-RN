const getDomain = (url: string) => {
  const result = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/);

  if (result === null || result.length < 2) {
    throw new Error('could not match domain pattern.');
  }

  return result[1];
};

export { getDomain };
