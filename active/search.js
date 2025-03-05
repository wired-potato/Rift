"use strict";
/**
 *
 * @param {string} input
 * @param {string} template Template for a search query.
 * @returns {string} Fully qualified URL
 */
function search(input, template) {
  // More robust pattern to block variations of "1v1.lol"
  const blockedPattern = /1\s*v\s*1\s*[. ]?\s*l\s*o\s*l/i;

  if (blockedPattern.test(input.replace(/[^a-z0-9]/gi, ""))) {
    return "https://spinningrat.online/";
  }

  try {
    // input is a valid URL:
    const url = new URL(input);
    if (blockedPattern.test(url.hostname.replace(/[^a-z0-9]/gi, ""))) {
      return "https://spinningrat.online/";
    }
    return url.toString();
  } catch (err) {
    // input was not a valid URL
  }

  try {
    // input is a valid URL when http:// is added to the start:
    const url = new URL(`http://${input}`);
    if (blockedPattern.test(url.hostname.replace(/[^a-z0-9]/gi, ""))) {
      return "https://spinningrat.online/";
    }
    // only if the hostname has a TLD/subdomain
    if (url.hostname.includes(".")) return url.toString();
  } catch (err) {
    // input was not a valid URL
  }

  // input may have been a valid URL, however the hostname was invalid

  // Attempts to convert the input to a fully qualified URL have failed
  // Treat the input as a search query
  return `https://duckduckgo.com/?q=${encodeURIComponent(input)}`;
}
