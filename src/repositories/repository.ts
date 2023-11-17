import dataBase from "#root/services/database/index.js";

class Repository {
  client;

  constructor() {
    this.client = dataBase.client;
  }
}

export default Repository;
