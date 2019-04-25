import Cache from './cache';

class GqlWebWorker {
  constructor({ endpoint }) {
    this.endpoint = endpoint;
    this.cache = new Cache(); // Possible recovery point for existing state
  }

  query({ variables, query }) {

  }

  mutation({ variables, mutation}) {

  }
}

export default GqlWebWorker;
