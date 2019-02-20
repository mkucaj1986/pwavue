export const registerGlobals = Vue => {
  Vue.prototype.$checkWifi = () => {
    return !!navigator.onLine;
  };
};
