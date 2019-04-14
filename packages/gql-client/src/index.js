(function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('gql-client.js', { scope: './' }).then(() => {
      console.info('Initialized');
    }).catch(function(err) {
      console.warn('Failed');
      console.error(err);
    });
  } else {
    console.warn('No sw implementation');
  }
}());