// plugins/storage.js
export default ({ app }, inject) => {
  inject('storage', {
    local: {
      setItem(key, value) {
        if (process.client) {
          localStorage.setItem(key, value);
        }
      },
      getItem(key) {
        if (process.client) {
          return localStorage.getItem(key);
        }
        return null;
      },
      removeItem(key) {
        if (process.client) {
          localStorage.removeItem(key);
        }
      }
    },
    session: {
      setItem(key, value) {
        if (process.client) {
          sessionStorage.setItem(key, value);
        }
      },
      getItem(key) {
        if (process.client) {
          return sessionStorage.getItem(key);
        }
        return null;
      },
      removeItem(key) {
        if (process.client) {
          sessionStorage.removeItem(key);
        }
      }
    }
  });
  // if (process.client) {
  //   app.$localStorage = {
  //     getItem: (key) => localStorage.getItem(key),
  //     setItem: (key, value) => localStorage.setItem(key, value),
  //     removeItem: (key) => localStorage.removeItem(key)
  //   };
  //   app.$localStorage = {
  //     getItem: (key) => sessionStorage.getItem(key),
  //     setItem: (key, value) => sessionStorage.setItem(key, value),
  //     removeItem: (key) => sessionStorage.removeItem(key)
  //   };
  // }
};
