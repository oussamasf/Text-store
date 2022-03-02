class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  pagination() {
    if (this.queryString.page) {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 1;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
    }

    return this;
  }

  all() {
    const search = this.queryString.search;
    this.query = this.query.find({});
    return this;
  }
  all() {
    const search = this.queryString.state;

    this.query = this.query.find({});
    return this;
  }
}

module.exports = APIfeatures;
// fielding() {
//   if (this.queryString.fields) {
//     const fields = this.queryString.fields.split(",").join(" ");
//     this.query = this.query.select(fields);
//   } else {
//     // <default>
//   }
//   return this;
// }
