const todos = [
  {
    "category": "music",
    "description": "todo1",
    "userId": "6551dd271079db96684d55f0",
    "id": "655200a88fa41fb12776a39d",
    "title": "todo1"
  },
  {
    "category": "gaming",
    "description": "todo2",
    "userId": "6551f5765d3f01bb9dfb6a69",
    "id": "655247eeb7b214a732226bd2",
    "title": "todo2"
  },
  {
    "category": null,
    "description": "sleep",
    "userId": "6551fab6c121f26077fb39bf",
    "id": "6552f8645714f7e081edfad2",
    "title": "todo3"
  },
  {
    "category": "swim",
    "description": null,
    "userId": "6551fab6c121f26077fb39bf",
    "id": "6552faae89b9371289c4f0b7",
    "title": "todo4"
  }
]

const users = [
  {
    "_id":{"$oid":"6551dd271079db96684d55f0"},
    "email":"earl1",
    "password":"$2b$10$XmnQPLahb.LMcwh4FmgZK.JCGIaDDdDyiGrwWLoqplGTWb2IydWgS",
    "firstName":"davis",
    "lastName":"Qi",
  },
  {
    "_id":{"$oid":"6551f5765d3f01bb9dfb6a69"},
    "email":"earl2",
    "password":"$2b$10$GgP6YPSXWZJWbUkMbY/8HerUbhU9Nxjv7./YFQ2hB.bPO4u0aq792",
    "firstName":"davis",
    "lastName":"Qi",
  },
  {
    "_id":{"$oid":"6551fab6c121f26077fb39bf"},
    "email":"earl3",
    "password":"$2b$10$UZVz0/NRzsIUSeB6WUg1FeC523mET2ElFOu8ij7gYf9JWhCuYQ8wu",
    "firstName":"davis",
    "lastName":"Qi",
  },
]

module.exports = {
  todos,
  users
}