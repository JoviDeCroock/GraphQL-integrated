# Schema

## Query

### List

When fetching entities we'll always talk about the plural form of this entity,
doing this makes more sense since is in line with subresolvers.

The first reads easier than the second.

```js
query persons {
  id
  name
  friends {
    id
    name
  }
}
```

```js
query getPersons {
  id
  name
  friends {
    id
    name
  }
}
```

### One

When fetching a singular entity we talk about the singular form, we query a person not a getPerson.

```js
query person (id: 'x') {
  id
  name
  friends (age: '> 40') {
    id
    name
  }
}
```

## Mutation

Here comes the tricky part since we'll have a clear distinct between creation
and updates/deletes.

### Update/Delete

This is inline with fetching a singular entity:

```js
mutation person (id: 'x') {
  delete {
    success
  }
  update (name: 'new') {
    id
    name
  }
}
```

Why would we go to the extra trouble to first fetch the person and then preform the action?
For one this provides data consistency since we have an implicit check whether or not the entity
we are targetting exists.

This also makes it easier to determine what type we are talking about and what action we are preforming
on said entity.

### Create

When approaching the create scenario there is no clear entry as to how we can do this, one might opt
that a mutation of a singular entity could result in creation. This however makes for akward scenario's
where the base case could fetch instead of create.

That's why I opt to use `createPerson` over this error-prone approach.

### Children
