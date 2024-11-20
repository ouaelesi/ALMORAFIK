export const getLocation = () => {
  const currentURL = window.location.href;
  const baseURL = window.location.origin;

  // Extract the relative path by removing the base URL from the current URL
  const relativePath = currentURL.replace(baseURL, "");

  return relativePath;
};

export const getUrlParams = (param) => {
  if (typeof window === 'undefined') {
    // Handle the case where window is not available (server-side rendering)
    return null; // or handle accordingly based on your requirement
  }

  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(param);
};

export const updateTabUrlParams = (activeTab, tabName = "tab") => {
  const path = getLocation().split("?");

  if (path.length > 1) {
    let tabValue = getUrlParams(tabName);
    if (tabValue) {
      let params = path[1].split("&");
      let newParams = [];
      params.map((elem) => {
        if (!elem.startsWith(tabName)) {
          newParams.push(elem);
        }
      });

      return (
        path[0] + "?" + newParams.join("&") + "&" + tabName + "=" + activeTab
      );
    } else {
      return getLocation() + "&" + tabName + "=" + activeTab;
    }
  } else {
    return getLocation() + "?" + tabName + "=" + activeTab;
  }
};
