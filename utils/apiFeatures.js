class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // building the query
    const queryObj = { ...this.queryString };
    const excludedFieds = ["page", "sort", "fileds", "limit"];
    excludedFieds.forEach((el) => delete queryObj[el]);

    // adding dollar sign to begining of the words {lte gte lt gt}
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|lte|lt|gt)\b/g,
      (match) => `$${match}`
    );
    this.query.find(JSON.parse(queryString));
    return this;
  }

  sorting() {
    // sorting the query
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      // <default>
    }
    return this;
  }

  fielding() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      // <default>
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIfeatures;
