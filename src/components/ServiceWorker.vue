
<template>
    <span></span>
</template>

<style>
</style>

<script>
export default {
  name: 'ServiceWorker',
  methods: {
    registerServiceWorker () {
      if (!('serviceWorker' in navigator)) {
        console.log("Service workers aren't supported in this browser.");
        return;
      }
      if (document.readyState === 'complete') {
        window.addEventListener('load', () => {
          this.register();
        });
      } else {
        this.register();
      }
    },
    register () {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log(
            'Service workers Registration successfuly, scope is:',
            registration.scope
          );
          navigator.serviceWorker.ready
            .then(serviceWorkerRegistration => {
              return serviceWorkerRegistration.sync.register('myFirstSync');
            })

            // .then(function (subscription) { console.log(subscription.endpoint) })
            .catch(error => {
              if (Notification.permission === 'denied') {
                console.log('Permission for Notifications was denied');

                // subscribeButton.disabled = true
              } else {
                console.log(
                  'TODO ################################ Unable to subscribe to push.',
                  error
                );

                // subscribeButton.disabled = false
              }
            });
        })
        .catch(error => {
          console.log('Service worker registration failed, error:', error);
        });
    }
  },
  mounted () {
    this.registerServiceWorker();
  }
};
</script>
